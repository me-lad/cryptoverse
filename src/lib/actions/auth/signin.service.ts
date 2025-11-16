// 📦 Internal imports
import type { FormStateT } from '~types/form';
import { Messages } from '~constants/messages';
import { catchErrorFormState, FormStatusKinds } from '~constants/form';
import { OtpServices } from '~services/repositories/otp';
import { verifyHash } from '~helpers/hash';
import { AuthServices } from '~services/repositories/auth';

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
        password: { errors: [Messages.Error.SigninIncorrectData] },
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
    toastMessage: Messages.Success.CompleteSignin,
    redirectNeed: true,
    redirectPath: '/dashboard',
  };
};

export const SigninService = {
  signinUser,
} as const;
