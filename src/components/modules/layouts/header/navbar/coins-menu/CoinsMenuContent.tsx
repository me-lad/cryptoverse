// 📦 Internal imports
import { coinsNavItems } from '../local.constants';
import CoinsData from './CoinsData';
import ListLinkItem from './ListLinkItem';

// ⚙️ Functional components
const CoinsMenuContent = () => {
  return (
    <div className="w-max">
      <ul className="grid grid-cols-2">
        {coinsNavItems.map((item) => (
          <ListLinkItem key={item.url} {...item} />
        ))}
      </ul>

      <CoinsData />
    </div>
  );
};
export default CoinsMenuContent;
