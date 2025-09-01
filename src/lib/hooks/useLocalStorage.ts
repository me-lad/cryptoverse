// Client component directives
"use client";
import "client-only";

import { useState, useEffect } from "react";

type HookSetterFnParametersType<P> = P | ((prevValue?: P) => P);
type HookOutputType<P> = [
  P,
  (valueOrFn: HookSetterFnParametersType<P>) => void,
];

const useLocalStorage = <T = any>(
  key: string,
  defaultValue?: T,
): HookOutputType<T> => {
  // Create state variable to store
  // localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState<T>();
  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);
      // If value is already present in
      // localStorage then return it

      // Else set default value in
      // localStorage and then return it
      if (value) {
        setLocalStorageValue(JSON.parse(value));
      } else {
        window.localStorage.setItem(
          key,
          typeof defaultValue === "string"
            ? defaultValue
            : JSON.stringify(defaultValue),
        );
        setLocalStorageValue(defaultValue);
      }
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      setLocalStorageValue(defaultValue);
    }
  }, []);

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (
    valueOrFn: HookSetterFnParametersType<T>,
  ): void => {
    let newValue;
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      // @ts-ignore
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  // @ts-ignore
  return [localStorageValue, setLocalStorageStateValue];
};

export { useLocalStorage };
