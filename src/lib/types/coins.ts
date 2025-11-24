import type { CoinEntity_Gecko } from './api-generated/shared';

// Currency
export type CurrencyT = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'IRR';

export type CurrencyConversionFactorsT = Record<CurrencyT, number>;

export interface CurrencyContextDataT {
  currency: CurrencyT;
  conversionFactors?: CurrencyConversionFactorsT;
}

// Context ( Coins )
export type CoinsOrderT = 'volume_desc' | 'market_cap_desc';

export interface CoinsContextParamsT {
  page: number;
  perPage: number;
  order: CoinsOrderT;
}

export interface CoinsContextDataT {
  coins: CoinEntity_Gecko[];
}

export interface CoinsContextFlagsT {
  isFetching: boolean;
}

export interface FavoriteCoinsContextT {
  favoriteIDs: string[]; // Coins IDs;
  favoriteCoins: CoinEntity_Gecko[];
  showFavorites: boolean;
  fetchFavorites: boolean;
  isFetchingFavorites: boolean;
  changeHandler: (id: string) => void;
  setShowFavorites: (order: boolean) => void;
  setFetchFavorites: (order: boolean) => void;
}
