// 📦 Internal imports
import { containerDefault, flexBetween } from '~styles/tw-custom';
import SliderFn from './slider/Slider.fn';
import NewsListFn from './news-list/NewsList.fn';
import Search from './search/Search';
import Language from './language/Language';
import FiltersWrapper from './filters/Filters.wrapper';

// ⚙️ Functional component
const NewsPageWrapper = () => {
  return (
    <>
      {/* Search & Filtering */}
      <div
        className={`${flexBetween} ${containerDefault} mt-16 h-fit max-w-full flex-wrap gap-2.5 px-0.5`}
      >
        <Search />
        <FiltersWrapper />
      </div>

      {/* Slider */}
      <SliderFn />

      {/* Language selection */}
      <Language />

      {/* News list */}
      <NewsListFn />
    </>
  );
};
export default NewsPageWrapper;
