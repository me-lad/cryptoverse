import { Dispatch, SetStateAction } from 'react';
import type { FormStateT } from '.';
import type { FormKindsT } from '.';
import type { ResetPasswordFormStepT } from '.';

export interface FormContextT {
  state: FormStateT;
  pending: boolean;
  activeForm?: FormKindsT;
  verifyForm: {
    otp: string;
    setOtp: (value: string) => void;
    isCodeIncorrect?: boolean;
    setIsCodeIncorrect?: Dispatch<SetStateAction<boolean>>;
  };
  resetPasswordForm: {
    formStep: ResetPasswordFormStepT;
    setFormStep: (step: ResetPasswordFormStepT) => void;
  };
}
