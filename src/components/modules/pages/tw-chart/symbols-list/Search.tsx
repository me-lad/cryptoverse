// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Spinner } from '~core/ui/shadcn/spinner';

// 📦 Internal imports
import { useDebounce } from '~hooks/useDebounce';

// 🧾 Local types
interface PropsT {
  changeQuery: Dispatch<React.SetStateAction<string>>;
  resetParams: () => void;
}

// ⚙️ Functional component
const Search: React.FC<PropsT> = ({ changeQuery, resetParams }) => {
  const [search, setSearch] = useState('');
  const [searchDelay, setSearchDelay] = useState(1000);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebounce(search, searchDelay);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      resetParams();
      setIsSearching(false);
      changeQuery(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (!search) {
      setSearchDelay(0);
    } else {
      setSearchDelay(1000);
    }
  }, [search]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const elm = event.currentTarget;
    const currentLength = elm.value.length;

    if (currentLength >= 2) {
      setIsSearching(true);
      setSearch(elm.value);
    } else {
      changeQuery((prev) => {
        if (prev) {
          resetParams();
        }
        return '';
      });
      setSearch('');
      setIsSearching(false);
    }
  };

  return (
    <label className="has-focus-visible:border-b-primary mx-auto mt-5 flex w-[80%] cursor-text items-center gap-2.5 overflow-hidden rounded-sm border px-4 py-2 text-neutral-300 transition-all">
      <div>
        {isSearching ? (
          <Spinner variant="circle" size={18} />
        ) : (
          <SearchIcon size={18} className="mt-0.5" />
        )}
      </div>
      <input
        placeholder="Search"
        className="w-3/4 transition-all !outline-none placeholder:text-neutral-300 focus-visible:placeholder:text-transparent"
        onChange={changeHandler}
      />
    </label>
  );
};
export default Search;
