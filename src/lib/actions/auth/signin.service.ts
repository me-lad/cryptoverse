// Local imports
import { AuthFormStatusTypes, type AuthFormStateType } from "@/lib/types";
import { AuthService } from "./auth.service";
import { AuthMessages } from "./auth.messages";
import { catchErrorFormState } from "@/lib/constants";
import OtpService from "@/lib/services/OtpService";

class SigninService extends AuthService {
  constructor() {
    super();
  }

  async signinUser(
    username: string,
    phoneNumber: string,
    enteredPassword: string,
    hashedPassword: string,
    remember?: "on",
  ): Promise<AuthFormStateType> {
    // 1. Password correctness checking
    const isPasswordTrue = await this.passwordVerifier(enteredPassword, hashedPassword);
    if (!isPasswordTrue) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          password: { errors: [AuthMessages.Error_SigninIncorrectData] },
        },
      };
    }

    // 2. Create user sessions and redirect to dashboard
    const sessionCreationResult = await this.createUserSessions(username, remember);
    if (!sessionCreationResult) return catchErrorFormState;

    await OtpService.deleteOTPs(phoneNumber);

    return {
      status: AuthFormStatusTypes.Success,
      toastNeed: true,
      toastMessage: AuthMessages.Success_CompleteSignin,
      redirectNeed: true,
      redirectPath: "/dashboard",
    };
  }
}

export default new SigninService();
