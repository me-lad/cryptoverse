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
import { catchErrorFormState } from "@/lib/constants";
import SignupService from "./signup.service";
import UserService from "@/lib/services/UserService";
import BlockedNumberService from "@/lib/services/BlockedNumberService";
import { sanitizeFormData } from "@/lib/helpers";

export async function signup(
  state: AuthFormStateType,
  formData: FormData,
): Promise<AuthFormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SignupFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SignupFormDataType>(data);

  // 3. Form validation
  const validatedFields = SignupFormSchema.safeParse(sanitizedData);
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

    // 4. Check phone number to be unblocked
    const phoneNumberBlockStatus = await BlockedNumberService.checkBlockStatus(
      validatedFields.data.phoneNumber,
    );
    if (phoneNumberBlockStatus === "Blocked") {
      return {
        status: AuthFormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error_VerificationPermanentLimit,
      };
    }

    // 5. Check user existence in DB (phone number | username)
    let userExistence = await UserService.getUserData(validatedFields.data.username);
    if (!userExistence) await UserService.getUserData(validatedFields.data.phoneNumber);
    if (userExistence) {
      if (userExistence.phoneNumber === validatedFields.data.phoneNumber) {
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
      if (userExistence.username === validatedFields.data.username) {
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

    // 6. Create user in DB
    return await SignupService.createUser(
      validatedFields.data.username,
      validatedFields.data.phoneNumber,
      validatedFields.data.password,
    );
  } catch (err) {
    console.log("Error in signup controller ->", err);
    return catchErrorFormState;
  }
}
