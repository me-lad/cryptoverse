// Local imports
import { type AuthFormFieldType, type AuthFormTypesType } from "@/lib/types";
import AuthFormFieldInputUnit from "./AuthFormFieldInput.unit";
import AuthFormFieldErrorsFn from "./AuthFormFieldErrors.fn";
import AuthFormButtonUnit from "./AuthFormButton.unit";

// Local types
type PropsType = {
  formFields: AuthFormFieldType[];
  submitButtonText: string;
  formType?: AuthFormTypesType;
};

// Functional component
export default function AuthFormUnit({
  formFields,
  submitButtonText,
}: PropsType) {
  return (
    <>
      {formFields.map((field) => (
        <div key={field.id} className="relative mt-2">
          <AuthFormFieldInputUnit {...field} />

          <AuthFormFieldErrorsFn fieldName={field.name} />
        </div>
      ))}

      <AuthFormButtonUnit buttonText={submitButtonText} />
    </>
  );
}
