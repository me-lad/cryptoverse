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
import { Sun, Moon, Monitor } from 'lucide-react';
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
    <DropDownAggregator hideScroll={false}>
      <DropDownTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="cursor-pointer"
              variant={'secondary'}
              size={'icon'}
            >
              <Image
                src={'/svgs/theme/theme-toggle.svg'}
                width={24}
                height={24}
                alt="Theme Toggler"
                className={clsx(theme === 'light' && 'invert-[85]')}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Switch Theme</TooltipContent>
        </Tooltip>
      </DropDownTrigger>

      <DropDownMenu className="mt-2.5 overflow-hidden !shadow-none">
        {['dark', 'light', 'system'].map((t, index) => (
          <Button
            key={t}
            className={clsx(
              'justify text-foreground w-full cursor-pointer !rounded-none',
              theme === t && '!bg-primary',
            )}
            size={'lg'}
            variant={'ghost'}
            onClick={() => setTheme(t)}
          >
            {index === 0 ? <Moon /> : index === 1 ? <Sun /> : <Monitor />}
            {t.slice(0, 1).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default ThemeSwitcher;
