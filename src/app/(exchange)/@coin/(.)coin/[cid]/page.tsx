// 📦 Internal imports
import ParallelCoinPageWrapper from '~modules/pages/coin/parallel-route/CoinPage.parallel.wrapper';

// 🧾 Local types
interface PropsT {
  params: Promise<{ cid: string }>;
  searchParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const CoinPage = async ({ params, searchParams }: PropsT) => {
  const { chartCycle } = await searchParams;
  const { cid } = await params;

  const isCycleValid =
    chartCycle === '24h' ||
    chartCycle === '7d' ||
    chartCycle === '30d' ||
    chartCycle === '1y';

  return (
    <ParallelCoinPageWrapper
      id={cid}
      chartCycle={isCycleValid ? chartCycle : '24h'}
    />
  );
};
export default CoinPage;
