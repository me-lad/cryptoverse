// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { TableCell, TableRow } from '~core/ui/shadcn/table';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

// 📦 Internal imports
import type { Coin } from '~types/api-generated/getTrendingCoins';
import type { CoinEntity_Compare } from '~types/api-generated/shared';
import { Percentage, Price } from '~core/global/formatters';

// 🧾 Local types
type PropsT =
  | {
      data: CoinEntity_Compare;
      source: 'Compare';
      index: number;
    }
  | {
      data: Coin;
      source: 'Gecko';
      index: number;
    };

// ⚙️ Functional component
const TableBodyItem: React.FC<PropsT> = (props) => {
  const { data, index, source } = props;

  const name = source === 'Compare' ? data.NAME : data.item.name;
  const symbol = source === 'Compare' ? data.SYMBOL : data.item.symbol;
  const logo = source === 'Compare' ? data.LOGO_URL : data.item.small;
  const price = source === 'Compare' ? data.PRICE_USD : data.item.data.price;
  const changePercentage =
    source === 'Compare'
      ? data.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD
      : data.item.data.price_change_percentage_24h.usd;

  return (
    <TableRow
      className={clsx(
        '!border-0 !outline-0 hover:cursor-pointer',
        index % 2 === 0 && 'bg-background/60 hover:bg-background',
      )}
    >
      <TableCell className="flex min-w-max items-center gap-4 max-[23em]:gap-2">
        <Image
          className="rounded-full"
          src={logo}
          width={22}
          height={22}
          alt={name}
        />
        <span title={name}>{symbol}</span>
      </TableCell>
      <TableCell className="min-w-max max-sm:px-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Price
              className="w-fit"
              price={price || 0}
              imageHeight={20}
              imageWidth={20}
            />
          </TooltipTrigger>

          {!!price && (
            <TooltipContent>
              <Price
                price={price}
                darkTheme
                imageHeight={19}
                imageWidth={19}
                fullPrecision
              />
            </TooltipContent>
          )}
        </Tooltip>
      </TableCell>
      <TableCell className="min-w-max max-sm:px-5">
        <Tooltip>
          <TooltipTrigger>
            <Percentage
              percentage={changePercentage || 0}
              iconSize={15}
              fontSize="0.9rem"
            />
          </TooltipTrigger>

          {!!changePercentage && (
            <TooltipContent>{changePercentage}</TooltipContent>
          )}
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
export default TableBodyItem;
