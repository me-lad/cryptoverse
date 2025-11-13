// 📦 Third-Party imports
import clsx from 'clsx';

// 📦 Internal imports
import { highlightsList } from './local';
import { flexBetween } from '~styles/tw-custom';

// ⚙️ Functional component
const Highlights = () => {
  return (
    <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
      {highlightsList.map((highlight) => (
        <div
          key={highlight.id}
          className={clsx(
            'bg-background-lighter h-[20rem] rounded-sm p-5 shadow-xs shadow-neutral-300/40',
            highlight.title === 'Global Market Data' && 'max-[26em]:h-[25rem]',
          )}
        >
          {/* Highlight heading */}
          <div
            className={`${flexBetween} border-b border-neutral-600 pb-2 pl-1`}
          >
            <h3 className="font-semibold">{highlight.title}</h3>
          </div>

          {/* Highlights Content  (Conditional) */}
          <div className="h-[92%] py-5">{highlight.component}</div>
        </div>
      ))}
    </div>
  );
};
export default Highlights;
