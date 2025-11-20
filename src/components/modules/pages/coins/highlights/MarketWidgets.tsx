// 📦 Internal imports
import {
  getTopLoserCoins,
  getTopGainerCoins,
  getLastUpdatedCoins,
} from '~services/integrations/coins/getWidgetCoins';
import { default as Table } from './Table';
import { getTrendingCoins } from '~services/integrations/coins';
import { CatchError } from '~core/ui/shared/typography';
import { flexCenter } from '~styles/tw-custom';
import ErrorNotifier from '~core/global/ErrorNotifier';

// ⚙️ Functional components

export const LastUpdated = async () => {
  const result = await getLastUpdatedCoins();

  if (!result.success) {
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

  const { Data } = result.result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const TopGainers = async () => {
  const result = await getTopGainerCoins();
  if (!result.success) {
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

  const { Data } = result.result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const TopLosers = async () => {
  const result = await getTopLoserCoins();
  if (!result.success) {
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

  const { Data } = result.result;
  return <Table source="Compare" list={Data.LIST?.slice(0, 4) || []} />;
};

export const Trending = async () => {
  const result = await getTrendingCoins();

  if (!result.success) {
    return (
      <>
        <CatchError className={`${flexCenter} h-full`} />;
        <ErrorNotifier error={'Error in fetching the most trend coins. :(('} />
      </>
    );
  }

  const { coins } = result.result;
  return <Table list={coins.slice(0, 4)} source="Gecko" />;
};
