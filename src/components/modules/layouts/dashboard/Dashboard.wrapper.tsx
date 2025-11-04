// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from './Dashboard.context';
import Sidebar from './sidebar';
import DashboardFooter from './footer';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DashboardWrapper: React.FC<PropsT> = ({ children }) => {
  const { settings, action } = use(DashboardSidebarContext);

  return (
    <>
      <Sidebar />

      <div
        className={cn(
          'bg-background-lighter min-h-[calc(100vh_-_70px)] overflow-hidden transition-[margin-left] duration-300 ease-in-out',
          !settings.disabled &&
            (!action?.getOpenState() ? 'lg:ml-[110px]' : 'lg:ml-72'),
        )}
      >
        {/* Each route content (e.g /dashboard | /dashboard/settings | etc...) */}
        {children}
      </div>
      <footer
        className={cn(
          'bg-background max-h-[70px] border-t border-neutral-400 transition-[margin-left] duration-300 ease-in-out dark:border-neutral-700',
          !settings.disabled &&
            (!action?.getOpenState() ? 'lg:ml-[110px]' : 'lg:ml-72'),
        )}
      >
        <DashboardFooter />
      </footer>
    </>
  );
};
export default DashboardWrapper;
