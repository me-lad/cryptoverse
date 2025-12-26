// 📦 Third-Party imports
import { SquareUser } from 'lucide-react';
import React from 'react';

// 📦 Internal imports
import { accountManagementContainer } from '~styles/tw-custom';
import EditableData from '../EditableData';
import EditPhoneNumber from './EditPhoneNumber';

// 🧾 Local types
interface PropsT {
  username: string;
  phoneNumber: string;
}

// ⚙️ Functional component
const Basics: React.FC<PropsT> = ({ phoneNumber, username }) => {
  return (
    <div className={accountManagementContainer}>
      <h2 className="text-xl font-semibold max-sm:text-center">
        Basic account data
      </h2>

      <div className="mt-8 pl-3 *:not-first:mt-5">
        <EditableData
          identifier={username}
          Icon={<SquareUser size={25} />}
          title="Username"
          description="This is your display name that will appear to others on the platform"
          value={username}
          name="username"
        />

        <EditPhoneNumber value={phoneNumber} />
      </div>
    </div>
  );
};
export default Basics;
