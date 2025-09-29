import type { GetMarketGlobalData } from '~types/api-generated/getMarketGlobalData';
import type { GetMarketSentiment } from '~types/api-generated/getMarketSentiment';
import type { GetTopCoins } from '~types/api-generated/getTopCoins';
import { useServerFetch } from '~hooks/useServerFetch';
import { hoursToMillisecond, minutesToMillisecond } from '~helpers/time';

export const getMarketGlobalData = () => {
  const fetchUrl = 'https://api.coingecko.com/api/v3/global';

  return useServerFetch<GetMarketGlobalData>(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept-Encoding': 'deflate, gzip',
      'x-cg-demo-api-key': 'CG-qBScPUs1KNvpLrU22czN23BP	',
      Accept: 'application/json',
    },
    cache: 'force-cache',
    next: {
      revalidate: minutesToMillisecond(1),
    },
  });
};

export const getMarketSentiment = () => {
  const fetchUrl = 'https://api.alternative.me/fng/';
  return useServerFetch<GetMarketSentiment>(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept-Encoding': 'deflate, gzip',
      Accept: 'application/json',
    },
    cache: 'force-cache',
    next: {
      revalidate: hoursToMillisecond(24),
    },
  });
};

export const getTopCoins = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST;
  const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=TOTAL_MKT_CAP_USD&sort_direction=DESC&toplist_quote_asset=USD`;
  return useServerFetch<GetTopCoins>(fetchUrl);
};
