// Directives
"use client";

// Packages imports
import React from "react";
import { useActionState, createContext, useState } from "react";

// Local imports
import {
  AuthFormContextType,
  AuthFormTypesType,
  type ResetPasswordFormStepType,
  type AuthFormStateType,
} from "@/lib/types";
import { initialFormState } from "@/lib/constants";
import AuthFormResultUnit from "./AuthFormResult.unit";

// Local types
type PropsType = {
  formAction: any;
  formType: AuthFormTypesType;
  children: React.ReactNode;
  resetPasswordFormStep?: ResetPasswordFormStepType;
};

export const FormContext = createContext<AuthFormContextType>({
  state: initialFormState,
  pending: false,
  verifyForm: {
    otp: "",
    setOtp: () => {},
  },
  resetPasswordForm: {
    formStep: "1",
    setFormStep: () => {},
  },
});

// Functional component
export default function AuthFormContext({
  formAction,
  formType,
  children,
  resetPasswordFormStep = "1",
}: PropsType) {
  const [state, action, pending] = useActionState<AuthFormStateType>(formAction, initialFormState);
  const [verificationOtp, setVerificationOtp] = useState("");
  const [rpFormStep, setRPFormStep] = useState<ResetPasswordFormStepType>(resetPasswordFormStep);

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
      <AuthFormResultUnit />
      <form action={action} className="mt-8 w-full">
        {children}
      </form>
    </FormContext>
  );
}
