import { FormStatusKinds } from '~constants/form';

type FormStateRedirectConfig =
  | { redirectNeed: true; redirectPath: string }
  | { redirectNeed: false }; // Prerequisites for FormStateT

type FormStateToastConfig =
  | { toastNeed: true; toastMessage: string }
  | { toastNeed: false }; // Prerequisites for FormStateT

export type FormStateT = {
  status: (typeof FormStatusKinds)[keyof typeof FormStatusKinds];
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

    // Support form
    firstName?: {
      errors: string[];
    };
    lastName?: {
      errors: string[];
    };
    email?: {
      errors: string[];
    };
    message?: {
      errors: string[];
    };
  };
} & FormStateRedirectConfig &
  FormStateToastConfig;
