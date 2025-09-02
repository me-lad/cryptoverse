// Local imports
import { AuthFormStatusTypes, type AuthFormStateType } from "@/lib/types";
import { AuthService } from "./auth.service";
import { AuthMessages } from "./auth.messages";
import OtpModel from "@/lib/models/Otp";

class SigninService extends AuthService {
  constructor() {
    super();
  }

  async signinUser(
    username: string,
    phoneNumber: string,
    enteredPassword: string,
    hashedPassword: string,
    remember?: true,
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
    if (!sessionCreationResult) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_CatchHandler,
      };
    }

    await OtpModel.model.init();
    await OtpModel.model.deleteMany({ phoneNumber });

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
