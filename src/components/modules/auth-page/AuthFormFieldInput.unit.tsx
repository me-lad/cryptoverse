// Directives
"use client";

// Packages imports
import clsx from "clsx";

// Local imports
import { Input } from "@/components/ui/shadcn/input";
import { AuthFormFieldTypes, type AuthFormFieldType } from "@/lib/types";
import AuthFormFieldTogglerPasswordFn from "./AuthFormFieldTogglerPassword.fn";
import AuthFormFieldIconUnit from "./AuthFormFieldIcon.unit";

// Functional component
export default function AuthFormFieldInputUnit({ type, name, placeholder }: AuthFormFieldType) {
  const copyPasteBlocker = (event: React.ClipboardEvent) => {
    if (type === AuthFormFieldTypes.Password) {
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
      {type === AuthFormFieldTypes.Password && (
        <AuthFormFieldTogglerPasswordFn parentInputID={`${name}-input`} />
      )}
    </>
  );
}
