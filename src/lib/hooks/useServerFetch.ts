// 📦 Imports
import { Base_Headers } from '~constants/api';

// ⚙️ Custom hook
export async function useServerFetch<T>(
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
