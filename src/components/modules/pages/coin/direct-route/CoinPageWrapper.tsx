// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { GetCoinOrders } from '~types/api-generated/coins/getCoinOrders';
import CoinData from './coin-data';
import Orders from './orders';
import ChartsWrapper from './coin-chart/Charts.wrapper';
import CoinChartWrapper from '../shared/coin-chart/CoinChart.wrapper';
import CoinAdditionalInformation from './additional-information';
import BidsTable from './orders/TableBids.fn';
import AsksTable from './orders/TableAsks.fn';
import { containerDefault, flexBetween } from '~styles/tw-custom';
import {
  getCoinChartData,
  getCoinData,
  getCoinOrders,
} from '~services/integrations/coins';
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

  if (!coinData.success || !chartData.success)
    return <CatchError className="mt-32 text-2xl" />;

  const orders = await getCoinOrders(coinData.result.symbol);
  let fallbackOrders: GetCoinOrders | undefined;

  if (!orders.success) {
    fallbackOrders = buildFakeOrderBookFromPrice(
      coinData.result.market_data.current_price.usd,
    );
  }

  const gridChildContainerClassName =
    'bg-background-lighter rounded-sm max-[28em]:!px-4 p-8';

  const bids = orders.success
    ? orders.result.bids
    : fallbackOrders
      ? fallbackOrders.bids
      : [];

  const asks = orders.success
    ? orders.result.asks
    : fallbackOrders
      ? fallbackOrders.asks
      : [];

  return (
    <>
      <div className={`${containerDefault} mt-20`}>
        <CoinData {...coinData.result} />

        <div className="mt-40 grid h-max grid-cols-12 gap-x-5">
          {/* Desktop sidebar vision orders */}
          <div className="hidden h-full min-xl:col-span-4 min-xl:block">
            <Orders
              coinSymbol={coinData.result.symbol}
              coinPrice={coinData.result.market_data.current_price.usd}
            />
          </div>

          {/* Desktop coin chart and additional information & Mobile coin chart and additional information and single orders table */}
          <div className="col-span-12 h-full min-xl:col-span-8">
            <ChartsWrapper
              coinName={coinData.result.id}
              coinSymbol={coinData.result.symbol}
            >
              <CoinChartWrapper
                chartCycle={chartCycle}
                chartData={chartData.result}
                coinData={coinData.result}
                renderSource="DirectPage"
              />
            </ChartsWrapper>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className={gridChildContainerClassName}>
                <h4 className="mb-3 border-b pb-2 font-semibold min-[28em]:text-lg">
                  {coinData.result.id.slice(0, 1).toUpperCase() +
                    coinData.result.id.slice(1)}{' '}
                  Sentiment Votes
                </h4>
                <SentimentUi
                  value={coinData.result.sentiment_votes_down_percentage}
                  classification={SentimentClassificationMatcher(
                    coinData.result.sentiment_votes_down_percentage,
                  )}
                />
              </div>

              <div className={gridChildContainerClassName}>
                <h4 className="mb-3 border-b pb-2 font-semibold min-[28em]:text-lg">
                  {coinData.result.id.slice(0, 1).toUpperCase() +
                    coinData.result.id.slice(1)}{' '}
                  Additional Information
                </h4>
                <CoinAdditionalInformation {...coinData.result} />
              </div>

              <div className={`${gridChildContainerClassName} xl:hidden`}>
                <BidsTable data={bids} />
              </div>

              <div className={`${gridChildContainerClassName} xl:hidden`}>
                <AsksTable data={asks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinPageWrapper;
