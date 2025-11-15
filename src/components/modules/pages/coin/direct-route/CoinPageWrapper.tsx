// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import CoinData from './coin-data';
import Orders from './orders';
import ChartsWrapper from './coin-chart/Charts.wrapper';
import CoinChartWrapper from '../shared/coin-chart/CoinChart.wrapper';
import CoinAdditionalInformation from './additional-information';
import BidsTable from './orders/TableBids.fn';
import AsksTable from './orders/TableAsks.fn';
import { containerDefault, flexBetween } from '~styles/tw-custom';
import { getCoinChartData, getCoinData, getCoinOrders } from '~services/coins';
import { cycleMap, type CycleT } from '../local';
import { CatchError } from '~core/ui/shared/typography';
import { buildFakeOrderBookFromPrice } from '~helpers/generators';
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

  let orders = await getCoinOrders(coinData.symbol);

  if (orders.lastUpdateId === 0) {
    orders = buildFakeOrderBookFromPrice(
      coinData.market_data.current_price.usd,
    );
  }

  const gridChildContainerClassName =
    'bg-background-lighter  max-[28em]:!px-4 p-8';

  return (
    <>
      <div className={`${containerDefault} mt-20`}>
        <CoinData {...coinData} />

        <div className="mt-40 grid h-max grid-cols-12 gap-x-5">
          <div className="hidden h-full min-xl:col-span-4 min-xl:block">
            <Orders
              coinSymbol={coinData.symbol}
              coinPrice={coinData.market_data.current_price.usd}
            />
          </div>
          <div className="col-span-12 h-full min-xl:col-span-8">
            <ChartsWrapper coinName={coinData.id} coinSymbol={coinData.symbol}>
              <CoinChartWrapper
                chartCycle={chartCycle}
                chartData={chartData}
                coinData={coinData}
                renderSource="DirectPage"
              />
            </ChartsWrapper>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className={gridChildContainerClassName}>
                <h4 className="mb-3 border-b pb-2 font-semibold min-[28em]:text-lg">
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

              <div className={gridChildContainerClassName}>
                <h4 className="mb-3 border-b pb-2 font-semibold min-[28em]:text-lg">
                  {coinData.id.slice(0, 1).toUpperCase() + coinData.id.slice(1)}{' '}
                  Additional Information
                </h4>
                <CoinAdditionalInformation {...coinData} />
              </div>

              <div className={`${gridChildContainerClassName} xl:hidden`}>
                <BidsTable data={orders.bids.slice(0, 4)} />
              </div>

              <div className={`${gridChildContainerClassName} xl:hidden`}>
                <AsksTable data={orders.asks.slice(0, 4)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinPageWrapper;
