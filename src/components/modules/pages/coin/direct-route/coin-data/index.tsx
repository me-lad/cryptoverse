// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  BellPlus,
  Clock,
  MoveDown,
  MoveUp,
  Newspaper,
  Star,
} from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { use, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';
import { Percentage } from '~core/global/formatters';
import MetricBlock from './MetricBlock';

const CoinData: React.FC<GetCoinData> = ({
  id,
  symbol,
  market_data,
  image,
}) => {
  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);
  const [activeChangeIndex, setActiveChangeIndex] = useState(0);

  const isFavoriteCoin = favoriteIDs?.includes(id) ?? false;

  const priceChanges = useMemo(
    () => [
      { label: '24h', value: market_data.price_change_percentage_24h },
      { label: '7d', value: market_data.price_change_percentage_7d },
      { label: '14d', value: market_data.price_change_percentage_14d },
      { label: '30d', value: market_data.price_change_percentage_30d },
      { label: '60d', value: market_data.price_change_percentage_60d },
      { label: '200d', value: market_data.price_change_percentage_200d },
      { label: '1y', value: market_data.price_change_percentage_1y },
    ],
    [market_data],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChangeIndex((prev) => (prev + 1) % priceChanges.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [priceChanges.length]);

  return (
    <div className={`${flexBetween} border-b border-neutral-700 pb-8`}>
      <div className="flex items-center">
        {/* 🔖 Coin Identity */}
        <div className="flex items-center gap-2 border-r border-neutral-500 pr-10">
          <Button
            className={clsx(
              'cursor-pointer transition-all',
              !favoriteIDs && 'invisible opacity-0',
            )}
            variant="ghost"
            size="icon"
            onClick={() => changeHandler(id)}
          >
            <Star
              className={clsx(isFavoriteCoin && 'text-[#DBA400]')}
              fill={isFavoriteCoin ? '#DBA400' : 'transparent'}
            />
          </Button>
          <Image
            src={image.large}
            width={42}
            height={42}
            alt={id}
            className="rounded-sm"
          />
          <div className="ml-2">
            <h1 className="text-xl font-semibold">
              {id.charAt(0).toUpperCase() + id.slice(1)}
              <small className="block text-neutral-400">
                {symbol.toUpperCase()}
              </small>
            </h1>
          </div>
        </div>

        {/* 📊 Market Metrics */}
        <div className="ml-10 flex items-center gap-8 *:min-w-28">
          <MetricBlock
            label="Current Price"
            value={market_data.current_price.usd}
          />

          <div className="relative h-20 w-32 overflow-hidden">
            <div
              key={activeChangeIndex} // 👈 forces re-render for animation
              className={clsx(
                flexCenter,
                'animate-fade-in-up absolute top-0 h-full w-full flex-col gap-3.5 opacity-0 transition-all duration-500 ease-in-out',
              )}
            >
              <p
                className={clsx(
                  'flex items-center gap-2',
                  priceChanges[activeChangeIndex].value > 0
                    ? 'text-status-success-200'
                    : 'text-status-error-200',
                )}
              >
                <Clock size={15} />
                {priceChanges[activeChangeIndex].label}
              </p>
              <Percentage percentage={priceChanges[activeChangeIndex].value} />
            </div>
          </div>

          <MetricBlock
            label="24 High"
            icon={<MoveUp size={15} />}
            value={market_data.high_24h.usd}
          />

          <MetricBlock
            icon={<MoveDown size={15} />}
            value={market_data.low_24h.usd}
            label="24 Low"
          />

          <MetricBlock
            label="Total Volume"
            value={market_data.total_volume.usd}
          />

          <MetricBlock label="Market Cap" value={market_data.market_cap.usd} />
        </div>
      </div>

      {/* 📰 Actions */}
      <div className="flex gap-4">
        {[`/news?searchString=${id}`, `/create-alert/${id}`].map((e) => (
          <Link key={e} href={e} className="flex items-center gap-2.5">
            <Button className="cursor-pointer" variant="ghost" size="lg">
              {e.includes('news') ? <Newspaper /> : <BellPlus />}
              <p>{e.includes('news') ? 'News' : 'Alert'}</p>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinData;
