// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import type { FavoriteCoinsContextT } from '~types/coins';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { errorToast } from '~vendors/react-toastify';
import { ToastError } from '~core/ui/shared/typography';
import { getCoinsByIDs } from '~services/integrations/coins';

// 🧾 Context declaration and local types
interface PropsT {
  children: React.ReactNode;
}

export const FavoriteCoinsContext = createContext<FavoriteCoinsContextT>({
  favoriteIDs: [],
  favoriteCoins: [],
  showFavorites: false,
  fetchFavorites: false,
  isFetchingFavorites: false,
  changeHandler: () => {},
  setShowFavorites: () => {},
  setFetchFavorites: () => {},
});

// ⚙️ Functional component
const FavoriteCoinsContextProvider: React.FC<PropsT> = ({ children }) => {
  const [favoriteIDs, setFavoriteIDs] = useLocalStorage<string[]>(
    'favoriteCoins',
    [],
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [fetchFavorites, setFetchFavorites] = useState(false);

  const queryKey = [
    'favoriteCoins',
    showFavorites,
    !!favoriteIDs && favoriteIDs.sort().join(','),
  ];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => getCoinsByIDs(favoriteIDs || []),
    staleTime: 2500,
    gcTime: 5000,
    enabled: !!favoriteIDs?.length && (showFavorites || fetchFavorites),
  });

  const changeHandler = (id: string) => {
    let newList: string[] = [];
    if (favoriteIDs.includes(id)) {
      newList = favoriteIDs.filter((item) => item !== id);
    } else {
      newList = Array.from(new Set([...favoriteIDs, id]));
    }

    if (newList.length > 50) {
      errorToast(
        'The maximum count for favorite coins is 50. to add some more please remove some of existence coins first.',
        { autoClose: 10_000 },
      );
    } else {
      setFavoriteIDs(newList);
    }
  };

  const value = {
    favoriteIDs,
    favoriteCoins: data || [],
    changeHandler,
    showFavorites,
    fetchFavorites,
    isFetchingFavorites: isLoading,
    setShowFavorites,
    setFetchFavorites,
  };

  return (
    <FavoriteCoinsContext value={value}>
      {error && <ToastError />}
      {children}
    </FavoriteCoinsContext>
  );
};
export default FavoriteCoinsContextProvider;
