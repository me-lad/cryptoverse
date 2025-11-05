// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';
import SidebarSettings from './SidebarSettings';

// 🧾 Local types
interface PropsT {
  title: string;
}

// ⚙️ Functional component
const DashboardHeader: React.FC<PropsT> = async ({ title }) => {
  return (
    <header className="bg-background max-h-[70px] w-full border-b border-neutral-400 px-7 py-4 dark:border-neutral-700">
      <div className={flexBetween}>
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="flex items-center gap-5">
          <SidebarSettings />
          <ThemeSwitcher />
          <Profile />
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
