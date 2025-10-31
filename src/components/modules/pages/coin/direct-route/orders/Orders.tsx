// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { getCoinOrders } from '~services/coins';
import { CatchError } from '~core/ui/shared/typography';
import TablesWrapper from './Tables.wrapper';

// 🧾 Local types
interface PropsT {
  coinSymbol: string;
}

// ⚙️ Functional component
const Orders: React.FC<PropsT> = async ({ coinSymbol }) => {
  const orders = await getCoinOrders(coinSymbol);

  return (
    <div className="bg-background-lighter relative rounded-sm p-8">
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
