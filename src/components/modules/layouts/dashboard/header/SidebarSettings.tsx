// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Lock, LockOpen, Pointer, PointerOff, Settings } from 'lucide-react';

// 📦 Internal imports
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
} from '~core/ui/shadcn/tooltip';
import clsx from 'clsx';

// ⚙️ Functional component
const SidebarSettings = () => {
  const { actions, flags } = use(DashboardSidebarContext);

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
            flags.isHoverable && !flags.isDisabled && '!text-primary',
          )}
          size={'lg'}
          variant={'ghost'}
          disabled={flags.isDisabled}
          onClick={() => actions?.setFlags('isHoverable', !flags.isHoverable)}
        >
          {flags.isHoverable && !flags.isDisabled ? (
            <Pointer />
          ) : (
            <PointerOff />
          )}
          Hover
        </Button>

        <Button
          className={clsx(
            'justify text-foreground w-full cursor-pointer !rounded-none',
            flags.isDisabled && '!text-primary',
          )}
          size={'lg'}
          variant={'ghost'}
          onClick={() => actions?.setFlags('isDisabled', !flags.isDisabled)}
        >
          {flags.isDisabled ? <Lock /> : <LockOpen />}
          Disable
        </Button>
      </DropDownMenu>
      {/* <DropDownMenu className="mt-2.5 flex flex-col gap-y-2 overflow-hidden px-5 py-2.5 !shadow-none">
        <label className="flex items-center gap-x-3 text-sm">
          <Checkbox
            defaultChecked={flags.isHoverable}
            className="!text-white"
            onClick={() => changeHandler('hoverable', !flags.isHoverable)}
          />
          <span>Hoverable</span>
        </label>
        <label className="flex items-center gap-x-3 text-sm">
          <Checkbox
            defaultChecked={flags.isDisabled}
            className="!text-white"
            onClick={() => changeHandler('disabled', !flags.isDisabled)}
          />
          <span>Disable</span>
        </label>
      </DropDownMenu> */}
    </DropDownAggregator>
  );
};
export default SidebarSettings;
