// Packages imports
import React from "react";
import clsx from "clsx";

// Local imports
import { flexBetween } from "@/lib/shared/tw-custom";
import AuthVerifyFormOtpInputUnit from "./AuthVerifyFormOtpInput.unit";
import AuthVerifyFormOtpButtonUnit from "./AuthVerifyFormOtpButton.unit";

// Local types
type PropsType = {
  children: React.ReactNode;
};

// Functional component
export default function AuthVerifyFormUi({ children }: PropsType) {
  return (
    <>
      {/* Otp input */}
      <div className="mx-auto w-2/3">
        <AuthVerifyFormOtpInputUnit />
      </div>

      {/* Resend code section */}
      <div className={clsx(flexBetween, "mx-auto mb-4 w-2/3")}>{children}</div>

      {/* Submit button */}
      <div className="mx-auto w-2/3 select-none">
        <AuthVerifyFormOtpButtonUnit />
      </div>
    </>
  );
}
