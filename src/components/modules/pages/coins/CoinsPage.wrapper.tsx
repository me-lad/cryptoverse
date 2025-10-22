// 📦 Third-Party imports

// 📦 Internal imports
import { containerDefault } from '~styles/tw-custom';
import Highlights from './highlights/Highlights';
import Coins from './coins/Coins';

// ⚙️ Functional component
const CoinsPageWrapper = () => {
  return (
    <div className={`${containerDefault} mt-32`}>
      {/* Highlights */}
      <Highlights />

      {/* Coins list */}
      <Coins />
    </div>
  );
};
export default CoinsPageWrapper;
