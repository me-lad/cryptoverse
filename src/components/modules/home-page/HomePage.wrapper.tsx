// 📦 Internal imports
import Pattern from './background-pattern/Pattern';
import AnimatedSubtitleFn from './subtitle/AnimatedSubtitle.fn';
import ExchangeDataFn from './exchange-data/ExchangeData.fn';
import Intro from './intro/Intro';
import WhyUs from './why-us/WhyUs';
import UserReviews from './user-reviews/UserReviews';
import LatestNews from './latest-news/LatestNews';

// ⚙️ Functional component
const HomePageWrapper = () => {
  return (
    <>
      {/* Page top pattern */}
      <Pattern />

      {/* Page sections */}
      <Intro />
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
