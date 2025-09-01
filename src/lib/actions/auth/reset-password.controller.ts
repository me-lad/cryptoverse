// Directives
"use server";
import "server-only";

// Packages imports

// Local imports
import {
  AuthFormStatusTypes,
  type AuthFormStateType,
  type ResetPasswordFormDataType,
} from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { UserModelTypeWithID } from "@/lib/models/User/types";
import { OtpModelTypeWithID } from "@/lib/models/Otp/types";
import { makeRandomCode, minutesToMillisecond } from "@/lib/helpers";
import { connectToDB } from "@/lib/configs/mongoose";
import UserModel from "@/lib/models/User";
import OtpModel from "@/lib/models/Otp";
import AuthService from "./auth.service";

export async function resetPassword(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: ResetPasswordFormDataType = Object.fromEntries(formData);

  // 2. Check the reset process step
  if (!data.formStep)
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: "Something went wrong during the process. :((",
    };

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
    const userData: UserModelTypeWithID | null = await UserModel.model.findOne({
      $or: [{ username: data.identifier }, { phoneNumber: data.identifier }],
    });
    if (!userData || !userData.isVerified) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage:
          "Something went wrong during the process. ( if you have an unverified account, please verify it first or after 24 hours form account creation create another account with your data. )",
      };
    }

    // 5. Find related otp data
    let otpData: OtpModelTypeWithID | null = await OtpModel.model.findOne({
      $and: [{ phoneNumber: userData.phoneNumber }, { usage: "ResetPassword" }],
    });

    if (!otpData) {
      try {
        const data = {
          code: makeRandomCode(),
          phoneNumber: userData.phoneNumber,
          failedAttemptCount: 0,
          restrictionStatus: "No-Restriction",
          usage: "ResetPassword",
        };

        await AuthService.sendOtp(userData.phoneNumber, data.code);

        otpData = await OtpModel.model.create({
          ...data,
          lastSendTime: Date.now(),
          expiresAt: Date.now() + minutesToMillisecond(3),
        });

        return {
          status: AuthFormStatusTypes.Success,
          redirectNeed: true,
          redirectPath: "2",
          toastNeed: true,
          toastMessage:
            "Verification code sent to your phone. pls use that and continue the process.",
        };
      } catch (err) {
        console.log("Something went wrong at sending verification code :(( =>", err);
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: true,
          toastMessage:
            "Something went wrong in sending verification code. please check your network connection and try again.",
        };
      }
    }
  }

  if (data.formStep === "2") {
  }
}
