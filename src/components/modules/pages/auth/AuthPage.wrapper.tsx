// 📦 Third-Party imports
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { Button } from '~core/ui/shadcn/button';
import Pattern from './background-pattern/Pattern';

// 🧾 Local types
type PropsT = {
  iconPath: string;
  subtitleText: string;
  backButtonVisibility?: boolean;
  backButtonPath?: string;
  children: React.ReactNode;
};

// ⚙️ Functional component
const AuthPageWrapper: React.FC<PropsT> = ({
  iconPath,
  subtitleText,
  backButtonVisibility,
  backButtonPath,
  children,
}) => {
  return (
    <>
      {/* Page pattern */}
      <div className="max-lg:hidden">
        <Pattern />
      </div>

      {/* Page content */}
      <div className={clsx('relative z-[2] h-screen w-full', flexCenter)}>
        <div
          className={clsx(
            'border-t-primary overflow-x-hidden rounded-md border border-t-2 border-neutral-800 bg-[rgba(0,0,0,0.15)] backdrop-brightness-105',
            'py-5 min-[27.5em]:py-8 min-[33em]:py-12',
            '!no-scrollbar h-fit max-h-[95dvh]',
            'px-8 min-[27.5em]:px-12 min-[33em]:px-18 min-[36em]:px-24 md:px-36',
            'w-fit max-w-[97.5%] min-[29em]:max-w-[95%] lg:max-w-4/6 xl:max-w-3/6',
          )}
        >
          {/* Form heading */}
          <div>
            {/* Icon */}
            <div className={clsx('gap-4 select-none', flexCenter)}>
              <Image
                src="/svgs/auth-page/auth-pattern-form-left.svg"
                alt={'Auth page'}
                width={98}
                height={36}
                className="max-[25em]:hidden"
              />
              <Image src={iconPath} alt={subtitleText} width={80} height={50} />
              <Image
                src="/svgs/auth-page/auth-pattern-form-right.svg"
                alt={subtitleText}
                width={98}
                height={36}
                className="max-[25em]:hidden"
              />
            </div>

            {/* Title */}
            <h2
              className={clsx(
                'mt-8 flex gap-x-2 text-2xl font-bold text-white max-[22.5em]:flex-col min-[33em]:text-3xl',
                flexCenter,
              )}
            >
              Welcome to
              <Link href={'/'} className="text-primary">
                CryptoVerse
              </Link>
            </h2>

            {/* Subtitle */}
            <p
              id="form-wrapper-subtitle"
              className="mt-2 text-center font-light tracking-wide text-neutral-400 min-[33em]:text-lg"
            >
              {subtitleText}
            </p>
          </div>

          {/* Form back button */}
          {backButtonVisibility && (
            <div className="absolute top-4 left-4">
              <Button variant="outline" size="default">
                <Link className="flex" href={backButtonPath || '/'}>
                  <ChevronLeft />
                  <span>Back</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Form content */}
          {children}
        </div>
      </div>
    </>
  );
};
export default AuthPageWrapper;
