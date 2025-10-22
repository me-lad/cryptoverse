// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useState } from 'react';

// 📦 Internal imports
import FormFieldTogglerPasswordUi from './FormFieldTogglerPassword.ui';

// 🧾 Local types
type PropsT = {
  parentInputID: string;
};

// ⚙️ Functional component
const FormFieldTogglerPasswordFn: React.FC<PropsT> = ({ parentInputID }) => {
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
      ? ((passwordField as HTMLInputElement).type = 'password')
      : ((passwordField as HTMLInputElement).type = 'text');
    setIsPasswordVisible(!isPasswordVisible);

    // @ts-ignore
    passwordField.oninput = resetVisibility;
  };

  return (
    <FormFieldTogglerPasswordUi
      visibility={isPasswordVisible}
      toggleVisibility={toggleVisibility}
    />
  );
};
export default FormFieldTogglerPasswordFn;
