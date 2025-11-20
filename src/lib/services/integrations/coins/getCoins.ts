import type { CoinsOrderT } from '~types/coins';
import { BaseHeaders } from '~constants/api';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { showFallbackCatcher } from './shared';

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

export const getCoinsCryptoCompare = async (order: string, page: number) => {
  try {
    if (!order || !page) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
    const fetchUrl = `${baseUrl}/asset/v1/top/list?page=${page}&page_size=100&sort_by=${order}&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`;
    ('');
    const resp = await fetch(fetchUrl, {
      method: 'GET',
      headers: BaseHeaders,
    });

    if (!resp.ok) throw new Error(`APIError: ${resp.status}`);

    return await resp.json();
  } catch (err: any) {
    if (err instanceof TypeError) {
      showFallbackCatcher(err.message);
      errorToast(Messages.Error.CatchHandler, { autoClose: 5000 });
    } else {
      showFallbackCatcher(err);
      errorToast(Messages.Error.CatchHandler, { autoClose: 5000 });
    }
    return [];
  }
};
