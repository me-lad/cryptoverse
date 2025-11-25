// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import Image from 'next/image';
import clsx from 'clsx';
import React, { use, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

// 📦 Internal imports
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import { Percentage, Price } from '~core/global/formatters';
import { HeaderNavbarCoinsContext } from '../Navbar.context';
import CoinsScrollHandler from './CoinsScrollHandler';

// ⚙️ Functional component
const CoinsList = () => {
  const { coins, params } = use(HeaderNavbarCoinsContext);
  const { data, actions, handlers } = use(FavoriteCoinsContext);
  const coinsContainerElm = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    actions?.setParams('fetchFavorites', true);
  }, [params?.showFavorites]);

  return (
    <div className="mt-8 max-h-5/6 overflow-y-auto" ref={coinsContainerElm}>
      <Table>
        <TableHeader>
          <TableRow className="!bg-background-lighter !border-0 !outline-0">
            {params?.showFavorites && (
              <TableHead className="w-2 border-b"></TableHead>
            )}
            <TableHead className="border-b">Pair</TableHead>
            <TableHead className="border-b">Price</TableHead>
            <TableHead className="border-b">24h Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params?.showFavorites
            ? data.favoriteCoins.map((item) => (
                <TableRow
                  className={clsx(
                    'hover:!bg-background-lighter !border-0 !outline-0 hover:cursor-pointer',
                  )}
                  key={item.id}
                >
                  <TableCell className="w-2">
                    <div onClick={() => handlers?.changeHandler(item.id)}>
                      <Star
                        className={clsx(
                          data.favoriteIDs.includes(item.id) &&
                            'text-[#DBA400]',
                        )}
                        size={16}
                        fill={
                          data.favoriteIDs.includes(item.id)
                            ? '#DBA400'
                            : 'transparent'
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center gap-4">
                    <Image
                      className="rounded-full"
                      src={item.image}
                      width={25}
                      height={25}
                      alt={item.symbol}
                    />

                    <h4 className="text-base">
                      {item.symbol.toUpperCase()}
                      <small className="mt-0.5 block text-xs text-neutral-400">
                        {item.id.slice(0, 1).toUpperCase() + item.id.slice(1)}
                      </small>
                    </h4>
                  </TableCell>
                  <TableCell>
                    <Price price={item.current_price || 0} />
                  </TableCell>
                  <TableCell>
                    <Percentage
                      percentage={item.price_change_percentage_24h}
                      iconSize={15}
                      fontSize="0.9rem"
                    />
                  </TableCell>
                </TableRow>
              ))
            : coins.slice(0, params?.slicePoint).map((item) => (
                <TableRow
                  className={clsx(
                    'hover:!bg-background-lighter !border-0 !outline-0 hover:cursor-pointer',
                  )}
                  key={item.ID}
                >
                  <TableCell className="flex items-center gap-4">
                    <Image
                      className="text-primary flex items-center rounded-full text-center text-[0.5rem]"
                      src={item.LOGO_URL}
                      width={25}
                      height={25}
                      alt={item.SYMBOL}
                    />

                    <h4 className="text-base">
                      {item.SYMBOL.toUpperCase()}
                      <small className="mt-0.5 block text-xs text-neutral-400">
                        {item.URI.slice(0, 1).toUpperCase() + item.URI.slice(1)}
                      </small>
                    </h4>
                  </TableCell>
                  <TableCell>
                    <Price price={item.PRICE_USD || 0} />
                  </TableCell>
                  <TableCell>
                    <Percentage
                      percentage={
                        item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD
                      }
                      iconSize={15}
                      fontSize="0.9rem"
                    />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {!params?.showFavorites && (
        <CoinsScrollHandler container={coinsContainerElm} />
      )}
    </div>
  );
};
export default CoinsList;
