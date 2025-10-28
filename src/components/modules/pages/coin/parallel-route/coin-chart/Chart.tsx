// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState, useRef } from 'react';
import {
  Area,
  AreaChart,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~core/ui/shadcn/chart';

// 📦 Internal imports
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { chartConfig, type FormattedChartDataT } from '../local';
import { formatPrice } from '~helpers/formatters';
import { useChartExtremes } from './widgets/useChartExtremes';
import { useChartContainerSize } from './widgets/useContainerSize';
import ChartFallback from './widgets/ChartFallback';
import CustomDot from './widgets/ChartCustomDot';
import CustomLegend from './widgets/ChartCustomLegend';
import CrossCursor from './widgets/ChartCrossCursor';

// 🧾 Local types
interface PropsT {
  chartRef: keyof GetCoinChartData;
  chartData: FormattedChartDataT[];
  coinReferenceValues: { [key in keyof GetCoinChartData]: number };
  coinImage: string;
}

// ⚙️ Functional component

const Chart: React.FC<PropsT> = (props) => {
  const { chartData, coinReferenceValues, chartRef, coinImage } = props;

  const [isLoading, setIsLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const { minValue, maxValue, maxIndex, minIndex } =
    useChartExtremes(chartData);
  const { chartContainerWidth } = useChartContainerSize(chartContainerRef);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 2000);
  }, [chartRef]);

  const currentValue = () => coinReferenceValues[chartRef];

  const modifyReferenceLineLabel = () => {
    const average = (maxValue + minValue) / 2;
    const standardDeviation = 4 / 10;

    const maxAverageDiff = maxValue - average;
    const nearMaxRelativeReference = standardDeviation * maxAverageDiff;

    const currentMaxDiff = maxValue - currentValue();

    if (currentMaxDiff < nearMaxRelativeReference) {
      return 'bottom';
    } else {
      return 'top';
    }
  };

  return (
    <>
      {isLoading ? (
        <ChartFallback image={coinImage} />
      ) : (
        <ChartContainer
          className="mt-4 h-92 w-full"
          config={chartConfig}
          aria-label={`Chart showing ${chartRef} trends`}
          ref={chartContainerRef}
        >
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <AreaChart accessibilityLayer data={chartData}>
              {/* Gradient */}
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary-700)"
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary-300)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              {/* Axes */}
              <XAxis dataKey="date" hide />
              <YAxis dataKey="value" domain={['auto', 'auto']} hide />

              {/* Tooltip and Legend */}
              <ChartTooltip
                cursor={
                  <CrossCursor
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    strokeDasharray="5 3"
                  />
                }
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    color="var(--color-primary)"
                  />
                }
              />

              <Legend content={<CustomLegend title={chartRef} />} />

              {/* Area (rendered first so others appear above it) */}
              <Area
                dataKey="value"
                type="natural"
                fill="url(#area-gradient)"
                fillOpacity={0.7}
                r={4}
                stroke="var(--color-white)"
                strokeOpacity={0.4}
                dot={
                  <CustomDot
                    currentValue={currentValue()}
                    min={minValue}
                    minIndex={minIndex}
                    maxIndex={maxIndex}
                    max={maxValue}
                    containerWidth={chartContainerWidth}
                  />
                }
              />

              {/* Reference Line (rendered after Area) */}
              <ReferenceLine
                y={currentValue()}
                stroke="var(--chart-1)"
                label={
                  <Label
                    fill="var(--chart-1)"
                    fontWeight={600}
                    position={modifyReferenceLineLabel()}
                    fontSize={18}
                  >
                    {`Current : ${formatPrice(currentValue())}`}
                  </Label>
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </>
  );
};
export default Chart;
