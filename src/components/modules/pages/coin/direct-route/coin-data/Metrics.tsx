// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Clock, MoveDown, MoveUp } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { MarketData } from '~types/api-generated/coins/getCoinData';
import { flexCenter } from '~styles/tw-custom';
import { Percentage } from '~core/global/formatters';
import MetricBlock from './MetricBlock';

// 🧾 Local types
interface PropsT {
  market_data: MarketData;
}

// ⚙️ Functional component
const Metrics: React.FC<PropsT> = ({ market_data }) => {
  const [activeChangeIndex, setActiveChangeIndex] = useState(0);

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
    <div className="grid grid-cols-2 gap-8 border-t border-neutral-700 pt-5 *:min-w-28 min-[29em]:grid-cols-3 md:grid-cols-6">
      <MetricBlock
        label="Current Price"
        value={market_data.current_price.usd}
      />

      <div className="relative h-20 overflow-hidden">
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

      <MetricBlock label="Total Volume" value={market_data.total_volume.usd} />

      <MetricBlock label="Market Cap" value={market_data.market_cap.usd} />
    </div>
  );
};
export default Metrics;
