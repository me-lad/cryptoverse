// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { use } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from '../../Dashboard.context';

// ⚙️ Functional component
const Signout = () => {
  const { action } = use(DashboardSidebarContext);

  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          className="mb-4 h-9 w-full cursor-pointer justify-center"
        >
          <span>
            <LogOut size={18} />
          </span>
          <p
            className={cn(
              'whitespace-nowrap',
              !action?.getOpenState() ? 'hidden opacity-0' : 'opacity-100',
            )}
          >
            Sign out
          </p>
        </Button>
      </TooltipTrigger>
      {action?.getOpenState() === false && (
        <TooltipContent side="right">Sign out</TooltipContent>
      )}
    </Tooltip>
  );
};
export default Signout;
