// 📦 Third-Party imports
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import VerifyFormOtpInput from '../form-parts/VerifyFormOtpInput';
import VerifyFormOtpButton from '../form-parts/VerifyFormOtpButton';

// 🧾 Local types
type PropsT = {
  children: React.ReactNode;
};

// ⚙️ Functional component
const VerifyFormUi: React.FC<PropsT> = ({ children }) => {
  return (
    <>
      {/* Otp input */}
      <div className="mx-auto w-5/6">
        <VerifyFormOtpInput />
      </div>

      {/* Resend code section */}
      <div className={clsx(flexBetween, 'mx-auto mb-4 w-5/6')}>{children}</div>

      {/* Submit button */}
      <div className="mx-auto w-5/6 select-none">
        <VerifyFormOtpButton />
      </div>
    </>
  );
};
export default VerifyFormUi;
