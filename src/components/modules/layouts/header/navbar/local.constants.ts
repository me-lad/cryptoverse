import type {
  CoinNavItemT,
  NewsNavItemsT,
  HeaderNavbarCoinsMenuContextT,
  HeaderNavbarCoinsContextDataT,
  HeaderNavbarCoinsContextFlagsT,
  HeaderNavbarCoinsContextParamsT,
} from './local.types';
import { sharedReducer } from '~contexts/index.reducer';

export const newsNavItems: NewsNavItemsT = {
  coins: [
    {
      label: 'Bitcoin News',
      icon: '/images/coins-page/btc.png',
      url: '/news?searchString=bitcoin',
    },
    {
      label: 'Ethereum News',
      icon: '/images/coins-page/eth.png',
      url: '/news?searchString=ethereum',
    },
    {
      label: 'Tether News',
      icon: '/images/coins-page/usdt.png',
      url: '/news?searchString=tether',
    },
    {
      label: 'Ripple News',
      icon: '/images/coins-page/xrp.png',
      url: '/news?searchString=ripple',
    },
    {
      label: 'Tron News',
      icon: '/images/coins-page/trx.png',
      url: '/news?searchString=tron',
    },
  ],
  languages: [
    {
      label: 'All News',
      icon: '/svgs/news-page/papers-text.svg',
      url: '/news',
    },
    {
      label: 'English News',
      icon: '/svgs/news-page/en.svg',
      url: '/news?language=EN',
    },
    {
      label: 'Español News',
      icon: '/svgs/news-page/es.svg',
      url: '/news?language=ES',
    },
    {
      label: 'Français News',
      icon: '/images/news-page/fr.png',
      url: '/news?language=FR',
    },
    {
      label: 'Türkiye News',
      icon: '/svgs/news-page/tr.svg',
      url: '/news?language=TR',
    },
  ],
};

export const coinsNavItems: CoinNavItemT[] = [
  {
    label: 'All Coins',
    icon: '/svgs/coins-page/all-coins.svg',
    url: '/coins',
  },
  {
    label: 'Trading View Chart',
    icon: '/svgs/logo/trading-view.svg',
    url: '/tw-chart',
  },
  {
    label: 'Bitcoin',
    icon: '/images/coins-page/btc.png',
    url: '/coin/bitcoin',
    shortName: 'BTC',
  },
  {
    label: 'Solana',
    icon: '/images/coins-page/sol.png',
    url: '/coin/solana',
    shortName: 'SOL',
  },
  {
    label: 'Ethereum',
    icon: '/images/coins-page/eth.png',
    url: '/coin/ethereum',
    shortName: 'ETH',
  },
  {
    label: 'Tether',
    icon: '/images/coins-page/usdt.png',
    url: '/coin/tether',
    shortName: 'USDT',
  },
  {
    label: 'Ripple',
    icon: '/images/coins-page/xrp.png',
    url: '/coin/ripple',
    shortName: 'XRP',
  },
  {
    label: 'Tron',
    icon: '/images/coins-page/trx.png',
    url: '/coin/tron',
    shortName: 'TRX',
  },
  {
    label: 'Cryptocurrency Chart Comparator',
    icon: '/svgs/header/comparison.svg',
    url: '/coins-chart-comparator',
  },
  {
    label: 'Cryptocurrency Calculator',
    icon: '/svgs/header/calculator.svg',
    url: '/coins-calculator',
  },
];

export const initialState: HeaderNavbarCoinsMenuContextT = {
  data: { coins: [] },
  params: {
    page: 1,
    order: 'TOTAL_MKT_CAP_USD',
    slicePoint: 25,
    showFavorites: false,
    lastScrollPosition: 0,
  },
  flags: { isLoading: false },
};

export const navbarReducer = sharedReducer<
  HeaderNavbarCoinsContextDataT,
  HeaderNavbarCoinsContextParamsT,
  HeaderNavbarCoinsContextFlagsT
>;
