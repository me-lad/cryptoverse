// Directives
"use client";

// Packages imports
import clsx from "clsx";
import { useEffect, use, useRef } from "react";

// Local imports
import { Button } from "@/components/ui/shadcn/button";
import { FormContext } from "./AuthForm.context";

// Functional component
export default function AuthVerifyFormOtpButtonUnit() {
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
        "w-full text-white",
        verifyForm.otp.length === 6
          ? "cursor-pointer"
          : "pointer-events-none opacity-20",
      )}
    >
      Confirm
    </Button>
  );
}
