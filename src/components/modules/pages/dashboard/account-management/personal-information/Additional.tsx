// 📌 Directives
// 📦 Third-Party imports
import { Mail, User } from 'lucide-react';
import React from 'react';

// 📦 Internal imports
import { accountManagementContainer } from '~styles/tw-custom';
import EditableData from '../EditableData';
import UploadProfileImage from './UploadProfileImage';

// 🧾 Local types
interface PropsT {
  username: string;
  fullName?: string;
  email?: string;
  profileImage?: string;
}

// ⚙️ Functional component
const Additional: React.FC<PropsT> = (props) => {
  const { email, fullName, profileImage, username } = props;

  return (
    <div className={accountManagementContainer}>
      <h2 className="text-xl font-semibold max-sm:text-center">
        Additional account data
      </h2>

      <div className="mt-8 pl-3 *:not-first:mt-5">
        <EditableData
          identifier={username}
          Icon={<Mail size={25} />}
          title="Email"
          description="We use this address for notifications"
          value={email}
          name="email"
        />

        <EditableData
          identifier={username}
          Icon={<User size={25} />}
          title="Full Name"
          description="This is your legal name used for identity verification and
                compliance purpose"
          value={fullName}
          name="fullName"
        />

        <UploadProfileImage
          profileImage={profileImage || ''}
          username={username || ''}
        />
      </div>
    </div>
  );
};
export default Additional;
