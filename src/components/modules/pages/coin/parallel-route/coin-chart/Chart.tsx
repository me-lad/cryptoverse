// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from '~core/ui/shadcn/chart';

// 📦 Internal imports
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { chartConfig } from '../local';

// 🧾 Local types
interface PropsT {
  chartData: GetCoinChartData;
}

// ⚙️ Functional component
const Chart: React.FC<PropsT> = ({ chartData }) => {
  return <></>;
};
export default Chart;
