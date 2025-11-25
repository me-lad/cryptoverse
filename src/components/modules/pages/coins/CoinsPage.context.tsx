// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, {
  createContext,
  use,
  useMemo,
  useReducer,
  useEffect,
  useRef,
} from 'react';

// 📦 Internal imports
import { type CoinsContextT, initialState, coinsReducer } from './local';
import type { CoinsContextParamsT } from '~types/coins';
import { createActions } from '~contexts/index.actions';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { FavoriteCoinsContext } from '~contexts/FavoriteCoins.context';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { useCoinsQuery } from './coins/useCoinsQuery';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

export const CoinsContext = createContext<CoinsContextT>(initialState);

// ⚙️ Functional component
const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
  const [coinsParams, setCoinsParams] = useLocalStorage<CoinsContextParamsT>(
    'coins_params',
    {
      page: 1,
      perPage: 20,
      order: 'market_cap_desc',
    },
  );
  const hasHydrated = useRef(false);

  const [state, dispatch] = useReducer(coinsReducer, initialState);

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  useEffect(() => {
    if (hasHydrated.current || !coinsParams) return;
    const { order, page, perPage } = coinsParams;
    actions.setParams('page', page);
    actions.setParams('perPage', perPage);
    actions.setParams('order', order);
    hasHydrated.current = true;
  }, [coinsParams]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    setCoinsParams(state.params);
  }, [state]);

  const { data, error, isLoading } = useCoinsQuery();

  const favoritesContext = use(FavoriteCoinsContext);

  const value: CoinsContextT = {
    data: {
      coins: favoritesContext.params.showFavorites
        ? favoritesContext.data.favoriteCoins
        : data || [],
    },
    params: { ...state.params },
    flags: { isFetching: isLoading },
    actions,
  };

  if (error) errorToast(Messages.Error.CatchHandler);

  return <CoinsContext value={value}>{children}</CoinsContext>;
};
export default CoinsPageContext;
