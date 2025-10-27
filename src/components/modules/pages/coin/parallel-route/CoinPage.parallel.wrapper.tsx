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
import CoinChartWrapper from './coin-chart/CoinChart.wrapper';

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
            <>
              <NameLogo {...coinData} />
              <MarketInfo {...coinData} />
              <Price {...coinData} />
            </>

            {/* Coin chart */}
            <CoinChartWrapper
              coinData={coinData}
              chartData={chartData}
              chartCycle={chartCycle}
            />
          </>
        )}
      </AnimatedModal>
    </BlurWrapper>
  );
};
export default ParallelCoinPageWrapper;
