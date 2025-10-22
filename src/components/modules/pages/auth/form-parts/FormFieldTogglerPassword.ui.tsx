// 📦 Third-Party imports
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
type PropsT = {
  visibility: boolean;
  toggleVisibility: () => void;
};

// ⚙️ Functional component
const FormFieldTogglerPasswordUi: React.FC<PropsT> = (props) => {
  const { visibility, toggleVisibility } = props;
  return (
    <span
      onClick={toggleVisibility}
      className={clsx(
        'absolute top-[0.6rem] right-3 z-50 m-auto cursor-pointer',
        flexCenter,
      )}
    >
      {visibility ? <Eye size={18} /> : <EyeOff size={18} />}
    </span>
  );
};
export default FormFieldTogglerPasswordUi;
