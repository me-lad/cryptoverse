// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useReducer, useMemo, useEffect } from 'react';

// 📦 Internal imports
import type { HeaderNavbarCoinsMenuContextT } from './local.types';
import type { CoinEntity_Compare } from '~types/api-generated/shared';
import { initialState, navbarReducer } from './local.constants';
import { getCoinsCryptoCompare } from '~services/integrations/coins';
import { errorToast } from '~vendors/react-toastify';
import { minutesToMillisecond } from '~helpers/time';
import { Messages } from '~constants/messages';
import { createActions } from '~contexts/index.actions';

// 🧾 Local types and context creation
interface PropsT {
  children: React.ReactNode;
}

export const HeaderNavbarCoinsContext =
  createContext<HeaderNavbarCoinsMenuContextT>(initialState);

// ⚙️ Functional component
const NavbarContext: React.FC<PropsT> = ({ children }) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['headerCoins', state.params.page, state.params.order],
    queryFn: () => getCoinsCryptoCompare(state.params.order, state.params.page),
    enabled: !state.params.showFavorites,
    staleTime: minutesToMillisecond(2),
  });

  useEffect(() => {
    const shouldFetchNextPage = state.params.slicePoint
      .toString()
      .endsWith('75');

    console.log(state.params.slicePoint, 'Slice point');

    if (shouldFetchNextPage) {
      const newPageValue = state.params.page + 1;
      actions.setParams('page', newPageValue);
    }
  }, [state.params.slicePoint]);

  useEffect(() => {
    if (data) {
      const updateCoinsList: CoinEntity_Compare[] = Array.from(
        new Set([...state.data.coins, ...data.Data.LIST]),
      );

      actions.setData('coins', updateCoinsList);
    }
  }, [data]);

  useEffect(() => {
    console.log(state.params.page, 'Page');
  }, [state.params.page]);

  const value: HeaderNavbarCoinsMenuContextT = {
    ...state,
    flags: { isLoading },
    actions,
  };

  if (error) errorToast(Messages.Error.CatchHandler);

  return (
    <HeaderNavbarCoinsContext value={value}>
      {children}
    </HeaderNavbarCoinsContext>
  );
};
export default NavbarContext;
