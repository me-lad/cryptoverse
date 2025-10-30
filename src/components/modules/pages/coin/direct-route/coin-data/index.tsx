// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import {
  BellPlus,
  Clock,
  MoveDown,
  MoveUp,
  Newspaper,
  Star,
} from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { use } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';
import { Percentage, Price } from '~core/global/formatters';
import Link from 'next/link';

// ⚙️ Functional component
const CoinData: React.FC<GetCoinData> = (props) => {
  const { id, symbol, market_data, image } = props;
  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);

  const isFavoriteCoin = !!favoriteIDs ? favoriteIDs.includes(id) : false;

  return (
    <div className={`${flexBetween} border-b border-neutral-700 pb-8`}>
      <div className="flex items-center">
        {/* Name & Logo & Favorite handler */}
        <div className="flex items-center gap-2 border-r border-neutral-500 pr-10">
          <Button
            className={clsx(
              'cursor-pointer transition-all',
              !favoriteIDs && 'invisible opacity-0',
            )}
            variant={'ghost'}
            size={'icon'}
            onClick={() => changeHandler(id)}
          >
            <Star
              className={clsx(isFavoriteCoin && 'text-[#DBA400]')}
              fill={isFavoriteCoin ? '#DBA400' : 'transparent'}
            />
          </Button>
          <div>
            <Image
              src={image.large}
              width={42}
              height={42}
              alt={id}
              className="rounded-sm"
            />
          </div>
          <div className="ml-2">
            <h1 className="text-xl font-semibold">
              {id.slice(0, 1).toUpperCase() + id.slice(1)}
              <small className="block text-neutral-400">
                {symbol.toUpperCase()}
              </small>
            </h1>
          </div>
        </div>

        {/* Market data */}
        <div className="ml-10 flex items-center gap-8 *:min-w-28">
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p>Current Price</p>
            <Tooltip>
              <TooltipTrigger>
                <Price
                  className="mr-2"
                  imageHeight={26}
                  imageWidth={26}
                  price={market_data.current_price.usd}
                  shortenUnits
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Price
                  price={market_data.current_price.usd}
                  darkTheme
                  imageHeight={20}
                  imageWidth={20}
                />
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p className="flex items-center gap-2">
              <Clock size={15} />
              24h Change
            </p>
            <div className="mr-2 pt-1">
              <Percentage
                percentage={market_data.price_change_percentage_24h}
              />
            </div>
          </div>
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p className="flex items-center gap-2">
              <MoveUp size={15} />
              24 High
            </p>
            <Tooltip>
              <TooltipTrigger>
                <Price
                  className="mr-2"
                  imageHeight={26}
                  imageWidth={26}
                  price={market_data.high_24h.usd}
                  shortenUnits
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Price
                  price={market_data.high_24h.usd}
                  darkTheme
                  imageHeight={20}
                  imageWidth={20}
                />
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p className="flex items-center gap-2">
              <MoveDown size={15} />
              24 Low
            </p>
            <Tooltip>
              <TooltipTrigger>
                <Price
                  className="mr-2"
                  imageHeight={26}
                  imageWidth={26}
                  price={market_data.low_24h.usd}
                  shortenUnits
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Price
                  price={market_data.low_24h.usd}
                  darkTheme
                  imageHeight={20}
                  imageWidth={20}
                />
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p>Total Volume</p>
            <Tooltip>
              <TooltipTrigger>
                <Price
                  className="mr-2"
                  imageHeight={26}
                  imageWidth={26}
                  price={market_data.total_volume.usd}
                  shortenUnits
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Price
                  price={market_data.total_volume.usd}
                  darkTheme
                  imageHeight={20}
                  imageWidth={20}
                />
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`${flexCenter} flex-col gap-3.5`}>
            <p>Market Cap</p>
            <Tooltip>
              <TooltipTrigger>
                <Price
                  className="mr-2"
                  imageHeight={26}
                  imageWidth={26}
                  price={market_data.market_cap.usd}
                  shortenUnits
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Price
                  price={market_data.market_cap.usd}
                  darkTheme
                  imageHeight={20}
                  imageWidth={20}
                />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div>
        <Link
          href={`/news?searchString=${id}`}
          className="flex items-center gap-2.5"
        >
          <Button className="cursor-pointer" variant={'ghost'} size={'lg'}>
            <Newspaper />
            <p>News</p>
          </Button>
        </Link>

        <Link
          href={`/create-alert/${id}`}
          className="cup flex items-center gap-2.5"
        >
          <Button className="cursor-pointer" variant={'ghost'} size={'lg'}>
            <BellPlus />
            <p>Alert</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default CoinData;
