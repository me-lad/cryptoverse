// Directives
"use server";
import "server-only";

// Packages imports
import { treeifyError } from "zod";

// Local imports
import type { FormStateType, SignupFormDataType } from "~types/form";
import { SignupFormSchema } from "./signup.validator";
import { connectToDB } from "@/lib/configs/mongoose";
import { AuthMessages } from "~constants/messages";
import { catchErrorFormState, FormStatusTypes } from "~constants/forms";
import { UserService } from "~services/user.service";
import { BlockedNumberService } from "~services/blockedNumber.service";
import { sanitizeFormData } from "~helpers/sanitize";
import { SignupService } from "./signup.service";

export async function signup(state: FormStateType, formData: FormData): Promise<FormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SignupFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SignupFormDataType>(data);

  // 3. Form validation
  const validatedFields = SignupFormSchema.safeParse(sanitizedData);
  if (!validatedFields.success) {
    return {
      status: FormStatusTypes.Error,
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
        status: FormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.VerificationPermanentLimit,
      };
    }

    // 5. Check user existence in DB (phone number | username)
    const userExistence = await UserService.getUserDataByIdentifier(validatedFields.data.username);
    if (userExistence) {
      const returningObject: FormStateType = {
        status: FormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {},
      };

      if (userExistence.phoneNumber === validatedFields.data.phoneNumber) {
        returningObject.properties!.phoneNumber = {
          errors: [AuthMessages.Error.DuplicatePhoneNumber],
        };
      } else {
        returningObject.properties!.username = {
          errors: [AuthMessages.Error.DuplicateUsername],
        };
      }

      return returningObject;
    }

    // 6. Create user in DB
    return await SignupService.signupUser(
      validatedFields.data.username,
      validatedFields.data.phoneNumber,
      validatedFields.data.password,
    );
  } catch (err) {
    console.log("Error in signup controller ->", err);
    return catchErrorFormState;
  }
}
