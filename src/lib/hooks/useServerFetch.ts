const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
  authorization: `Apikey ${process.env.API_KEY_CRYPTOCOMPARE}`,
};

export async function useServerFetch<T>(
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
