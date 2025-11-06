// 📌 Directives
'use client';

// 📦 Third-Party imports
import Image from 'next/image';
import clsx from 'clsx';
import React, { useState, lazy, Suspense } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { Spinner } from '@/components/core/ui/shadcn/spinner';
const TradingViewChart = lazy(
  () => import('~core/global/trading-view/AdvanceChart'),
);

// 🧾 Local types
interface PropsT {
  coinName: string;
  coinSymbol: string;
  children: React.ReactNode;
}

type ChartSelectT = 'TradingView' | 'CryptoVerse';

// ⚙️ Functional component
const ChartsWrapper: React.FC<PropsT> = ({
  coinName,
  coinSymbol,
  children,
}) => {
  const [selectedChart, setSelectedChart] =
    useState<ChartSelectT>('CryptoVerse');

  return (
    <div className="bg-background-lighter relative rounded-sm p-8">
      <div
        className={clsx(
          'bg-background-lighter absolute -top-14 right-5 rounded-sm px-10 py-2.5',
          'before:bg-background-lighter before:absolute before:top-full before:left-2.5 before:h-5 before:w-1',
          'after:bg-background-lighter after:absolute after:top-full after:right-2.5 after:h-5 after:w-1',
        )}
      >
        <div className={`${flexCenter} relative gap-8 rounded-[9999px]`}>
          <Tooltip>
            <TooltipTrigger
              onClick={() => setSelectedChart('CryptoVerse')}
              className="relative z-[2] cursor-pointer"
            >
              <Image
                src={'/svgs/logo/logo.svg'}
                width={35}
                height={35}
                alt="Crypto Verse"
              />
            </TooltipTrigger>

            <TooltipContent side="left" className="font-semibold">
              Crypto Verse Chart
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() => setSelectedChart('TradingView')}
              className="relative z-[2] cursor-pointer"
            >
              <Image
                src={'/svgs/logo/trading-view.svg'}
                width={28}
                height={28}
                alt="Crypto Verse"
              />
            </TooltipTrigger>

            <TooltipContent side="right" className="font-semibold">
              Trading View Chart
            </TooltipContent>
          </Tooltip>

          <span
            className={clsx(
              'bg-background absolute -left-3.5 z-[1] h-[120%] w-2/3 rounded-sm transition-all',
              selectedChart === 'CryptoVerse'
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0',
            )}
          ></span>
          <span
            className={clsx(
              'bg-background absolute -right-[1.15rem] z-[1] h-[120%] w-2/3 rounded-sm transition-all',
              selectedChart === 'TradingView'
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0',
            )}
          ></span>
        </div>
      </div>

      <div>
        {selectedChart === 'TradingView' ? (
          <Suspense
            fallback={
              <div className={`${flexCenter} min-h-96`}>
                <Spinner
                  variant="circle"
                  size={80}
                  color="var(--color-primary)"
                />
              </div>
            }
          >
            <h2 className="px-1 text-xl font-semibold">
              {coinName.slice(0, 1).toUpperCase() + coinName.slice(1)}{' '}
              Historical Data
            </h2>
            <div className="mt-8 overflow-hidden rounded-sm outline-1">
              <TradingViewChart symbol={coinSymbol} theme="dark" height={500} />
            </div>
          </Suspense>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
export default ChartsWrapper;
