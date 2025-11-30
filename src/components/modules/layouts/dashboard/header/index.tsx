// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';
import SidebarSettings from './SidebarSettings';
import SidebarOpener from './SidebarOpener';

// 🧾 Local types
interface PropsT {
  title: string;
}

// ⚙️ Functional component
const DashboardHeader: React.FC<PropsT> = async ({ title }) => {
  return (
    <header className="bg-background max-h-[70px] w-full border-b border-neutral-400 px-4 py-4 sm:px-8 dark:border-neutral-700">
      <div className={`${flexBetween}`}>
        <div className="flex items-center">
          <SidebarOpener />
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-2.5 min-[28em]:gap-5">
          <SidebarSettings />
          <ThemeSwitcher />
          <div className="max-[28em]:hidden">
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
