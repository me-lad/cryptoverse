// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { GetCoinOrders } from '~types/api-generated/coins/getCoinOrders';
import { getCoinOrders } from '~services/integrations/coins';
import { buildFakeOrderBookFromPrice } from '~helpers/generators';
import TablesWrapper from './Tables.wrapper';

// 🧾 Local types
interface PropsT {
  coinSymbol: string;
  coinPrice: number;
}

// ⚙️ Functional component
const Orders: React.FC<PropsT> = async ({ coinSymbol, coinPrice }) => {
  const orders = await getCoinOrders(coinSymbol);
  let fallbackOrders: GetCoinOrders;

  if (!orders.success) {
    fallbackOrders = buildFakeOrderBookFromPrice(coinPrice);
  }

  return (
    <div className="bg-background-lighter relative h-full rounded-sm p-8">
      <h2 className="mb-10 border-b border-neutral-500 pb-5 font-semibold">
        Orders ( {`${coinSymbol.toUpperCase()} / USDT`} )
      </h2>

      <div>
        {!orders.success ? (
          <TablesWrapper
            lastUpdateId={0}
            asks={fallbackOrders!.asks}
            bids={fallbackOrders!.bids}
          />
        ) : (
          <TablesWrapper {...orders.result} />
        )}
      </div>
    </div>
  );
};
export default Orders;
