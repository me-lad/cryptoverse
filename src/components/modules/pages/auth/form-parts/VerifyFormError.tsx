// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useLayoutEffect } from 'react';

// 📦 Internal imports
import { AuthMessages } from '~constants/messages';

// ⚙️ Functional component
const VerifyFormError = () => {
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      const subtitle = document.getElementById('form-wrapper-subtitle');
      if (subtitle) subtitle.textContent = '';
    }
  }, []);

  return (
    <p className="text-status-error-200 mt-6 text-center text-xl font-bold tracking-wider">
      {AuthMessages.Error.VerificationPermanentLimit}
    </p>
  );
};
export default VerifyFormError;
