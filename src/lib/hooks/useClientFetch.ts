// 📦 Imports
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// 🧾 Local variables
const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
  authorization: `Apikey ${process.env.API_KEY_CRYPTOCOMPARE}`,
};

// 🧾 Fetch method
async function clientFetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...BASE_HEADERS,
      ...(options?.headers || {}),
    },
  });

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
