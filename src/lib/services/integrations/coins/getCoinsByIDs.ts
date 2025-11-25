import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { showFallbackCatcher } from './shared';

export const getCoinsByIDs = async (
  ids: string[],
): Promise<CoinEntity_Gecko[]> => {
  try {
    if (ids.length === 0) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = `${baseUrl}/api/coins/specifics?ids=${ids.join('%2C')}`;

    const resp = await fetch(fetchUrl);

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
