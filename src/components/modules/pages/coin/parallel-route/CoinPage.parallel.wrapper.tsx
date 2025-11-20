// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { BlurWrapper } from '~core/ui/shared/overlays';
import { getCoinChartData, getCoinData } from '~services/integrations/coins';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import { cycleMap, type CycleT } from '../local';
import AnimatedModal from './AnimatedModal';
import NameLogo from './coin-data/NameLogo';
import MarketInfo from './coin-data/MarketInfo';
import Price from './coin-data/Price';
import CoinChartWrapper from '../shared/coin-chart/CoinChart.wrapper';

// 🧾 Local types
interface PropsT {
  id: string;
  chartCycle: CycleT;
}

// ⚙️ Functional component
const ParallelCoinPageWrapper: React.FC<PropsT> = async (props) => {
  const { id, chartCycle } = props;

  const coinData = await getCoinData(id);
  const chartData = await getCoinChartData(id, cycleMap[chartCycle]);

  return (
    <BlurWrapper>
      <AnimatedModal>
        {!coinData.success || !chartData.success ? (
          <CatchError />
        ) : (
          <>
            {/* Coin data */}
            <>
              <NameLogo {...coinData.result} />
              <MarketInfo {...coinData.result} />
              <Price {...coinData.result} />
            </>

            {/* Coin chart */}
            <CoinChartWrapper
              coinData={coinData.result}
              chartData={chartData.result}
              chartCycle={chartCycle}
              renderSource="ParallelPage"
            />
          </>
        )}
      </AnimatedModal>
    </BlurWrapper>
  );
};
export default ParallelCoinPageWrapper;
