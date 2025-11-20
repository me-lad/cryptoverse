import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { BaseHeaders } from '~constants/api';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { showFallbackCatcher } from './shared';
import { getCoinsByIDs } from './getCoinsByIDs';

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
        ...BaseHeaders,
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
      errorToast(Messages.Error.CatchHandler, { autoClose: 5000 });
    } else if (err.message === 'RateLimitExceeded') {
      showFallbackCatcher('CoinGecko rate limit hit');
      errorToast('Too many requests. Please wait and try again.', {
        autoClose: 7000,
      });
    } else {
      showFallbackCatcher(err);
      errorToast(Messages.Error.CatchHandler, { autoClose: 5000 });
    }
    return [];
  }
};
