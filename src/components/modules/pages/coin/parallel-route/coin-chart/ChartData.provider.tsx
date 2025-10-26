// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState } from 'react';

// 📦 Internal imports
import type { GetCoinChartData } from '@/lib/types/api-generated/getCoinChartData';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { cycleMap, type FormattedChartDataT, type CycleT } from '../local';
import { buildCoinChartData } from '~helpers/generators';
import ChartHeading from './ChartHeading';
import Chart from './Chart';

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
      <ChartHeading
        chartCycle={chartCycle}
        coinName={coinData.id}
        chartRef={chartRef}
        changeRefHandler={setChartRef}
      />

      <Chart
        chartData={formattedChartData}
        chartRef={chartRef}
        coinReferenceValues={{
          market_caps: coinData.market_data.market_cap.usd,
          prices: coinData.market_data.current_price.usd,
          total_volumes: coinData.market_data.total_volume.usd,
        }}
        coinImage={coinData.image.large}
      />
    </div>
  );
};
export default ChartDataProvider;
