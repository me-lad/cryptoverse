import { ChartConfig } from '~core/ui/shadcn/chart';

export type CycleT = '24h' | '7d' | '30d' | '1y';
export type CycleLabelT = 'Day' | 'Week' | 'Month' | 'Year';

export interface CycleEntityT {
  label: CycleLabelT;
  pairDB: `price_change_percentage_${CycleT}`;
  cycle: CycleT;
}

export const cycleEntities: CycleEntityT[] = [
  { label: 'Day', pairDB: 'price_change_percentage_24h', cycle: '24h' },
  { label: 'Week', pairDB: 'price_change_percentage_7d', cycle: '7d' },
  { label: 'Month', pairDB: 'price_change_percentage_30d', cycle: '30d' },
  { label: 'Year', pairDB: 'price_change_percentage_1y', cycle: '1y' },
];

export const cycleMap: { [key in CycleT]: 1 | 7 | 30 | 365 } = {
  '24h': 1,
  '7d': 7,
  '30d': 30,
  '1y': 365,
};

export const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export interface FormattedChartDataT {
  date: string;
  value: number;
}
