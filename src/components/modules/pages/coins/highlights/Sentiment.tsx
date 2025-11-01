// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { getMarketSentiment } from '~services/coins';
import { AuthMessages } from '~constants/messages';
import { CatchError } from '~core/ui/shared/typography';
import { SentimentUi } from '~core/global/sentiment';
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

  if (metadata.err) {
    return (
      <p className="text-status-error-200 flex h-full items-center justify-center text-center text-lg font-semibold">
        {AuthMessages.Error.CatchHandler}
      </p>
    );
  }

  return <SentimentUi value={value} classification={classification} />;
};
export default Sentiment;
