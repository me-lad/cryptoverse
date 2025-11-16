// 📦 imports
import { Messages } from '~constants/messages';
import { buildRandomID } from '~helpers/generators';
import type { FormFieldT } from '~types/form';
import type { FormStateT } from '~types/form';

// Prerequisites
export const FormKinds = {
  Signin: 'Signin',
  Signup: 'Signup',
  ResetPassword: 'ResetPassword',
  Verify: 'Verify',
} as const;

export const FormFieldKinds = {
  Text: 'text',
  Password: 'password',
  Phone: 'tel',
} as const;

export const FormFieldNames = {
  Username: 'username',
  PhoneNumber: 'phoneNumber',
  Password: 'password',
  PasswordRepeat: 'passwordRepeat',
  Identifier: 'identifier',
  Code: 'code',
} as const;

export const FormStatusKinds = {
  Success: 'Success',
  Error: 'Error',
} as const;

// States
export const initialFormState: FormStateT = {
  status: FormStatusKinds.Error,
  redirectNeed: false,
  toastNeed: false,
};

export const catchErrorFormState: FormStateT = {
  status: FormStatusKinds.Error,
  redirectNeed: false,
  toastNeed: true,
  toastMessage: Messages.Error.CatchHandler,
};

// Fields
export const signupFormFields: FormFieldT[] = [
  {
    id: buildRandomID(),
    name: FormFieldNames.Username,
    type: FormFieldKinds.Text,
    placeholder: 'Username',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.PhoneNumber,
    type: FormFieldKinds.Phone,
    placeholder: 'Phone Number',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldKinds.Password,
    placeholder: 'Password',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.PasswordRepeat,
    type: FormFieldKinds.Password,
    placeholder: 'Repeat Password',
  },
];

export const signinFormFields: FormFieldT[] = [
  {
    id: buildRandomID(),
    name: FormFieldNames.Identifier,
    type: FormFieldKinds.Text,
    placeholder: 'Username | Phone Number',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldKinds.Password,
    placeholder: 'Password',
  },
];

export const resetPasswordFormFields: (FormFieldT & {
  formStep: '1' | '2';
})[] = [
  {
    id: buildRandomID(),
    name: FormFieldNames.Identifier,
    type: FormFieldKinds.Text,
    placeholder: 'Username | Phone Number',
    formStep: '1',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.Code,
    type: FormFieldKinds.Phone,
    placeholder: 'Received code',
    formStep: '2',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldKinds.Password,
    placeholder: 'New password',
    formStep: '2',
  },
  {
    id: buildRandomID(),
    name: FormFieldNames.PasswordRepeat,
    type: FormFieldKinds.Password,
    placeholder: 'New password Repeat',
    formStep: '2',
  },
];
