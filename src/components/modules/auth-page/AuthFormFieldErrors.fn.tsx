// Directives
"use client";

// Packages imports
import { useEffect, useState, use } from "react";

// Local imports
import type { FormFieldNamesType } from "~types/form";
import { FormContext } from "./AuthForm.context";
import AuthFormFieldErrorsUi from "./AuthFormFieldErrors.ui";

// Local types
type ProsType = {
  fieldName: FormFieldNamesType;
};

// Functional component
export default function AuthFormFieldErrorsFn({ fieldName }: ProsType) {
  const [errors, setErrors] = useState<string[]>([]);
  const { state: formState } = use(FormContext);

  useEffect(() => {
    if (!formState || formState?.status !== "Error" || !formState.properties) {
      return;
    }

    setErrors(formState.properties[fieldName]?.errors || []);
  }, [formState]);

  return <AuthFormFieldErrorsUi errors={errors} />;
}
