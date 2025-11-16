import { Dispatch, SetStateAction } from 'react';
import type { CoinEntity_Compare } from '~types/api-generated/shared';

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

export type HeaderNavbarCoinsFetchOrderT = 'TOTAL_MKT_CAP_USD' | 'PRICE_USD';

export interface NewsNavItemT {
  label: string;
  url: string;
  icon: string;
}

export interface NewsNavItemsT {
  coins: NewsNavItemT[];
  languages: NewsNavItemT[];
}

export type CoinNavItemT = NewsNavItemT & {
  shortName?: string;
};
