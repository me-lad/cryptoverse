// Local imports
import { minutesToMillisecond } from "~helpers/time";
import AuthVerifyFormUi from "./AuthVerifyForm.ui";
import { VerifyService } from "@/lib/actions/auth/verify.service";
import AuthVerifyFormErrorUnit from "./AuthVerifyFormError.unit";
import AuthVerifyFormOtpResendUnit from "./AuthVerifyFormOtpResend.unit";

// Local types
type PropsType = {
  phoneNumber: string;
  username: string;
};

// Functional component
export default async function AuthVerifyFormFn({ phoneNumber, username }: PropsType) {
  // Variables used for conditional rendering
  const fallbackTime = new Date(Date.now() - minutesToMillisecond(2));
  let isLimited = false;
  let waitDuration = 2;
  let uiReferenceTime = fallbackTime;

  // Process
  const userOtpStatus = await VerifyService.checkUserOtpStatus(username);
  const { status } = userOtpStatus;

  if (status === "Allowed") {
    const sendResult = await VerifyService.sendOtp(phoneNumber);
    if (sendResult && sendResult.createdAt) {
      uiReferenceTime = sendResult.createdAt;
    }
  }

  if (status === "Waiting") {
    const { referenceTime, isTemporaryLimit } = userOtpStatus;
    uiReferenceTime = referenceTime;
    if (isTemporaryLimit) waitDuration = 5;
  }

  if (status === "Limited") {
    isLimited = true;
  }

  if (isLimited) return <AuthVerifyFormErrorUnit />;
  return (
    <AuthVerifyFormUi>
      <AuthVerifyFormOtpResendUnit
        username={username}
        waitReferenceTime={uiReferenceTime}
        waitReferenceDuration={waitDuration}
      />

      {/* Hidden username input */}
      <input type="hidden" name="username" value={username} />
    </AuthVerifyFormUi>
  );
}
