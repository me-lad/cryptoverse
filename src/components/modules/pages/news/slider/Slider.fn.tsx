// 📦 Internal imports
import { getNews } from '~services/integrations/news';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import SliderUi from './Slider.ui';

// ⚙️ Functional component
const SliderFn = async () => {
  const resp = await getNews({ limit: 6 });

  if (!resp.success || !resp.result.Data) return <CatchError />;

  return <SliderUi data={resp.result.Data} />;
};
export default SliderFn;
