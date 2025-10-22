// 📌 Directives

// 📦 Third-Party imports

// 📦 Internal imports

// ⚙️ Functional component
const CoinPage = async ({ params }: { params: Promise<{ cid: string }> }) => {
  const { cid } = await params;

  return <div>Coin page {cid}</div>;
};
export default CoinPage;
