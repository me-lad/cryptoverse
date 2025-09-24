// 📌 Directives
'use server';

// 📦 Internal imports
import type { SupportMessageType } from '~models/SupportMessage/types';
import { sanitizeFormData } from '~helpers/sanitize';
import { SupportService } from './support.service';
import { validateFields } from './support.validator';
import type { MessageSendResultT } from '~types/support';

// ⚙️ Server action
export async function sendMessage(
  state: SupportMessageType,
  formData: FormData,
): Promise<MessageSendResultT> {
  // 1. Get form fields
  // @ts-expect-error
  const rawData: SupportMessageType = Object.fromEntries(formData);
  const data: SupportMessageType = {
    firstName: rawData.firstName,
    lastName: rawData.lastName,
    email: rawData.email,
    message: rawData.message,
  };

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SupportMessageType>(data);

  // 3. Validation
  const validationErrors = validateFields(sanitizedData);
  if (Object.keys(validationErrors).length > 0) {
    return { success: false, properties: validationErrors };
  }

  // 4. Create message in DB
  const creationResult = await SupportService.createMessage(sanitizedData);

  if (!creationResult) {
    return {
      success: false,
      errMessage:
        'Something went wrong during the process. Please check your connection and try again later. ',
    };
  }

  return {
    success: true,
    message:
      'Your message has been successfully submitted. We will respond to your email shortly.',
  };
}
