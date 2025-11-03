// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Button } from '@/components/core/ui/shadcn/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const SidebarToggler = () => {
  const { isOpen, action } = use(DashboardSidebarContext);

  return (
    <div className="invisible absolute top-5 -right-[16px] z-20 lg:visible">
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
            !isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    </div>
  );
};
export default SidebarToggler;
