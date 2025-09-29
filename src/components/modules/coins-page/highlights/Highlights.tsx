// 📦 Third-Party imports
import clsx from 'clsx';

// 📦 Internal imports
import { highlightsList } from './local';
import Heading from './Heading';

// ⚙️ Functional component
const Highlights = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-10">
      {highlightsList.map((highlight) => (
        <div
          key={highlight.id}
          className={clsx(
            'bg-background-lighter h-[20rem] rounded-sm p-5 shadow-xs shadow-neutral-300/40',
          )}
        >
          {/* Highlight heading */}
          <Heading {...highlight} />

          {/* Highlights Content  (Conditional) */}
          <div className="h-[92%] py-5">
            <highlight.component />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Highlights;
