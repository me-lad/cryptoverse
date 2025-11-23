// // 📌 Directives
// 'use client';

// // 📦 Third-Party imports
// import React, { createContext, use, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';

// // 📦 Internal imports
// import type { CoinsContextT, CoinsOrderT } from '~types/coins';
// import { useLocalStorage } from '~hooks/useLocalStorage';
// import { getCoins } from '~services/integrations/coins';
// import { minutesToMillisecond } from '~helpers/time';
// import { errorToast } from '~vendors/react-toastify';
// import { Messages } from '~constants/messages';
// import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';

// // 🧾 Local types and variables
// const initialState: CoinsContextT = {
//   coins: [],
//   params: {
//     page: 1,
//     perPage: 20,
//     order: 'market_cap_desc',
//   },
//   flags: {},
// } as const;

// export const CoinsContext = createContext<CoinsContextT>(initialState);

// interface PropsT {
//   children: React.ReactNode;
// }

// // ⚙️ Functional component
// const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
//   const [page, setPage] = useLocalStorage('coinsPage', 1);
//   const [perPage, setPerPage] = useLocalStorage('coinsPerPage', 20);
//   const [order, setOrder] = useLocalStorage<CoinsOrderT>(
//     'coinsOrder',
//     'market_cap_desc',
//   );

//   const { data, error, isLoading } = useQuery({
//     queryKey: ['coins', page, perPage, order],
//     queryFn: () => getCoins(order, page, perPage),
//     staleTime: minutesToMillisecond(1.5),
//   });

//   const { favoriteCoins, showFavorites } = use(FavoriteCoinsContext);

//   const value: CoinsContextT = {
//     coins: showFavorites ? favoriteCoins : data || [],
//     params: {
//       page,
//       order,
//       perPage,
//     },
//     actions: {
//       setPage,
//       setOrder,
//       setPerPage,
//     },
//     flags: {
//       isFetching: isLoading,
//     },
//   };

//   if (error) errorToast(Messages.Error.CatchHandler);

//   return <CoinsContext value={value}>{children}</CoinsContext>;
// };
// export default CoinsPageContext;

// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, use, useMemo, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import type {
  CoinsContextDataT,
  CoinsContextFlagsT,
  CoinsContextParamsT,
} from '~types/coins';
import type { ContextGeneralT } from '~contexts/local';
import { sharedReducer } from '~contexts/index.reducer';
import { createActions } from '~contexts/index.actions';
import { getCoins } from '~services/integrations/coins';
import { minutesToMillisecond } from '~helpers/time';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { FavoriteCoinsContext } from '~contexts/FavoriteCoins.context';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

type CoinsContextT = ContextGeneralT<
  CoinsContextDataT,
  CoinsContextParamsT,
  CoinsContextFlagsT
>;

const initialState: CoinsContextT = {
  data: { coins: [] },
  params: { page: 1, perPage: 20, order: 'market_cap_desc' },
  flags: { isFetching: false },
};

export const CoinsContext = createContext<CoinsContextT>(initialState);

// ⚙️ Functional component
const CoinsPageContext: React.FC<PropsT> = ({ children }) => {
  const [state, dispatch] = useReducer(
    sharedReducer<CoinsContextDataT, CoinsContextParamsT, CoinsContextFlagsT>,
    initialState,
  );

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

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

  const { favoriteCoins, showFavorites } = use(FavoriteCoinsContext);

  if (error) errorToast(Messages.Error.CatchHandler);

  const value: CoinsContextT = {
    data: { coins: showFavorites ? favoriteCoins : data || [] },
    params: { ...state.params },
    flags: { isFetching: isLoading },
    actions,
  };

  return <CoinsContext value={value}>{children}</CoinsContext>;
};
export default CoinsPageContext;
