// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexCenter } from '~styles/tw-custom';
import { Price as PriceFormatter } from '~core/global/formatters';
import { Button } from '@/components/core/ui/shadcn/button';

// ⚙️ Functional component
const Price: React.FC<GetCoinData> = ({ market_data, symbol }) => {
  const [price, setPrice] = useState(market_data.current_price.usd);
  const [priceBg, setPriceBg] = useState('#fff');
  const [factor, setFactor] = useState<number>(1);

  useEffect(() => {
    calculatePrice(factor.toString());
  }, [factor]);

  const calculatePrice = (factor: string) => {
    if (factor === '') factor = '1';
    if (!factor || factor.startsWith('-')) return;

    const targetPrice = market_data.current_price.usd * +factor;
    if (price === targetPrice) return;

    const duration = 1000;
    const start = performance.now();

    if (targetPrice > price) {
      setPriceBg('#2fa766');
    }
    if (targetPrice < price) {
      setPriceBg('#e2464a');
    }

    let frame: number;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = easeOut(progress);

      const flickerRange = targetPrice * 0.05;
      const flicker = (Math.random() - 0.5) * flickerRange;

      const animatedPrice = targetPrice * eased + flicker;
      setPrice(animatedPrice);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPrice(targetPrice);
        setPriceBg('#fff');
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  };

  return (
    <div className={`${flexCenter} mx-auto mt-8 w-11/12 gap-5 *:text-xl`}>
      <h3>Current Price :</h3>
      <div className="flex items-center gap-2">
        <label
          htmlFor="calculate-price"
          className="has-focus-visible:border-primary flex items-center rounded-sm border-2 border-neutral-600 px-4"
        >
          <Pencil color="#ccc" size={20} />
          <Input
            id="calculate-price"
            className="!border-0 !bg-transparent !ring-0 !outline-0"
            placeholder="Coin count (1)"
            autoComplete="off"
            inputMode="decimal"
            pattern="[0-9]*"
            value={factor !== 1 ? factor : ''}
            onChange={(e) => {
              const raw = e.target.value.trim();
              const parsed = parseFloat(raw);
              if (!isNaN(parsed)) {
                setFactor(parsed);
              } else if (raw === '') {
                setFactor(1);
              }
            }}
          />
          <Button
            variant={'secondary'}
            size={'icon'}
            className="max-h-6 max-w-6 cursor-pointer"
            onClick={() => factor > 1 && setFactor((prev) => prev - 1)}
          >
            -
          </Button>
          <Button
            variant={'secondary'}
            size={'icon'}
            className="ml-1 max-h-6 max-w-6 cursor-pointer"
            onClick={() => setFactor((prev) => prev + 1)}
          >
            +
          </Button>
        </label>
        <span className="ml-2">{symbol.toUpperCase()}</span>
        <span> = </span>
        <Tooltip>
          <TooltipTrigger className="min-w-36">
            <PriceFormatter
              price={price}
              className="scale-100 opacity-100 transition-all duration-300 ease-in-out"
              shortenUnits
              style={{ color: priceBg }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <PriceFormatter
              imageHeight={18}
              imageWidth={18}
              price={price}
              darkTheme
            />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
export default Price;
