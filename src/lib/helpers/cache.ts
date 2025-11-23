type CacheEntry<T> = {
  value: T;
  expiry: number;
};

export function createCache<T>(ttlMs: number) {
  let cache: CacheEntry<T> | null = null;

  return async function cachedFetch(fetcher: () => Promise<T>): Promise<T> {
    const now = Date.now();

    // If cache is valid, return it
    if (cache && cache.expiry > now) {
      return cache.value;
    }

    // Otherwise, fetch fresh data
    const value = await fetcher();
    cache = {
      value,
      expiry: now + ttlMs,
    };
    return value;
  };
}
