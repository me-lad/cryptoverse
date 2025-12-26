// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';

// 📦 Internal imports
import { FormContext } from '../AuthForm.context';
import { resetPasswordFormFields } from '~constants/form';
import Form from './Form';

// ⚙️ Functional component
const ResetPasswordForm = ({ expiresAt }: { expiresAt?: Date }) => {
  const { resetPasswordForm } = use(FormContext);
  let fields = resetPasswordFormFields.filter(
    (field) => field.formStep == resetPasswordForm.formStep,
  );

  const formatDate = () => {
    if (!expiresAt) return '';

    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tehran',
      hour12: false,
    }).format(expiresAt);
  };

  return (
    <>
      {/* Main form */}
      {resetPasswordForm.formStep === '2' && (
        <p className="text-status-warning-200 text-center text-sm font-semibold">
          Your OTP code is valid until {formatDate()}
        </p>
      )}
      <Form formFields={fields} submitButtonText="Confirm" />

      {/* Hidden input for formStep */}
      <input type="hidden" name="formStep" value={resetPasswordForm.formStep} />
    </>
  );
};
export default ResetPasswordForm;
