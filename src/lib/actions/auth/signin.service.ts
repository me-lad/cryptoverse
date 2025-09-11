// Local imports
import type { FormStateType } from "~types/form";
import { AuthMessages } from "~constants/messages";
import { catchErrorFormState, FormStatusTypes } from "~constants/forms";
import { OtpService } from "~services/otp.service";
import { verifyHash } from "~helpers/hash";
import { AuthService } from "~services/auth.service";

const signinUser = async (
  username: string,
  phoneNumber: string,
  enteredPassword: string,
  hashedPassword: string,
  remember?: "on",
): Promise<FormStateType> => {
  // 1. Password correctness checking
  const isPasswordTrue = await verifyHash(enteredPassword, hashedPassword);
  if (!isPasswordTrue) {
    return {
      status: FormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        password: { errors: [AuthMessages.Error.SigninIncorrectData] },
      },
    };
  }

  // 2. Create user sessions and redirect to dashboard
  const sessionCreationResult = await AuthService.createUserSessions(username, remember);
  if (!sessionCreationResult) return catchErrorFormState;

  await OtpService.deleteOTPs(phoneNumber);

  return {
    status: FormStatusTypes.Success,
    toastNeed: true,
    toastMessage: AuthMessages.Success.CompleteSignin,
    redirectNeed: true,
    redirectPath: "/dashboard",
  };
};

export const SigninService = {
  signinUser,
} as const;
