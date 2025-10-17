import type { CoinsContextT } from '~types/coins';

export const coinsContextInitialState: CoinsContextT = {
  coins: [],
  params: {
    page: 1,
    perPage: 20,
    order: 'market_cap_desc',
  },
} as const;
