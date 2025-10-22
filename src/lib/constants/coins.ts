import type { CoinsContextT } from '~types/coins';
import type { CurrencyT } from '~types/coins';

export const coinsContextInitialState: CoinsContextT = {
  coins: [],
  params: {
    page: 1,
    perPage: 20,
    order: 'market_cap_desc',
  },
} as const;

export const currencies: { id: CurrencyT; label: string }[] = [
  {
    id: 'USD',
    label: 'US Dollar',
  },
  {
    id: 'EUR',
    label: 'Euro',
  },
  {
    id: 'GBP',
    label: 'British Pound',
  },
  {
    id: 'JPY',
    label: 'Japanese Yen',
  },
  {
    id: 'IRR',
    label: 'Iranian Rial',
  },
];
