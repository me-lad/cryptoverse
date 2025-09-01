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
import UserModel from "@/lib/models/User";
import SignupService from "./signup.service";

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

    // 3. Check user existence in DB (phone number | username)
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

    // 4. Create user in DB
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
