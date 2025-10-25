import type { GetMarketGlobalData } from '~types/api-generated/getMarketGlobalData';
import type { GetMarketSentiment } from '~types/api-generated/getMarketSentiment';
import type { GetTopCoins } from '~types/api-generated/getTopCoins';
import type { CurrencyConversionFactorsT, CurrencyT } from '~types/coins';
import type { GetCurrencyConversionFactors } from '~types/api-generated/getCurrencyConversionFactors';
import type { GetCoinData } from '~types/api-generated/getCoinData';
import type { GetTrendingCoins } from '~types/api-generated/getTrendingCoins';
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import type { CoinsOrderT } from '~types/coins';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { GetWidgetCoins } from '~types/api-generated/getWidgetCoins';
import { Base_Headers } from '~constants/api';
import { showErrorToast } from '~helpers/toast';
import { AuthMessages } from '~constants/messages';

// 🧾 Local variables
const showFallbackCatcher = (err: any) =>
  console.log('Development handler,', 'Filename: services/coins.ts', err);

export const getMarketGlobalData = async () => {
  try {
    const fetchUrl = 'https://api.coingecko.com/api/v3/global';
    return await useServerFetch<GetMarketGlobalData>(fetchUrl, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getMarketSentiment = async () => {
  try {
    const fetchUrl = 'https://api.alternative.me/fng/';
    return await useServerFetch<GetMarketSentiment>(fetchUrl, {
      method: 'GET',
      cache: 'default',
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getTopCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    return await useServerFetch<GetTopCoins>(fetchUrl, {
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getCurrencyConversionFactors = async (
  baseCurrency: CurrencyT,
): Promise<CurrencyConversionFactorsT | undefined> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/api/currency`;
  const resp = await fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify({ baseCurrency }),
  });
  const result: GetCurrencyConversionFactors = await resp.json();
  if (result.result === 'error') return;

  const rates: CurrencyConversionFactorsT = {
    USD: result.rates.USD,
    EUR: result.rates.EUR,
    GBP: result.rates.GBP,
    JPY: result.rates.JPY,
    IRR: result.rates.IRR,
  };

  if (baseCurrency === 'IRR') {
    try {
      const respIRR = await fetch(`${fetchUrl}/irr`, { method: 'GET' });
      const resultIRR = await respIRR.json();
      rates.USD = 1 / resultIRR / 10;
    } catch (err) {
      console.log(err);
    }
  }

  return rates;
};

export const getTrendingCoins = async () => {
  try {
    const fetchUrl = 'https://api.coingecko.com/api/v3/search/trending';
    return await useServerFetch<GetTrendingCoins>(fetchUrl, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getTopGainerCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
    const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
    return await useServerFetch<GetWidgetCoins>(fetchUrl);
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getTopLoserCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
    const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD&sort_direction=ASC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
    return await useServerFetch<GetWidgetCoins>(fetchUrl);
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getLastUpdatedCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
    const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=UPDATED_ON&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
    return await useServerFetch<GetWidgetCoins>(fetchUrl);
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getCoins = async (
  order: CoinsOrderT,
  page: number,
  perPage: number,
) => {
  try {
    if (!order || !page || !perPage) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&order=${order}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d%2C30d`;

    const resp = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        ...Base_Headers,
        'x-cg-demo-api-key': process.env.API_KEY_COINGECKO || '',
      },
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('RateLimitExceeded');
      } else {
        throw new Error(`APIError: ${resp.status}`);
      }
    }

    return await resp.json();
  } catch (err: any) {
    if (err instanceof TypeError) {
      showFallbackCatcher(err.message);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    } else if (err.message === 'RateLimitExceeded') {
      showFallbackCatcher('CoinGecko rate limit hit');
      showErrorToast('Too many requests. Please wait and try again.', 7000);
    } else {
      showFallbackCatcher(err);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    }
    return [];
  }
};

export const getCoinsByIDs = async (
  ids: string[],
): Promise<CoinEntity_Gecko[]> => {
  try {
    if (ids.length === 0) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d%2C30d&ids=${ids.join('%2C')}`;

    const resp = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        ...Base_Headers,
        'x-cg-demo-api-key': process.env.API_KEY_COINGECKO || '',
      },
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('RateLimitExceeded');
      } else {
        throw new Error(`APIError: ${resp.status}`);
      }
    }

    return await resp.json();
  } catch (err: any) {
    if (err instanceof TypeError) {
      showFallbackCatcher(err.message);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    } else if (err.message === 'RateLimitExceeded') {
      showFallbackCatcher('CoinGecko rate limit hit');
      showErrorToast('Too many requests. Please wait and try again.', 7000);
    } else {
      showFallbackCatcher(err);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    }
    return [];
  }
};

export const searchCoins = async (
  query: string,
): Promise<CoinEntity_Gecko[]> => {
  try {
    if (!query || query.length < 2) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/search?query=${query}`;

    const resp = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        ...Base_Headers,
        'x-cg-demo-api-key': process.env.API_KEY_COINGECKO || '',
      },
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('RateLimitExceeded');
      } else {
        throw new Error(`APIError: ${resp.status}`);
      }
    }

    const json = await resp.json();
    const coinIDs = json.coins.map((coin: CoinEntity_Gecko) => coin.id);
    const coinsFullData = await getCoinsByIDs(coinIDs);

    return coinsFullData;
  } catch (err: any) {
    if (err instanceof TypeError) {
      showFallbackCatcher(err.message);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    } else if (err.message === 'RateLimitExceeded') {
      showFallbackCatcher('CoinGecko rate limit hit');
      showErrorToast('Too many requests. Please wait and try again.', 7000);
    } else {
      showFallbackCatcher(err);
      showErrorToast(AuthMessages.Error.CatchHandler, 5000);
    }
    return [];
  }
};

export const getCoinData = async (coinId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}?developer_data=false&tickers=false&localization=false&community_data=false`;
    return await useServerFetch<GetCoinData>(fetchUrl, {
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1.5),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};

export const getCoinChartData = async (coinId: string, cycle: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${cycle}`;
    return await useServerFetch<GetCoinChartData>(fetchUrl, {
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(2),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};
