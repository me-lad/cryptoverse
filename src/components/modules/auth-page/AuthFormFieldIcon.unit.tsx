// Packages imports
import { LockKeyhole, Phone, ShieldUser, User, BadgeCheck } from "lucide-react";

// Local imports
import type { FormFieldNamesType } from "~types/form";
import { FormFieldNames } from "~constants/forms";

// Local types
type PropsType = {
  fieldName: FormFieldNamesType;
};

// Functional component
export default function AuthFormFieldIconUnit({ fieldName }: PropsType) {
  if (fieldName === FormFieldNames.Username) return <User size={18} />;
  if (fieldName === FormFieldNames.Identifier) return <ShieldUser size={18} />;
  if (fieldName === FormFieldNames.PhoneNumber) return <Phone size={18} />;
  if (fieldName === FormFieldNames.Code) return <BadgeCheck size={18} />;
  return <LockKeyhole size={18} />;
}
