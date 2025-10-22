// 📦 Third-Party imports
import React from 'react';

// 🧾 Local types
type PropsT = {
  errors: string[];
};

// ⚙️ Functional component
const FormFieldErrorsUi: React.FC<PropsT> = ({ errors }) => {
  return (
    <ul className="flex list-inside list-disc flex-col gap-1">
      {errors.map((err, index) => (
        <li
          className="text-status-error-200 items-center text-[0.915rem] font-medium first:mt-2"
          key={index}
        >
          {err}
        </li>
      ))}
    </ul>
  );
};
export default FormFieldErrorsUi;
