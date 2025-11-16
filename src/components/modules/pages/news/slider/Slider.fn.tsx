// 📦 Internal imports
import { getNews } from '~services/integrations/news';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import SliderUi from './Slider.ui';

// ⚙️ Functional component
const SliderFn = async () => {
  const { Data: data } = await getNews({ limit: 6 });

  if (!data) return <CatchError />;

  return <SliderUi data={data} />;
};
export default SliderFn;
