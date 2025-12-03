// 📌 Directives
'use client';

// 📦 Third-Party imports
import { AlignJustify, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~core/ui/shadcn/button';
import clsx from 'clsx';

// 📦 Internal imports
import { BlurWrapper } from '~core/ui/shared/overlays';
import { flexBetween } from '~styles/tw-custom';
import { NavLink } from '~core/global/NavLink';
import { useLockBodyScroll } from '~hooks/useLockBodyScroll';
import Logo from '../logo';
import Currencies from '../currency/Currencies';

// ⚙️ Functional component
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeOpenState = () => {
    setIsOpen((prev) => !prev);
  };

  useLockBodyScroll(isOpen);

  return (
    <div>
      <div>
        <AlignJustify onClick={changeOpenState} />
      </div>

      <BlurWrapper
        className={clsx(
          'invisible opacity-0 transition-all',
          isOpen && 'visible opacity-100',
        )}
      >
        <div
          className={clsx(
            'bg-background-lighter invisible fixed top-0 left-0 z-50 h-dvh w-[58dvw] -translate-x-96 overflow-y-auto rounded-r-sm p-5 transition-all duration-500 max-[33em]:w-[70dvw] max-[27.5em]:w-[95dvw]',
            isOpen && 'visible translate-x-0',
          )}
        >
          {/* Logo & Close button */}
          <div className={flexBetween}>
            <div>
              <Logo />
            </div>

            <Button variant={'secondary'} onClick={changeOpenState}>
              <X />
            </Button>
          </div>

          {/* Navbar */}
          <nav className="mt-10 flex flex-col gap-y-5 border-b pb-10 text-lg">
            <NavLink
              className="before:bg-foreground relative pl-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto before:h-1.5 before:w-1.5 before:rounded-full"
              href="/coins"
              activeClassName="bg-gradient-to-r rounded-sm  from-primary/50 via-primary/10 to-secondary opacity-100 from-1% via-5% to-150% before:hidden"
            >
              Coins
            </NavLink>
            <NavLink
              className="before:bg-foreground relative pl-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto before:h-1.5 before:w-1.5 before:rounded-full"
              href="/news"
              activeClassName="bg-gradient-to-r rounded-sm from-primary/50 via-primary/10 to-secondary opacity-100 from-1% via-5% to-150% before:hidden"
            >
              News
            </NavLink>
            <NavLink
              className="before:bg-foreground relative pl-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto before:h-1.5 before:w-1.5 before:rounded-full"
              href="/support"
              activeClassName="bg-gradient-to-r rounded-sm  from-primary/50 via-primary/10 to-secondary opacity-100 from-1% via-5% to-150% before:hidden"
            >
              Support
            </NavLink>
          </nav>

          {/* Currency */}
          <div>
            <Currencies />
          </div>
        </div>
      </BlurWrapper>
    </div>
  );
};
export default HamburgerMenu;
