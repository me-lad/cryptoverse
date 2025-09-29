// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import { getMarketGlobalData } from '~services/coins';
import { Price, Percentage } from '~core/global/formatters';

// ⚙️ Functional component
const GlobalData = async () => {
  const { data } = await getMarketGlobalData();
  const {
    total_market_cap,
    total_volume,
    market_cap_change_percentage_24h_usd: change_percentage,
  } = data;

  return (
    <div className="h-full">
      {/* Market cap */}
      <div className={`${flexBetween} h-1/2 border-b`}>
        <div>
          <div className="flex items-end gap-2">
            Market Cap
            <Percentage
              percentage={change_percentage}
              fontSize={'0.8rem'}
              iconSize={14}
            />
          </div>
          <p title={total_market_cap.usd.toLocaleString('en')} className="mt-1">
            <Price price={total_market_cap.usd} />
          </p>
        </div>
        <div>
          <Image
            src={'https://www.coingecko.com/total_market_cap.svg'}
            width={120}
            height={60}
            alt="Total market cap"
          />
        </div>
      </div>

      {/* Volume */}
      <div className={`${flexBetween} h-1/2 border-b`}>
        <div>
          <p>Total Volume</p>
          <p title={total_volume.usd.toLocaleString('en')} className="mt-1">
            <Price price={total_volume.usd} />
          </p>
        </div>
        <div>
          <Image
            src={'https://www.coingecko.com/total_volume.svg'}
            width={120}
            height={60}
            alt="Total Volume"
          />
        </div>
      </div>
    </div>
  );
};
export default GlobalData;
