// 📦 Internal imports
import type { GetTopCoins } from '~types/api-generated/getTopCoins';
import AnimatedSubtitleUi from './AnimatedSubtitle.ui';
import { useServerFetch } from '~hooks/useServerFetch';

// ⚙️ Functional component
const AnimatedSubtitleFn = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST;
  const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=TOTAL_MKT_CAP_USD&sort_direction=DESC&toplist_quote_asset=USD`;
  const response = await useServerFetch<GetTopCoins>(fetchUrl);

  if (!response) return;
  return <AnimatedSubtitleUi coins={response.Data.LIST || []} />;
};
export default AnimatedSubtitleFn;
