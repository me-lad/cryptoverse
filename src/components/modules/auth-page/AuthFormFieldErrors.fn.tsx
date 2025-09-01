// Directives
"use client";

// Packages imports
import { useEffect, useState, use } from "react";

// Local imports
import type { AuthFormFieldNamesType } from "@/lib/types";
import AuthFormFieldErrorsUi from "./AuthFormFieldErrors.ui";
import { FormContext } from "./AuthForm.context";

// Local types
type ProsType = {
  fieldName: AuthFormFieldNamesType;
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
