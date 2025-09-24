// 📌 Directives
import 'server-only';

// 📦 Internal imports
import type {
  OtpResendResultT,
  OtpCheckerResultT,
  FormStateT,
} from '~types/form';
import type { OtpDocumentType } from '~models/Otp/types';
import { connectToDB } from '~configs/mongoose';
import { AuthMessages } from '~constants/messages';
import { isDatePassedTime } from '~helpers/time';
import { buildRandomCode } from '~helpers/generators';
import { UserServices } from '~services/user';
import { BlockedNumberServices } from '~services/blockedNumber';
import { OtpServices } from '~services/otp';
import { FormStatusKinds, catchErrorFormState } from '~constants/form';
import { AuthServices } from '~services/auth';

// 🧾 Local types
const restrictionThresholds: number[] = [3, 6, 9, 10] as const;

// 🧠 Cache system
interface CachedOtpStatusType {
  value: OtpCheckerResultT;
  expiresAt: number;
}
const otpStatusCache = new Map<string, CachedOtpStatusType>();

function cleanExpiredCache() {
  const now = Date.now();
  for (const [key, { expiresAt }] of otpStatusCache.entries()) {
    if (expiresAt <= now) {
      otpStatusCache.delete(key);
    }
  }
}

// 🔍 Check OTP Status
const checkUserOtpStatus = async (
  username: string,
): Promise<OtpCheckerResultT> => {
  cleanExpiredCache();

  const now = Date.now();
  const cached = otpStatusCache.get(username);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  let result: OtpCheckerResultT;

  try {
    await connectToDB();
    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData) {
      return { status: 'Error', message: AuthMessages.Error.CatchHandler };
    }

    const { phoneNumber } = userData;
    const validExistOtpData = await OtpServices.getValidOtp(phoneNumber);

    if (validExistOtpData) {
      result = {
        status: 'Waiting',
        referenceTime: validExistOtpData.createdAt!,
      };
    } else {
      const recentOTPs = await OtpServices.countExpiredOTPs(phoneNumber);

      if (restrictionThresholds.includes(recentOTPs)) {
        if (recentOTPs === 10) {
          await BlockedNumberServices.blockNumber(phoneNumber);
          await userData.updateOne({ $set: { isRestricted: true } });
          result = { status: 'Limited' };
        } else {
          const lastExpiredCode =
            await OtpServices.getLastExpiredOtp(phoneNumber);

          const isRestrictionPassed = isDatePassedTime(
            lastExpiredCode?.expiresAt!,
            5,
          );
          result = isRestrictionPassed
            ? { status: 'Allowed' }
            : {
                status: 'Waiting',
                referenceTime: lastExpiredCode?.expiresAt!,
                isTemporaryLimit: true,
              };
        }
      } else {
        result = { status: 'Allowed' };
      }
    }

    otpStatusCache.set(username, {
      value: result,
      expiresAt: now + 60_000,
    });

    return result;
  } catch (err) {
    console.log('Error in verify service ->', err);
    return { status: 'Error', message: AuthMessages.Error.CatchHandler };
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
        toastMessage: AuthMessages.Error.InvalidUsername,
      };
    }

    const { phoneNumber } = userData;
    const otpData = await OtpServices.getValidOtp(phoneNumber);
    if (!otpData) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.VerifyCodeExpire,
      };
    }

    const isCodeUseTimePassed = isDatePassedTime(otpData.createdAt!, 2);
    const isCodeUsageCountPassed = otpData.usageCount >= 3;
    if (isCodeUseTimePassed || isCodeUsageCountPassed) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.VerifyCodeOverUse,
      };
    }

    if (otpData.code !== code) {
      otpData.usageCount += 1;
      await otpData.save();
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.VerificationIncorrectCode,
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
      toastMessage: AuthMessages.Success.CompleteVerify,
      redirectNeed: true,
      redirectPath: '/dashboard',
    };
  } catch (err) {
    console.log('Error in verify controller ->', err);
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
      code: buildRandomCode(),
      usage: isResetPassword ? 'ResetPassword' : 'Verify',
    };

    await sms(data.phoneNumber, data.code);
    return await OtpServices.createOtp(data);
  } catch (err) {
    console.log('Error in create otp document ->', err);
    return null;
  }
};

// 🔁 Resend OTP
const resendOtp = async (username: string): Promise<OtpResendResultT> => {
  const userOtpStatus = await checkUserOtpStatus(username);
  const { status } = userOtpStatus;

  const userData = await UserServices.getUserDataByIdentifier(username);
  if (!userData || status === 'Error') {
    return { success: false, message: AuthMessages.Error.CatchHandler };
  }

  if (status === 'Limited') {
    return {
      success: false,
      message: AuthMessages.Error.VerificationPermanentLimit,
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
    return { success: false, message: AuthMessages.Error.CatchHandler };
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
