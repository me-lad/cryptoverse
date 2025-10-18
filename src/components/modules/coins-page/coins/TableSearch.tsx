// 📦 Third-Party imports
import { Search } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';
import React from 'react';

// 🧾 Local types
interface PropsT {
  value: string;
  setValue: (newValue: string) => void;
}

// ⚙️ Functional component
const TableSearch: React.FC<PropsT> = ({ setValue, value }) => {
  return (
    <div className="bg-background-lighter has-focus-visible:border-primary flex w-1/5 items-center gap-2.5 rounded-md border-b border-transparent px-3 py-1.5">
      <Search size={16} className="text-neutral-400" />
      <input
        type="text"
        className="!outline-0 placeholder:text-sm placeholder:text-neutral-400"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default TableSearch;
