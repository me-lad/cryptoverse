// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '~utils/shadcn';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import clsx from 'clsx';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const SidebarToggler = () => {
  const { flags, getters, actions } = use(DashboardSidebarContext);

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      const ctrlKey = event.ctrlKey;
      const key = event.code;

      if (key === 'KeyB' && ctrlKey) {
        changeOpenState();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keyup', keyboardHandler);
    }

    return () => window.removeEventListener('keyup', keyboardHandler);
  }, [flags.isOpen]);

  const changeOpenState = () => {
    const newState = !flags.isOpen;
    actions?.setFlags('isOpen', newState);
  };

  return (
    <div
      className={clsx(
        'absolute top-5 -right-[16px] z-20',
        !getters?.getOpenState() && 'max-lg:hidden',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={changeOpenState}
            className="size-8 cursor-pointer rounded-md"
            variant="secondary"
            size="icon"
          >
            <ChevronLeft
              strokeWidth={3}
              className={cn(
                'size-4 transition-transform duration-700 ease-in-out',
                !getters?.getOpenState() ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
        </TooltipTrigger>

        {!flags.isHoverable && (
          <TooltipContent className="rounded-[9999px] font-bold">
            Ctrl + B
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
};
export default SidebarToggler;
