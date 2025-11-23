// 📦 Internal imports
import { getNews } from '~services/integrations/news';
import { CatchError } from '~core/ui/shared/typography/CatchError';
import { minutesToMillisecond } from '~helpers/time';
import SliderUi from './Slider.ui';

// ⚙️ Functional component
const SliderFn = async () => {
  const resp = await getNews(
    { limit: 6 },
    { method: 'GET', next: { revalidate: minutesToMillisecond(5) } },
  );

  if (!resp.success || !resp.result.Data) return <CatchError />;

  return <SliderUi data={resp.result.Data} />;
};
export default SliderFn;
