// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import type { FormStateT } from '~types/form.states';
import { FormStatusKinds } from '~constants/form';
import { catchErrorFormState } from '~constants/form';
import { connectToDB } from '~vendors/mongoose';
import { AuthMessages } from '~constants/messages';
import { doHash } from '~helpers/hash';
import { VerifyService } from './verify.service';
import { UserServices } from '~services/user';
import { OtpServices } from '~services/otp';
import { SessionServices } from '~services/session';

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
        toastMessage: AuthMessages.Error.VerificationPermanentLimit,
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
      console.log('Error in sending reset password verification code ->', err);
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

    // 6. Find otp data
    const otpData = await OtpServices.getValidOtp(userData.phoneNumber);
    if (!otpData) return catchErrorFormState;

    // 7. Check code existence
    if (data.code !== otpData.code) {
      console.log('Wrong code');
      otpData.usageCount += 1;
      await otpData.save();
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          code: { errors: [AuthMessages.Error.VerificationIncorrectCode] },
        },
      };
    }

    const hashedPassword = await doHash(data.password);
    userData.password = hashedPassword;
    userData.passwordChangedAt = new Date();
    userData.refreshToken = undefined;
    userData.refreshTokenExpiresAt = undefined;
    userData.sessionId = undefined;
    await userData.save();

    await SessionServices.deleteSession(userData.id);
    await OtpServices.deleteOTPs(userData.phoneNumber);

    return {
      status: FormStatusKinds.Success,
      redirectNeed: true,
      redirectPath: '/auth/signin',
      toastNeed: true,
      toastMessage: AuthMessages.Success.CompleteResetPassword,
    };
  } catch (err) {
    console.log('Error in reset password process ->', err);
    return catchErrorFormState;
  }
};

export const ResetPasswordService = {
  sendVerificationCode,
  doResetPassword,
} as const;
