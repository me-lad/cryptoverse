// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';

// 📦 Internal imports
import { FormContext } from '../AuthForm.context';
import { resetPasswordFormFields } from '~constants/form';
import Form from './Form';

// ⚙️ Functional component
const ResetPasswordForm = () => {
  const { resetPasswordForm } = use(FormContext);
  let fields = resetPasswordFormFields.filter(
    (field) => field.formStep == resetPasswordForm.formStep,
  );

  return (
    <>
      {/* Main form */}
      <Form formFields={fields} submitButtonText="Confirm" />

      {/* Hidden input for formStep */}
      <input type="hidden" name="formStep" value={resetPasswordForm.formStep} />
    </>
  );
};
export default ResetPasswordForm;
