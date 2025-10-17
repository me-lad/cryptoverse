import type { CoinEntity_Gecko } from './api-generated/shared';

// Currency
export type CurrencyT = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'IRR';

export type CurrencyConversionFactorsT = Record<CurrencyT, number>;

export interface CurrencyContextT {
  currency: CurrencyT;
  conversionFactors?: CurrencyConversionFactorsT;
  setCurrency: (value: CurrencyT) => void;
}

// Context
export type CoinsOrderT = 'volume_desc' | 'market_cap_desc';

interface CoinsContextParamsT {
  page: number;
  perPage: number;
  order: CoinsOrderT;
}

interface CoinsContextActionsT {
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setOrder: (order: CoinsOrderT) => void;
}

export interface CoinsContextT {
  coins: CoinEntity_Gecko[];
  params: CoinsContextParamsT;
  actions?: CoinsContextActionsT;
  isFetching?: boolean;
}
