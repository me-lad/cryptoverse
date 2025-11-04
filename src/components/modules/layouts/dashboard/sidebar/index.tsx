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
  const { settings, action } = use(DashboardSidebarContext);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        !action?.getOpenState() ? 'w-[110px]' : 'w-72',
        settings.disabled && 'hidden',
      )}
    >
      <SidebarToggler />

      <div
        onMouseEnter={() => action?.setHoverState(true)}
        onMouseLeave={() => action?.setHoverState(false)}
        className="!no-scrollbar relative flex h-full flex-col overflow-y-auto border-r border-neutral-400 px-3 pt-4 dark:border-neutral-700"
      >
        <SidebarMenu />
      </div>
    </aside>
  );
};
export default Sidebar;
