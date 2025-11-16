// 📌 Directives
'use server';
import 'server-only';

// 📦 Internal imports
import type { VerifyFormDataT, FormStateT } from '~types/form';
import { Messages } from '~constants/messages';
import { sanitizeFormData } from '~helpers/sanitize';
import { FormStatusKinds } from '~constants/form';
import { VerifyService } from './verify.service';

export async function verify(
  state: FormStateT,
  formData: FormData,
): Promise<FormStateT> {
  // 1. Get form fields
  // @ts-expect-error
  const data: VerifyFormDataT = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<VerifyFormDataT>(data);

  // 3. Form validation
  if (!sanitizedData.code || !sanitizedData.username) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: true,
      toastMessage: Messages.Error.DataLack,
    };
  }

  const { username, code } = sanitizedData;

  return await VerifyService.doVerify(username, code);
}
