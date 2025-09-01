// Directives
"use client";
import "client-only";

// Packages imports
import { useState } from "react";

// Local imports
import AuthFormFieldTogglerPasswordUi from "./AuthFormFieldTogglerPassword.ui";

// Local types
type PropsType = {
  parentInputID: string;
};

// Functional component
export default function AuthFormFieldTogglerPasswordFn({
  parentInputID,
}: PropsType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const resetVisibility = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).id !== parentInputID) return;
    setIsPasswordVisible(false);

    const passwordField = document.getElementById(parentInputID);
    if (passwordField) passwordField.oninput = null;
  };

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);

    const passwordField = document.getElementById(parentInputID);

    if (!passwordField) return;
    isPasswordVisible
      ? ((passwordField as HTMLInputElement).type = "password")
      : ((passwordField as HTMLInputElement).type = "text");
    setIsPasswordVisible(!isPasswordVisible);

    // @ts-ignore
    passwordField.oninput = resetVisibility;
  };

  return (
    <AuthFormFieldTogglerPasswordUi
      visibility={isPasswordVisible}
      toggleVisibility={toggleVisibility}
    />
  );
}
