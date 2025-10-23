// 📌 Directives

// 📦 Third-Party imports

// 📦 Internal imports
import { DarkOverlay } from '~core/ui/shared/overlays';

// ⚙️ Functional component
const CoinPage = async ({ params }: { params: Promise<{ cid: string }> }) => {
  const { cid } = await params;

  return <div>Coin page ( Parallel intercepting route ) {cid}</div>;
};
export default CoinPage;
