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
import { usePathname } from 'next/navigation';
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
import { useHasMounted } from '~hooks/useHasMounted';

// ⚙️ Functional component
const AccordionItem: React.FC<DashboardSidebarMenuItemT> = (props) => {
  const { title, icon, subItems } = props;
  const { action } = use(DashboardSidebarContext);
  const { theme } = useTheme();
  const mounted = useHasMounted();

  const pathname = usePathname();
  const isContentActive = subItems?.find((item) => item.url === pathname);

  return (
    <Accordion type="multiple" className="w-full">
      <ShadAccordionItem value={title}>
        <AccordionTrigger
          className={clsx(
            'hover:bg-secondary relative mt-1.5 flex w-full cursor-pointer justify-start gap-2.5 px-4 py-2 *:last:absolute *:last:right-2 *:last:mt-0.5 *:last:fill-white *:last:stroke-1',

            !!isContentActive && '!bg-transparent',

            !!isContentActive &&
              'before:from-primary before:via-primary/10 before:to-secondary before:absolute before:top-0 before:-left-0 before:-z-[2] before:h-full before:w-full before:rounded-sm before:bg-gradient-to-r before:from-4% before:via-4% before:to-150% before:py-[1.1rem] before:opacity-100',
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              {mounted && !!theme ? (
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
            <NavLink
              href={item.url!}
              key={item.title}
              activeClassName="*:!text-primary-400 *:font-bold"
            >
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
