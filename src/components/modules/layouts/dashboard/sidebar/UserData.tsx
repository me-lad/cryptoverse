'use client';

// 📦 Third-Party imports
import { use } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const UserData = () => {
  const { action } = use(DashboardSidebarContext);

  return (
    <>
      <div
        className={clsx(
          'bg-primary-700 relative mt-10 overflow-hidden rounded-lg',
          !action?.getOpenState() && 'flex w-full justify-center',
        )}
      >
        <Image
          src={'/images/dashboard/avatar.png'}
          width={52}
          height={52}
          alt="MiladEsm"
        />
      </div>
      {action?.getOpenState() && (
        <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
          <h2 className="truncate text-sm font-semibold">hey 👋</h2>
          <p className="mt-0.5 truncate text-lg font-medium">MiladEsm</p>
        </div>
      )}
    </>
  );
};
export default UserData;
