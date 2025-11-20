import type { GetMarketSentiment } from '~types/api-generated/getMarketSentiment';
import { useServerFetch } from '~hooks/useServerFetch';
import { showFallbackCatcher } from './shared';

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
