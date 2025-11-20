export type GetNewsSources = {
  Data?: SourceDataEntity[] | null;
  Err: Err;
};
export type SourceDataEntity = {
  TYPE: string;
  ID: number;
  SOURCE_KEY: string;
  NAME: string;
  IMAGE_URL: string;
  URL: string;
  LANG: string;
  SOURCE_TYPE: string;
  LAUNCH_DATE?: number | null;
  SORT_ORDER: number;
  BENCHMARK_SCORE: number;
  STATUS: string;
  LAST_UPDATED_TS: number;
  CREATED_ON: number;
  UPDATED_ON: number;
};
export type Err = {};
