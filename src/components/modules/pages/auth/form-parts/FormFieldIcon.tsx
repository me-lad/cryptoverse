// 📦 Third-Party imports
import React from 'react';
import { LockKeyhole, Phone, ShieldUser, User, BadgeCheck } from 'lucide-react';

// 📦 Internal imports
import type { FormFieldNamesT } from '~types/form';
import { FormFieldNames } from '~constants/form';

// 🧾 Local types
type PropsT = {
  fieldName: FormFieldNamesT;
};

// ⚙️ Functional component
const FormFieldIcon: React.FC<PropsT> = ({ fieldName }) => {
  if (fieldName === FormFieldNames.Username) return <User size={18} />;
  if (fieldName === FormFieldNames.Identifier) return <ShieldUser size={18} />;
  if (fieldName === FormFieldNames.PhoneNumber) return <Phone size={18} />;
  if (fieldName === FormFieldNames.Code) return <BadgeCheck size={18} />;
  return <LockKeyhole size={18} />;
};
export default FormFieldIcon;
