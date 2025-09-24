// 📦 Internal imports
import type { FormStateT } from '~types/form';
import { AuthMessages } from '~constants/messages';
import { catchErrorFormState, FormStatusKinds } from '~constants/form';
import { OtpServices } from '~services/otp';
import { verifyHash } from '~helpers/hash';
import { AuthServices } from '~services/auth';

const signinUser = async (
  username: string,
  phoneNumber: string,
  enteredPassword: string,
  hashedPassword: string,
  remember?: 'on',
): Promise<FormStateT> => {
  // 1. Password correctness checking
  const isPasswordTrue = await verifyHash(enteredPassword, hashedPassword);
  if (!isPasswordTrue) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        password: { errors: [AuthMessages.Error.SigninIncorrectData] },
      },
    };
  }

  // 2. Create user sessions and redirect to dashboard
  const sessionCreationResult = await AuthServices.createUserSessions(
    username,
    remember,
  );
  if (!sessionCreationResult) return catchErrorFormState;

  await OtpServices.deleteOTPs(phoneNumber);

  return {
    status: FormStatusKinds.Success,
    toastNeed: true,
    toastMessage: AuthMessages.Success.CompleteSignin,
    redirectNeed: true,
    redirectPath: '/dashboard',
  };
};

export const SigninService = {
  signinUser,
} as const;
