// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import type { CoinsContextT, CoinsOrderT } from '~types/coins';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { coinsContextInitialState } from '~constants/coins';
import { getCoins } from '~services/coins';
import { minutesToMillisecond } from '~helpers/time';
import { showErrorToast } from '~helpers/toast';
import { AuthMessages } from '~constants/messages';

// 🧾 Local types and variables
export const CoinsContext = createContext<CoinsContextT>(
  coinsContextInitialState,
);

interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
  const [page, setPage] = useLocalStorage('coins_page', 1);
  const [perPage, setPerPage] = useLocalStorage('coins_perPage', 20);
  const [order, setOrder] = useLocalStorage<CoinsOrderT>(
    'coins_order',
    'market_cap_desc',
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ['coins', page, perPage, order],
    queryFn: () => getCoins(order, page, perPage),
    staleTime: minutesToMillisecond(1.5),
  });

  const value: CoinsContextT = {
    coins: data || [],
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
    isFetching: isLoading,
  };

  if (error) showErrorToast(AuthMessages.Error.CatchHandler);

  return <CoinsContext value={value}>{children}</CoinsContext>;
};
export default CoinsPageContext;
