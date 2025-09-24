// 📦 Imports
import { useEffect, useState } from 'react';

// 🧾 Fetch method
async function safeFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText} — ${errorText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ⚙️  Custom hook
export function useSafeFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    safeFetch<T>(url, options)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}
