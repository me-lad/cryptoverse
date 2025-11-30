// 📦 Third-Party imports
import { Bell, Coins, Shield, User } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { NavLink } from '~core/global/NavLink';
import { flexCenter } from '~styles/tw-custom';
import ContentLayout from './content-layout';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const AccountManagementWrapper: React.FC<PropsT> = ({ children }) => {
  return (
    <ContentLayout>
      <div
        className={clsx(
          'grid items-center gap-y-5',
          'min-[66em]:grid-cols-4',
          'min-[29em]:grid-cols-2',
        )}
      >
        <NavLink
          href="/dashboard/account-management"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 opacity-75`}
          activeClassName="border-primary !opacity-100"
        >
          <User size={20} />
          Personal Information
        </NavLink>

        <NavLink
          href="/dashboard/account-management/security"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 opacity-75`}
          activeClassName="border-primary !opacity-100"
        >
          <Shield size={20} />
          Security
        </NavLink>

        <NavLink
          href="/dashboard/account-management/trading"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 opacity-75`}
          activeClassName="border-primary !opacity-100"
        >
          <Coins size={20} />
          Trading
        </NavLink>

        <NavLink
          href="/dashboard/account-management/notification"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 opacity-75`}
          activeClassName="border-primary !opacity-100"
        >
          <Bell size={20} />
          Notification
        </NavLink>
      </div>

      <div className="mt-16">{children}</div>
    </ContentLayout>
  );
};
export default AccountManagementWrapper;
