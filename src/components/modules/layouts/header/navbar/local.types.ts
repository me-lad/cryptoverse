import type { CoinEntity_Compare } from '~types/api-generated/shared';
import type { ContextGeneralT } from '~contexts/local';

export interface HeaderNavbarCoinsContextDataT {
  coins: CoinEntity_Compare[];
}

export interface HeaderNavbarCoinsContextParamsT {
  page: number;
  slicePoint: number;
  order: HeaderNavbarCoinsFetchOrderT;
  lastScrollPosition: number;
  showFavorites: boolean;
}

export interface HeaderNavbarCoinsContextFlagsT {
  isLoading: boolean;
}

export type HeaderNavbarCoinsMenuContextT = ContextGeneralT<
  HeaderNavbarCoinsContextDataT,
  HeaderNavbarCoinsContextParamsT,
  HeaderNavbarCoinsContextFlagsT
>;

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
