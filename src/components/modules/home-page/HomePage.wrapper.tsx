// Directives

// Packages imports

// Local imports
import HomePagePatternUnit from "./HomePagePattern.unit";
import IntroUnit from "./sections/Intro.unit";

// Local types

// Functional component
export default function HomePageWrapper() {
  return (
    <>
      {/* Page top pattern */}
      <HomePagePatternUnit />

      {/* Page sections */}
      <IntroUnit />
    </>
  );
}
