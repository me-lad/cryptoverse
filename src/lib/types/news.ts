import type { NewsDataEntity } from './api-generated/news/getLatestNews';
import type { CategoryDataEntity } from './api-generated/news/getNewsCategories';
import type { SourceDataEntity } from './api-generated/news/getNewsSources';

export type NewsLanguagesT = 'EN' | 'ES' | 'FR' | 'TR';

export interface NewsContextDataT {
  news: NewsDataEntity[];
  searchedNews: NewsDataEntity[];
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
