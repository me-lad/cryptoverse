// 📌 Directives
'use server';
import 'server-only';

// 📦 Internal imports
import type { SigninFormDataT, FormStateT } from '~types/form';
import { Messages } from '~constants/messages';
import { connectToDB } from '~vendors/mongoose';
import { catchErrorFormState, FormStatusKinds } from '~constants/form';
import { sanitizeFormData } from '~helpers/sanitize';
import { UserServices } from '~services/repositories/user';
import { SigninService } from './signin.service';

export async function signin(
  state: FormStateT,
  formData: FormData,
): Promise<FormStateT> {
  // 1. Get form fields
  // @ts-expect-error
  const data: SigninFormDataT = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<SigninFormDataT>(data);

  // 3. Form validation
  if (!sanitizedData.identifier && !sanitizedData.password) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        identifier: {
          errors: [Messages.Error.FieldEmpty],
        },
        password: {
          errors: [Messages.Error.FieldEmpty],
        },
      },
    };
  }
  if (!sanitizedData.identifier) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        identifier: {
          errors: [Messages.Error.FieldEmpty],
        },
      },
    };
  }
  if (!sanitizedData.password) {
    return {
      status: FormStatusKinds.Error,
      redirectNeed: false,
      toastNeed: false,
      properties: {
        password: {
          errors: [Messages.Error.FieldEmpty],
        },
      },
    };
  }

  try {
    // 4. Get user DB document
    await connectToDB();

    const userData = await UserServices.getUserDataByIdentifier(
      sanitizedData.identifier,
    );

    if (!userData) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: false,
        properties: {
          password: {
            errors: [Messages.Error.SigninIncorrectData],
          },
        },
      };
    }

    if (!userData?.isVerified) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: true,
        redirectPath: `/auth/verify?username=${userData?.username}`,
        toastNeed: true,
        toastMessage: Messages.Error.SigninNotVerifiedAccount,
      };
    }

    if (userData.isRestricted) {
      return {
        status: FormStatusKinds.Error,
        redirectNeed: false,
        toastNeed: true,
        toastMessage: Messages.Error.SigninWithRestrictedAccount,
      };
    }

    return SigninService.signinUser(
      userData.username,
      userData.phoneNumber,
      sanitizedData.password,
      userData.password,
      sanitizedData?.remember,
    );
  } catch (err) {
    return catchErrorFormState;
  }
}
