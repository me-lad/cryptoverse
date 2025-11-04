// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect } from 'react';
import { Button } from '@/components/core/ui/shadcn/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '~utils/shadcn';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const SidebarToggler = () => {
  const { action, settings } = use(DashboardSidebarContext);

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      const ctrlKey = event.ctrlKey;
      const key = event.code;

      if (key === 'KeyB' && ctrlKey) {
        action?.setOpenState((prev) => !prev);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keyup', keyboardHandler);
    }

    return () => window.removeEventListener('keyup', keyboardHandler);
  }, []);

  return (
    <div className="invisible absolute top-5 -right-[16px] z-20 lg:visible">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => action?.setOpenState((prev) => !prev)}
            className="size-8 cursor-pointer rounded-md"
            variant="secondary"
            size="icon"
          >
            <ChevronLeft
              strokeWidth={3}
              className={cn(
                'size-4 transition-transform duration-700 ease-in-out',
                !action?.getOpenState() ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
        </TooltipTrigger>

        {!settings.hoverable && (
          <TooltipContent className="rounded-[9999px] font-bold">
            Ctrl + B
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
};
export default SidebarToggler;
