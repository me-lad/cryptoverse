// 📌 Directives

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import type { ChartRenderSourceT, CycleT } from '../../local';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { Percentage } from '~core/global/formatters';
import { cycleEntities } from '../../local';

// 🧾 Local types
interface PropsT {
  coinData: GetCoinData;
  chartCycle: CycleT;
  chartRef: keyof GetCoinChartData;
  renderSource: ChartRenderSourceT;
}

// ⚙️ Functional components
const CycleControllerInnerUi = ({
  label,
  className,
  percentage,
}: {
  label: string;
  className: string;
  percentage: number;
}) => {
  return (
    <Button
      className={`${flexCenter} h-full w-full cursor-pointer flex-col !bg-transparent`}
      variant={'ghost'}
    >
      <div className={`${className} ml-2 rounded-sm px-3 py-1.5`}>{label}</div>

      <Percentage percentage={percentage} />
    </Button>
  );
};

const ChartCycleController: React.FC<PropsT> = (props) => {
  const { chartCycle, chartRef, coinData, renderSource } = props;
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
      {cycleEntities.map((entity, index) =>
        renderSource === 'DirectPage' ? (
          <a
            key={entity.label}
            className={clsx(
              'hover:!bg-background w-[24.5%] rounded-sm transition-all',
              chartCycle === entity.cycle && 'bg-background',
            )}
            href={`/coin/${id}${entity.cycle !== '24h' ? `?chartCycle=${entity.cycle}` : ''}`}
          >
            <CycleControllerInnerUi
              label={entity.label}
              percentage={values[index]}
              className={clsx(
                chartCycle !== entity.cycle && '!bg-transparent',
                values[index] === 0
                  ? 'bg-neutral-500'
                  : values[index] < 0
                    ? 'bg-status-error-200'
                    : 'bg-status-success-300',
              )}
            />
          </a>
        ) : (
          <Link
            key={entity.label}
            className={clsx(
              'hover:!bg-background-lighter w-[24.5%] rounded-sm transition-all',
              chartCycle === entity.cycle && 'bg-background-lighter',
            )}
            href={`/coin/${id}${entity.cycle !== '24h' ? `?chartCycle=${entity.cycle}` : ''}`}
            replace
          >
            <CycleControllerInnerUi
              label={entity.label}
              percentage={values[index]}
              className={clsx(
                chartCycle !== entity.cycle && '!bg-transparent',
                values[index] === 0
                  ? 'bg-neutral-500'
                  : values[index] < 0
                    ? 'bg-status-error-200'
                    : 'bg-status-success-300',
              )}
            />
          </Link>
        ),
      )}
    </div>
  );
};
export default ChartCycleController;
