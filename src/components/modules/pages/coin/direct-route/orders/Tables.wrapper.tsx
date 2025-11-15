// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { ShowSectionT } from './local';
import { GetCoinOrders } from '~types/api-generated/getCoinOrders';
import AsksTable from './TableAsks.fn';
import BidsTable from './TableBids.fn';
import OrderTypeToggler from './OrderTypeToggler';

// ⚙️ Functional component
const TablesWrapper: React.FC<GetCoinOrders> = (props) => {
  const { asks, bids } = props;
  const [slicePoint, setSlicePoint] = useState(6);
  const [whichToShow, setWhichToShow] = useState<ShowSectionT>('both');

  useEffect(() => {
    if (whichToShow !== 'both') {
      setSlicePoint(14);
    } else {
      setSlicePoint(6);
    }
  }, [whichToShow]);

  return (
    <>
      <OrderTypeToggler
        activeType={whichToShow}
        changeActiveType={setWhichToShow}
      />

      {whichToShow !== 'bids' && (
        <div>
          <AsksTable data={asks.slice(0, slicePoint)} />
        </div>
      )}
      {whichToShow !== 'asks' && (
        <div
          className={clsx(
            whichToShow === 'both' && 'mt-4 border-t border-neutral-500 pt-6',
          )}
        >
          <BidsTable data={bids.slice(0, slicePoint)} />
        </div>
      )}
    </>
  );
};
export default TablesWrapper;
