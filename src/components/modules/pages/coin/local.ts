// 📦 Imports
import type { GetCoinChartData } from '@/lib/types/api-generated/coins/getCoinChartData';
import { ChartConfig } from '~core/ui/shadcn/chart';

// 🧾 Types
export type CycleT = '24h' | '7d' | '30d' | '1y';

export type CycleLabelHeadingT = '24 Hours' | '7 Days' | '30 Days' | '365 Days';
export type CycleLabelControllerT = 'Day' | 'Week' | 'Month' | 'Year';

export interface CycleEntityControllerT {
  label: CycleLabelControllerT;
  pairDB: (
    ref?: 'price' | 'market_cap',
  ) => `price_change_percentage_${CycleT}` | 'market_cap_change_percentage_24h';
  cycle: CycleT;
}

export interface FormattedChartDataT {
  date: string;
  value: number;
}

// 🧾 Variables
export const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export const cycleEntities: CycleEntityControllerT[] = [
  {
    label: 'Day',
    pairDB: (ref?: 'price' | 'market_cap') =>
      `${ref || 'price'}_change_percentage_24h`,
    cycle: '24h',
  },
  {
    label: 'Week',
    pairDB: () => `price_change_percentage_7d`,
    cycle: '7d',
  },
  {
    label: 'Month',
    pairDB: () => `price_change_percentage_30d`,
    cycle: '30d',
  },
  {
    label: 'Year',
    pairDB: () => `price_change_percentage_1y`,
    cycle: '1y',
  },
] as const;

export const cycleLabelsHeading: { [key in CycleT]: CycleLabelHeadingT } = {
  '24h': '24 Hours',
  '7d': '7 Days',
  '30d': '30 Days',
  '1y': '365 Days',
};

export const chartReferencesLabels: {
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

export const chartReferences: (keyof GetCoinChartData)[] = [
  'prices',
  'market_caps',
  'total_volumes',
];

export const cycleMap: { [key in CycleT]: 1 | 7 | 30 | 365 } = {
  '24h': 1,
  '7d': 7,
  '30d': 30,
  '1y': 365,
} as const;

export type ChartRenderSourceT = 'ParallelPage' | 'DirectPage';
