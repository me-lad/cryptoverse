// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { containerDefault, flexBetween } from '~styles/tw-custom';
import { getCoinChartData, getCoinData } from '~services/coins';
import { cycleMap, type CycleT } from '../local';
import { CatchError } from '~core/ui/shared/typography';
import CoinData from './coin-data';
import Orders from './orders/Orders';
import ChartsWrapper from './coin-chart/Charts.wrapper';
import CoinChartWrapper from '../shared/coin-chart/CoinChart.wrapper';

// 🧾 Local types
interface PropsT {
  id: string;
  chartCycle: CycleT;
}

// ⚙️ Functional component
const CoinPageWrapper: React.FC<PropsT> = async (props) => {
  const { id, chartCycle } = props;

  const coinData = await getCoinData(id);
  const chartData = await getCoinChartData(id, cycleMap[chartCycle]);

  console.log(coinData);

  if (!coinData || !chartData) return <CatchError />;

  return (
    <>
      <div className={`${containerDefault} mt-20`}>
        <CoinData {...coinData} />
        <div className="mt-20 grid grid-cols-12 gap-x-5">
          <div className="col-span-4 h-full">
            <Orders coinSymbol={coinData.symbol} />
          </div>
          <div className="col-span-8">
            <ChartsWrapper coinName={coinData.id} coinSymbol={coinData.symbol}>
              <CoinChartWrapper
                chartCycle={chartCycle}
                chartData={chartData}
                coinData={coinData}
                renderSource="DirectPage"
              />
            </ChartsWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinPageWrapper;
