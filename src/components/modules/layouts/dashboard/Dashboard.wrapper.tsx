// 📌 Directives
'use client';

// 📦 Third-Party imports
import Sidebar from './sidebar';
import React, { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from './Dashboard.context';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DashboardWrapper: React.FC<PropsT> = ({ children }) => {
  const { isOpen, settings } = use(DashboardSidebarContext);

  return (
    <>
      <Sidebar />

      <div
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
          !settings.disabled && (!isOpen ? 'lg:ml-[110px]' : 'lg:ml-72'),
        )}
      >
        {children}
      </div>
      <footer
        className={cn(
          'transition-[margin-left] duration-300 ease-in-out',
          !settings.disabled && (!isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'),
        )}
      ></footer>
    </>
  );
};
export default DashboardWrapper;
