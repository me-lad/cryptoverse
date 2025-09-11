// Directives
"use server";
import "server-only";

// Local imports
import type { SigninFormDataType, FormStateType } from "~types/form";
import { AuthMessages } from "~constants/messages";
import { connectToDB } from "@/lib/configs/mongoose";
import { catchErrorFormState, FormStatusTypes } from "~constants/forms";
import { sanitizeFormData } from "~helpers/sanitize";
import { UserService } from "~services/user.service";
import { SigninService } from "./signin.service";

export async function signin(state: FormStateType, formData: FormData): Promise<FormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SigninFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SigninFormDataType>(data);

  // 3. Form validation
  if (!sanitizedData.identifier && !sanitizedData.password) {
    return {
      status: FormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        identifier: {
          errors: [AuthMessages.Error.FieldEmpty],
        },
        password: {
          errors: [AuthMessages.Error.FieldEmpty],
        },
      },
    };
  }
  if (!sanitizedData.identifier) {
    return {
      status: FormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        identifier: {
          errors: [AuthMessages.Error.FieldEmpty],
        },
      },
    };
  }
  if (!sanitizedData.password) {
    return {
      status: FormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        password: {
          errors: [AuthMessages.Error.FieldEmpty],
        },
      },
    };
  }

  try {
    // 4. Get user DB document
    await connectToDB();

    const userData = await UserService.getUserDataByIdentifier(sanitizedData.identifier);

    if (!userData) {
      return {
        status: FormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          password: {
            errors: [AuthMessages.Error.SigninIncorrectData],
          },
        },
      };
    }

    if (!userData?.isVerified) {
      return {
        status: FormStatusTypes.Error,
        redirectNeed: true,
        redirectPath: `/auth/verify?username=${userData?.username}`,
        toastNeed: true,
        toastMessage: AuthMessages.Error.SigninNotVerifiedAccount,
      };
    }

    if (userData.isRestricted) {
      return {
        status: FormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.SigninWithRestrictedAccount,
      };
    }

    return SigninService.signinUser(
      userData.username,
      userData.phoneNumber,
      sanitizedData.password,
      userData.password,
      sanitizedData?.remember,
    );
  } catch (err) {
    console.log("Error in signin controller ->", err);
    return catchErrorFormState;
  }
}
