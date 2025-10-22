// 📦 Third-Party imports
import { Checkbox } from '~core/ui/shadcn/checkbox';
import React from 'react';
import Link from 'next/link';

// 📦 Internal imports
import type { FormFieldT, FormKindsT } from '~types/form';
import { FormKinds } from '~constants/form';
import { flexCenter } from '~styles/tw-custom';
import FormFieldInput from '../form-parts/FormFieldInput';
import FormFieldErrorsFn from '../form-parts/FormFieldErrors.fn';
import FormButton from '../form-parts/FormButton';

// 🧾 Local types
type PropsT = {
  formFields: FormFieldT[];
  submitButtonText: string;
  formType?: FormKindsT;
};

// ⚙️ Functional component
const Form: React.FC<PropsT> = ({ formFields, formType, submitButtonText }) => {
  return (
    <>
      {formFields.map((field) => (
        <div key={field.id} className="relative mt-2">
          <FormFieldInput {...field} />

          <FormFieldErrorsFn fieldName={field.name} />
        </div>
      ))}

      {formType === FormKinds.Signin && (
        <div className="mt-4 flex items-center justify-between px-1 text-sm">
          <Link
            className="hover:text-primary-400 transition-all"
            href={'/auth/reset-password'}
          >
            Forget your password ?
          </Link>

          <label className={`${flexCenter} gap-2`}>
            Remember me
            <Checkbox
              className="mt-1 !text-white"
              defaultChecked
              name="remember"
            />
          </label>
        </div>
      )}

      <FormButton buttonText={submitButtonText} />
    </>
  );
};
export default Form;
