import { useCallback, useEffect, useState } from 'react';

export default function useSessionStorage<T = unknown>(
  key: string,
  initialValue?: T | (() => T),
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const isBrowser =
    typeof window !== 'undefined' &&
    typeof window.sessionStorage !== 'undefined';

  const readValue = useCallback((): T => {
    try {
      if (!isBrowser) {
        // If SSR, return initial synchronously
        return typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : (initialValue as T);
      }

      const item = window.sessionStorage.getItem(key);
      if (!item) {
        return typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : (initialValue as T);
      }
      return JSON.parse(item) as T;
    } catch (error) {
      // If parsing fails or access denied, fall back to initial
      // eslint-disable-next-line no-console
      console.warn(`useSessionStorage: unable to read key "${key}":`, error);
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : (initialValue as T);
    }
  }, [initialValue, isBrowser, key]);

  const [state, setState] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const nextValue =
          typeof value === 'function' ? (value as (p: T) => T)(state) : value;

        setState(nextValue);

        if (!isBrowser) return;

        window.sessionStorage.setItem(key, JSON.stringify(nextValue));

        // Dispatch a custom event to notify same-window listeners (optional)
        window.dispatchEvent(new Event('session-storage'));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`useSessionStorage: unable to set key "${key}":`, error);
      }
    },
    [isBrowser, key, state],
  );

  const remove = useCallback(() => {
    try {
      setState(undefined as unknown as T);
      if (!isBrowser) return;
      window.sessionStorage.removeItem(key);
      window.dispatchEvent(new Event('session-storage'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`useSessionStorage: unable to remove key "${key}":`, error);
    }
  }, [isBrowser, key]);

  // Keep state in sync when storage changes in other tabs/windows
  useEffect(() => {
    if (!isBrowser) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.sessionStorage) return;
      if (event.key && event.key !== key) return;
      setState(readValue());
    };

    // Listen to native storage events (other windows)
    window.addEventListener('storage', handleStorage);

    // Listen to our custom event (same window changes via setValue/remove)
    const handleCustom = () => setState(readValue());
    window.addEventListener('session-storage', handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('session-storage', handleCustom);
    };
  }, [isBrowser, key, readValue]);

  // If key changes, read new value
  useEffect(() => {
    setState(readValue());
  }, [key, readValue]);

  return [state, setValue, remove];
}

export { useSessionStorage };
