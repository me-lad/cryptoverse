import type { SentimentClassification } from '@/lib/types/api-generated/coins/getMarketSentiment';

interface ClipPathOutputT {
  fearPath: string;
  greedPath: string;
}

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

export const SentimentClassificationMatcher = (
  value: number,
): SentimentClassification => {
  if (value >= 80) {
    return 'Extreme Greed';
  } else if (value >= 60) {
    return 'Greed';
  } else if (value >= 40) {
    return 'Neutral';
  } else if (value >= 20) {
    return 'Fear';
  } else {
    return 'Extreme Fear';
  }
};
