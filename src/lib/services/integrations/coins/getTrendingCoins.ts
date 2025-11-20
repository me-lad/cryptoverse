import type { GetTrendingCoins } from '~types/api-generated/coins/getTrendingCoins';
import { safeFetch } from '~helpers/safeFetch';
import { minutesToMillisecond } from '~helpers/time';

export const getTrendingCoins = async () => {
  const fetchUrl = 'https://api.coingecko.com/api/v3/search/trending';
  return await safeFetch<GetTrendingCoins>(
    fetchUrl,
    'Something went wrong getting trending coins',
    {
      method: 'GET',
      cache: 'force-cache',
      next: { revalidate: minutesToMillisecond(1) },
    },
  );
};
