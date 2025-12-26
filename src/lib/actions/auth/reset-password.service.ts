// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import type { FormStateT } from '~types/form';
import { FormStatusKinds } from '~constants/form';
import { catchErrorFormState } from '~constants/form';
import { connectToDB } from '~vendors/mongoose';
import { Messages } from '~constants/messages';
import { doHash } from '~helpers/hash';
import { getCookie } from '~helpers/cookies';
import { VerifyService } from './verify.service';
import { UserServices } from '~services/repositories/user';
import { OtpServices } from '~services/repositories/otp';
import { SessionServices } from '~services/repositories/session';

const sendVerificationCode = async (
  userIdentifier: string,
): Promise<FormStateT> => {
  try {
    await connectToDB();

    const userData = await UserServices.getUserDataByIdentifier(userIdentifier);
    if (!userData) return catchErrorFormState;
    if (!userData.isVerified) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: true,
        redirectPath: `/auth/verify?username=${userData.username}`,
        toastNeed: false,
      };
    }

    const userOtpStatus = await VerifyService.checkUserOtpStatus(
      userData.username,
    );
    const { status } = userOtpStatus;

    if (status === 'Error') return catchErrorFormState;

    if (status === 'Limited') {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.VerificationPermanentLimit,
      };
    }

    if (status === 'Waiting') {
      redirect(`/auth/reset-password?username=${userData.username}`);
    }

    // status === "Allowed"
    const sendResult = await VerifyService.sendOtp(userData.phoneNumber, true);

    if (sendResult) {
      redirect(`/auth/reset-password?username=${userData.username}`);
    }

    return catchErrorFormState;
  } catch (err: any) {
    if (!err.digest.startsWith('NEXT_REDIRECT')) {
      return catchErrorFormState;
    }
    throw err;
  }
};

const doResetPassword = async (data: {
  username: string;
  code: string;
  password: string;
  passwordRepeat: string;
}): Promise<FormStateT> => {
  try {
    const userData = await UserServices.getUserDataByIdentifier(data.username);
    if (!userData) return catchErrorFormState;

    if (!userData.isVerified) {
      return {
        status: 'Error',
        toastNeed: true,
        toastMessage:
          'You should verify and signin to your account once to get able to change your password',
        redirectNeed: true,
        redirectPath: `/auth/verify?username=${userData.username}`,
      };
    }

    // 6. Find otp data
    const otpData = await OtpServices.getValidOtp(userData.phoneNumber);
    if (!otpData) return catchErrorFormState;

    if (otpData.usageCount > 5) {
      return {
        status: 'Error',
        toastNeed: true,
        toastMessage:
          'Your code has expired due to many unsuccessful verification. Please do the process again.',
        redirectNeed: true,
        redirectPath: '1',
      };
    }

    // 7. Check code existence
    if (data.code !== otpData.code) {
      otpData.usageCount += 1;
      await otpData.save();
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          code: { errors: [Messages.Error.VerificationIncorrectCode] },
        },
      };
    }

    const hashedPassword = await doHash(data.password);
    userData.password = hashedPassword;
    userData.passwordChangedAt = new Date();
    await UserServices.deleteAllSessions(userData.id);
    await userData.save();

    await SessionServices.deleteAllSessions(userData.id);
    await OtpServices.deleteOTPs(userData.phoneNumber);

    return {
      status: FormStatusKinds.Success,
      redirectNeed: true,
      redirectPath: '/auth/signin',
      toastNeed: true,
      toastMessage: Messages.Success.CompleteResetPassword,
    };
  } catch (err) {
    return catchErrorFormState;
  }
};

export const ResetPasswordService = {
  sendVerificationCode,
  doResetPassword,
} as const;
