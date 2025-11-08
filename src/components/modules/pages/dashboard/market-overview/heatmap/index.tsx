// 📌 Directives
'use client';
// 📦 Internal imports
import FluidContainer from '../../FluidContainer';
import Heatmap from '~core/global/trading-view/Heatmap';

// ⚙️ Functional component
const CoinsHeatmap = () => {
  return (
    <FluidContainer className="mt-20 w-fit" condense_title="Coins Heatmap">
      {/* <h2 className="text-xl font-semibold">Crypto Heatmap</h2> */}

      <div className="mx-auto mt-10 aspect-video h-[34rem] overflow-hidden rounded-xs">
        <Heatmap theme="dark" />
      </div>
    </FluidContainer>
  );
};

export default CoinsHeatmap;
