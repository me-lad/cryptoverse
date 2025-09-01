// Directives
"use server";
import "server-only";

// Local imports
import { AuthFormStatusTypes, type AuthFormStateType, type VerifyFormDataType } from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { isDatePassedTime } from "@/lib/helpers";
import { connectToDB } from "@/lib/configs/mongoose";
import UserModel from "@/lib/models/User";
import OtpModel from "@/lib/models/Otp";
import AuthService from "./auth.service";

export async function verify(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: VerifyFormDataType = Object.fromEntries(formData);

  // 2. Form validation
  if (!data.code || !data.username) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error_DataLack,
    };
  }

  try {
    await connectToDB();
    const { code, username } = data;

    // 3. Find user data to access phone number
    const userData = await UserModel.model.findOne(
      { username },
      "phoneNumber isVerified isRestricted",
    );
    if (!userData || userData.isVerified || userData.isRestricted) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_InvalidUsername,
      };
    }

    // 4. Find the last send otp data
    const { phoneNumber } = userData;

    const lastOtpData = await OtpModel.model.findOne({ phoneNumber }).sort({ createdAt: -1 });
    if (!lastOtpData || !lastOtpData.createdAt) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_CatchHandler,
      };
    }

    // 5. Check code use time passed and usage count passed
    const isCodeUseTimePassed = isDatePassedTime(lastOtpData.createdAt, 2);
    const isCodeUsageCountPassed = lastOtpData.usageCount >= 3;
    if (isCodeUseTimePassed || isCodeUsageCountPassed) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerifyCodeExpire,
      };
    }

    // 6. Checking the correctness of the input code
    if (lastOtpData.code !== code) {
      lastOtpData.usageCount += 1;
      await lastOtpData.save();

      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerificationIncorrectCode,
      };
    }

    if (lastOtpData.code === code) {
      // .7 Create user sessions
      const sessionsCreationResult = await AuthService.createUserSessions(username);

      // 8. Return state and redirect to dashboard
      if (sessionsCreationResult) {
        // Change user status to verified
        userData.isVerified = true;
        await userData.save();

        // Delete all otp documents related to the user
        await OtpModel.model.deleteMany({ phoneNumber });

        return {
          status: AuthFormStatusTypes.Success,
          toastNeed: true,
          toastMessage: AuthMessages.Success_CompleteVerify,
          redirectNeed: true,
          redirectPath: "/dashboard",
        };
      }
    }

    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error_CatchHandler,
    };
  } catch (err) {
    console.log("Error in verify controller ->", err);
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error_CatchHandler,
    };
  }
}
