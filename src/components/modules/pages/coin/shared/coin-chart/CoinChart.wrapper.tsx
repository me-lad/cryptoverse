// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState, lazy, Suspense } from 'react';

// 📦 Internal imports
import {
  ChartRenderSourceT,
  cycleMap,
  type CycleT,
  type FormattedChartDataT,
} from '../../local';
import type { GetCoinChartData } from '~types/api-generated/coins/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/coins/getCoinData';
import { buildCoinChartData } from '~helpers/generators';
import ChartHeading from './ChartHeading';
import ChartDataRefSelect from './ChartDataRefSelect';
import ChartCycleController from './ChartCycleController';
import ChartFallback from './widgets/ChartFallback';
import clsx from 'clsx';
const Chart = lazy(() => import('./Chart'));

// 🧾 Local types
interface PropsT {
  coinData: GetCoinData;
  chartData: GetCoinChartData;
  chartCycle: CycleT;
  renderSource: ChartRenderSourceT;
}

// ⚙️ Functional component
const CoinChartWrapper: React.FC<PropsT> = (props) => {
  const { chartData, coinData, chartCycle, renderSource } = props;
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
    <div className={clsx(renderSource === 'ParallelPage' && 'pt-8')}>
      {/* Heading */}
      <ChartHeading
        chartRef={chartRef}
        chartCycle={chartCycle}
        coinName={coinData.id}
        renderSource={renderSource}
      >
        <ChartDataRefSelect
          chartRef={chartRef}
          changeRefHandler={setChartRef}
          renderSource={renderSource}
        />
      </ChartHeading>

      {/* Chart View */}
      <Suspense fallback={<ChartFallback image={coinData.image.large} />}>
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
        renderSource={renderSource}
      />
    </div>
  );
};
export default CoinChartWrapper;
