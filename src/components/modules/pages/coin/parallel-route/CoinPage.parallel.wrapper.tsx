// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { BlurWrapper } from '~core/ui/shared/overlays';
import { getCoinData } from '~services/coins';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import AnimatedModal from './AnimatedModal';
import NameLogo from './coin-data/NameLogo';
import MarketInfo from './coin-data/MarketInfo';
import Price from './coin-data/Price';
import CycleController from './coin-chart/CycleController';

// 🧾 Local types
interface PropsT {
  id: string;
  chartCycle: string;
}

// ⚙️ Functional component
const ParallelCoinPageWrapper: React.FC<PropsT> = async ({
  id,
  chartCycle,
}) => {
  const coinData = await getCoinData(id);

  return (
    <BlurWrapper>
      <AnimatedModal>
        {!coinData ? (
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
              <CycleController {...coinData} activeCycle={chartCycle} />
            </div>
          </>
        )}
      </AnimatedModal>
    </BlurWrapper>
  );
};
export default ParallelCoinPageWrapper;
