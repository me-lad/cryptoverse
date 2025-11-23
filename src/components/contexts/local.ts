export interface ContextGeneralT<TData, TParams, TFlags> {
  data: TData;
  params: TParams;
  flags: TFlags;
  actions?: ActionsGeneralT<TData, TParams, TFlags>;
}

export interface DataReducerActionT<TData> {
  source: 'data';
  key: keyof TData;
  payload: TData[keyof TData];
}

export interface ParamsReducerActionT<TParams> {
  source: 'params';
  key: keyof TParams;
  payload: TParams[keyof TParams];
}

export interface FlagsReducerActionT<TFlags> {
  source: 'flags';
  key: keyof TFlags;
  payload: TFlags[keyof TFlags];
}

export type ReducerActionGeneralT<TData, TParams, TFlags> =
  | DataReducerActionT<TData>
  | ParamsReducerActionT<TParams>
  | FlagsReducerActionT<TFlags>;

export type ActionsGeneralT<TData, TParams, TFlags> = {
  setData: <K extends keyof TData>(key: K, value: TData[K]) => void;
  setParams: <K extends keyof TParams>(key: K, value: TParams[K]) => void;
  setFlags: <K extends keyof TFlags>(key: K, value: TFlags[K]) => void;
};

// interface DataActionT<TData, K extends keyof TData> {
//   source: 'data';
//   key: K;
//   payload: TData[K];
// }

// interface ParamsActionT<TParams, K extends keyof TParams> {
//   source: 'params';
//   key: K;
//   payload: TParams[K];
// }

// interface FlagsActionT<TFlags, K extends keyof TFlags> {
//   source: 'flags';
//   key: K;
//   payload: TFlags[K];
// }
