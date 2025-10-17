// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { Trending, TopGainers, TopLosers, LastUpdated } from './MarketWidgets';
import type { SentimentClassification } from '~types/api-generated/getMarketSentiment';
import { buildRandomID } from '~helpers/generators';
import Sentiment from './Sentiment';
import GlobalData from './GlobalData';

//🧾 Local types
export interface HighlightT {
  id: string;
  title: string;
  component: React.FC;
}

interface ClipPathOutputT {
  fearPath: string;
  greedPath: string;
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
  {
    id: buildRandomID().toString(),
    title: 'Trending',
    component: () => <Trending />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Last updated',
    component: () => <LastUpdated />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Top Gainers',
    component: () => <TopGainers />,
  },
  {
    id: buildRandomID().toString(),
    title: 'Top Losers',
    component: () => <TopLosers />,
  },
] as const;

// Custom functions
export const buildSentimentClipPath = (fearValue: number): ClipPathOutputT => {
  let fearPath = '';
  let greedPath = '';

  const greedValue = 100 - fearValue;

  if (fearValue === 50) {
    fearPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
    greedPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
  }

  if (fearValue > 50) {
    const fearTip = Math.min(95 - fearValue, 100);
    const greedTip = Math.max(greedValue - 5, 0);

    fearPath = `polygon(100% 100%, ${greedValue}% 100%, ${fearTip}% 50%, ${greedValue}% 0, 100% 0)`;
    greedPath = `polygon(0 0, ${greedValue}% 0, ${greedTip}% 50%, ${greedValue}% 100%, 0 100%)`;
  }

  if (fearValue < 50) {
    const fearTip = Math.max(fearValue - 5, 0);
    const greedTip = Math.min(greedValue + 5, 100);

    fearPath = `polygon(100% 100%, ${greedValue}% 100%, ${100 - fearTip}% 50%, ${greedValue}% 0%, 100% 0%)`;
    greedPath = `polygon(0 0, ${greedValue}% 0, ${greedTip}% 50%, ${greedValue}% 100%, 0 100%)`;
  }

  return {
    fearPath,
    greedPath,
  };
};

export const buildColorByClassification = (
  classification: SentimentClassification,
) => {
  if (classification === 'Extreme Fear') return '#B5383B';
  if (classification === 'Fear') return '#D95C4E';
  if (classification === 'Neutral') return '#d4b830';
  if (classification === 'Greed') return '#A0C96E';
  if (classification === 'Extreme Greed') return '#268752;';
};
