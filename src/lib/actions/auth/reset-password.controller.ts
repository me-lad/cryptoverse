// Directives
"use server";
import "server-only";

// Packages imports
import { redirect } from "next/navigation";
import { treeifyError } from "zod";
import { Schema } from "mongoose";

// Local imports
import {
  AuthFormStatusTypes,
  type AuthFormStateType,
  type ResetPasswordFormDataType,
} from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { connectToDB } from "@/lib/configs/mongoose";
import { ResetPasswordFormSchema } from "./reset-password.validator";
import { catchErrorFormState } from "@/lib/constants";
import VerifyService from "./verify.service";
import AuthService from "./auth.service";
import OtpService from "@/lib/services/OtpService";
import UserService from "@/lib/services/UserService";
import SessionService from "@/lib/services/SessionService";

export async function resetPassword(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: ResetPasswordFormDataType = Object.fromEntries(formData);

  // 2. Check the reset process step
  if (!data.formStep) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: "Something went wrong during the process. :((",
    };
  }

  try {
    if (data.formStep === "1") {
      // 3. Form validation
      if (!data.identifier) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: {
            identifier: {
              errors: [AuthMessages.Error_FieldEmpty],
            },
          },
        };
      }

      // 4. Find user with identifier
      await connectToDB();
      const userData = await UserService.getUserData(data.identifier);
      if (!userData) return catchErrorFormState;

      if (!userData.isVerified) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: true,
          redirectPath: `/auth/verify?username=${userData.username}`,
          toastNeed: false,
        };
      }

      // 5. Find related otp data
      const userOtpStatus = await VerifyService.checkUserOtpStatus(userData.username);
      const { status } = userOtpStatus;

      if (status === "Error") return catchErrorFormState;

      if (status === "Limited") {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: true,
          toastMessage: AuthMessages.Error_VerificationPermanentLimit,
        };
      }

      if (status === "Waiting") {
        redirect(`/auth/reset-password?username=${userData.username}`);
      }

      // status === "Allowed"
      const sendResult = await VerifyService.sendOtp(userData.phoneNumber, true);

      if (sendResult) {
        redirect(`/auth/reset-password?username=${userData.username}`);
      }
    }

    if (data.formStep === "2") {
      // 3. Form validation
      const validatedFields = ResetPasswordFormSchema.safeParse(data);
      if (!validatedFields.success) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: treeifyError(validatedFields.error).properties,
        };
      }

      if (!data.username) return catchErrorFormState;

      // 4. Find user data
      const userData = await UserService.getUserData(data.username);
      if (!userData) return catchErrorFormState;

      // 5. Find otp data
      const otpData = await OtpService.getValidOtp(userData.phoneNumber);
      if (!otpData) return catchErrorFormState;

      // 6. Check code existence
      if (data.code !== otpData.code) {
        otpData.usageCount += 1;
        await otpData.save();
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: {
            code: { errors: [AuthMessages.Error_VerificationIncorrectCode] },
          },
        };
      }

      const hashedPassword = await AuthService.passwordHasher(data.password);
      userData.password = hashedPassword;
      userData.passwordChangedAt = new Date();
      userData.refreshToken = undefined;
      userData.refreshTokenExpiresAt = undefined;
      userData.sessionId = undefined;
      await userData.save();

      await SessionService.deleteSession(userData._id as Schema.Types.ObjectId);
      await OtpService.deleteOTPs(userData.phoneNumber);

      return {
        status: AuthFormStatusTypes.Success,
        redirectNeed: true,
        redirectPath: "/auth/signin",
        toastNeed: true,
        toastMessage: AuthMessages.Success_CompleteResetPassword,
      };
    }

    return catchErrorFormState;
  } catch (err: any) {
    if (!err.digest.startsWith("NEXT_REDIRECT")) {
      console.log("Error in reset password controller ->", err);
      return catchErrorFormState;
    }
    throw err; // rethrow NEXT_REDIRECT so Next.js can handle it
  }
}
