// 📌 Directives

// 📦 Third-Party imports

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
const ParallelCoinPage = async ({ params, searchParams }: PropsT) => {
  const { chartCycle } = await searchParams;
  const { cid } = await params;

  return (
    <ParallelCoinPageWrapper
      id={cid}
      // @ts-expect-error
      chartCycle={typeof chartCycle === 'string' ? chartCycle : '24h'}
    />
  );
};
export default ParallelCoinPage;
