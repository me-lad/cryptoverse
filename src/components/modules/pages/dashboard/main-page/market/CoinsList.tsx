// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use, lazy, Suspense } from 'react';
import { Spinner } from '~core/ui/shadcn/spinner';
import { useTheme } from 'next-themes';

// 📦 Internal imports
import { coinsSymbolList, type OrderT } from './local';
import { FavoriteCoinsContext } from '~contexts/FavoriteCoins.context';
import { flexCenter } from '~styles/tw-custom';
const MiniChart = lazy(() => import('~core/global/trading-view/MiniChart'));

// 🧾 Local types
interface PropsT {
  targetOrder: OrderT;
}

// ⚙️ Functional component
const ListRenderingItem = ({ symbol }: { symbol: string }) => {
  const { systemTheme, theme } = useTheme();
  const chartTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Suspense
      fallback={
        <div className={`${flexCenter} h-10 w-full`}>
          <Spinner variant="circle-filled" />
        </div>
      }
    >
      <div className="overflow-hidden rounded-sm border">
        <MiniChart
          // @ts-expect-error
          theme={chartTheme || 'dark'}
          symbol={symbol}
        />
      </div>
    </Suspense>
  );
};

const CoinsList: React.FC<PropsT> = ({ targetOrder }) => {
  const {
    data: { favoriteCoins },
  } = use(FavoriteCoinsContext);

  return (
    <div className="mt-8 grid min-h-[9.3rem] grid-cols-1 gap-2.5 min-[35em]:grid-cols-2 xl:grid-cols-4">
      {targetOrder !== 'favorite' ? (
        coinsSymbolList[targetOrder]!.map((item) => (
          <ListRenderingItem key={item} symbol={item} />
        ))
      ) : !favoriteCoins.length ? (
        <p
          className={`${flexCenter} col-span-1 rounded-sm border text-lg font-semibold min-[35em]:col-span-2 xl:col-span-4`}
        >
          Add some coins to your favorite list first.
        </p>
      ) : (
        favoriteCoins
          .slice(0, 3)
          .map((item) => (
            <ListRenderingItem key={item.id} symbol={item.symbol} />
          ))
      )}
    </div>
  );
};
export default CoinsList;
