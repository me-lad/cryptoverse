// 📦 Internal imports
import AnimatedSubtitleUi from './AnimatedSubtitle.ui';
import { getTopCoins } from '~services/integrations/coins';

// ⚙️ Functional component
const AnimatedSubtitleFn = async () => {
  const list = await getTopCoins();

  if (!list) return;
  return <AnimatedSubtitleUi coins={list || []} />;
};
export default AnimatedSubtitleFn;
