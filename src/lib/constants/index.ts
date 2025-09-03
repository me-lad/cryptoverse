import { AuthMessages } from "../actions/auth/auth.messages";
import { makeRandomID } from "../helpers";
import {
  type AuthFormFieldType,
  type AuthFormStateType,
  AuthFormFieldNames,
  AuthFormFieldTypes,
  AuthFormStatusTypes,
} from "../types";

// Globals
export const footerLessRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/verify",
];
export const headerLessRoutes = [...footerLessRoutes];

// Auth Route group
export const initialFormState: AuthFormStateType = {
  status: AuthFormStatusTypes.Error,
  redirectNeed: false,
  toastNeed: false,
};

export const catchErrorFormState: AuthFormStateType = {
  status: AuthFormStatusTypes.Error,
  redirectNeed: false,
  toastNeed: true,
  toastMessage: AuthMessages.Error_CatchHandler,
};

export const signupFormFields: AuthFormFieldType[] = [
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Username,
    type: AuthFormFieldTypes.Text,
    placeholder: "Username",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.PhoneNumber,
    type: AuthFormFieldTypes.Phone,
    placeholder: "Phone Number",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Password,
    type: AuthFormFieldTypes.Password,
    placeholder: "Password",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.PasswordRepeat,
    type: AuthFormFieldTypes.Password,
    placeholder: "Repeat Password",
  },
];

export const signinFormFields: AuthFormFieldType[] = [
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Identifier,
    type: AuthFormFieldTypes.Text,
    placeholder: "Username | Phone Number",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Password,
    type: AuthFormFieldTypes.Password,
    placeholder: "Password",
  },
];

export const resetPasswordFormFields: (AuthFormFieldType & {
  formStep: "1" | "2";
})[] = [
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Identifier,
    type: AuthFormFieldTypes.Text,
    placeholder: "Username | Phone Number",
    formStep: "1",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Code,
    type: AuthFormFieldTypes.Phone,
    placeholder: "Received code",
    formStep: "2",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.Password,
    type: AuthFormFieldTypes.Password,
    placeholder: "New password",
    formStep: "2",
  },
  {
    id: makeRandomID(),
    name: AuthFormFieldNames.PasswordRepeat,
    type: AuthFormFieldTypes.Password,
    placeholder: "New password Repeat",
    formStep: "2",
  },
];

export const restrictionThresholds = [3, 6, 9, 10];
