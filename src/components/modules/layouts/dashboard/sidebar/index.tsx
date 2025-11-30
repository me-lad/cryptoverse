// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';
import SidebarToggler from './Toggler';
import SidebarMenu from './Menu';

// ⚙️ Functional component
const Sidebar = () => {
  const { flags, actions, getters } = use(DashboardSidebarContext);

  return (
    <aside
      className={cn(
        'max-lg:bg-background fixed top-0 left-0 z-50 h-screen transition-[width] duration-300 ease-in-out lg:translate-x-0',
        !getters?.getOpenState() ? 'w-[110px] -translate-x-full' : 'w-72',
        flags.isDisabled && 'hidden',
      )}
    >
      <SidebarToggler />

      <div
        onMouseEnter={() => actions?.setFlags('isHovered', true)}
        onMouseLeave={() => actions?.setFlags('isHovered', false)}
        className="!no-scrollbar relative flex h-full flex-col overflow-y-auto border-r border-neutral-400 px-3 pt-4 dark:border-neutral-700"
      >
        <SidebarMenu />
      </div>
    </aside>
  );
};
export default Sidebar;
