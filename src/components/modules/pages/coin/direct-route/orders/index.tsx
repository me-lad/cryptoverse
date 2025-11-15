// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { getCoinOrders } from '~services/coins';
import { CatchError } from '~core/ui/shared/typography';
import { buildFakeOrderBookFromPrice } from '~helpers/generators';
import TablesWrapper from './Tables.wrapper';

// 🧾 Local types
interface PropsT {
  coinSymbol: string;
  coinPrice: number;
}

// ⚙️ Functional component
const Orders: React.FC<PropsT> = async ({ coinSymbol, coinPrice }) => {
  let orders = await getCoinOrders(coinSymbol);

  if (orders.lastUpdateId === 0) {
    orders = buildFakeOrderBookFromPrice(coinPrice);
  }

  return (
    <div className="bg-background-lighter relative h-full rounded-sm p-8">
      <h2 className="mb-10 border-b border-neutral-500 pb-5 font-semibold">
        Orders ( {`${coinSymbol.toUpperCase()} / USDT`} )
      </h2>

      <div>
        {!orders?.asks.length && !orders?.bids.length && <CatchError />}
        {!!orders && <TablesWrapper {...orders} />}
      </div>
    </div>
  );
};
export default Orders;
