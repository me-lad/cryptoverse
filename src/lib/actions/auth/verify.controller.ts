// Directives
"use server";
import "server-only";

// Local imports
import type { VerifyFormDataType, FormStateType } from "~types/form";
import { AuthMessages } from "~constants/messages";
import { sanitizeFormData } from "~helpers/sanitize";
import { FormStatusTypes } from "~constants/forms";
import { VerifyService } from "./verify.service";

export async function verify(state: FormStateType, formData: FormData): Promise<FormStateType> {
  // 1. Get form fields
  // @ts-expect-error
  const data: VerifyFormDataType = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<VerifyFormDataType>(data);

  // 3. Form validation
  if (!sanitizedData.code || !sanitizedData.username) {
    return {
      status: FormStatusTypes.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: AuthMessages.Error.DataLack,
    };
  }

  const { username, code } = sanitizedData;

  return await VerifyService.doVerify(username, code);
}
