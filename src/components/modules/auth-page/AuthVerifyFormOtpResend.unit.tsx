// Directives
"use client";

// Packages imports
import clsx from "clsx";
import { Button } from "@/components/ui/shadcn/button";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

// Local imports
import type { OtpResendResultType } from "@/lib/types";
import { isDatePassedTime, startCountdownTimer } from "@/lib/helpers";
import { toastsCustomID } from "@/lib/configs/react-toastify";

// Local types
type PropsType = {
  waitReferenceTime: Date;
  waitReferenceDuration: number;
  username: string;
};

// Functional component
export default function AuthVerifyFormOtpResendUnit({
  waitReferenceTime,
  waitReferenceDuration,
  username,
}: PropsType) {
  const [referenceTime, setReferenceTime] = useState(waitReferenceTime);
  const [waitDuration, setWaitDuration] = useState(waitReferenceDuration);
  const [remainingTime, setRemainingTime] = useState(`0${waitDuration}:00`);

  useLayoutEffect(() => {
    const stopTimer = startCountdownTimer(referenceTime, waitDuration, (time) =>
      setRemainingTime(time),
    );

    return stopTimer;
  }, [referenceTime, waitDuration]);

  const resendHandler = async () => {
    const resp = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });
    const result: OtpResendResultType = await resp.json();

    if (!result.success) {
      if (result.isTemporaryLimit && result.referenceTime) {
        setWaitDuration(5);
        setReferenceTime(new Date(result.referenceTime));
      }

      toast(result.message, {
        type: "error",
        autoClose: 12000,
        toastId: toastsCustomID,
        onClose: () =>
          result.refreshNeed && typeof window !== "undefined" && window.location.reload(),
      });
    }

    if (result.success) {
      setWaitDuration(2);
      setReferenceTime(new Date(result.newReferenceTime));
    }
  };

  return (
    <>
      <span className="text-sm">Didn't receive the code ?</span>
      <div className="flex items-center gap-4 text-sm">
        <span className={clsx(waitDuration === 5 && "text-status-error-200")}>
          {isDatePassedTime(referenceTime, waitDuration) ? "" : remainingTime}
        </span>
        <Button
          variant={"ghost"}
          size={"sm"}
          className={clsx(
            "cursor-pointer",
            !isDatePassedTime(referenceTime, waitDuration) && "pointer-events-none opacity-30",
          )}
          type="button"
          onClick={resendHandler}
        >
          Resend
        </Button>
      </div>
    </>
  );
}
