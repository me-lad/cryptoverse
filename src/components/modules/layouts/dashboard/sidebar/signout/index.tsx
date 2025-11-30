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
import { useRouter } from 'next/navigation';

// 📦 Internal imports
import { DashboardSidebarContext } from '../../Dashboard.context';
import { errorToast } from '~vendors/react-toastify';

// ⚙️ Functional component
const Signout = () => {
  const { getters } = use(DashboardSidebarContext);
  const router = useRouter();

  const signoutHandler = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const fetchUrl = `${baseUrl}/api/auth/signout`;
      const resp = await fetch(fetchUrl, { method: 'POST' });
      const json = await resp.json();

      if (resp.ok) router.push('/');
      else errorToast(json.message || 'Signout failed');
    } catch {
      errorToast('Network error during signout');
    }
  };

  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          className="mb-4 h-9 w-full cursor-pointer justify-center"
          onClick={signoutHandler}
        >
          <span>
            <LogOut size={18} />
          </span>
          <p
            className={cn(
              'whitespace-nowrap',
              !getters?.getOpenState() ? 'hidden opacity-0' : 'opacity-100',
            )}
          >
            Sign out
          </p>
        </Button>
      </TooltipTrigger>
      {getters?.getOpenState() === false && (
        <TooltipContent side="right">Sign out</TooltipContent>
      )}
    </Tooltip>
  );
};
export default Signout;
