import type { FormStateT } from './form';
import type { FormKindsT } from './form';
import type { ResetPasswordFormStepT } from './form';

export interface FormContextT {
  state: FormStateT;
  pending: boolean;
  activeForm?: FormKindsT;
  verifyForm: {
    otp: string;
    setOtp: (value: string) => void;
  };
  resetPasswordForm: {
    formStep: ResetPasswordFormStepT;
    setFormStep: (step: ResetPasswordFormStepT) => void;
  };
}
