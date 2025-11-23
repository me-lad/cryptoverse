import type { Dispatch } from 'react';
import type { ReducerActionGeneralT, ActionsGeneralT } from './local';

export const createActions = <TData, TParams, TFlags>(
  dispatch: Dispatch<ReducerActionGeneralT<TData, TParams, TFlags>>,
): ActionsGeneralT<TData, TParams, TFlags> => {
  return {
    setData<K extends keyof TData>(key: K, value: TData[K]) {
      dispatch({ source: 'data', key, payload: value });
    },
    setParams<K extends keyof TParams>(key: K, value: TParams[K]) {
      dispatch({ source: 'params', key, payload: value });
    },
    setFlags<K extends keyof TFlags>(key: K, value: TFlags[K]) {
      dispatch({ source: 'flags', key, payload: value });
    },
  };
};
