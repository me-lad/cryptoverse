// 📦 Internal imports
import Pattern from './background-pattern/Pattern';
import AnimatedSubtitleFn from './subtitle/AnimatedSubtitle.fn';
import Hero from './hero';
import ExchangeDataFn from './exchange-data/ExchangeData.fn';
import WhyUs from './why-us';
import UserReviews from './user-reviews';
import LatestNews from './latest-news';

// ⚙️ Functional component
const HomePageWrapper = () => {
  return (
    <>
      {/* Page top pattern */}
      <Pattern />

      {/* Page sections */}
      <Hero />
      <ExchangeDataFn />
      <WhyUs />
      <UserReviews />
      <LatestNews />

      {/* Sticky animated subtitle */}
      <AnimatedSubtitleFn />
    </>
  );
};
export default HomePageWrapper;
