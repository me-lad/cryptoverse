// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Lock, LockOpen, Pointer, PointerOff, Settings } from 'lucide-react';

// 📦 Internal imports
import type { DashboardSidebarSettingsT } from '~types/dashboard';
import { DashboardSidebarContext } from '../Dashboard.context';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/core/ui/shadcn/tooltip';
import clsx from 'clsx';

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
    <DropDownAggregator hideScroll={false}>
      <DropDownTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="border-b-foreground/35 cursor-pointer border-y-2 border-t-transparent"
              variant={'ghost'}
              size={'icon'}
            >
              <Settings />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sidebar Settings</TooltipContent>
        </Tooltip>
      </DropDownTrigger>

      <DropDownMenu className="mt-2.5 overflow-hidden !shadow-none">
        <Button
          className={clsx(
            'justify text-foreground w-full cursor-pointer !rounded-none',
            settings.hoverable && !settings.disabled && '!text-primary',
          )}
          size={'lg'}
          variant={'ghost'}
          disabled={settings.disabled}
          onClick={() => changeHandler('hoverable', !settings.hoverable)}
        >
          {settings.hoverable && !settings.disabled ? (
            <Pointer />
          ) : (
            <PointerOff />
          )}
          Hover
        </Button>

        <Button
          className={clsx(
            'justify text-foreground w-full cursor-pointer !rounded-none',
            settings.disabled && '!text-primary',
          )}
          size={'lg'}
          variant={'ghost'}
          onClick={() => changeHandler('disabled', !settings.disabled)}
        >
          {settings.disabled ? <Lock /> : <LockOpen />}
          Disable
        </Button>
      </DropDownMenu>
      {/* <DropDownMenu className="mt-2.5 flex flex-col gap-y-2 overflow-hidden px-5 py-2.5 !shadow-none">
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
      </DropDownMenu> */}
    </DropDownAggregator>
  );
};
export default SidebarSettings;
