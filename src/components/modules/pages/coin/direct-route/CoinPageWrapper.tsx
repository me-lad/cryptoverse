// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { containerDefault, flexBetween } from '~styles/tw-custom';
import { getCoinChartData, getCoinData } from '~services/coins';
import { cycleMap, type CycleT } from '../local';
import { CatchError } from '~core/ui/shared/typography';
import CoinData from './coin-data';
import Orders from './orders';

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

  if (!coinData || !chartData) return <CatchError />;

  return (
    <>
      <div className={`${containerDefault} mt-20`}>
        <CoinData {...coinData} />
        <div className={`${flexBetween} mt-20`}>
          <div className="w-2/5">
            <Orders coinSymbol={coinData.symbol} />
          </div>
          {/* <div className="w-[69.5%]"></div> */}
        </div>
      </div>
    </>
  );
};
export default CoinPageWrapper;
