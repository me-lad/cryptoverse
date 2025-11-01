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
import CoinAdditionalInformation from './additional-information';

import {
  SentimentUi,
  SentimentClassificationMatcher,
} from '~core/global/sentiment';

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
        <div className="mt-20 grid h-max grid-cols-12 gap-x-5">
          <div className="col-span-4 h-full">
            <Orders
              coinSymbol={coinData.symbol}
              coinPrice={coinData.market_data.current_price.usd}
            />
          </div>
          <div className="col-span-8 h-full">
            <ChartsWrapper coinName={coinData.id} coinSymbol={coinData.symbol}>
              <CoinChartWrapper
                chartCycle={chartCycle}
                chartData={chartData}
                coinData={coinData}
                renderSource="DirectPage"
              />
            </ChartsWrapper>

            <div className="mt-5 grid grid-cols-2 gap-x-5">
              <div className="bg-background-lighter rounded-sm p-8">
                <h4 className="mb-3 border-b pb-2 text-lg font-semibold">
                  {coinData.id.slice(0, 1).toUpperCase() + coinData.id.slice(1)}{' '}
                  Sentiment Votes
                </h4>
                <SentimentUi
                  value={coinData.sentiment_votes_down_percentage}
                  classification={SentimentClassificationMatcher(
                    coinData.sentiment_votes_down_percentage,
                  )}
                />
              </div>

              <div className="bg-background-lighter rounded-sm p-8">
                <h4 className="mb-3 border-b pb-2 text-lg font-semibold">
                  {coinData.id.slice(0, 1).toUpperCase() + coinData.id.slice(1)}{' '}
                  Additional Information
                </h4>
                <CoinAdditionalInformation {...coinData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinPageWrapper;
