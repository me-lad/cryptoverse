// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
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
// ⚙️ Functional components
const InnerUi: React.FC<DashboardSidebarMenuItemT> = (props) => {
  const { icon, title } = props;
  const { action } = use(DashboardSidebarContext);
  const { theme } = useTheme();

  return (
    <>
      <TooltipTrigger asChild>
        {!!theme ? (
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

  return (
    <>
      {url ? (
        <Button
          className="mt-1.5 w-full cursor-pointer overflow-hidden"
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
            <Button className="mt-1.5 w-full cursor-pointer" variant={'ghost'}>
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
                <Link
                  className="block w-full text-start"
                  key={item.title}
                  href={item.url!}
                >
                  <Button
                    className="w-full cursor-pointer !justify-start rounded-none"
                    variant={'ghost'}
                  >
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </DropDownMenu>
        </DropDownAggregator>
      )}
    </>
  );
};
export default SimpleItem;
