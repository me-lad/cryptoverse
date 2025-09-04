// Directives
"use server";
import "server-only";

// Local imports
import { AuthFormStatusTypes, type AuthFormStateType, type VerifyFormDataType } from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { isDatePassedTime, sanitizeFormData } from "@/lib/helpers";
import { connectToDB } from "@/lib/configs/mongoose";
import AuthService from "./auth.service";
import OtpService from "@/lib/services/OtpService";
import UserService from "@/lib/services/UserService";
import { catchErrorFormState } from "@/lib/constants";

export async function verify(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: VerifyFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<VerifyFormDataType>(data);

  // 3. Form validation
  if (!sanitizedData.code || !sanitizedData.username) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error_DataLack,
    };
  }

  try {
    await connectToDB();
    const { code, username } = sanitizedData;

    // 4. Find user data to access phone number
    const userData = await UserService.getUserData(username);
    if (!userData || userData.isVerified || userData.isRestricted) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_InvalidUsername,
      };
    }

    // 5. Find the last send otp data
    const { phoneNumber } = userData;

    const otpData = await OtpService.getValidOtp(phoneNumber);
    if (!otpData || !otpData.createdAt) return catchErrorFormState;

    // 6. Check code use time passed and usage count passed
    const isCodeUseTimePassed = isDatePassedTime(otpData.createdAt, 2);
    const isCodeUsageCountPassed = otpData.usageCount >= 3;
    if (isCodeUseTimePassed || isCodeUsageCountPassed) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerifyCodeExpire,
      };
    }

    // 7. Checking the correctness of the input code
    if (otpData.code !== code) {
      otpData.usageCount += 1;
      await otpData.save();

      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerificationIncorrectCode,
      };
    }

    if (otpData.code === code) {
      // .7 Create user sessions
      const sessionsCreationResult = await AuthService.createUserSessions(username);

      // 8. Return state and redirect to dashboard
      if (sessionsCreationResult) {
        // Change user status to verified
        userData.isVerified = true;
        await userData.save();

        // Delete all otp documents related to the user
        await OtpService.deleteOTPs(phoneNumber);

        return {
          status: AuthFormStatusTypes.Success,
          toastNeed: true,
          toastMessage: AuthMessages.Success_CompleteVerify,
          redirectNeed: true,
          redirectPath: "/dashboard",
        };
      }
    }

    return catchErrorFormState;
  } catch (err) {
    console.log("Error in verify controller ->", err);
    return catchErrorFormState;
  }
}
