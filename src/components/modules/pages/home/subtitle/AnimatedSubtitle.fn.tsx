// 📦 Internal imports
import AnimatedSubtitleUi from './AnimatedSubtitle.ui';
import { getTopCoins } from '~services/integrations/coins';

// ⚙️ Functional component
const AnimatedSubtitleFn = async () => {
  const list = await getTopCoins();

  if (!list.success) return;
  return <AnimatedSubtitleUi coins={list.result || []} />;
};
export default AnimatedSubtitleFn;
