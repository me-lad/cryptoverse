// 📦 Third-Party imports
import React, { ReactElement } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { GetCoinData } from '@/lib/types/api-generated/coins/getCoinData';
import { flexBetween } from '~styles/tw-custom';
import { Price } from '~core/global/formatters';

// ⚙️ Functional components
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactElement;
}) => {
  return (
    <div className={`${flexBetween} mt-2.5`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

const CoinAdditionalInformation: React.FC<GetCoinData> = (props) => {
  const {
    genesis_date,
    hashing_algorithm,
    market_cap_rank,
    market_data,
    id,
    symbol,
  } = props;

  const { total_supply, circulating_supply, ath, atl, ath_date, atl_date } =
    market_data;

  const dateFormatterOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  };

  const timeFormatter = (date: Date) => {
    return new Date(date).toLocaleString('en-US', dateFormatterOptions);
  };

  return (
    <div className="h-full w-full *:text-sm *:max-[20.75em]:!text-xs">
      <InfoItem label="Name ( Symbol )" value={`${id}  ( ${symbol} )`} />
      <InfoItem label="Genesis Date" value={timeFormatter(genesis_date)} />
      <InfoItem label="Hashing Algorithm" value={hashing_algorithm} />
      <InfoItem label="Market Cap Rank" value={market_cap_rank.toString()} />
      <InfoItem
        label="Total Supply"
        value={
          <Tooltip>
            <TooltipTrigger>
              <Price price={total_supply} shortenUnits hideImage />
            </TooltipTrigger>
            <TooltipContent>
              <Price price={total_supply} hideImage />
            </TooltipContent>
          </Tooltip>
        }
      />
      <InfoItem
        label="Circulating Supply"
        value={
          <Tooltip>
            <TooltipTrigger>
              <Price price={circulating_supply} shortenUnits hideImage />
            </TooltipTrigger>
            <TooltipContent>
              <Price price={total_supply} hideImage />
            </TooltipContent>
          </Tooltip>
        }
      />
      <InfoItem
        label="ATL Data"
        value={
          <div className="flex items-center gap-2">
            <Price
              imageHeight={19}
              imageWidth={19}
              className="border-r border-neutral-300 pr-2 text-sm"
              price={atl.usd}
            />
            {timeFormatter(atl_date.usd)}
          </div>
        }
      />
      <InfoItem
        label="ATH Data"
        value={
          <div className="flex items-center gap-2">
            <Price
              imageHeight={19}
              imageWidth={19}
              className="border-r border-neutral-300 pr-2 text-sm"
              price={ath.usd}
            />
            {timeFormatter(ath_date.usd)}
          </div>
        }
      />
    </div>
  );
};
export default CoinAdditionalInformation;
