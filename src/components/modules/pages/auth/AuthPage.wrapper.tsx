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
      <div
        className={clsx(
          'relative z-[2] min-h-screen w-full lg:py-5',
          flexCenter,
        )}
      >
        <div
          className={clsx(
            'border-t-primary border border-t-2 border-neutral-800 lg:rounded-md',

            'w-screen max-lg:min-h-screen lg:w-[60dvw] xl:w-[45dvw]',

            'p-5 sm:p-20',

            'bg-[rgba(0,0,0,0.15)] lg:backdrop-blur-xs',

            `${flexCenter} flex-col`,
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
                'mt-8 flex gap-x-2 text-2xl font-bold text-white max-[24em]:flex-col min-[33em]:text-3xl',
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
              <Link href={backButtonPath || '/'}>
                <Button
                  className="cursor-pointer !gap-1"
                  variant="outline"
                  size="default"
                >
                  <ChevronLeft className="mt-0.5" strokeWidth={2.5} />
                  <span>Back</span>
                </Button>
              </Link>
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
