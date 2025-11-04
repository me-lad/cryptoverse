// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import { Ellipsis } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { DashboardSidebarContext } from '../../Dashboard.context';

interface PropsT {
  title: string;
}

// ⚙️ Functional component
const Title: React.FC<PropsT> = ({ title }) => {
  const { action } = use(DashboardSidebarContext);

  return (
    <div className="px-4 text-sm opacity-70">
      {action?.getOpenState() ? (
        <h2 className="line-clamp-1">{title}</h2>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Ellipsis size={20} />
          </TooltipTrigger>
          <TooltipContent className="font-semibold" side="right">
            {title}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
export default Title;
