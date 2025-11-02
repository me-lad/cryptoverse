// 📌 Directives
'use client';

// 📦 Third-Party imports

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import {
  SidebarProvider,
  Sidebar as ShadSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
} from '~core/ui/shadcn/sidebar';

// 📦 Internal imports

// ⚙️ Functional component
const Sidebar = () => {
  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute top-2 -right-4 z-[11]">
            <SidebarTrigger />
          </div>
        </TooltipTrigger>

        <TooltipContent className="rounded-[9999px] font-bold">
          Ctrl + B
        </TooltipContent>
      </Tooltip>

      <ShadSidebar
        className="*:!bg-background-lighter !absolute !border-none *:!rounded-sm"
        collapsible="icon"
      ></ShadSidebar>
    </div>
  );
};
export default Sidebar;
