import { FormStatusTypes } from "~constants/forms";

type FormStateRedirectConfig =
  | { redirectNeed: true; redirectPath: string }
  | { redirectNeed: false }; // Prerequisites for FormStateType

type FormStateToastConfig = { toastNeed: true; toastMessage: string } | { toastNeed: false }; // Prerequisites for FormStateType

export type FormStateType = {
  status: (typeof FormStatusTypes)[keyof typeof FormStatusTypes];
  properties?: {
    username?: {
      errors: string[];
    };
    phoneNumber?: {
      errors: string[];
    };
    password?: {
      errors: string[];
    };
    passwordRepeat?: {
      errors: string[];
    };
    verificationOtp?: {
      errors: string[];
    };
    identifier?: {
      errors: string[];
    };
    code?: {
      errors: string[];
    };
  };
} & FormStateRedirectConfig &
  FormStateToastConfig;
