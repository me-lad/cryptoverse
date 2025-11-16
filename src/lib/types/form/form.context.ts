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
  };
  resetPasswordForm: {
    formStep: ResetPasswordFormStepT;
    setFormStep: (step: ResetPasswordFormStepT) => void;
  };
}
