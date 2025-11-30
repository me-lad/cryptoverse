// 📦 Third-Party imports
import { Bell, Coins, Shield, User } from 'lucide-react';
import React from 'react';

// 📦 Internal imports
import { NavLink } from '~core/global/NavLink';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const AccountManagementWrapper: React.FC<PropsT> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center">
        <NavLink
          href="/dashboard/account-management"
          className={`${flexCenter} gap-2 rounded-l-sm border-b-2 border-neutral-500 pb-2.5 text-neutral-400`}
          activeClassName="border-primary !text-foreground"
        >
          <User size={20} />
          Personal Information
        </NavLink>

        <NavLink
          href="/dashboard/account-management/security"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 text-neutral-400`}
          activeClassName="border-primary !text-foreground"
        >
          <Shield size={20} />
          Security
        </NavLink>

        <NavLink
          href="/dashboard/account-management/trading"
          className={`${flexCenter} gap-2 border-b-2 border-neutral-500 pb-2.5 text-neutral-400`}
          activeClassName="border-primary !text-foreground"
        >
          <Coins size={20} />
          Trading
        </NavLink>

        <NavLink
          href="/dashboard/account-management/notification"
          className={`${flexCenter} gap-2 rounded-r-sm border-b-2 border-neutral-500 pb-2.5 text-neutral-400`}
          activeClassName="border-primary !text-foreground"
        >
          <Bell size={20} />
          Notification
        </NavLink>
      </div>

      <div className="mt-16">{children}</div>
    </>
  );
};
export default AccountManagementWrapper;
