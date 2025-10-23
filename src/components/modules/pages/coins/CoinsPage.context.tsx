// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import type { CoinsContextT, CoinsOrderT } from '~types/coins';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { coinsContextInitialState } from '~constants/coins';
import { getCoins } from '~services/coins';
import { minutesToMillisecond } from '~helpers/time';
import { showErrorToast } from '~helpers/toast';
import { AuthMessages } from '~constants/messages';
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';

// 🧾 Local types and variables
export const CoinsContext = createContext<CoinsContextT>(
  coinsContextInitialState,
);

interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
  const [page, setPage] = useLocalStorage('coinsPage', 1);
  const [perPage, setPerPage] = useLocalStorage('coinsPerPage', 20);
  const [order, setOrder] = useLocalStorage<CoinsOrderT>(
    'coinsOrder',
    'market_cap_desc',
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ['coins', page, perPage, order],
    queryFn: () => getCoins(order, page, perPage),
    staleTime: minutesToMillisecond(1.5),
  });

  const { favoriteCoins, showFavorites } = use(FavoriteCoinsContext);

  const value: CoinsContextT = {
    coins: showFavorites ? favoriteCoins : data || [],
    params: {
      page,
      order,
      perPage,
    },
    actions: {
      setPage,
      setOrder,
      setPerPage,
    },
    flags: {
      isFetching: isLoading,
    },
  };

  if (error) showErrorToast(AuthMessages.Error.CatchHandler);

  return <CoinsContext value={value}>{children}</CoinsContext>;
};
export default CoinsPageContext;
