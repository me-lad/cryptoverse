// Auth route group
export const AuthFormTypes = {
  Signin: "Signin",
  Signup: "Signup",
  ResetPassword: "ResetPassword",
  Verify: "Verify",
} as const;
export type AuthFormTypesType = (typeof AuthFormTypes)[keyof typeof AuthFormTypes];

export const AuthFormFieldTypes = {
  Text: "text",
  Password: "password",
  Phone: "tel",
} as const;
export type AuthFormFieldTypesType = (typeof AuthFormFieldTypes)[keyof typeof AuthFormFieldTypes];

export const AuthFormFieldNames = {
  Username: "username",
  PhoneNumber: "phoneNumber",
  Password: "password",
  PasswordRepeat: "passwordRepeat",
  Identifier: "identifier",
  Code: "code",
} as const;
export type AuthFormFieldNamesType = (typeof AuthFormFieldNames)[keyof typeof AuthFormFieldNames];

export type AuthFormFieldType = {
  id: number;
  name: AuthFormFieldNamesType;
  type: AuthFormFieldTypesType;
  placeholder: string;
};

export const AuthFormStatusTypes = {
  Success: "Success",
  Error: "Error",
} as const; // Prerequisites for AuthFormStateType

type AuthFormStateRedirectConfig =
  | { redirectNeed: true; redirectPath: string }
  | { redirectNeed: false }; // Prerequisites for AuthFormStateType

type AuthFormStateToastConfig = { toastNeed: true; toastMessage: string } | { toastNeed: false }; // Prerequisites for AuthFormStateType

export type AuthFormStateType = {
  status: (typeof AuthFormStatusTypes)[keyof typeof AuthFormStatusTypes];
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
} & AuthFormStateRedirectConfig &
  AuthFormStateToastConfig;

export type AuthFormContextType = {
  state: AuthFormStateType;
  pending: boolean;
  activeForm?: AuthFormTypesType;
  verifyForm: {
    otp: string;
    setOtp: (value: string) => void;
  };
  resetPasswordForm: {
    formStep: "1" | "2";
    setFormStep: (step: "1" | "2") => void;
  };
};

export type SignupFormDataType = {
  username: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
};

export type SigninFormDataType = {
  identifier: string;
  password: string;
  remember?: "on";
};

export type VerifyFormDataType = {
  code: string;
  username: string;
};

export type ResetPasswordFormDataType = {
  identifier: string;
  code: string;
  password: string;
  passwordRepeat: string;
  formStep: "1" | "2";
};

export type UserOtpCheckerResultType =
  | { status: "Allowed" }
  | { status: "Waiting"; referenceTime: Date; isTemporaryLimit?: true }
  | { status: "Limited" }
  | { status: "Error"; message: string };

export type OtpResendResultType =
  | { success: true; newReferenceTime: Date }
  | {
      success: false;
      message: string;
      refreshNeed?: true;
      isTemporaryLimit?: true;
      referenceTime?: Date;
    };
