import type { DataEntity } from './api-generated/getLatestNews';
import type { DataEntity as CategoryDataEntity } from './api-generated/getNewsCategories';
import type { DataEntity as SourceDataEntity } from './api-generated/getNewsSources';
import { NewsReducerActions } from '~constants/news';

export type NewsLanguagesT = 'EN' | 'ES' | 'FR' | 'TR';

export interface NewsContextDataT {
  news: DataEntity[];
  searchedNews: DataEntity[];
  sources: SourceDataEntity[];
  categories: CategoryDataEntity[];
}

export interface NewsContextParamsT {
  language?: NewsLanguagesT;
  sources?: string;
  categories?: string;
  excludeCategories?: string;
  searchString?: string;
}

interface NewsContextActionsT {
  setNewsList: (news: DataEntity[]) => void;
  setSearchedNewsList: (searchedNews: DataEntity[]) => void;
  setSourcesList: (sources: SourceDataEntity[]) => void;
  setCategoriesList: (categories: CategoryDataEntity[]) => void;
  setLanguageParam: (language: NewsLanguagesT) => void;
  setSourcesParam: (sources: string) => void;
  setCategoriesParam: (categories: string) => void;
  setExcludeCategoriesParam: (excludeCategories: string) => void;
  setSearchStringParam: (searchString: string) => void;
}

export interface NewsContextT {
  data: NewsContextDataT;
  params: NewsContextParamsT;
  actions?: NewsContextActionsT;
}

export interface NewsReducerActionT {
  type: (typeof NewsReducerActions)[keyof typeof NewsReducerActions];
  payload: Partial<{
    data: Partial<NewsContextDataT>;
    params: NewsContextParamsT;
  }>;
}
