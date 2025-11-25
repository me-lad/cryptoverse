// 📌 Directives
'use client';

// 📦 Third-Party imports
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import { type CoinsContextT, initialState, coinsReducer } from './local';
import type { CoinsContextParamsT } from '~types/coins';
import { createActions } from '~contexts/index.actions';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { FavoriteCoinsContext } from '~contexts/FavoriteCoins.context';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { getCoins } from '~services/integrations/coins';
import { minutesToMillisecond } from '~helpers/time';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

export const CoinsContext = React.createContext<CoinsContextT>(initialState);

// ⚙️ Functional component
const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
  const [coinsParams, setCoinsParams] = useLocalStorage<CoinsContextParamsT>(
    'coins_params',
    initialState.params,
  );
  const hasHydrated = React.useRef(false);

  const [state, dispatch] = React.useReducer(coinsReducer, initialState);

  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  React.useEffect(() => {
    if (hasHydrated.current || !coinsParams) return;
    const { order, page, perPage } = coinsParams;
    actions.setParams('page', page);
    actions.setParams('perPage', perPage);
    actions.setParams('order', order);
    hasHydrated.current = true;
  }, [coinsParams]);

  React.useEffect(() => {
    if (!hasHydrated.current) return;
    setCoinsParams(state.params);
  }, [state]);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'coins',
      state.params.page,
      state.params.perPage,
      state.params.order,
    ],
    queryFn: () =>
      getCoins(state.params.order, state.params.page, state.params.perPage),
    staleTime: minutesToMillisecond(1.5),
  });

  const favoritesContext = React.use(FavoriteCoinsContext);

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
