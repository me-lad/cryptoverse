// 📌 Directives
'use client';

// 📦 Third-Party imports

import React from 'react';

// 📦 Internal imports
import type { CycleT } from '../local';
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { flexBetween } from '~styles/tw-custom';
import { cycleLabelsHeading, chartReferencesLabels } from '../local';

// 🧾 Local types and variables
interface PropsT {
  children: React.ReactNode;
  coinName: string;
  chartCycle: CycleT;
  chartRef: keyof GetCoinChartData;
}

// ⚙️ Functional component
const ChartHeading: React.FC<PropsT> = (props) => {
  const { chartCycle, chartRef, coinName, children } = props;

  return (
    <div className={flexBetween}>
      <div>
        <h2 className="text-xl font-semibold">Historical Data</h2>
        <p className="mt-1.5">
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
