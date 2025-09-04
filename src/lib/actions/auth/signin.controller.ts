// Directives
"use server";
import "server-only";

// Local imports
import { AuthFormStatusTypes, type AuthFormStateType, type SigninFormDataType } from "@/lib/types";
import { AuthMessages } from "./auth.messages";
import { connectToDB } from "@/lib/configs/mongoose";
import { catchErrorFormState } from "@/lib/constants";
import { sanitizeFormData } from "@/lib/helpers";
import SigninService from "./signin.service";
import UserService from "@/lib/services/UserService";

export async function signin(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SigninFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SigninFormDataType>(data);

  // 3. Form validation
  if (!sanitizedData.identifier && !sanitizedData.password) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        identifier: {
          errors: [AuthMessages.Error_FieldEmpty],
        },
        password: {
          errors: [AuthMessages.Error_FieldEmpty],
        },
      },
    };
  }
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
  if (!sanitizedData.password) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        password: {
          errors: [AuthMessages.Error_FieldEmpty],
        },
      },
    };
  }

  try {
    // 4. Get user DB document
    await connectToDB();

    const userData = await UserService.getUserData(sanitizedData.identifier);

    if (!userData) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          password: {
            errors: [AuthMessages.Error_SigninIncorrectData],
          },
        },
      };
    }

    if (!userData?.isVerified) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: true,
        redirectPath: `/auth/verify?username=${userData?.username}`,
        toastNeed: true,
        toastMessage: AuthMessages.Error_SigninNotVerifiedAccount,
      };
    }

    if (userData.isRestricted) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_SigninWithRestrictedAccount,
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
