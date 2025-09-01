// Directives

// Packages imports
import { LockKeyhole, Phone, ShieldUser, User, BadgeCheck } from "lucide-react";

// Local imports
import { AuthFormFieldNames, type AuthFormFieldNamesType } from "@/lib/types";

// Local types
type PropsType = {
  fieldName: AuthFormFieldNamesType;
};

// Functional component
export default function AuthFormFieldIconUnit({ fieldName }: PropsType) {
  if (fieldName === AuthFormFieldNames.Username) return <User size={18} />;
  if (fieldName === AuthFormFieldNames.Identifier)
    return <ShieldUser size={18} />;
  if (fieldName === AuthFormFieldNames.PhoneNumber) return <Phone size={18} />;
  if (fieldName === AuthFormFieldNames.Code) return <BadgeCheck size={18} />;
  return <LockKeyhole size={18} />;
}
