// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { Smartphone } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  value: string;
}

// ⚙️ Functional component
const EditPhoneNumber: React.FC<PropsT> = ({ value }) => {
  return (
    <div className={`${flexBetween} flex-col gap-y-5 sm:flex-row`}>
      <div className="flex items-center gap-2.5 sm:max-w-3/5">
        <div>
          <Smartphone size={25} />
        </div>

        <div className="flex flex-col">
          <h4 className="text-base font-semibold">Phone Number</h4>
          <p className="line-clamp-1 text-sm font-light opacity-75">
            Your phone number helps secure your account with two-factor
            authentication
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 sm:max-w-2/5">
        <p className="line-clamp-1">{value}</p>
        <Button
          className="min-w-20 cursor-pointer"
          variant={'secondary'}
          size={'sm'}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
export default EditPhoneNumber;
