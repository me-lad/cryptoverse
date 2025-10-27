// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState, lazy, Suspense } from 'react';

// 📦 Internal imports
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { cycleMap, type CycleT, type FormattedChartDataT } from '../local';
import { buildCoinChartData } from '~helpers/generators';
import ChartHeading from './ChartHeading';
import ChartDataRefSelect from './ChartDataRefSelect';
import ChartCycleController from './ChartCycleController';
import Image from 'next/image';
const Chart = lazy(() => import('./Chart'));

// 🧾 Local types
interface PropsT {
  coinData: GetCoinData;
  chartData: GetCoinChartData;
  chartCycle: CycleT;
}

// ⚙️ Functional component
const CoinChartWrapper: React.FC<PropsT> = (props) => {
  const { chartData, coinData, chartCycle } = props;
  const [chartRef, setChartRef] = useState<keyof GetCoinChartData>('prices');
  const [formattedChartData, setFormattedChartData] = useState<
    FormattedChartDataT[]
  >([]);

  useEffect(() => {
    const formattedData = buildCoinChartData(
      chartData,
      chartRef,
      cycleMap[chartCycle],
    );
    setFormattedChartData(formattedData);
  }, [chartRef, chartCycle]);

  return (
    <div className="pt-8">
      {/* Heading */}
      <ChartHeading
        chartRef={chartRef}
        chartCycle={chartCycle}
        coinName={coinData.id}
      >
        <ChartDataRefSelect
          chartRef={chartRef}
          changeRefHandler={setChartRef}
        />
      </ChartHeading>

      {/* Chart View */}
      <Suspense
        fallback={
          <div className="mt-4 h-92 w-full items-center justify-center">
            <Image
              className="animate-spin"
              src={coinData.image.large}
              width={100}
              height={100}
              alt={coinData.id}
            />
          </div>
        }
      >
        <Chart
          chartData={formattedChartData}
          chartRef={chartRef}
          coinImage={coinData.image.large}
          coinReferenceValues={{
            market_caps: coinData.market_data.market_cap.usd,
            prices: coinData.market_data.current_price.usd,
            total_volumes: coinData.market_data.total_volume.usd,
          }}
        />
      </Suspense>

      {/* Cycle Controller */}
      <ChartCycleController
        coinData={coinData}
        chartCycle={chartCycle}
        chartRef={chartRef}
      />
    </div>
  );
};
export default CoinChartWrapper;
