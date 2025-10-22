// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { minutesToMillisecond } from '~helpers/time';
import { VerifyService } from '~actions/auth/verify.service';
import VerifyFormUi from './VerifyForm.ui';
import VerifyFormError from '../form-parts/VerifyFormError';
import VerifyFormOtpResend from '../form-parts/VerifyFormOtpResend';

// 🧾 Local types
type PropsT = {
  phoneNumber: string;
  username: string;
};

// ⚙️ Functional component
const VerifyFormFn: React.FC<PropsT> = async ({ phoneNumber, username }) => {
  // Variables used for conditional rendering
  const fallbackTime = new Date(Date.now() - minutesToMillisecond(2));
  let isLimited = false;
  let waitDuration = 2;
  let uiReferenceTime = fallbackTime;

  // Process
  const userOtpStatus = await VerifyService.checkUserOtpStatus(username);
  const { status } = userOtpStatus;

  if (status === 'Allowed') {
    const sendResult = await VerifyService.sendOtp(phoneNumber);
    if (sendResult && sendResult.createdAt) {
      uiReferenceTime = sendResult.createdAt;
    }
  }

  if (status === 'Waiting') {
    const { referenceTime, isTemporaryLimit } = userOtpStatus;
    uiReferenceTime = referenceTime;
    if (isTemporaryLimit) waitDuration = 5;
  }

  if (status === 'Limited') {
    isLimited = true;
  }

  if (isLimited) return <VerifyFormError />;
  return (
    <VerifyFormUi>
      <VerifyFormOtpResend
        username={username}
        waitReferenceTime={uiReferenceTime}
        waitReferenceDuration={waitDuration}
      />

      {/* Hidden username input */}
      <input type="hidden" name="username" value={username} />
    </VerifyFormUi>
  );
};
export default VerifyFormFn;
