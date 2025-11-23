// 📌 Directives
'use client';

// 📦 Third-Party imports
import { BellPlus, Newspaper, Star } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { use, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import type { GetCoinData } from '@/lib/types/api-generated/coins/getCoinData';
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import Metrics from './Metrics';

const CoinData: React.FC<GetCoinData> = (props) => {
  const { id, symbol, market_data, image } = props;

  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);
  const isFavoriteCoin = favoriteIDs?.includes(id) ?? false;

  return (
    <div>
      <div className="flex items-center gap-5 pb-5">
        {/* 🔖 Coin Identity */}
        <div className="flex items-center gap-2 border-neutral-700 pr-10 min-[22em]:border-r">
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

        {/* 📰 Actions */}
        <div className="max-[22em]:hidden min-[29em]:flex min-[29em]:gap-4">
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

      {/* 📊 Market Metrics */}
      <Metrics market_data={market_data} />
    </div>
  );
};

export default CoinData;
