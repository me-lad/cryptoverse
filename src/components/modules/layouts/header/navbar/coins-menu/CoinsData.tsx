// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Button } from '~core/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import { use } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { HeaderNavbarCoinsFetchOrderT } from '../local.types';
import { flexBetween } from '~styles/tw-custom';
import { HeaderNavbarCoinsContext } from '../Navbar.context';
import { useLockBodyScroll } from '~hooks/useLockBodyScroll';
import { FavoriteCoinsContext } from '~contexts/FavoriteCoins.context';
import { errorToast } from '~vendors/react-toastify';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import CoinsList from './CoinsList';

// 🧾 Local types and variables
const orderMap: { [key in HeaderNavbarCoinsFetchOrderT]: string } = {
  PRICE_USD: 'Price',
  TOTAL_MKT_CAP_USD: 'Market Cap',
};

// ⚙️ Functional component
const CoinsData = () => {
  const { params, actions } = use(HeaderNavbarCoinsContext);
  const {
    data: { favoriteIDs },
  } = use(FavoriteCoinsContext);

  useLockBodyScroll();

  return (
    <div className="h-96 border-t border-neutral-700 px-4 py-6">
      {/* List reference select */}
      <div className={flexBetween}>
        <div className="relative flex items-center gap-5 font-semibold">
          <span
            onClick={() => actions?.setParams('showFavorites', false)}
            className="cursor-pointer"
          >
            All
          </span>
          <span
            onClick={() => {
              if (favoriteIDs.length) {
                actions?.setParams('showFavorites', true);
              } else {
                errorToast('No coin has already been added to favorites list.');
              }
            }}
            className="cursor-pointer"
          >
            Favorites
          </span>
          <span
            className={clsx(
              'bg-primary absolute top-full mt-1 h-[2px] transition-transform',
              params?.showFavorites
                ? 'w-16 translate-x-10 duration-300'
                : 'w-5 duration-500',
            )}
          ></span>
        </div>

        <div className="flex items-center gap-4">
          <Tooltip>
            <DropDownAggregator key={params?.order} hideScroll={false}>
              <DropDownTrigger activeClassName="*:*:last:rotate-180">
                <TooltipTrigger asChild>
                  <Button
                    className="!min-w-40 cursor-pointer !rounded-sm"
                    variant={'outline'}
                  >
                    {orderMap[params?.order || 'PRICE_USD']}
                    <ChevronDown
                      className="mt-1 transition-all duration-300"
                      strokeWidth={2.5}
                    />
                  </Button>
                </TooltipTrigger>
              </DropDownTrigger>
              <DropDownMenu className="mt-2 w-full">
                <Button
                  className="w-full cursor-pointer !rounded-none !py-5"
                  variant={'ghost'}
                  disabled={params.order === 'TOTAL_MKT_CAP_USD'}
                  onClick={() => {
                    if (params.order === 'TOTAL_MKT_CAP_USD') return;
                    actions?.setParams('page', 1);
                    actions?.setParams('slicePoint', 25);
                    actions?.setData('coins', []);
                    actions?.setParams('order', 'TOTAL_MKT_CAP_USD');
                  }}
                >
                  Market Cap
                </Button>
                <Button
                  className="w-full cursor-pointer !rounded-none !py-5"
                  variant={'ghost'}
                  disabled={params.order === 'PRICE_USD'}
                  onClick={() => {
                    if (params.order === 'PRICE_USD') return;
                    actions?.setParams('page', 1);
                    actions?.setParams('slicePoint', 25);
                    actions?.setData('coins', []);
                    actions?.setParams('order', 'PRICE_USD');
                  }}
                >
                  Price USD
                </Button>
              </DropDownMenu>
            </DropDownAggregator>

            <TooltipContent>Change Sort Order</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* List */}
      <CoinsList />
    </div>
  );
};
export default CoinsData;
