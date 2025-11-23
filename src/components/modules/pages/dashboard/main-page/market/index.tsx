// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { ChevronRight } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { OrderT } from './local';
import { flexBetween } from '~styles/tw-custom';
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import FluidContainer from '../../FluidContainer';
import CoinsList from './CoinsList';

// ⚙️ Functional component
const Market = () => {
  const [order, setOrder] = useState<OrderT>('trending');
  const { setFetchFavorites } = use(FavoriteCoinsContext);

  useEffect(() => {
    if (order === 'favorite') setFetchFavorites(true);
  }, [order]);

  return (
    <FluidContainer condense_title="Market Overview">
      <h2 className="text-xl font-semibold">Market</h2>

      <div className={`${flexBetween} mt-2.5`}>
        <div className="relative flex items-center gap-5 font-semibold">
          <span onClick={() => setOrder('trending')} className="cursor-pointer">
            Trending
          </span>
          <span
            onClick={() => setOrder('top-volume')}
            className="cursor-pointer"
          >
            Top Volume
          </span>
          <span onClick={() => setOrder('favorite')} className="cursor-pointer">
            Favorite
          </span>
          <span
            className={clsx(
              'bg-primary absolute top-full mt-1 h-[2px] transition-all duration-300',
              order === 'trending'
                ? 'w-16'
                : order === 'top-volume'
                  ? 'w-20 translate-x-[5.4rem]'
                  : 'w-14 translate-x-[11.8rem]',
            )}
          ></span>
        </div>

        <div>
          <Link href={'/dashboard/market-overview'}>
            <Button variant={'secondary'} className="cursor-pointer !px-6">
              View All
              <ChevronRight strokeWidth={3} className="mt-[0.2rem] size-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      <CoinsList targetOrder={order} />
    </FluidContainer>
  );
};
export default Market;
