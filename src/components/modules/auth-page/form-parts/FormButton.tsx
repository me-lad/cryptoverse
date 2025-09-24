// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { useFormStatus } from 'react-dom';

// 📦 Internal imports
import { Button } from '~core/ui/shadcn/button';

// 🧾 Local types
type PropsT = {
  buttonText: string;
  additiveClassName?: string;
};

// ⚙️ Functional component
const FormButton: React.FC<PropsT> = ({
  buttonText,
  additiveClassName = 'mt-4 flex cursor-pointer items-center',
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`w-full text-white ${additiveClassName}`}
      size="lg"
      type="submit"
      disabled={pending}
    >
      <span>{pending ? 'Processing...' : buttonText}</span>
    </Button>
  );
};
export default FormButton;
