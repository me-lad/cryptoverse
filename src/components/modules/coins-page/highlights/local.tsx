// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { SentimentClassification } from '~types/api-generated/getMarketSentiment';
import { buildRandomID } from '~helpers/generators';
import Sentiment from './Sentiment';
import GlobalData from './GlobalData';

// 🧾 Local types
export interface HighlightT {
  id: string;
  title: string;
  moreUrl?: string;
  component: React.FC;
}

// 🧾 Local variables
export const highlightsList: HighlightT[] = [
  {
    id: buildRandomID().toString(),
    title: 'Market Sentiment',
    component: () => <Sentiment />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Global Market Data',
    component: () => <GlobalData />,
  },
  // {
  //   id: buildRandomID().toString(),
  //   title: 'Trending',
  //   moreUrl: '/coins',
  //   component: () => <></>,
  // },
  // {
  //   id: buildRandomID().toString(),
  //   title: 'New Listing',
  //   moreUrl: '/coins',
  //   component: () => <></>,
  // },
  // {
  //   id: buildRandomID().toString(),
  //   title: 'Top Gainers',
  //   moreUrl: '/coins',
  //   component: () => <></>,
  // },
  // {
  //   id: buildRandomID().toString(),
  //   title: 'Top Losers',
  //   moreUrl: '/coins',
  //   component: () => <></>,
  // },
] as const;

// Custom functions
export const getFearClipPath = (fearPercent: number): string => {
  const tip = Math.max(fearPercent - 5, 0);
  return `polygon(100% 100%, ${100 - fearPercent}% 100%, ${100 - tip}% 50%, ${100 - fearPercent}% 0%, 100% 0%)`;
};

export const getGreedClipPath = (greedPercent: number): string => {
  const tip = Math.min(greedPercent + 5, 100);
  return `polygon(0 0, ${greedPercent}% 0, ${tip}% 50%, ${greedPercent}% 100%, 0 100%)`;
};

export const generateColorByClassification = (
  classification: SentimentClassification,
) => {
  if (classification === 'Extreme Fear') return '#B5383B';
  if (classification === 'Fear') return '#D95C4E';
  if (classification === 'Neutral') return 'status-warning-;200';
  if (classification === 'Greed') return '#A0C96E';
  if (classification === 'Extreme Greed') return '#268752;';
};
