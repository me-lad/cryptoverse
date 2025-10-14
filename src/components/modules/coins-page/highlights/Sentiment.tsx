// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { buildColorByClassification, buildSentimentClipPath } from './local';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { getMarketSentiment } from '~services/coins';
import { AuthMessages } from '~constants/messages';
import { CatchError } from '~core/ui/shared/typography';
import ErrorNotifier from '~core/global/ErrorNotifier';

// ⚙️ Functional component
const Sentiment = async () => {
  const result = await getMarketSentiment();

  if (!result) {
    return (
      <>
        <ErrorNotifier error={'Error in fetching market sentiment data. :(('} />
        <CatchError className={`${flexCenter} h-full`} />
      </>
    );
  }

  const { data, metadata } = result;
  const value = +data[0].value;
  const classification = data[0].value_classification;

  const { fearPath, greedPath } = buildSentimentClipPath(100 - value);

  if (metadata.err) {
    return (
      <p className="text-status-error-200 flex h-full items-center justify-center text-center text-lg font-semibold">
        {AuthMessages.Error.CatchHandler}
      </p>
    );
  }

  return (
    <>
      {/* Circular gradient */}
      <div className={`${flexCenter} relative h-36 w-full`}>
        {/* Circle & Dots */}
        <div className="absolute h-full w-full">
          <Image
            fill
            src={'/svgs/coins-page/sentiment/circle.svg'}
            alt="Fear & Greed"
          />
        </div>
        <div className="absolute bottom-0 h-10/12 w-10/12">
          <Image
            fill
            src={'/svgs/coins-page/sentiment/dots.svg'}
            alt="Fear & Greed"
          />
        </div>

        {/* Degree line */}
        <div className="absolute right-1/2 bottom-0 z-10 w-[40%]">
          <div
            className="absolute top-0 left-1/2 z-10 h-[3px] w-[95%] origin-right rounded-l-[50%] rounded-r-[0%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${(value * 180) / 100}deg)`,
              backgroundColor: buildColorByClassification(classification),
            }}
          ></div>
        </div>

        {/* Number */}
        <div
          style={{ color: buildColorByClassification(classification) }}
          className="bg-background/80 absolute right-0 -bottom-1.5 left-0 z-20 m-auto h-fit w-fit rounded-md border px-10 backdrop-blur-[1px]"
        >
          <p className="text-center text-xl font-bold">{value}</p>
          <p className="text-center text-lg font-semibold tracking-wide">
            {classification}
          </p>
        </div>
      </div>

      {/* Linear positive/negative */}
      <div className="relative mx-auto mt-6 h-3 w-[85%] bg-transparent">
        <div
          className="bg-status-success-200 absolute left-0 h-full w-[98%] rounded-l-xs"
          // style={{ clipPath: getGreedClipPath(50) }}
          style={{ clipPath: greedPath }}
        ></div>
        <div
          className="bg-status-error-200 absolute right-0 h-full w-[98%] rounded-r-xs"
          // style={{ clipPath: getFearClipPath(50) }}
          style={{ clipPath: fearPath }}
        ></div>
      </div>

      <div className={`${flexBetween} mx-auto mt-2 w-[85%]`}>
        <div className={`${flexCenter} gap-2 text-sm font-semibold`}>
          <span className="text-status-success-200">{value}</span>
          <span>Long</span>
        </div>
        <div className={`${flexCenter} gap-2 text-sm font-semibold`}>
          <span>Short</span>
          <span className="text-status-error-200">{100 - value}</span>
        </div>
      </div>
    </>
  );
};
export default Sentiment;
