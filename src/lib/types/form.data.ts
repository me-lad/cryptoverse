export interface SignupFormDataType {
  username: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
}

export interface SigninFormDataType {
  identifier: string;
  password: string;
  remember?: "on";
}

export interface VerifyFormDataType {
  code: string;
  username: string;
}

export type ResetPasswordFormStepType = "1" | "2";

export interface ResetPasswordFormDataType {
  identifier: string;
  code: string;
  password: string;
  passwordRepeat: string;
  formStep: ResetPasswordFormStepType;
  username: string;
}
