// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState, use } from 'react';

// 📦 Internal imports
import type { FormFieldNamesT } from '~types/form';
import { FormContext } from '../AuthForm.context';
import FormFieldErrorsUi from './FormFieldErrors.ui';

// 🧾 Local types
type PropsT = {
  fieldName: FormFieldNamesT;
};

// ⚙️ Functional component
const FormFieldErrorsFn: React.FC<PropsT> = ({ fieldName }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { state: formState } = use(FormContext);

  useEffect(() => {
    if (!formState || formState?.status !== 'Error' || !formState.properties) {
      return;
    }

    setErrors(formState.properties[fieldName]?.errors || []);
  }, [formState]);

  return <FormFieldErrorsUi errors={errors} />;
};
export default FormFieldErrorsFn;
