// 📌 Directives

// 📦 Third-Party imports
import Image from 'next/image';
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
import { AuthServices } from '~services/auth';
import { extractUsername } from '~helpers/generators';

// 🧾 Local types
interface PropsT {
  title: string;
}

// ⚙️ Functional component
const InsetHeading: React.FC<PropsT> = async ({ title }) => {
  const { username } = await AuthServices.verifyAccessSession();

  if (!username) return null;

  return (
    <div className="bg-background-lighter w-full rounded-sm p-5">
      <div className={flexBetween}>
        {/* <Link href={'/'}>
          <Image
            src={'/svgs/logo/logo-text.svg'}
            width={180}
            height={40}
            alt="Crypto Verse"
          />
        </Link> */}
        <h1 className="text-xl font-semibold">{title}</h1>

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
            <TooltipContent side="bottom">Home</TooltipContent>
          </Tooltip>

          <Button className="cursor-pointer" variant={'outline'} size={'icon'}>
            <Image
              src={'/svgs/theme/theme-toggle.svg'}
              width={24}
              height={24}
              alt="Theme Toggler"
            />
          </Button>
          <Button className="cursor-pointer" variant={'outline'} size={'icon'}>
            {extractUsername(username)}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InsetHeading;
