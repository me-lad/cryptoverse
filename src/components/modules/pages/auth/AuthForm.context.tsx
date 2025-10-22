// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { useActionState, createContext, useState } from 'react';

// 📦 Internal imports
import type { FormContextT } from '~types/form';
import type { FormKindsT } from '~types/form';
import type { ResetPasswordFormStepT } from '~types/form';
import type { FormStateT } from '~types/form';
import { initialFormState } from '~constants/form';
import FormResultHandler from './FormResult.handler';

// 🧾 Local types
type PropsT = {
  formAction: any;
  formType: FormKindsT;
  children: React.ReactNode;
  resetPasswordFormStep?: ResetPasswordFormStepT;
};

export const FormContext = createContext<FormContextT>({
  state: initialFormState,
  pending: false,
  verifyForm: {
    otp: '',
    setOtp: () => {},
  },
  resetPasswordForm: {
    formStep: '1',
    setFormStep: () => {},
  },
});

// ⚙️ Functional component
const AuthFormContext: React.FC<PropsT> = ({
  formAction,
  children,
  formType,
  resetPasswordFormStep = '1',
}) => {
  const [state, action, pending] = useActionState<FormStateT>(
    formAction,
    initialFormState,
  );
  const [verificationOtp, setVerificationOtp] = useState('');
  const [rpFormStep, setRPFormStep] = useState<ResetPasswordFormStepT>(
    resetPasswordFormStep,
  );

  return (
    <FormContext
      value={{
        state,
        pending,
        activeForm: formType,
        verifyForm: { otp: verificationOtp, setOtp: setVerificationOtp },
        resetPasswordForm: {
          formStep: rpFormStep,
          setFormStep: setRPFormStep,
        },
      }}
    >
      <FormResultHandler />
      <form action={action} className="mt-8 w-full">
        {children}
      </form>
    </FormContext>
  );
};
export default AuthFormContext;
