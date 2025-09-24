// 📌 Directives
'use server';
import 'server-only';

// 📦 Third-Party imports
import { treeifyError } from 'zod';

// 📦 Internal imports
import type { ResetPasswordFormDataT, FormStateT } from '~types/form';
import { AuthMessages } from '~constants/messages';
import { ResetPasswordFormSchema } from './reset-password.validator';
import { FormStatusKinds, catchErrorFormState } from '~constants/form';
import { sanitizeFormData } from '~helpers/sanitize';
import { ResetPasswordService } from './reset-password.service';

export async function resetPassword(
  state: FormStateT,
  formData: FormData,
): Promise<FormStateT> {
  // 1. Get form fields
  // @ts-expect-error
  const data: ResetPasswordFormDataT = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<ResetPasswordFormDataT>(data);

  // 3. Check the reset process step
  if (!sanitizedData.formStep) catchErrorFormState;

  if (sanitizedData.formStep === '1') {
    if (!sanitizedData.identifier) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          identifier: {
            errors: [AuthMessages.Error.FieldEmpty],
          },
        },
      };
    }

    return await ResetPasswordService.sendVerificationCode(
      sanitizedData.identifier,
    );
  }

  if (sanitizedData.formStep === '2') {
    // 4. Form validation
    const validatedFields = ResetPasswordFormSchema.safeParse(sanitizedData);
    if (!validatedFields.success) {
      return {
        status: FormStatusKinds.Error,
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
