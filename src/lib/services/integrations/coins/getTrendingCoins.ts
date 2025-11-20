import type { GetTrendingCoins } from '~types/api-generated/getTrendingCoins';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

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
