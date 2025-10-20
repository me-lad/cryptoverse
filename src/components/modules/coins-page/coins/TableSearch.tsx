// 📦 Third-Party imports
import { Spinner } from '~core/ui/shadcn/spinner';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// 📦 Internal imports
import { useDebounce } from '~hooks/useDebounce';

// 🧾 Local types
interface PropsT {
  value: string;
  setValue: (newValue: string) => void;
}

// ⚙️ Functional component
const TableSearch: React.FC<PropsT> = ({ setValue }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (debounceSearch.length >= 2) {
      setValue(debounceSearch);
    } else {
      setValue('');
    }

    setIsSearching(false);
  }, [debounceSearch]);

  return (
    <div className="bg-background-lighter has-focus-visible:border-primary flex w-1/5 items-center gap-2.5 rounded-md border-b border-transparent px-3 py-1.5">
      {isSearching ? (
        <Spinner variant="ellipsis" size={16} className="mt-1.5" />
      ) : (
        <Search size={16} className="text-neutral-400" />
      )}
      <input
        type="text"
        className="!outline-0 placeholder:text-sm placeholder:text-neutral-400"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          e.target.value.length >= 2 && setIsSearching(true);
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};
export default TableSearch;
