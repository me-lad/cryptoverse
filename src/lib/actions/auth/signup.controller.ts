// 📌 Directives
'use server';
import 'server-only';

// 📦 Third-Party imports
import { treeifyError } from 'zod';

// 📦 Internal imports
import type { FormStateT, SignupFormDataT } from '~types/form';
import { SignupFormSchema } from './signup.validator';
import { connectToDB } from '~configs/mongoose';
import { AuthMessages } from '~constants/messages';
import { catchErrorFormState, FormStatusKinds } from '~constants/form';
import { UserServices } from '~services/user';
import { BlockedNumberServices } from '~services/blockedNumber';
import { sanitizeFormData } from '~helpers/sanitize';
import { SignupService } from './signup.service';

export async function signup(
  state: FormStateT,
  formData: FormData,
): Promise<FormStateT> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SignupFormDataT = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SignupFormDataT>(data);

  // 3. Form validation
  const validatedFields = SignupFormSchema.safeParse(sanitizedData);
  if (!validatedFields.success) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: treeifyError(validatedFields.error).properties,
    };
  }

  try {
    // DB connection ensure
    await connectToDB();

    // 4. Check phone number to be unblocked
    const phoneNumberBlockStatus = await BlockedNumberServices.checkBlockStatus(
      validatedFields.data.phoneNumber,
    );
    if (phoneNumberBlockStatus === 'Blocked') {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: AuthMessages.Error.VerificationPermanentLimit,
      };
    }

    // 5. Check user existence in DB (phone number | username)
    const userExistence = await UserServices.getUserDataByIdentifier(
      validatedFields.data.username,
    );
    if (userExistence) {
      const returningObject: FormStateT = {
        status: FormStatusKinds.Error,
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
    console.log('Error in signup controller ->', err);
    return catchErrorFormState;
  }
}
