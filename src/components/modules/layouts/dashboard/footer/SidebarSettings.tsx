// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect } from 'react';
import { Checkbox } from '~core/ui/shadcn/checkbox';
import { Button } from '~core/ui/shadcn/button';
import { ChevronUp } from 'lucide-react';

// 📦 Internal imports
import type { DashboardSidebarSettingsT } from '~types/dashboard';
import { DashboardSidebarContext } from '../Dashboard.context';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// ⚙️ Functional component
const SidebarSettings = () => {
  const { action, settings } = use(DashboardSidebarContext);

  const changeHandler = (
    key: keyof DashboardSidebarSettingsT,
    newStatus: boolean,
  ) => {
    action?.setSettings((prev) => ({ ...prev, [key]: newStatus }));

    if (key === 'hoverable' && newStatus) {
      action?.setOpenState(false);
    }
  };

  return (
    <DropDownAggregator>
      <DropDownTrigger activeClassName="*:*:last:rotate-180">
        <Button variant={'secondary'} className="!px-5">
          Sidebar Settings
          <ChevronUp
            strokeWidth={3}
            className="mt-0.5 transition-all duration-300"
          />
        </Button>
      </DropDownTrigger>

      <DropDownMenu
        side="top"
        className="bg-secondary mb-2.5 flex w-full flex-col gap-y-2 p-2.5 !shadow-none"
      >
        <label className="flex items-center gap-x-3 text-sm">
          <Checkbox
            defaultChecked={settings.hoverable}
            className="!text-white"
            onClick={() => changeHandler('hoverable', !settings.hoverable)}
          />
          <span>Hoverable</span>
        </label>
        <label className="flex items-center gap-x-3 text-sm">
          <Checkbox
            defaultChecked={settings.disabled}
            className="!text-white"
            onClick={() => changeHandler('disabled', !settings.disabled)}
          />
          <span>Disable</span>
        </label>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default SidebarSettings;
