// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useEffect } from 'react';

// 📦 Internal imports
import type {
  HeaderNavbarCoinsFetchOrderT,
  HeaderNavbarCoinsMenuContextT,
} from '~types/header';
import { getCoinsCryptoCompare } from '~services/coins';
import { showErrorToast } from '~helpers/toast';
import { CoinEntity_Compare } from '~types/api-generated/shared';
import { minutesToMillisecond } from '~helpers/time';

// 🧾 Local types and context creation
interface PropsT {
  children: React.ReactNode;
}

export const HeaderNavbarCoinsContext =
  createContext<HeaderNavbarCoinsMenuContextT>({ coins: [] });

// ⚙️ Functional component
const NavbarContext: React.FC<PropsT> = ({ children }) => {
  const [coins, setCoins] = useState<CoinEntity_Compare[]>([]);
  const [page, setPage] = useState(1);
  const [showFavorites, changeShowFavorites] = useState(false);
  const [slicePoint, setSlicePoint] = useState(25);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [order, setOrder] =
    useState<HeaderNavbarCoinsFetchOrderT>('TOTAL_MKT_CAP_USD');

  const { data, isLoading, error } = useQuery({
    queryKey: ['headerCoins', page, order],
    queryFn: () => getCoinsCryptoCompare(order, page),
    enabled: showFavorites === false,
    staleTime: minutesToMillisecond(2),
  });

  useEffect(() => {
    const shouldFetchNextPage = slicePoint.toString().endsWith('75');

    if (shouldFetchNextPage) setPage((prev) => prev + 1);
  }, [slicePoint]);

  useEffect(() => {
    if (data) {
      const updateCoinsList = Array.from(
        new Set([...coins, ...data.Data.LIST]),
      );

      setCoins(updateCoinsList);
    }
  }, [data]);

  const value: HeaderNavbarCoinsMenuContextT = {
    coins,

    params: {
      order,
      page,
      showFavorites,
      slicePoint,
      isLoading,
      lastScrollPosition,
    },

    actions: {
      setOrder,
      setPage,
      setSlicePoint,
      changeShowFavorites,
      setLastScrollPosition,
      resetCoins: () => setCoins([]),
    },
  };

  if (error) showErrorToast();

  return (
    <HeaderNavbarCoinsContext value={value}>
      {children}
    </HeaderNavbarCoinsContext>
  );
};
export default NavbarContext;
