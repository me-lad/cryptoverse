export interface SignupFormDataT {
  username: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
}

export interface SigninFormDataT {
  identifier: string;
  password: string;
  remember?: 'on';
}

export interface VerifyFormDataT {
  code: string;
  username: string;
}

export type ResetPasswordFormStepT = '1' | '2';

export interface ResetPasswordFormDataT {
  identifier: string;
  code: string;
  password: string;
  passwordRepeat: string;
  formStep: ResetPasswordFormStepT;
  username: string;
}
