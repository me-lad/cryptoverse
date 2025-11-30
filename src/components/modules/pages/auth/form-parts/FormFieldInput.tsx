// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Input } from '~core/ui/shadcn/input';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { FormFieldT } from '~types/form';
import { FormFieldKinds } from '~constants/form';
import FormFieldTogglerPasswordFn from './FormFieldTogglerPassword.fn';
import FormFieldIcon from './FormFieldIcon';

// ⚙️ Functional component
const FormFieldInput: React.FC<FormFieldT> = (props) => {
  const { type, name, placeholder } = props;

  const copyPasteBlocker = (event: React.ClipboardEvent) => {
    if (type === FormFieldKinds.Password) {
      event.preventDefault();
      return false;
    }
  };

  return (
    <>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        id={`${name}-input`}
        onPaste={copyPasteBlocker}
        onCopy={copyPasteBlocker}
        autoComplete="off"
        className="peer mt-4 !bg-transparent pl-10 placeholder:text-white focus-visible:ring-0 focus-visible:placeholder:text-transparent max-[29em]:placeholder:text-sm"
      />

      {/* Field label on focus visible */}
      <span
        className={clsx(
          'bg-background absolute top-2.5 left-10 -z-50 px-2 text-sm opacity-0 transition-all duration-200',
          'peer-focus-visible:z-[1] peer-focus-visible:-translate-y-5 peer-focus-visible:opacity-100',
        )}
      >
        {placeholder}
      </span>

      {/* Field icons */}
      <label
        htmlFor={`${name}-input`}
        className="absolute top-[0.575rem] left-2 h-fit w-fit"
      >
        <FormFieldIcon fieldName={name} />
      </label>

      {/* Password visibility toggler */}
      {type === FormFieldKinds.Password && (
        <FormFieldTogglerPasswordFn parentInputID={`${name}-input`} />
      )}
    </>
  );
};
export default FormFieldInput;
