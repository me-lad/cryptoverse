import type { CoinEntity_Compare } from '../shared';

export type GetWidgetCoins = {
  Data: Data;
  Err: Err;
};
export type Data = {
  STATS: STATS;
  LIST?: CoinEntity_Compare[] | null;
};
export type STATS = {
  PAGE: number;
  PAGE_SIZE: number;
  TOTAL_ASSETS: number;
};

export type Err = {};
