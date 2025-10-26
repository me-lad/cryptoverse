import type { NewsContextParamsT } from '~types/news';
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';

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
      month: 'numeric',
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
