import type { CurrencyT } from '~types/coins';

interface CurrencyListItemT {
  id: CurrencyT;
  label: string;
  titleAttr: string;
}

export const currencies: CurrencyListItemT[] = [
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
