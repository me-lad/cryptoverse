// 📦 Imports
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Base_Headers } from '~constants/api';

// 🧾 Fetch method
async function clientFetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const headers = {
    ...Base_Headers,
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

// ⚙️ Custom hook
export function useClientFetch<T>(
  url: string,
  options?: RequestInit,
  queryOptions?: UseQueryOptions<T, Error>,
) {
  return useQuery<T, Error>({
    queryKey: [url, options],
    queryFn: () => clientFetcher<T>(url, options),
    ...queryOptions,
  });
}
