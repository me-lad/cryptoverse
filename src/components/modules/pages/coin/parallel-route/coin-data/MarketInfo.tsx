// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { Price } from '~core/global/formatters';

// ⚙️ Functional component
const MarketInfo: React.FC<GetCoinData> = ({
  market_data,
  market_cap_rank,
}) => {
  return (
    <div className={`${flexBetween} mx-auto mt-8 w-10/12 gap-5`}>
      <div
        className={`${flexCenter} flex-col gap-2 *:text-xl *:text-neutral-200`}
      >
        <h2>Rank</h2>
        <span>{market_cap_rank}</span>
      </div>
      <div
        className={`${flexCenter} flex-col gap-2 *:text-xl *:text-neutral-200`}
      >
        <Tooltip>
          <h2>Market Cap</h2>
          <TooltipTrigger>
            <Price
              className="mr-2.5"
              price={market_data.market_cap.usd}
              shortenUnits
            />
          </TooltipTrigger>
          <TooltipContent>
            <Price
              imageHeight={18}
              imageWidth={18}
              price={market_data.market_cap.usd}
              darkTheme
            />
          </TooltipContent>
        </Tooltip>
      </div>
      <div
        className={`${flexCenter} flex-col gap-2 *:text-xl *:text-neutral-200`}
      >
        <h2>Total Volume</h2>
        <Tooltip>
          <TooltipTrigger>
            <Price
              className="mr-2.5"
              price={market_data.total_volume.usd}
              shortenUnits
            />
          </TooltipTrigger>
          <TooltipContent>
            <Price
              imageHeight={18}
              imageWidth={18}
              price={market_data.total_volume.usd}
              darkTheme
            />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
export default MarketInfo;
