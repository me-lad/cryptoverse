// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState, use, useEffect } from 'react';
import { Loader2, Search as LucideSearch } from 'lucide-react';
import clsx from 'clsx';

// 📦 Internal imports
import { NewsContext } from '../NewsPage.context';
import { useDebounce } from '~hooks/useDebounce';
import { buildSearchSource } from '../NewsPage.context';

// ⚙️ Functional component
const Search = () => {
  const { actions, params } = use(NewsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(params?.searchString || '');
  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (search.length >= 3) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      actions?.setData('searchedNews', []);
    }
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      actions?.setParams('categories', '');
      actions?.setParams('excludeCategories', '');
      actions?.setParams('language', 'EN');
      actions?.setParams('searchString', debouncedSearch);
      actions?.setParams('sources', buildSearchSource(params.sources));
    } else {
      actions?.setParams('searchString', '');
    }
    setIsLoading(false);
  }, [debouncedSearch]);

  return (
    <div className="!bg-background-lighter has-focus-visible:border-primary shadow-primary/60 flex h-full min-w-full items-center gap-3 rounded-sm border-2 border-neutral-700 px-3 py-1.5 transition-all has-focus-visible:shadow-xs sm:min-w-1/4">
      {isLoading ? (
        <Loader2 className="mt-0.5 animate-spin" size={20} />
      ) : (
        <LucideSearch size={17} strokeWidth={2} />
      )}
      <input
        name="search"
        autoComplete="off"
        className={clsx(
          'w-full !border-0 !bg-transparent !px-0 placeholder:text-base placeholder:text-white/80 focus-visible:!border-0 focus-visible:!outline-0',
          isLoading && 'animate-pulse',
        )}
        type="text"
        value={search}
        placeholder={isLoading ? 'Searching...' : 'Search'}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
export default Search;
