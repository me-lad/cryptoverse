// Directives
"use client";

// Packages imports
import { useEffect, use } from "react";
import clsx from "clsx";

// Local imports
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/shadcn/input-otp";
import { FormContext } from "./AuthForm.context";

// Local types

// Functional component
export default function AuthVerifyFormOtpInputUnit() {
  // Layer codes
  useEffect(() => {
    if (typeof document !== "undefined") {
      const input = document.getElementById("otp-verify-input");
      if (!input) return;

      (input as HTMLInputElement).focus();
    }
  }, []);

  const {
    verifyForm: { otp, setOtp },
  } = use(FormContext);

  const numberController = (value: string) => {
    if (value.includes(" ")) return false;
    if (!Number.isSafeInteger(+value.slice(-1))) return false;
    return true;
  };

  // View codes
  return (
    <>
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(e) => numberController(e) && setOtp(e)}
        name="code"
        id="otp-verify-input"
      >
        <InputOTPGroup className="w-full justify-between">
          {new Array(6).fill(0).map((item, index) => (
            <InputOTPSlot
              key={index}
              className="data-[active=true]:border-primary min-h-[50px] w-1/7 min-w-[60px] !rounded-sm !border-0 !border-b-2 text-lg !ring-0 data-[active=true]:border-2"
              index={index}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p
        className={clsx(
          "font-medium transition-all duration-200",
          otp ? "my-4 opacity-100" : "opacity-0",
        )}
      >
        You entered:
        <span className="text-primary ml-2 font-bold">{otp && otp}</span>
      </p>
    </>
  );
}
