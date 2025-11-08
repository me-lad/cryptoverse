// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Mail, User } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';
import React, { Dispatch, useEffect, useState } from 'react';

// 📦 Internal imports
import DatePicker from './DatePicker';

// 🧾 Local types
interface PropsT {
  changeNextDisable: Dispatch<React.SetStateAction<boolean>>;
}

interface FormDataT {
  firstName: string;
  lastName: string;
  email: string;
}

// ⚙️ Functional component
const PersonalInformation: React.FC<PropsT> = ({ changeNextDisable }) => {
  const [formData, setFormData] = useState<FormDataT>({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (formData.firstName && formData.lastName && formData.email) {
      changeNextDisable(false);
    } else {
      changeNextDisable(true);
    }
  }, [formData]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-5 grid w-full grid-cols-3 grid-rows-2 gap-x-2.5 gap-y-5"
    >
      <div className="relative">
        <Input
          className="peer focus-visible:border-b-primary rounded-sm py-5 pl-8 !ring-0 !outline-none placeholder:transition-all focus-visible:placeholder:text-transparent"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />

        <div className="absolute top-3 left-1.5">
          <User size={19} className="text-neutral-400" />
        </div>

        <span className="absolute top-2 left-4 rounded-[9999px] bg-neutral-800 px-3 text-xs opacity-0 transition-all peer-focus-visible:-top-2 peer-focus-visible:opacity-100">
          First Name
        </span>
      </div>

      <div className="relative">
        <Input
          className="peer focus-visible:border-b-primary rounded-sm py-5 pl-8 !ring-0 !outline-none placeholder:transition-all focus-visible:placeholder:text-transparent"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />

        <div className="absolute top-3 left-1.5">
          <User size={19} className="text-neutral-400" />
        </div>

        <span className="absolute top-2 left-4 rounded-[9999px] bg-neutral-800 px-3 text-xs opacity-0 transition-all peer-focus-visible:-top-2 peer-focus-visible:opacity-100">
          Last Name
        </span>
      </div>

      <div className="relative">
        <Input
          className="peer focus-visible:border-b-primary rounded-sm py-5 pl-9 !ring-0 !outline-none placeholder:transition-all focus-visible:placeholder:text-transparent"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <div className="absolute top-3 left-1.5">
          <Mail size={19} className="text-neutral-400" />
        </div>

        <span className="absolute top-2 left-4 rounded-[9999px] bg-neutral-800 px-3 text-xs opacity-0 transition-all peer-focus-visible:-top-2 peer-focus-visible:opacity-100">
          Email
        </span>
      </div>

      <div>
        <DatePicker />
      </div>
    </form>
  );
};
export default PersonalInformation;
