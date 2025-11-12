// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { DataEntity } from '~types/api-generated/getLatestNews';
import { containerDefault } from '~styles/tw-custom';
import { CatchError } from '~core/ui/shared/typography';
import NewsListItem, { NewsLoadingItem } from './NewsListItem';

// 🧾 Local types
interface PropsT {
  news: DataEntity[];
}

export const NewsLoading = () => {
  return (
    <div className={`${containerDefault} mt-16`}>
      <div className="w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <NewsLoadingItem key={index} />
        ))}
      </div>
    </div>
  );
};

// ⚙️ Functional component
const NewsListUi: React.FC<PropsT> = ({ news }) => {
  return (
    <div className={`${containerDefault} mt-16`}>
      <div className="w-full">
        {news.length ? (
          news.map((data, index) => <NewsListItem key={data.ID} {...data} />)
        ) : (
          <CatchError
            className="mt-20"
            message={'No article found with given filters or search string.'}
          />
        )}
      </div>
    </div>
  );
};
export default NewsListUi;
