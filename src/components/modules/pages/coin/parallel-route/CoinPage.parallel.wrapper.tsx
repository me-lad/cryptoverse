// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { BlurWrapper } from '~core/ui/shared/overlays';
import { getCoinChartData, getCoinData } from '~services/coins';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import { cycleMap, type CycleT } from './local';
import AnimatedModal from './AnimatedModal';
import NameLogo from './coin-data/NameLogo';
import MarketInfo from './coin-data/MarketInfo';
import Price from './coin-data/Price';
import CycleController from './coin-chart/CycleController';
import Chart from './coin-chart/Chart';

// 🧾 Local types
interface PropsT {
  id: string;
  chartCycle: CycleT;
}

// ⚙️ Functional component
const ParallelCoinPageWrapper: React.FC<PropsT> = async ({
  id,
  chartCycle,
}) => {
  const coinData = await getCoinData(id);
  const chartData = await getCoinChartData(id, cycleMap[chartCycle]);

  return (
    <BlurWrapper>
      <AnimatedModal>
        {!coinData || !chartData ? (
          <CatchError />
        ) : (
          <>
            {/* Coin data */}
            <div>
              <NameLogo {...coinData} />
              <MarketInfo {...coinData} />
              <Price {...coinData} />
            </div>

            {/* Coin chart */}
            <div>
              <Chart chartData={chartData} />
              <CycleController {...coinData} activeCycle={chartCycle} />
            </div>
          </>
        )}
      </AnimatedModal>
    </BlurWrapper>
  );
};
export default ParallelCoinPageWrapper;
