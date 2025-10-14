// 📦 Internal imports
import { getLastUpdatedCoins } from '~services/coins';
import { getTopGainerCoins } from '~services/coins';
import { getTopLoserCoins } from '~services/coins';
import { getTrendingCoins } from '~services/coins';
import { CatchError } from '~core/ui/shared/typography';
import { flexCenter } from '~styles/tw-custom';
import { default as Table } from './Table';
import ErrorNotifier from '~core/global/ErrorNotifier';

// ⚙️ Functional components

export const LastUpdated = async () => {
  const result = await getLastUpdatedCoins();

  if (!result) {
    return (
      <>
        <ErrorNotifier
          error={'Error in fetching the last updated coins. :(('}
          closeTime={6000}
        />
        <CatchError className={`${flexCenter} h-full`} />
      </>
    );
  }

  const { Data } = result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const TopGainers = async () => {
  const result = await getTopGainerCoins();
  if (!result) {
    return (
      <>
        <CatchError className={`${flexCenter} h-full`} />
        <ErrorNotifier
          error={'Error in fetching the top gainer coins. :(('}
          closeTime={6000}
        />
      </>
    );
  }

  const { Data } = result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const TopLosers = async () => {
  const result = await getTopLoserCoins();
  if (!result) {
    return (
      <>
        <ErrorNotifier
          error={'Error in fetching the top loser coins. :(('}
          closeTime={6000}
        />
        <CatchError className={`${flexCenter} h-full`} />
      </>
    );
  }

  const { Data } = result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const Trending = async () => {
  const result = await getTrendingCoins();

  if (!result) {
    return (
      <>
        <CatchError className={`${flexCenter} h-full`} />;
        <ErrorNotifier error={'Error in fetching the most trend coins. :(('} />
      </>
    );
  }

  const { coins } = result;
  return <Table list={coins.slice(0, 4)} source="Gecko" />;
};
