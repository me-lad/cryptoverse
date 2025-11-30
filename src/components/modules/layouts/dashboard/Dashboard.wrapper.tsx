// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from './Dashboard.context';
import { DarkOverlay } from '~core/ui/shared/overlays';
import Sidebar from './sidebar';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DashboardWrapper: React.FC<PropsT> = ({ children }) => {
  const { flags, getters } = use(DashboardSidebarContext);

  return (
    <>
      <Sidebar />

      <div
        className={cn(
          'bg-background-lighter min-h-[calc(100vh_-_70px)] overflow-hidden transition-[margin-left] duration-300 ease-in-out',
          !flags.isDisabled &&
            (!getters?.getOpenState() ? 'lg:ml-[110px]' : 'lg:ml-72'),
        )}
      >
        <div
          className={cn(
            'block lg:hidden',
            !getters?.getOpenState() && '!hidden',
          )}
        >
          <DarkOverlay />
        </div>
        {children}
      </div>
    </>
  );
};
export default DashboardWrapper;
