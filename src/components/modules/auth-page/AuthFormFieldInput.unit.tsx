// Directives
"use client";

// Packages imports
import { Input } from "@/components/ui/shadcn/input";
import clsx from "clsx";

// Local imports
import type { FormFieldType } from "~types/form";
import { FormFieldTypes } from "~constants/forms";
import AuthFormFieldTogglerPasswordFn from "./AuthFormFieldTogglerPassword.fn";
import AuthFormFieldIconUnit from "./AuthFormFieldIcon.unit";

// Functional component
export default function AuthFormFieldInputUnit({ type, name, placeholder }: FormFieldType) {
  const copyPasteBlocker = (event: React.ClipboardEvent) => {
    if (type === FormFieldTypes.Password) {
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
        className="peer mt-4 !bg-transparent pl-10 placeholder:text-white focus-visible:ring-0 focus-visible:placeholder:text-transparent"
      />

      {/* Field label on focus visible */}
      <span
        className={clsx(
          "bg-background absolute top-2.5 left-10 -z-50 px-2 text-sm opacity-0 transition-all duration-200",
          "peer-focus-visible:z-[1] peer-focus-visible:-translate-y-5 peer-focus-visible:opacity-100",
        )}
      >
        {placeholder}
      </span>

      {/* Field icons */}
      <label htmlFor={`${name}-input`} className="absolute top-[0.575rem] left-2 h-fit w-fit">
        <AuthFormFieldIconUnit fieldName={name} />
      </label>

      {/* Password visibility toggler */}
      {type === FormFieldTypes.Password && (
        <AuthFormFieldTogglerPasswordFn parentInputID={`${name}-input`} />
      )}
    </>
  );
}
