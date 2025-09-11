// imports
import { AuthMessages } from "~constants/messages";
import { makeRandomID } from "~helpers/generators";
import type { FormFieldType } from "~types/form";
import type { FormStateType } from "~types/form";

// Prerequisites
export const FormTypes = {
  Signin: "Signin",
  Signup: "Signup",
  ResetPassword: "ResetPassword",
  Verify: "Verify",
} as const;

export const FormFieldTypes = {
  Text: "text",
  Password: "password",
  Phone: "tel",
} as const;

export const FormFieldNames = {
  Username: "username",
  PhoneNumber: "phoneNumber",
  Password: "password",
  PasswordRepeat: "passwordRepeat",
  Identifier: "identifier",
  Code: "code",
} as const;

export const FormStatusTypes = {
  Success: "Success",
  Error: "Error",
} as const;

// States
export const initialFormState: FormStateType = {
  status: FormStatusTypes.Error,
  redirectNeed: false,
  toastNeed: false,
};

export const catchErrorFormState: FormStateType = {
  status: FormStatusTypes.Error,
  redirectNeed: false,
  toastNeed: true,
  toastMessage: AuthMessages.Error.CatchHandler,
};

// Fields
export const signupFormFields: FormFieldType[] = [
  {
    id: makeRandomID(),
    name: FormFieldNames.Username,
    type: FormFieldTypes.Text,
    placeholder: "Username",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.PhoneNumber,
    type: FormFieldTypes.Phone,
    placeholder: "Phone Number",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldTypes.Password,
    placeholder: "Password",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.PasswordRepeat,
    type: FormFieldTypes.Password,
    placeholder: "Repeat Password",
  },
];

export const signinFormFields: FormFieldType[] = [
  {
    id: makeRandomID(),
    name: FormFieldNames.Identifier,
    type: FormFieldTypes.Text,
    placeholder: "Username | Phone Number",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldTypes.Password,
    placeholder: "Password",
  },
];

export const resetPasswordFormFields: (FormFieldType & {
  formStep: "1" | "2";
})[] = [
  {
    id: makeRandomID(),
    name: FormFieldNames.Identifier,
    type: FormFieldTypes.Text,
    placeholder: "Username | Phone Number",
    formStep: "1",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.Code,
    type: FormFieldTypes.Phone,
    placeholder: "Received code",
    formStep: "2",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.Password,
    type: FormFieldTypes.Password,
    placeholder: "New password",
    formStep: "2",
  },
  {
    id: makeRandomID(),
    name: FormFieldNames.PasswordRepeat,
    type: FormFieldTypes.Password,
    placeholder: "New password Repeat",
    formStep: "2",
  },
];
