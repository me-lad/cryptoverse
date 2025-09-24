// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import React, { useEffect, use, useRef } from 'react';

// 📦 Internal imports
import { Button } from '~core/ui/shadcn/button';
import { FormContext } from '../AuthForm.context';

// ⚙️ Functional component
const VerifyFormOtpButton = () => {
  const { verifyForm } = use(FormContext);
  const submitButton = useRef(null);

  useEffect(() => {
    if (verifyForm.otp.length === 6 && submitButton.current)
      return (submitButton.current as HTMLButtonElement).click();
  }, [verifyForm.otp]);

  return (
    <Button
      size="lg"
      ref={submitButton}
      className={clsx(
        'w-full text-white',
        verifyForm.otp.length === 6
          ? 'cursor-pointer'
          : 'pointer-events-none opacity-20',
      )}
    >
      Confirm
    </Button>
  );
};
export default VerifyFormOtpButton;
