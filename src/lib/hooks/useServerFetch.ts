import {
  BaseHeaders,
  AdditiveApiKeyHeaderCompare,
  AdditiveApiKeyHeaderGecko,
} from '~constants/api';

export async function useServerFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let headerAuth = {};
  if (url.includes('coingecko')) headerAuth = AdditiveApiKeyHeaderGecko;
  if (url.includes('coindesk')) headerAuth = AdditiveApiKeyHeaderCompare;

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

  return await response.json();
}
