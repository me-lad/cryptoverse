// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import Image from 'next/image';
import React, { use } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '~core/ui/shadcn/button';
import { useTheme } from 'next-themes';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { DashboardSidebarMenuItemT } from '~types/dashboard';
import { DashboardSidebarContext } from '../../Dashboard.context';
import { NavLink } from '~core/global/NavLink';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import { useIsMounted } from '~hooks/useIsMounted';

// ⚙️ Functional components
const InnerUi: React.FC<DashboardSidebarMenuItemT> = (props) => {
  const { icon, title } = props;
  const { action } = use(DashboardSidebarContext);
  const { theme } = useTheme();

  const mounted = useIsMounted();

  return (
    <>
      <TooltipTrigger asChild>
        {mounted && !!theme ? (
          <Image
            className={clsx('', theme === 'light' && 'invert-100')}
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
    </>
  );
};

const SimpleItem: React.FC<DashboardSidebarMenuItemT> = (props) => {
  const { url, title, subItems } = props;
  const { action } = use(DashboardSidebarContext);

  const pathname = usePathname();
  const isContentActive = subItems?.find((item) => item.url === pathname);

  return (
    <>
      {url ? (
        <Button
          className={clsx(
            'mt-1.5 w-full cursor-pointer overflow-hidden',
            url === pathname && '!bg-transparent',
          )}
          variant={'ghost'}
        >
          <Tooltip>
            <NavLink
              className={clsx(
                'relative flex h-full w-full items-center gap-4',
                action?.getOpenState() ? 'justify-start' : 'justify-center',
              )}
              href={url}
              activeClassName={clsx(
                'before:absolute  before:-z-[2] before:h-full before:py-[1.1rem] before:rounded-sm before:-left-5',

                action?.getOpenState() ? 'before:w-[120%]' : 'before:w-[800%]',

                'before:bg-gradient-to-r before:from-primary before:via-primary/10 before:to-secondary before:opacity-100 before:from-5% before:via-5% before:to-150%',
              )}
            >
              <InnerUi {...props} />
            </NavLink>
          </Tooltip>
        </Button>
      ) : (
        <DropDownAggregator>
          <DropDownTrigger>
            <Button
              className={clsx(
                'relative mt-1.5 w-full cursor-pointer overflow-hidden',
                !!isContentActive &&
                  'before:from-primary before:via-primary/10 before:to-secondary before:absolute before:left-0 before:-z-[2] before:h-full before:w-[100%] before:rounded-sm before:bg-gradient-to-r before:from-[8%] before:via-[8%] before:to-150% before:py-[1.1rem] before:opacity-100',
              )}
              variant={'ghost'}
            >
              <Tooltip>
                <InnerUi {...props} />
              </Tooltip>
            </Button>
          </DropDownTrigger>

          <DropDownMenu
            side="right"
            className="!fixed !top-[18%] !right-0 !left-[8.5rem] z-50 ml-8 h-fit w-fit overflow-hidden !shadow-none"
          >
            <div className="border-b border-neutral-400 px-4 py-2 text-start text-sm dark:border-neutral-700">
              {title}
            </div>

            <div>
              {subItems?.map((item) => (
                <NavLink
                  className="block w-full text-start"
                  key={item.title}
                  href={item.url!}
                  activeClassName="text-primary-400"
                >
                  <Button
                    className="w-full cursor-pointer !justify-start rounded-none"
                    variant={'ghost'}
                  >
                    {item.title}
                  </Button>
                </NavLink>
              ))}
            </div>
          </DropDownMenu>
        </DropDownAggregator>
      )}
    </>
  );
};
export default SimpleItem;
