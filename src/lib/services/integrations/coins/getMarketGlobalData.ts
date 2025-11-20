import type { GetMarketGlobalData } from '~types/api-generated/coins/getMarketGlobalData';
import { minutesToMillisecond } from '~helpers/time';
import { safeFetch } from '~helpers/safeFetch';

export const getMarketGlobalData = async () => {
  const fetchUrl = 'https://api.coingecko.com/api/v3/global';
  return await safeFetch<GetMarketGlobalData>(
    fetchUrl,
    'Something went wrong getting market global data.',
    {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    },
  );
};
