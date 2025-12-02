import {
  AdditiveApiKeyHeaderCompare,
  AdditiveApiKeyHeaderGecko,
  BaseHeaders,
} from '~constants/api';

interface SuccessfulFetchT<T> {
  success: true;
  result: T;
}

interface UnSuccessfulFetchT<T> {
  success: false;
}

type FetchResponseT<T> = SuccessfulFetchT<T> | UnSuccessfulFetchT<T>;

export async function safeFetch<T>(
  url: string,
  catchMessage: string,
  options?: RequestInit,
): Promise<FetchResponseT<T>> {
  try {
    let headerAuth = {};
    const host = new URL(url).hostname;
    if (host.includes('coingecko')) headerAuth = AdditiveApiKeyHeaderGecko;
    if (host.includes('coindesk')) headerAuth = AdditiveApiKeyHeaderCompare;

    const headers = {
      ...BaseHeaders,
      ...headerAuth,
      ...(options?.headers || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText} — ${errorText}`,
      );
    }

    return { success: true, result: (await response.json()) as T };
  } catch (err: any) {
    return { success: false };
  }
}
