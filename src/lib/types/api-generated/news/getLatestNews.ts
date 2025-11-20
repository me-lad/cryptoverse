export type GetLatestNews = {
  Data?: NewsDataEntity[] | null;
  Err: Err;
};

export type NewsDataEntity = {
  TYPE: string;
  ID: number;
  GUID: string;
  PUBLISHED_ON: number;
  PUBLISHED_ON_NS?: null;
  IMAGE_URL: string;
  TITLE: string;
  SUBTITLE?: null;
  AUTHORS: string;
  URL: string;
  SOURCE_ID: number;
  BODY: string;
  KEYWORDS: string;
  LANG: string;
  UPVOTES: number;
  DOWNVOTES: number;
  SCORE: number;
  SENTIMENT: string;
  STATUS: string;
  CREATED_ON: number;
  UPDATED_ON?: number | null;
  SOURCE_DATA: SOURCEDATA;
  CATEGORY_DATA?: CATEGORYDATAEntity[] | null;
};

type SOURCEDATA = {
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

type CATEGORYDATAEntity = {
  TYPE: string;
  ID: number;
  NAME: string;
  CATEGORY: string;
};

type Err = {
  type: number;
  message: string;
};
