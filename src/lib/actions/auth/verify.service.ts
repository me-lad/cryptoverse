// 📌 Directives
import 'server-only';

// 📦 Third-Party imports
import crypto from 'crypto';

// 📦 Internal imports
import type {
  OtpResendResultT,
  OtpCheckerResultT,
  FormStateT,
} from '~types/form';
import type { OtpDocumentType } from '~models/Otp/types';
import { connectToDB } from '~vendors/mongoose';
import { Messages } from '~constants/messages';
import { isDatePassedTime } from '~helpers/time';
import { UserServices } from '~services/repositories/user';
import { BlockedNumberServices } from '~services/repositories/blockedNumber';
import { OtpServices } from '~services/repositories/otp';
import { FormStatusKinds, catchErrorFormState } from '~constants/form';
import { AuthServices } from '~services/repositories/auth';

// 🧾 Local types and helpers
const restrictionThresholds: number[] = [3, 6, 9, 10] as const;

const buildRandomOtp = (length: number = 6): string => {
  return crypto.randomInt(100_000, 999_999).toString();
};

// 🔍 Check OTP Status
const checkUserOtpStatus = async (
  username: string,
): Promise<OtpCheckerResultT> => {
  try {
    await connectToDB();
    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData) {
      return { status: 'Error', message: Messages.Error.CatchHandler };
    }

    const { phoneNumber } = userData;
    const validExistOtpData = await OtpServices.getValidOtp(phoneNumber);

    if (validExistOtpData) {
      return {
        status: 'Waiting',
        referenceTime: validExistOtpData.createdAt!,
      };
    } else {
      const recentOTPs = await OtpServices.countExpiredOTPs(phoneNumber);

      if (restrictionThresholds.includes(recentOTPs)) {
        if (recentOTPs === 10) {
          await BlockedNumberServices.blockNumber(phoneNumber);
          await userData.updateOne({ $set: { isRestricted: true } });
          await OtpServices.deleteOTPs(phoneNumber);
          return { status: 'Limited' };
        } else {
          const lastExpiredCode =
            await OtpServices.getLastExpiredOtp(phoneNumber);

          const isRestrictionPassed = isDatePassedTime(
            lastExpiredCode?.expiresAt!,
            5,
          );
          return isRestrictionPassed
            ? { status: 'Allowed' }
            : {
                status: 'Waiting',
                referenceTime: lastExpiredCode?.expiresAt!,
                isTemporaryLimit: true,
              };
        }
      } else {
        return { status: 'Allowed' };
      }
    }
  } catch (err) {
    return { status: 'Error', message: Messages.Error.CatchHandler };
  }
};

// 📲 SMS sender
const sms = (phoneNumber: string, code: string) => {
  return fetch('http://ippanel.com/api/select', {
    method: 'POST',
    body: JSON.stringify({
      op: 'pattern',
      user: process.env.OTP_USERNAME,
      pass: process.env.OTP_PASSWORD,
      fromNum: '3000505',
      toNum: phoneNumber,
      patternCode: '7am85rbvye0bqqz',
      inputData: [{ 'verification-code': code }],
    }),
  });
};

// ✅ OTP Verification
const doVerify = async (
  username: string,
  code: string,
): Promise<FormStateT> => {
  try {
    await connectToDB();

    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData || userData.isVerified || userData.isRestricted) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.InvalidUsername,
      };
    }

    const { phoneNumber } = userData;
    const otpData = await OtpServices.getValidOtp(phoneNumber);
    if (!otpData) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.VerifyCodeExpire,
      };
    }

    const isCodeUseTimePassed = isDatePassedTime(otpData.createdAt!, 2);
    const isCodeUsageCountPassed = otpData.usageCount >= 3;
    if (isCodeUseTimePassed || isCodeUsageCountPassed) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.VerifyCodeOverUse,
      };
    }

    if (otpData.code !== code) {
      otpData.usageCount += 1;
      await otpData.save();
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.VerificationIncorrectCode,
      };
    }

    const sessionsCreationResult = await AuthServices.createUserSessions(
      username,
      'on',
    );
    if (!sessionsCreationResult) return catchErrorFormState;

    userData.isVerified = true;
    await userData.save();
    await OtpServices.deleteOTPs(phoneNumber);

    return {
      status: FormStatusKinds.Success,
      toastNeed: true,
      toastMessage: Messages.Success.CompleteVerify,
      redirectNeed: true,
      redirectPath: '/dashboard',
    };
  } catch (err) {
    return catchErrorFormState;
  }
};

// 📤 Send OTP
const sendOtp = async (
  phoneNumber: string,
  isResetPassword?: true,
): Promise<OtpDocumentType | null> => {
  try {
    const data = {
      phoneNumber,
      code: buildRandomOtp(),
      usage: isResetPassword ? 'ResetPassword' : 'Verify',
    };

    await sms(data.phoneNumber, data.code);
    return await OtpServices.createOtp(data);
  } catch (err) {
    return null;
  }
};

// 🔁 Resend OTP
const resendOtp = async (username: string): Promise<OtpResendResultT> => {
  const userOtpStatus = await checkUserOtpStatus(username);
  const { status } = userOtpStatus;

  const userData = await UserServices.getUserDataByIdentifier(username);
  if (!userData || status === 'Error') {
    return { success: false, message: Messages.Error.CatchHandler };
  }

  if (status === 'Limited') {
    return {
      success: false,
      message: Messages.Error.VerificationPermanentLimit,
      refreshNeed: true,
    };
  }

  if (status === 'Waiting') {
    const { isTemporaryLimit, referenceTime } = userOtpStatus;
    if (isTemporaryLimit) {
      return {
        success: false,
        isTemporaryLimit: true,
        referenceTime,
        message:
          "You've been temporarily limited due to high code request. Please wait.",
      };
    }

    return {
      success: false,
      message:
        'Code has already been sent. Please wait before requesting a new one.',
    };
  }

  const { phoneNumber } = userData;
  const sendResult = await sendOtp(phoneNumber);
  if (!sendResult || !sendResult.createdAt) {
    return { success: false, message: Messages.Error.CatchHandler };
  }

  return {
    success: true,
    newReferenceTime: sendResult.createdAt,
  };
};

export const VerifyService = {
  checkUserOtpStatus,
  sendOtp,
  resendOtp,
  doVerify,
} as const;
