import type { GetMarketSentiment } from '@/lib/types/api-generated/coins/getMarketSentiment';
import { safeFetch } from '~helpers/safeFetch';

export const getMarketSentiment = async () => {
  const fetchUrl = 'https://api.alternative.me/fng/';
  return await safeFetch<GetMarketSentiment>(
    fetchUrl,
    'Something went wrong getting market sentiment.',
    {
      method: 'GET',
      cache: 'default',
    },
  );
};
