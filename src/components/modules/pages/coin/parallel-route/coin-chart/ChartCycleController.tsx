// 📌 Directives

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import type { CycleT } from '../local';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { Percentage } from '~core/global/formatters';
import { cycleEntities } from '../local';

// 🧾 Local types
interface PropsT {
  coinData: GetCoinData;
  chartCycle: CycleT;
  chartRef: keyof GetCoinChartData;
}

// ⚙️ Functional component
const ChartCycleController: React.FC<PropsT> = (props) => {
  const { chartCycle, chartRef, coinData } = props;
  const { id, market_data } = coinData;

  const values = cycleEntities.map((entity) =>
    chartRef === 'prices'
      ? market_data[entity.pairDB('price')]
      : chartRef === 'market_caps' && entity.cycle === '24h'
        ? market_data[entity.pairDB('market_cap')]
        : 0,
  );

  return (
    <div className={flexBetween}>
      {cycleEntities.map((entity, index) => (
        <Link
          key={entity.label}
          className={clsx(
            'w-[24.5%] rounded-sm',
            chartCycle === entity.cycle && 'bg-background-lighter',
          )}
          href={`/coin/${id}${entity.cycle !== '24h' ? `?chartCycle=${entity.cycle}` : ''}`}
          replace
        >
          <Button
            className={`${flexCenter} hover:!bg-background-lighter h-full w-full cursor-pointer flex-col`}
            variant={'ghost'}
          >
            <div
              className={clsx(
                'ml-2 rounded-sm px-3 py-1.5',
                chartCycle !== entity.cycle && '!bg-transparent',
                values[index] === 0
                  ? 'bg-neutral-500'
                  : values[index] < 0
                    ? 'bg-status-error-200'
                    : 'bg-status-success-300',
              )}
            >
              {entity.label}
            </div>

            <Percentage percentage={values[index]} />
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default ChartCycleController;
