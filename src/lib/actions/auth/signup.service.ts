// Directives
import "server-only";

// Local imports
import type { UserModelType } from "@/lib/models/User/types";
import type { FormStateType } from "~types/form";
import { AuthMessages } from "~constants/messages";
import { connectToDB } from "@/lib/configs/mongoose";
import { catchErrorFormState, FormStatusTypes } from "~constants/forms";
import { UserService } from "~services/user.service";
import { doHash } from "~helpers/hash";

const signupUser = async (
  username: string,
  phoneNumber: string,
  password: string,
): Promise<FormStateType> => {
  try {
    await connectToDB();

    // 1. Hash password
    const hashedPassword = await doHash(password);

    // 2. Determine user role based on collection length
    const usersCollectionLength = await UserService.countUsers();
    const isFirstUser = usersCollectionLength === 0;

    // 3. Prepare user data
    const userData: UserModelType = {
      username,
      phoneNumber,
      password: hashedPassword,
      isVerified: isFirstUser,
      isRestricted: false,
      role: isFirstUser ? "Admin" : "User",
    };

    // 4. Create user in DB
    const createdUser = await UserService.createUser(userData);

    // 5. Return appropriate result
    return {
      status: FormStatusTypes.Success,
      toastNeed: true,
      toastMessage: AuthMessages.Success.CompleteSignup,
      redirectNeed: true,
      redirectPath: createdUser.isVerified
        ? "/auth/signin"
        : `/auth/verify?username=${createdUser.username}`,
    };
  } catch (err) {
    console.log("Error in Signup handler", err);
    return catchErrorFormState;
  }
};

export const SignupService = {
  signupUser,
} as const;
