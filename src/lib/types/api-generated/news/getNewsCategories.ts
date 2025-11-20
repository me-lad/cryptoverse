export type GetNewsCategories = {
  Data?: CategoryDataEntity[] | null;
  Err: FILTEROrErr;
};
export type CategoryDataEntity = {
  TYPE: string;
  ID: number;
  NAME: string;
  FILTER: FILTER;
  STATUS: string;
  CREATED_ON: number;
  UPDATED_ON?: number | null;
};
export type FILTER = {
  INCLUDED_WORDS?: string[] | null;
  INCLUDED_PHRASES?: string[] | null;
  EXCLUDED_PHRASES?: string[] | null;
};
export type FILTEROrErr = {};
