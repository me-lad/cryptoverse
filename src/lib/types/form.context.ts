import type { FormStateType } from "./form";
import type { FormTypesType } from "./form";
import type { ResetPasswordFormStepType } from "./form";

export interface FormContextType {
  state: FormStateType;
  pending: boolean;
  activeForm?: FormTypesType;
  verifyForm: {
    otp: string;
    setOtp: (value: string) => void;
  };
  resetPasswordForm: {
    formStep: ResetPasswordFormStepType;
    setFormStep: (step: ResetPasswordFormStepType) => void;
  };
}
