// Directives
"use client";

// Packages imports
import { use, useEffect } from "react";
import { toast } from "react-toastify";

// Local imports
import AuthFormUnit from "./AuthForm.unit";
import { FormContext } from "./AuthForm.context";
import { resetPasswordFormFields } from "@/lib/constants";
import { minutesToMillisecond } from "@/lib/helpers";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

// Local types

// Functional component
export default function AuthResetPasswordFormUnit() {
  const { resetPasswordForm } = use(FormContext);
  let fields = resetPasswordFormFields.filter(
    (field) => field.formStep === resetPasswordForm.formStep,
  );

  useEffect(() => {
    if (resetPasswordForm.formStep === "2") {
      toast(
        "Note that the the process can be done only after 3 minutes from the last code receive.",
        {
          type: "info",
          position: "top-right",
          autoClose: false,
          delay: 5000,
          className: "border-b border-status-warning-200",
        },
      );
    }
  }, []);

  useEffect(() => {
    fields = resetPasswordFormFields.filter(
      (field) => field.formStep === resetPasswordForm.formStep,
    );

    const timer = setTimeout(() => {
      resetPasswordForm.setFormStep("1");
    }, minutesToMillisecond(3));

    return () => clearTimeout(timer);
  }, [resetPasswordForm.formStep]);

  return (
    <>
      {/* Main form */}
      <AuthFormUnit formFields={fields} submitButtonText="Confirm" />

      {/* Hidden input for formStep */}
      <input type="hidden" name="formStep" value={resetPasswordForm.formStep} />
    </>
  );
}
