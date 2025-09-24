export type GetNewsCategories = {
  Data?: (DataEntity)[] | null;
  Err: FILTEROrErr;
}
export type DataEntity = {
  TYPE: string;
  ID: number;
  NAME: string;
  FILTER: FILTER;
  STATUS: string;
  CREATED_ON: number;
  UPDATED_ON?: number | null;
}
export type FILTER = {
  INCLUDED_WORDS?: (string)[] | null;
  INCLUDED_PHRASES?: (string)[] | null;
  EXCLUDED_PHRASES?: (string)[] | null;
}
export type FILTEROrErr = {
}
