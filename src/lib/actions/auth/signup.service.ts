// Directives
import "server-only";

// Local imports
import type { UserModelType } from "@/lib/models/User/types";
import { AuthFormStatusTypes, type AuthFormStateType } from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { AuthService } from "./auth.service";
import { connectToDB } from "@/lib/configs/mongoose";
import UserModel from "@/lib/models/User";

class SignupService extends AuthService {
  constructor() {
    super();
  }

  async createUser(
    username: string,
    phoneNumber: string,
    password: string,
  ): Promise<AuthFormStateType> {
    try {
      await connectToDB();

      // 1. Hash password
      const hashedPassword = await this.passwordHasher(password);

      // 2. Check DB user collection length to set user role
      const usersCollectionLength = await UserModel.model.countDocuments({});

      // 3. Create user index in DB (isVerified: false)
      const userData: UserModelType = {
        username,
        phoneNumber,
        password: hashedPassword,
        isVerified: usersCollectionLength === 0 ? true : false,
        isRestricted: false,
        role: usersCollectionLength === 0 ? "ADMIN" : "USER",
      };
      const createdUser = await UserModel.model.create(userData);

      // 4. Return propriate result
      return {
        status: AuthFormStatusTypes.Success,
        toastNeed: true,
        toastMessage: AuthMessages.Success_CompleteSignup,
        redirectNeed: true,
        redirectPath: createdUser.isVerified
          ? "/auth/signin"
          : `/auth/verify?username=${createdUser.username}`,
      };
    } catch (err) {
      console.log("Error in Signup services", err);
      return {
        status: AuthFormStatusTypes.Error,
        toastNeed: true,
        toastMessage: AuthMessages.Error_CatchHandler,
        redirectNeed: false,
      };
    }
  }
}

export default new SignupService();
