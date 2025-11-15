// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import React, { Dispatch } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import type { ChartSourceT } from './local';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  source: ChartSourceT;
  changeSource: Dispatch<React.SetStateAction<ChartSourceT>>;
}

// ⚙️ Functional component
const SourceToggler: React.FC<PropsT> = ({ changeSource, source }) => {
  return (
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
            onClick={() => changeSource('CryptoVerse')}
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
            onClick={() => changeSource('TradingView')}
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
            source === 'CryptoVerse'
              ? 'translate-x-0 opacity-100'
              : 'translate-x-12 opacity-0',
          )}
        ></span>
        <span
          className={clsx(
            'bg-background absolute -right-[1.15rem] z-[1] h-[120%] w-2/3 rounded-sm transition-all',
            source === 'TradingView'
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0',
          )}
        ></span>
      </div>
    </div>
  );
};
export default SourceToggler;
