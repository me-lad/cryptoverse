import type { ContextGeneralT, ReducerActionGeneralT } from './local';

export const sharedReducer = <TData, TParams, TFlags>(
  state: ContextGeneralT<TData, TParams, TFlags>,
  action: ReducerActionGeneralT<TData, TParams, TFlags>,
) => {
  const { source, key, payload } = action;

  if (!source || !key) return state;

  return {
    ...state,
    [source]: { ...state[source], [key]: payload },
  };
};
