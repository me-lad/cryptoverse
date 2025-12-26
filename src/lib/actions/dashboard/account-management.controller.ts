// 📌 Directives
'use server';

// 📦 Third-Party imports
import { treeifyError } from 'zod';

// 📦 Internal imports
import { sanitizeFormData } from '~helpers/sanitize';
import { Messages } from '~constants/messages';
import { UserServices } from '~services/repositories/user';
import { SessionServices } from '~services/repositories/session';
import { deleteCookie, getCookie } from '~helpers/cookies';
import {
  AccountManagementFormSchema_Email,
  AccountManagementFormSchema_FullName,
  AccountManagementFormSchema_Username,
} from './account-management.validator';
import type {
  AccountManagementFormState,
  AccountManagementFormData,
} from './local';
import UserModel from '~models/User';

export async function editAccount(
  state: AccountManagementFormState,
  formData: FormData,
): Promise<AccountManagementFormState> {
  // 1. Get form fields
  const data: AccountManagementFormData = Object.fromEntries(formData);

  // 2. Sanitize form
  const sanitizedData = sanitizeFormData<AccountManagementFormData>(data);

  if (!sanitizedData.identifier) {
    return { status: 'Error', message: Messages.Error.CatchHandler };
  }

  const userData = await UserServices.getUserDataByIdentifier(
    sanitizedData.identifier,
    'email fullName username id',
  );

  if (!userData) {
    return { status: 'Error', message: Messages.Error.CatchHandler };
  }

  if (sanitizedData.email) {
    const validatedFields =
      AccountManagementFormSchema_Email.safeParse(sanitizedData);

    if (!validatedFields.success) {
      const message = treeifyError(validatedFields.error).properties?.email
        ?.errors[0];

      return {
        status: 'Error',
        message: message || Messages.Error.CatchHandler,
      };
    } else {
      if (sanitizedData.email === userData.email) {
        return {
          status: 'Error',
          message: 'Please give a new value for this field',
        };
      }

      const isAnyUserExistWithEmail = await UserModel.model.findOne({
        email: sanitizedData.email,
      });

      if (!!isAnyUserExistWithEmail) {
        return {
          status: 'Error',
          message:
            'This email has already exist in our database for another account. if you sure this email is for you, contact to our support for setting email address',
        };
      }

      await userData?.updateOne({ $set: { email: sanitizedData.email } });
      return {
        status: 'Success',
        message: 'Email has changed successfully :))',
      };
    }
  }

  if (sanitizedData.fullName) {
    const validatedFields =
      AccountManagementFormSchema_FullName.safeParse(sanitizedData);

    if (!validatedFields.success) {
      const message = treeifyError(validatedFields.error).properties?.fullName
        ?.errors[0];

      return {
        status: 'Error',
        message: message || Messages.Error.CatchHandler,
      };
    } else {
      if (sanitizedData.fullName === userData.fullName) {
        return {
          status: 'Error',
          message: 'Please give a new value for this field',
        };
      }

      await userData?.updateOne({ $set: { fullName: sanitizedData.fullName } });
      return {
        status: 'Success',
        message: 'Your name has changed successfully :))',
      };
    }
  }

  if (sanitizedData.username) {
    const validatedFields =
      AccountManagementFormSchema_Username.safeParse(sanitizedData);

    if (!validatedFields.success) {
      const message = treeifyError(validatedFields.error).properties?.username
        ?.errors[0];

      return {
        status: 'Error',
        message: message || Messages.Error.CatchHandler,
      };
    } else {
      if (sanitizedData.username === userData.username) {
        return {
          status: 'Error',
          message: 'Please give a new value for this field',
        };
      }

      const isAnyUserExistWithUsername =
        await UserServices.getUserDataByIdentifier(sanitizedData.username);

      if (!!isAnyUserExistWithUsername) {
        return {
          status: 'Error',
          message: 'This username has already been taken. choose another one.',
        };
      }

      await userData?.updateOne({ $set: { username: sanitizedData.username } });
      await SessionServices.deleteAllSessions(userData.id);
      await UserServices.deleteAllSessions(userData.id);
      await deleteCookie('access_token');
      await deleteCookie('refresh_token');

      return {
        status: 'Success',
        message: 'Username has changed successfully :))',
      };
    }
  }

  return {
    status: 'Error',
    message: 'Please give the propriate value to change',
  };
}
