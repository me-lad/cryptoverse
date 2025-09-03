// Directives
"use client";

// Packages imports
import { use } from "react";

// Local imports
import { FormContext } from "./AuthForm.context";
import { resetPasswordFormFields } from "@/lib/constants";
import AuthFormUnit from "./AuthForm.unit";

// Functional component
export default function AuthResetPasswordFormUnit() {
  const { resetPasswordForm } = use(FormContext);
  let fields = resetPasswordFormFields.filter(
    (field) => field.formStep == resetPasswordForm.formStep,
  );

  return (
    <>
      {/* Main form */}
      <AuthFormUnit formFields={fields} submitButtonText="Confirm" />

      {/* Hidden input for formStep */}
      <input type="hidden" name="formStep" value={resetPasswordForm.formStep} />
    </>
  );
}
