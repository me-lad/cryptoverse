import type { GetTradingViewAvailableSymbols } from '@/lib/types/api-generated/coins/getTradingViewAvailableSymbols';
import { errorToast } from '~vendors/react-toastify';
import { Messages } from '~constants/messages';
import { showFallbackCatcher } from './shared';

export const getTradingViewAvailableSymbols = async (
  startPoint: number,
  searchQuery: string,
): Promise<GetTradingViewAvailableSymbols | null> => {
  if (startPoint == null) return null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = `${baseUrl}/api/trading-view/symbols?text=${encodeURIComponent(
      searchQuery || '',
    )}&start=${encodeURIComponent(String(startPoint))}`;

    const resp = await fetch(fetchUrl);

    if (!resp.ok) throw new Error(`APIError: ${resp.status}`);
    const json = await resp.json();

    // proxy returns { ok: true, data: [...] }
    if (!json?.ok) throw new Error(json?.error || 'TradingView proxy error');
    return json.data as GetTradingViewAvailableSymbols;
  } catch (err: any) {
    showFallbackCatcher(err?.message || err);
    errorToast(Messages.Error.CatchHandler, { autoClose: 5000 });
    return null;
  }
};
