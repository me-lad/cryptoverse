// 📦 Internal imports
import { containerDefault } from '~styles/tw-custom';
import Highlights from './highlights';
import Coins from './coins';

// ⚙️ Functional component
const CoinsPageWrapper = () => {
  return (
    <div className={`${containerDefault} my-32`}>
      {/* Highlights */}
      <Highlights />

      {/* Coins list */}
      <Coins />
    </div>
  );
};
export default CoinsPageWrapper;
