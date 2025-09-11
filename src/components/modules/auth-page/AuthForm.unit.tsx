// Packages imports
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import Link from "next/link";

// Local imports
import type { FormFieldType, FormTypesType } from "~types/form";
import { FormTypes } from "~constants/forms";
import { flexCenter } from "@/lib/shared/tw-custom";
import AuthFormFieldInputUnit from "./AuthFormFieldInput.unit";
import AuthFormFieldErrorsFn from "./AuthFormFieldErrors.fn";
import AuthFormButtonUnit from "./AuthFormButton.unit";

// Local types
type PropsType = {
  formFields: FormFieldType[];
  submitButtonText: string;
  formType?: FormTypesType;
};

// Functional component
export default function AuthFormUnit({ formFields, formType, submitButtonText }: PropsType) {
  return (
    <>
      {formFields.map((field) => (
        <div key={field.id} className="relative mt-2">
          <AuthFormFieldInputUnit {...field} />

          <AuthFormFieldErrorsFn fieldName={field.name} />
        </div>
      ))}

      {formType === FormTypes.Signin && (
        <div className="mt-4 flex items-center justify-between px-1 text-sm">
          <Link className="hover:text-primary-400 transition-all" href={"/auth/reset-password"}>
            Forget your password ?{" "}
          </Link>

          <label className={`${flexCenter} gap-2`}>
            Remember me
            <Checkbox className="mt-1 !text-white" defaultChecked name="remember" />
          </label>
        </div>
      )}

      <AuthFormButtonUnit buttonText={submitButtonText} />
    </>
  );
}
