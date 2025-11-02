import type { NewsContextParamsT } from '~types/news';
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import type { GetCoinOrders } from '../types/api-generated/getCoinOrders';

export const buildRandomID = () => {
  return Math.floor(Date.now() * (Math.random() * 100));
};

export const buildRandomCode = (length: number = 6): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

export const buildCoinChart = (symbol: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_CHART;
  return `${baseUrl}/${symbol.toUpperCase()}/USD/latest.png`;
};

export const buildUrl = (
  baseUrl: string,
  params?: Record<string, string | number | undefined>,
) => {
  if (!params || Object.keys(params).length === 0) return baseUrl;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value.toString());
    }
  });

  return `${baseUrl}?${query.toString()}`;
};

export const updateSearchParams = (params: NewsContextParamsT) => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    const isTruthy =
      typeof value === 'string'
        ? value.trim() !== ''
        : value !== undefined && value !== null && value !== 0;

    if (isTruthy) {
      url.searchParams.set(key, String(value));
    } else {
      url.searchParams.delete(key);
    }
  });

  window.history.replaceState({}, '', url.toString());
};

export const buildCoinChartData = (
  data: GetCoinChartData,
  chartRef: keyof GetCoinChartData,
  cycle: 1 | 7 | 30 | 365,
) => {
  let timeFormatOption: Intl.DateTimeFormatOptions = {};

  if (cycle === 365) {
    timeFormatOption = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  } else {
    timeFormatOption = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  }

  const convertedData = data[chartRef].map((item) => {
    return {
      date: new Intl.DateTimeFormat('en-US', timeFormatOption).format(
        new Date(item[0]),
      ),
      value: item[1],
    };
  });
  return convertedData;
};

export const extractUsername = (username: string): string => {
  const delimiters = /[\s-_]+/;
  const hasDelimiters = delimiters.test(username);

  if (hasDelimiters) {
    const parts = username.split(delimiters).filter(Boolean);
    return parts.map((part) => part[0].toUpperCase()).join('');
  }

  const upperLetters = username.match(/[A-Z]/g) ?? [];
  return upperLetters.slice(0, 2).join('');
};

// Fallback fake coin orders generator
export const buildFakeOrderBookFromPrice = (
  currentPrice: number,
): GetCoinOrders => {
  const generateOrders = (
    basePrice: number,
    direction: 'bid' | 'ask',
  ): [string, string][] => {
    const orders: [string, string][] = [];

    for (let i = 0; i < 14; i++) {
      // Use percentage-based offset to avoid negative prices
      const percentOffset = Math.random() * 0.005 + i * 0.002; // 0.2% to 2.5%
      const multiplier =
        direction === 'bid' ? 1 - percentOffset : 1 + percentOffset;
      const price = Math.max(basePrice * multiplier, 0.01).toFixed(2);
      const quantity = (Math.random() * 2 + 0.1).toFixed(4);
      orders.push([price, quantity]);
    }

    return orders;
  };

  return {
    lastUpdateId: 0,
    bids: generateOrders(currentPrice, 'bid'),
    asks: generateOrders(currentPrice, 'ask'),
  };
};
