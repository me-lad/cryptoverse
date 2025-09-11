// Directives
"use server";
import "server-only";

// Packages imports
import { treeifyError } from "zod";

// Local imports
import type { ResetPasswordFormDataType, FormStateType } from "~types/form";
import { AuthMessages } from "~constants/messages";
import { ResetPasswordFormSchema } from "./reset-password.validator";
import { FormStatusTypes, catchErrorFormState } from "~constants/forms";
import { sanitizeFormData } from "~helpers/sanitize";
import { ResetPasswordService } from "./reset-password.service";

export async function resetPassword(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: ResetPasswordFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<ResetPasswordFormDataType>(data);

  // 3. Check the reset process step
  if (!sanitizedData.formStep) catchErrorFormState;

  if (sanitizedData.formStep === "1") {
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

    return await ResetPasswordService.sendVerificationCode(sanitizedData.identifier);
  }

  if (sanitizedData.formStep === "2") {
    // 4. Form validation
    const validatedFields = ResetPasswordFormSchema.safeParse(sanitizedData);
    if (!validatedFields.success) {
      return {
        status: FormStatusTypes.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: treeifyError(validatedFields.error).properties,
      };
    }

    if (!validatedFields.data.username) return catchErrorFormState;

    return await ResetPasswordService.doResetPassword(validatedFields.data);
  }

  return catchErrorFormState;
}
