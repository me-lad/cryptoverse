import type { GetMarketGlobalData } from '~types/api-generated/getMarketGlobalData';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

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
