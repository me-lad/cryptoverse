// 📦 Third-Party imports
import Image from 'next/image';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { getMarketGlobalData } from '~services/integrations/coins';
import { Price, Percentage } from '~core/global/formatters';
import { CatchError } from '~core/ui/shared/typography';
import ErrorNotifier from '~core/global/ErrorNotifier';

// ⚙️ Functional component
const GlobalData = async () => {
  const result = await getMarketGlobalData();
  if (!result.success) {
    return (
      <>
        <ErrorNotifier
          error={'Error in fetching market global data. :(('}
          closeTime={6000}
        />
        <CatchError className={`${flexCenter} h-full`} />
      </>
    );
  }

  const { data } = result.result;
  const {
    total_market_cap,
    total_volume,
    market_cap_change_percentage_24h_usd: change_percentage,
  } = data;

  return (
    <div className="h-full">
      {/* Market cap */}
      <div
        className={`${flexBetween} h-1/2 border-b max-[26em]:flex-col max-[26em]:pb-2.5`}
      >
        <div>
          <div className="flex items-end gap-2">
            Market Cap
            <div className="flex">
              <div className="flex items-center gap-2">
                <Percentage
                  percentage={change_percentage}
                  fontSize={'0.8rem'}
                  iconSize={14}
                />
                <small
                  className={clsx(
                    'text-[0.8rem]',
                    change_percentage.toString().startsWith('-')
                      ? 'text-status-error-200'
                      : 'text-status-success-200',
                  )}
                >
                  ( 24h )
                </small>
              </div>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <div className="mt-1">
                <Price price={total_market_cap.usd} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <Price
                price={total_market_cap.usd}
                darkTheme
                imageHeight={20}
                imageWidth={20}
              />
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="md:hidden">
          <Image
            src={'https://www.coingecko.com/total_market_cap.svg'}
            width={120}
            height={60}
            alt="Total market cap"
          />
        </div>
      </div>

      {/* Volume */}
      <div
        className={`${flexBetween} h-1/2 border-b max-[26em]:flex-col max-[26em]:pt-5 max-[26em]:pb-2.5`}
      >
        <div>
          <p className="max-[26em]:text-center">Total Volume</p>
          <Tooltip>
            <TooltipTrigger>
              <div className="mt-1">
                <Price price={total_volume.usd} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <Price
                price={total_volume.usd}
                darkTheme
                imageHeight={20}
                imageWidth={20}
              />
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="md:hidden">
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
