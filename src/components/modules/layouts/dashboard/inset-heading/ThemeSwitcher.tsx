// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Button } from '~core/ui/shadcn/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// ⚙️ Functional component
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) return null;

  return (
    <DropDownAggregator>
      <DropDownTrigger activeClassName="*:!bg-primary/85">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="cursor-pointer"
              variant={'outline'}
              size={'icon'}
            >
              <Image
                src={'/svgs/theme/theme-toggle.svg'}
                width={24}
                height={24}
                alt="Theme Toggler"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Switch Theme</TooltipContent>
        </Tooltip>
      </DropDownTrigger>

      <DropDownMenu className="mt-2.5 overflow-hidden">
        {['dark', 'light', 'system'].map((t) => (
          <Button
            key={t}
            className={clsx(
              'w-full cursor-pointer !rounded-none text-white',
              theme === t && '!bg-primary',
            )}
            size={'lg'}
            variant={'ghost'}
            onClick={() => setTheme(t)}
          >
            {t.slice(0, 1).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default ThemeSwitcher;
