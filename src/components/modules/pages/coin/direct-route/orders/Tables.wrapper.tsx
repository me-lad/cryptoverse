// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Button } from '~core/ui/shadcn/button';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import { GetCoinOrders } from '~types/api-generated/getCoinOrders';
import AsksTable from './TableAsks.fn';
import BidsTable from './TableBids.fn';

// 🧾 Local types
type ShowSectionT = 'Bids' | 'Asks' | 'Both';

// ⚙️ Functional component
const TablesWrapper: React.FC<GetCoinOrders> = (props) => {
  const { asks, bids } = props;
  const [slicePoint, setSlicePoint] = useState(6);
  const [whichToShow, setWhichToShow] = useState<ShowSectionT>('Both');

  useEffect(() => {
    if (whichToShow !== 'Both') {
      setSlicePoint(14);
    } else {
      setSlicePoint(6);
    }
  }, [whichToShow]);

  return (
    <>
      <div className="absolute top-20 right-8 flex items-center gap-2.5 min-[86em]:top-7 min-[86em]:right-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setWhichToShow('Both')}
              className="hover:!bg-background cursor-pointer"
              size={'icon'}
              variant={'ghost'}
              disabled={whichToShow === 'Both'}
            >
              <Image
                src={'/svgs/coin-page/orders/both.svg'}
                width={22}
                height={22}
                alt="Both"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Asks & Bids</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setWhichToShow('Bids')}
              className="hover:!bg-background cursor-pointer"
              size={'icon'}
              variant={'ghost'}
              disabled={whichToShow === 'Bids'}
            >
              <Image
                src={'/svgs/coin-page/orders/bids.svg'}
                width={22}
                height={22}
                alt="Bids"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bids</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setWhichToShow('Asks')}
              className="hover:!bg-background cursor-pointer"
              size={'icon'}
              variant={'ghost'}
              disabled={whichToShow === 'Asks'}
            >
              <Image
                src={'/svgs/coin-page/orders/asks.svg'}
                width={22}
                height={22}
                alt="Asks"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Asks</TooltipContent>
        </Tooltip>
      </div>

      {whichToShow !== 'Bids' && (
        <div>
          <AsksTable data={asks.slice(0, slicePoint)} />
        </div>
      )}
      {whichToShow !== 'Asks' && (
        <div
          className={clsx(
            whichToShow === 'Both' && 'mt-4 border-t border-neutral-500 pt-6',
          )}
        >
          <BidsTable data={bids.slice(0, slicePoint)} />
        </div>
      )}
    </>
  );
};
export default TablesWrapper;
