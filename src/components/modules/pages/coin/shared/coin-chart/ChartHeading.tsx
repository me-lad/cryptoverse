// 📌 Directives
'use client';

// 📦 Third-Party imports

import React from 'react';

// 📦 Internal imports
import type { ChartRenderSourceT, CycleT } from '../../local';
import type { GetCoinChartData } from '~types/api-generated/coins/getCoinChartData';
import { flexBetween } from '~styles/tw-custom';
import { cycleLabelsHeading, chartReferencesLabels } from '../../local';

// 🧾 Local types and variables
interface PropsT {
  children: React.ReactNode;
  coinName: string;
  chartCycle: CycleT;
  chartRef: keyof GetCoinChartData;
  renderSource: ChartRenderSourceT;
}

// ⚙️ Functional component
const ChartHeading: React.FC<PropsT> = (props) => {
  const { chartCycle, chartRef, coinName, children } = props;

  return (
    <div className={`${flexBetween} max-[35em]:flex-col max-[35em]:gap-y-5`}>
      <div className="*:max-[35em]:text-center">
        <h2 className="font-semibold md:text-xl">Historical Data</h2>
        <p className="mt-1.5 max-md:text-sm">
          Showing {coinName.toLowerCase()}{' '}
          {chartReferencesLabels[chartRef].default} for the last{' '}
          {cycleLabelsHeading[chartCycle]}
        </p>
      </div>

      {children}
    </div>
  );
};
export default ChartHeading;
