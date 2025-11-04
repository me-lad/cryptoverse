'use client';

// 📦 Third-Party imports
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { use } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { DashboardSidebarContext } from '../../Dashboard.context';

// ⚙️ Functional component
const HeadingLogo = () => {
  const { action } = use(DashboardSidebarContext);

  return (
    <div className="relative h-10 w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={clsx(
              'relative flex h-full w-full justify-center pt-1',
              action?.getOpenState() && 'hidden',
            )}
          >
            <Link href={'/'}>
              <Image
                className="scale-[65%]"
                src={'/svgs/logo/logo.svg'}
                fill
                alt="Crypto Verse"
              />
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">Crypto Verse</TooltipContent>
      </Tooltip>

      <Link href={'/'}>
        <Image
          src={'/svgs/logo/logo-text.svg'}
          fill
          alt="Crypto Verse"
          className={clsx(!action?.getOpenState() && 'hidden')}
        />
      </Link>

      <span className="absolute top-full mt-3 block h-[1px] w-full bg-neutral-400 dark:bg-neutral-700"></span>
    </div>
  );
};
export default HeadingLogo;
