// 📌 Directives
'use client';

// 📦 Third-Party imports
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import type {
  FavoriteCoinsContextDataT,
  FavoriteCoinsContextParamsT,
  FavoriteCoinsContextFlagsT,
} from '~types/coins';
import type { ContextGeneralT } from '~contexts/local';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { errorToast } from '~vendors/react-toastify';
import { ToastError } from '~core/ui/shared/typography';
import { getCoinsByIDs } from '~services/integrations/coins';
import { sharedReducer } from '~contexts/index.reducer';
import { createActions } from '~contexts/index.actions';

// 🧾 Context declaration and local types
interface PropsT {
  children: React.ReactNode;
}

type FavoriteCoinsContextT = ContextGeneralT<
  FavoriteCoinsContextDataT,
  FavoriteCoinsContextParamsT,
  FavoriteCoinsContextFlagsT
> & {
  handlers?: {
    changeHandler: (id: string) => void;
  };
};

const initialState: FavoriteCoinsContextT = {
  data: { favoriteIDs: [], favoriteCoins: [] },
  params: { showFavorites: false, fetchFavorites: false },
  flags: { isFetching: false },
};

export const FavoriteCoinsContext =
  React.createContext<FavoriteCoinsContextT>(initialState);

// ⚙️ Functional component
const FavoriteCoinsContextProvider: React.FC<PropsT> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage<string[]>(
    'favorite_coins',
    [],
  );

  const [state, dispatch] = React.useReducer(
    sharedReducer<
      FavoriteCoinsContextDataT,
      FavoriteCoinsContextParamsT,
      FavoriteCoinsContextFlagsT
    >,
    initialState,
  );

  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  const hasHydrated = React.useRef(false);

  React.useEffect(() => {
    if (hasHydrated.current || !storedFavorites) return;
    actions.setData('favoriteIDs', storedFavorites);
    hasHydrated.current = true;
  }, [storedFavorites]);
  React.useEffect(() => {
    if (!hasHydrated.current) return;
    setStoredFavorites(state.data.favoriteIDs);
  }, [state]);

  const queryKey = [
    'favoriteCoins',
    state.params.showFavorites,
    state.data.favoriteIDs.sort().join(','),
  ];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => getCoinsByIDs(state.data.favoriteIDs),
    staleTime: 2500,
    gcTime: 5000,
    enabled:
      !!state.data.favoriteIDs?.length &&
      (state.params.showFavorites || state.params.fetchFavorites),
  });

  const changeHandler = (id: string) => {
    if (state.data.favoriteIDs.length >= 50) {
      return errorToast(
        'The maximum count for favorite coins is 50. to add some more please remove some of existence coins first.',
        { autoClose: 10_000 },
      );
    }

    let newList: string[] = [];
    if (state.data.favoriteIDs.includes(id)) {
      newList = state.data.favoriteIDs.filter((item) => item !== id);
    } else {
      newList = Array.from(new Set([...state.data.favoriteIDs, id]));
    }

    actions.setData('favoriteIDs', newList);
  };

  const value: FavoriteCoinsContextT = {
    ...state,
    data: { ...state.data, favoriteCoins: data || [] },
    flags: { isFetching: isLoading },
    handlers: { changeHandler },
    actions,
  };

  return (
    <FavoriteCoinsContext value={value}>
      {error && <ToastError />}
      {children}
    </FavoriteCoinsContext>
  );
};
export default FavoriteCoinsContextProvider;
