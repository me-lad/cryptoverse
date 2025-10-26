// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { CycleT } from '../local';
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { flexBetween } from '~styles/tw-custom';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// 🧾 Local types and variables
interface PropsT {
  coinName: string;
  chartCycle: CycleT;
  chartRef: keyof GetCoinChartData;
  changeRefHandler: (newRef: keyof GetCoinChartData) => void;
}

const cycleLabels: { [key in CycleT]: string } = {
  '24h': '24 Hours',
  '7d': '7 Days',
  '30d': '30 Days',
  '1y': '365 Days',
};

const refLabels: {
  [key in keyof GetCoinChartData]: { default: string; upperCased: string };
} = {
  prices: {
    default: 'prices',
    upperCased: 'Prices',
  },
  market_caps: {
    default: 'market caps',
    upperCased: 'Market Caps',
  },
  total_volumes: {
    default: 'total volumes',
    upperCased: 'Total Volumes',
  },
};

const references: (keyof GetCoinChartData)[] = [
  'prices',
  'market_caps',
  'total_volumes',
];

// ⚙️ Functional component
const ChartHeading: React.FC<PropsT> = (props) => {
  const { chartCycle, chartRef, coinName, changeRefHandler } = props;
  const [customKey, setCustomKey] = useState(0);

  return (
    <div className={`${flexBetween} `}>
      <div>
        <h2 className="text-xl font-semibold">Historical Data</h2>
        <p className="mt-1.5">
          Showing {coinName.toLowerCase()} {refLabels[chartRef].default} for the
          last {cycleLabels[chartCycle]}
        </p>
      </div>
      <DropDownAggregator key={customKey} hideScroll={false}>
        <DropDownTrigger activeClassName="*:*:last:rotate-180">
          <Button className="!bg-background-lighter w-44" variant={'outline'}>
            {refLabels[chartRef].upperCased}
            <ChevronDown
              className="mt-0.5 transition-all duration-300"
              strokeWidth={2.5}
            />
          </Button>
        </DropDownTrigger>
        <DropDownMenu className="mt-2 flex w-full flex-col gap-2 p-2.5">
          {references.map((ref) => (
            <Button
              key={ref}
              variant={'ghost'}
              className={clsx(
                '!justify-start font-medium',
                chartRef === ref ? '!bg-background' : 'cursor-pointer',
              )}
              onClick={() => {
                changeRefHandler(ref);
                setCustomKey((prev) => prev + 1);
              }}
            >
              {refLabels[ref].upperCased}
            </Button>
          ))}
        </DropDownMenu>
      </DropDownAggregator>
    </div>
  );
};
export default ChartHeading;
