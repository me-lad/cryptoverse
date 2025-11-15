// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useState, lazy, Suspense } from 'react';
import { Spinner } from '~core/ui/shadcn/spinner';

// 📦 Internal imports
import type { ChartSourceT } from './local';
import { flexCenter } from '~styles/tw-custom';
import SourceToggler from './SourceToggler';
const TradingViewChart = lazy(
  () => import('~core/global/trading-view/AdvanceChart'),
);

// 🧾 Local types
interface PropsT {
  coinName: string;
  coinSymbol: string;
  children: React.ReactNode;
}

// ⚙️ Functional component
const ChartsWrapper: React.FC<PropsT> = ({
  coinName,
  coinSymbol,
  children,
}) => {
  const [selectedChartSource, setSelectedChartSource] =
    useState<ChartSourceT>('CryptoVerse');

  return (
    <div className="bg-background-lighter relative rounded-sm p-8 max-[28em]:!px-4">
      <SourceToggler
        source={selectedChartSource}
        changeSource={setSelectedChartSource}
      />

      <div>
        {selectedChartSource === 'TradingView' ? (
          <Suspense
            fallback={
              <div className={`${flexCenter} h-[28.5rem] min-h-[28.5rem]`}>
                <Spinner
                  variant="circle"
                  size={80}
                  color="var(--color-primary)"
                />
              </div>
            }
          >
            <h2 className="px-1 text-xl font-semibold">
              {coinName.slice(0, 1).toUpperCase() + coinName.slice(1)}{' '}
              Historical Data
            </h2>
            <div className="mt-8 h-[28.5rem] min-h-[28.5rem] overflow-hidden rounded-sm outline-1">
              <TradingViewChart symbol={coinSymbol} theme="dark" />
            </div>
          </Suspense>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
export default ChartsWrapper;
