// 📦 Internal imports
import CoinPageWrapper from '~modules/pages/coin/direct-route/CoinPageWrapper';

// 🧾 Local types
interface PropsT {
  params: Promise<{ cid: string }>;
  searchParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const ParallelCoinPage = async ({ params, searchParams }: PropsT) => {
  const { chartCycle } = await searchParams;
  const { cid } = await params;

  const isCycleValid =
    chartCycle === '24h' ||
    chartCycle === '7d' ||
    chartCycle === '30d' ||
    chartCycle === '1y';

  return (
    <CoinPageWrapper id={cid} chartCycle={isCycleValid ? chartCycle : '24h'} />
  );
};
export default ParallelCoinPage;
