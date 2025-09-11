// Directives
"use client";

// Packages imports
import { useLayoutEffect } from "react";

// Local imports
import { AuthMessages } from "~constants/messages";

// Functional component
export default function AuthVerifyFormErrorUnit() {
  useLayoutEffect(() => {
    if (typeof document !== "undefined") {
      const subtitle = document.getElementById("form-wrapper-subtitle");
      if (subtitle) subtitle.textContent = "";
    }
  }, []);

  return (
    <p className="text-status-error-200 mt-6 text-center text-xl font-bold tracking-wider">
      {AuthMessages.Error.VerificationPermanentLimit}
    </p>
  );
}
