// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useState } from 'react';

// 📦 Internal imports
import type { GetCoinChartData } from '@/lib/types/api-generated/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import type { CycleT } from '../local';
import { flexBetween } from '~styles/tw-custom';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import { Button } from '@/components/core/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import ChartHeading from './ChartHeading';

// 🧾 Local types
interface PropsT {
  coinData: GetCoinData;
  chartData: GetCoinChartData;
  chartCycle: CycleT;
}

// ⚙️ Functional component
const ChartDataProvider: React.FC<PropsT> = (props) => {
  const { chartData, coinData, chartCycle } = props;
  const [chartRef, setChartRef] = useState<keyof GetCoinChartData>('prices');

  return (
    <div className="min-h-[63%] pt-8">
      <ChartHeading
        chartCycle={chartCycle}
        coinName={coinData.name}
        chartRef={chartRef}
        changeRefHandler={setChartRef}
      />
    </div>
  );
};
export default ChartDataProvider;
