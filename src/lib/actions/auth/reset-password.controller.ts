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
import { sanitizeFormData } from "@/lib/helpers";
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

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<ResetPasswordFormDataType>(data);

  // 3. Check the reset process step
  if (!sanitizedData.formStep) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: "Something went wrong during the process. :((",
    };
  }

  try {
    if (sanitizedData.formStep === "1") {
      // 4. Form validation
      if (!sanitizedData.identifier) {
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

      // 5. Find user with identifier
      await connectToDB();
      const userData = await UserService.getUserData(sanitizedData.identifier);
      if (!userData) return catchErrorFormState;

      if (!userData.isVerified) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: true,
          redirectPath: `/auth/verify?username=${userData.username}`,
          toastNeed: false,
        };
      }

      // 6. Find related otp data
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

    if (sanitizedData.formStep === "2") {
      // 4. Form validation
      const validatedFields = ResetPasswordFormSchema.safeParse(sanitizeFormData);
      if (!validatedFields.success) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: treeifyError(validatedFields.error).properties,
        };
      }

      if (!data.username) return catchErrorFormState;

      // 5. Find user data
      const userData = await UserService.getUserData(validatedFields.data.username);
      if (!userData) return catchErrorFormState;

      // 6. Find otp data
      const otpData = await OtpService.getValidOtp(userData.phoneNumber);
      if (!otpData) return catchErrorFormState;

      // 7. Check code existence
      if (validatedFields.data.code !== otpData.code) {
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

      const hashedPassword = await AuthService.passwordHasher(validatedFields.data.password);
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
