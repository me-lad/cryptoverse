// 📌 Directives
'use client';

// 📦 Third-Party imports
import Image from 'next/image';
import clsx from 'clsx';
import React, { useEffect, useState, useRef } from 'react';
import {
  Area,
  AreaChart,
  Dot,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
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

// 🧾 Local types
interface PropsT {
  chartRef: keyof GetCoinChartData;
  chartData: FormattedChartDataT[];
  coinReferenceValues: { [key in keyof GetCoinChartData]: number };
  coinImage: string;
}

// ⚙️ Functional components
const CustomLegend = ({ title }: { title: string }) => {
  const formattedTitle = title
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="text-muted-foreground mt-2 flex items-center justify-center gap-2 text-sm font-medium">
      <div className="bg-primary h-2 w-2 rounded-full" />
      <span className="tracking-wide">{formattedTitle}</span>
    </div>
  );
};

const CustomDot = ({ payload, ...props }: any) => {
  const isEqual = (a: number, b: number) => a === b;
  const isMax = isEqual(props.max, payload.value);
  const isMin = isEqual(props.min, payload.value);

  if (!isMax && !isMin) return;

  let posX = props.cx + 10;
  let posY = props.cy + 6;

  if (props.cx > props.containerWidth * 0.6) {
    posX =
      formatPrice(payload.value).length > 9 ? props.cx - 172 : props.cx - 94;
  }

  if (isMax) {
    return (
      <g>
        <Dot
          className="transition-transform duration-300 ease-out"
          key={payload.browser}
          r={4}
          cx={props.cx}
          cy={props.cy}
          fill={'var(--chart-green-normal)'}
          stroke={payload.fill}
        />
        <text
          x={posX}
          y={posY}
          fontSize={18}
          fontWeight={600}
          fill="var(--chart-green-normal)"
        >
          {formatPrice(payload.value)}
        </text>
      </g>
    );
  }

  if (isMin) {
    return (
      <g>
        <Dot
          className="transition-transform duration-300 ease-out"
          key={payload.browser}
          r={4}
          cx={props.cx}
          cy={props.cy}
          fill={'var(--chart-red-normal)'}
          stroke={payload.fill}
        />
        <text
          x={posX}
          y={posY}
          fontSize={18}
          fontWeight={600}
          fill="var(--chart-red-normal)"
        >
          {formatPrice(payload.value)}
        </text>
      </g>
    );
  }
};

const Chart: React.FC<PropsT> = (props) => {
  const { chartData, coinReferenceValues, chartRef, coinImage } = props;

  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartContainerWidth, setChartContainerWidth] = useState(0);

  useEffect(() => {
    setChartContainerWidth(chartContainerRef.current?.clientWidth || 850);
  }, [chartContainerRef.current]);

  useEffect(() => {
    const values = chartData.map((item) => item.value),
      max = Math.max(...values),
      min = Math.min(...values);

    setMaxValue(max);
    setMinValue(min);
  }, [chartData, chartRef]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 2000);
  }, [chartRef]);

  return (
    <>
      {isLoading ? (
        <div
          className={clsx(
            'mt-4 h-92 w-full items-center justify-center',
            isLoading ? 'flex' : 'hidden',
          )}
        >
          <Image
            className={clsx('animate-spin', !isLoading && 'pause-animation')}
            src={coinImage}
            width={100}
            height={100}
            alt="Crypto Verse"
          />
        </div>
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
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary-300)"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>

              {/* Axes */}
              <XAxis dataKey="date" hide />
              <YAxis dataKey="value" domain={['auto', 'auto']} hide />

              {/* Tooltip and Legend */}
              <ChartTooltip
                cursor
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Legend content={<CustomLegend title={chartRef} />} />

              {/* Area (rendered first so others appear above it) */}
              <Area
                dataKey="value"
                type="natural"
                fill="url(#area-gradient)"
                fillOpacity={0.7}
                r={4}
                stroke="var(--color-primary-200)"
                strokeOpacity={0.3}
                dot={
                  <CustomDot
                    currentValue={coinReferenceValues[chartRef]}
                    min={minValue}
                    max={maxValue}
                    containerWidth={chartContainerWidth}
                  />
                }
              />

              {/* Reference Line (rendered after Area) */}
              <ReferenceLine
                y={coinReferenceValues[chartRef]}
                stroke="var(--chart-1)"
                label={
                  <Label
                    fill="var(--chart-1)"
                    fontWeight={600}
                    position="top"
                    fontSize={18}
                  >
                    {`Current : ${formatPrice(coinReferenceValues[chartRef])}`}
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
