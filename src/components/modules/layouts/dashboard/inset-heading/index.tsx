// 📌 Directives

// 📦 Third-Party imports
import Link from 'next/link';
import React from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Home } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';

// 🧾 Local types
interface PropsT {
  title: string;
}

// ⚙️ Functional component
const InsetHeading: React.FC<PropsT> = async ({ title }) => {
  return (
    <div className="bg-background-lighter w-full rounded-sm px-7 py-4">
      <div className={flexBetween}>
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="flex items-center gap-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="cursor-pointer"
                variant={'outline'}
                size={'icon'}
              >
                <Link href={'/'}>
                  <Home />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>

          <ThemeSwitcher />
          <Profile />
        </div>
      </div>
    </div>
  );
};
export default InsetHeading;
