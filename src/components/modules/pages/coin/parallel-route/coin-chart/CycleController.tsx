// 📌 Directives

// 📦 Third-Party imports
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '~core/ui/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { Percentage } from '~core/global/formatters';

// 🧾 Local types and variables
type CycleT = '24h' | '7d' | '30d' | '1y';
type CycleLabelT = 'Day' | 'Week' | 'Month' | 'Year';

interface CycleEntityT {
  label: CycleLabelT;
  pairDB: `price_change_percentage_${CycleT}`;
  cycle: CycleT;
}

const cycleEntities: CycleEntityT[] = [
  { label: 'Day', pairDB: 'price_change_percentage_24h', cycle: '24h' },
  { label: 'Week', pairDB: 'price_change_percentage_7d', cycle: '7d' },
  { label: 'Month', pairDB: 'price_change_percentage_30d', cycle: '30d' },
  { label: 'Year', pairDB: 'price_change_percentage_1y', cycle: '1y' },
];

// ⚙️ Functional component
const CycleController: React.FC<GetCoinData & { activeCycle?: string }> = (
  props,
) => {
  const { id, market_data, activeCycle } = props;

  return (
    <div className={`${flexBetween} mt-8`}>
      {cycleEntities.map((entity) => (
        <Link
          className={clsx(
            'w-[24.5%] rounded-sm',
            activeCycle === entity.cycle && 'bg-background-lighter',
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
                'ml-1 rounded-sm px-3 py-1.5',
                activeCycle !== entity.cycle && '!bg-transparent',
                market_data[entity.pairDB] === 0
                  ? 'bg-neutral-500'
                  : market_data[entity.pairDB] < 0
                    ? 'bg-status-error-200'
                    : 'bg-status-success-300',
              )}
            >
              {entity.label}
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Percentage percentage={market_data[entity.pairDB]} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <Percentage percentage={market_data[entity.pairDB]} />
              </TooltipContent>
            </Tooltip>
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default CycleController;
