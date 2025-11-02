// 📌 Directives

// 📦 Third-Party imports
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { CoinEntity_Compare } from '~types/api-generated/shared';
import type { Coin } from '~types/api-generated/getTrendingCoins';
import { Percentage, Price } from '~core/global/formatters';

// 🧾 Local types
type PropsT =
  | {
      list: CoinEntity_Compare[];
      source: 'Compare';
    }
  | {
      list: Coin[];
      source: 'Gecko';
    };

// ⚙️ Functional component
const TableComp: React.FC<PropsT> = ({ list, source }) => {
  return (
    <div>
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow className="!border-0 !outline-0">
            <TableHead>Pair</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Change</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {source === 'Compare' &&
            list.map((item, index) => (
              <TableRow
                className={clsx(
                  '!border-0 !outline-0 hover:cursor-pointer',
                  index % 2 === 0 && 'bg-background/60 hover:bg-background',
                )}
                key={item.ID}
              >
                <TableCell className="flex items-center gap-4">
                  <Image
                    className="rounded-full"
                    src={item.LOGO_URL}
                    width={22}
                    height={22}
                    alt={item.NAME}
                  />
                  <span title={item.NAME}>{item.SYMBOL}</span>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Price className="w-fit" price={item.PRICE_USD || 0} />
                    </TooltipTrigger>

                    {!!item.PRICE_USD && (
                      <TooltipContent>
                        <Price
                          price={item.PRICE_USD}
                          darkTheme
                          imageHeight={19}
                          imageWidth={19}
                          fullPrecision
                        />
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Percentage
                        percentage={
                          item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD || 0
                        }
                        iconSize={15}
                        fontSize="0.9rem"
                      />
                    </TooltipTrigger>

                    {!!item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD && (
                      <TooltipContent>
                        {item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

          {source === 'Gecko' &&
            list.map(({ item }, index) => (
              <TableRow
                className={clsx(
                  '!border-0 !outline-0 hover:cursor-pointer',
                  index % 2 === 0 && 'bg-background/60 hover:bg-background',
                )}
                key={item.id}
              >
                <TableCell className="flex items-center gap-4">
                  <Image
                    className="rounded-full"
                    src={item.small}
                    width={22}
                    height={22}
                    alt={item.symbol}
                  />
                  <span title={item.id}>{item.symbol}</span>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Price price={item.data.price || 0} />
                    </TooltipTrigger>

                    <TooltipContent>
                      <Price
                        price={item.data.price || 0}
                        fullPrecision
                        darkTheme
                        imageHeight={19}
                        imageWidth={19}
                      />
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Percentage
                        percentage={item.data.price_change_percentage_24h.usd}
                        iconSize={15}
                        fontSize="0.9rem"
                      />
                    </TooltipTrigger>

                    <TooltipContent>
                      {item.data.price_change_percentage_24h.usd}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableComp;
