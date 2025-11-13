// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { Trending, TopGainers, TopLosers, LastUpdated } from './MarketWidgets';
import { buildRandomID } from '~helpers/generators';
import Sentiment from './Sentiment';
import GlobalData from './GlobalData';

//🧾 Local types
export interface HighlightT {
  id: string;
  title: string;
  component: React.ReactNode;
}

// 🧾 Local variables
export const highlightsList: HighlightT[] = [
  {
    id: buildRandomID().toString(),
    title: 'Market Sentiment',
    component: <Sentiment />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Global Market Data',
    component: <GlobalData />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Trending',
    component: <Trending />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Last updated',
    component: <LastUpdated />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Top Gainers',
    component: <TopGainers />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Top Losers',
    component: <TopLosers />,
  },
] as const;
