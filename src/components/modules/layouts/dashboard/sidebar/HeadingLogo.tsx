'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Home } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const HeadingLogo = () => {
  const { isOpen } = use(DashboardSidebarContext);

  return (
    <div className="relative h-10 w-full">
      <div
        className={clsx('flex w-full justify-center pt-1', isOpen && 'hidden')}
      >
        <Button className="w-10/12" variant={'outline'} size={'icon'}>
          <Home />
        </Button>
      </div>

      <Image
        src={'/svgs/logo/logo-text.svg'}
        fill
        alt="Crypto Verse"
        className={clsx(!isOpen && 'hidden')}
      />
    </div>
  );
};
export default HeadingLogo;
