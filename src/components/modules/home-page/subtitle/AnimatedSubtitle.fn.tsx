// 📦 Internal imports
import AnimatedSubtitleUi from './AnimatedSubtitle.ui';
import { getTopCoins } from '~services/coins';

// ⚙️ Functional component
const AnimatedSubtitleFn = async () => {
  const { Data, Err } = await getTopCoins();

  if (!Err && !Data.LIST?.length) return;
  return <AnimatedSubtitleUi coins={Data.LIST || []} />;
};
export default AnimatedSubtitleFn;
