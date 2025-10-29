import { Dispatch, SetStateAction } from 'react';
import type { CoinEntity_Compare } from './api-generated/shared';

export type HeaderNavbarCoinsFetchOrderT = 'TOTAL_MKT_CAP_USD' | 'PRICE_USD';

interface HeaderNavbarCoinsMenuParamsT {
  order: HeaderNavbarCoinsFetchOrderT;
  page: number;
  slicePoint: number;
  showFavorites?: boolean;
  isLoading: boolean;
  lastScrollPosition?: number;
}

interface HeaderNavbarCoinsMenuActionsT {
  setOrder: (value: HeaderNavbarCoinsFetchOrderT) => void;
  changeShowFavorites: (value: boolean) => void;
  setPage: (value: number) => void;
  resetCoins: () => void;
  setSlicePoint: Dispatch<SetStateAction<number>>;
  setLastScrollPosition: Dispatch<SetStateAction<number>>;
}

export interface HeaderNavbarCoinsMenuContextT {
  coins: CoinEntity_Compare[];
  params?: HeaderNavbarCoinsMenuParamsT;
  actions?: HeaderNavbarCoinsMenuActionsT;
}
