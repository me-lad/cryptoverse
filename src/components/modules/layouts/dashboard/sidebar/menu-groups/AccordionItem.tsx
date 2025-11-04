// 📌 Directives
'use client';

// 📦 Third-Party imports
import Image from 'next/image';
import clsx from 'clsx';
import React, { use } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Dot } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem as ShadAccordionItem,
} from '~core/ui/shadcn/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { DashboardSidebarMenuItemT } from '~types/dashboard';
import { DashboardSidebarContext } from '../../Dashboard.context';
import { NavLink } from '~core/global/NavLink';

// ⚙️ Functional component
const AccordionItem: React.FC<DashboardSidebarMenuItemT> = (props) => {
  const { title, icon, subItems } = props;
  const { action } = use(DashboardSidebarContext);
  const { theme } = useTheme();

  return (
    <Accordion type="multiple" className="w-full">
      <ShadAccordionItem value="1">
        <AccordionTrigger className="hover:bg-secondary mt-1.5 flex w-full cursor-pointer justify-start gap-2.5 px-4 py-2 *:last:mt-0.5 *:last:fill-white *:last:stroke-1">
          <Tooltip>
            <TooltipTrigger asChild>
              {!!theme ? (
                <Image
                  className={clsx(theme === 'light' && 'invert-100')}
                  src={icon}
                  width={22}
                  height={22}
                  alt={title}
                />
              ) : (
                <Skeleton className="size-6" />
              )}
            </TooltipTrigger>

            {action?.getOpenState() ? (
              <p className="line-clamp-1">{title}</p>
            ) : (
              <TooltipContent side="right">{title}</TooltipContent>
            )}
          </Tooltip>
        </AccordionTrigger>

        <AccordionContent className="px-4 py-1.5">
          {subItems?.map((item) => (
            <NavLink href={item.url!} key={item.title}>
              <Button
                className="mt-1.5 w-full cursor-pointer justify-start"
                variant={'ghost'}
              >
                <Dot strokeWidth={6} />
                <p className="line-clamp-1">{item.title}</p>
              </Button>
            </NavLink>
          ))}
        </AccordionContent>
      </ShadAccordionItem>
    </Accordion>
  );
};
export default AccordionItem;
