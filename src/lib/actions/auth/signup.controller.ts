// Directives
"use server";
import "server-only";

// Packages imports
import { treeifyError } from "zod";

// Local imports
import { type SignupFormDataType, type AuthFormStateType, AuthFormStatusTypes } from "@/lib/types";
import { SignupFormSchema } from "./signup.validator";
import { connectToDB } from "@/lib/configs/mongoose";
import { AuthMessages } from "./auth.messages";
import SignupService from "./signup.service";
import UserModel from "@/lib/models/User";
import BlockedNumberModel from "@/lib/models/BlockedNumber";

export async function signup(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SignupFormDataType = Object.fromEntries(formData);

  // 2. Form validation
  const validatedFields = SignupFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: treeifyError(validatedFields.error).properties,
    };
  }

  try {
    // DB connection ensure
    await connectToDB();
    await UserModel.model.init();
    await BlockedNumberModel.model.init();

    // 3. Check phone number to be unblocked
    const isPhoneNumberBlocked = await BlockedNumberModel.model.findOne({
      phoneNumber: data.phoneNumber,
    });
    if (isPhoneNumberBlocked) {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerificationPermanentLimit,
      };
    }

    // 4. Check user existence in DB (phone number | username)
    const userExistence = await UserModel.model.findOne({
      $or: [{ username: data.username }, { phoneNumber: data.phoneNumber }],
    });
    if (userExistence) {
      if (userExistence.phoneNumber === data.phoneNumber) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: {
            phoneNumber: {
              errors: [AuthMessages.Error_DuplicatePhoneNumber],
            },
          },
        };
      }
      if (userExistence.username === data.username) {
        return {
          status: AuthFormStatusTypes.Error,
          redirectNeed: false,
          toastNeed: false,
          properties: {
            username: {
              errors: [AuthMessages.Error_DuplicateUsername],
            },
          },
        };
      }
    }

    // 5. Create user in DB
    return await SignupService.createUser(data.username, data.phoneNumber, data.password);
  } catch (err) {
    console.log("Error in signup controller ->", err);
    return {
      status: AuthFormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error_CatchHandler,
    };
  }
}
