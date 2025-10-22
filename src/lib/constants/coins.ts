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

export const currencies: {
  id: CurrencyT;
  label: string;
  titleAttr: string;
}[] = [
  {
    id: 'USD',
    label: 'US Dollar',
    titleAttr: '🇺🇸',
  },
  {
    id: 'EUR',
    label: 'Euro',
    titleAttr: '🇪🇺',
  },
  {
    id: 'GBP',
    label: 'British Pound',
    titleAttr: '🇬🇧',
  },
  {
    id: 'JPY',
    label: 'Japanese Yen',
    titleAttr: '🇯🇵',
  },
  {
    id: 'IRR',
    label: 'Iranian Rial',
    titleAttr: '🇮🇷',
  },
];
