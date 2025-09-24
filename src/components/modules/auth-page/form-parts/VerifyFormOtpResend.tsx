// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { toast } from 'react-toastify';
import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { OtpResendResultT } from '~types/form';
import { isDatePassedTime } from '~helpers/time';
import { startCountdownTimer } from '~helpers/formatters';
import { toastsCustomID } from '~configs/react-toastify';

// 🧾 Local types
type PropsT = {
  waitReferenceTime: Date;
  waitReferenceDuration: number;
  username: string;
};

// ⚙️ Functional component
const VerifyFormOtpResend: React.FC<PropsT> = (props) => {
  const { waitReferenceTime, waitReferenceDuration, username } = props;

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/auth/resend-otp`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result: OtpResendResultT = await resp.json();

    if (!result.success) {
      if (result.isTemporaryLimit && result.referenceTime) {
        setWaitDuration(5);
        setReferenceTime(new Date(result.referenceTime));
      }

      toast(result.message, {
        type: 'error',
        autoClose: 12000,
        toastId: toastsCustomID,
        onClose: () =>
          result.refreshNeed &&
          typeof window !== 'undefined' &&
          window.location.reload(),
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
        <span className={clsx(waitDuration === 5 && 'text-status-error-200')}>
          {isDatePassedTime(referenceTime, waitDuration) ? '' : remainingTime}
        </span>
        <Button
          variant={'ghost'}
          size={'sm'}
          className={clsx(
            'cursor-pointer',
            !isDatePassedTime(referenceTime, waitDuration) &&
              'pointer-events-none opacity-30',
          )}
          type="button"
          onClick={resendHandler}
        >
          Resend
        </Button>
      </div>
    </>
  );
};
export default VerifyFormOtpResend;
