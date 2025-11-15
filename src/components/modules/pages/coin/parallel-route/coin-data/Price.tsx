// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { flexCenter } from '~styles/tw-custom';
import { Price as PriceFormatter } from '~core/global/formatters';

// ⚙️ Functional component
const Price: React.FC<GetCoinData> = ({ market_data, symbol }) => {
  const [price, setPrice] = useState(market_data.current_price.usd);
  const [priceBg, setPriceBg] = useState('#fff');
  const [factor, setFactor] = useState<string>('');

  const frameRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (!inputRef.current?.focus) return;

      if (event.key === 'ArrowUp') setFactor((prev) => (+prev + 1).toString());
      if (event.key === 'ArrowDown') {
        +factor === 1
          ? setFactor('')
          : +factor > 1 && setFactor((prev) => (+prev - 1).toString());
      }
    };

    if (typeof document !== 'undefined' && inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyboardEvent);
    }

    calculatePrice(factor);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (inputRef.current)
        inputRef.current.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [factor]);

  const calculatePrice = (factor: string) => {
    if (factor === '') factor = '1';
    if (!factor || factor.startsWith('-')) return;

    const targetPrice = market_data.current_price.usd * +factor;
    if (Math.abs(price - targetPrice) < 0.01) return;

    const duration = 1000;
    const start = performance.now();

    if (targetPrice > price) {
      setPriceBg('#2fa766');
    }
    if (targetPrice < price) {
      setPriceBg('#e2464a');
    }

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = easeOut(progress);

      const flickerRange = targetPrice * 0.05;
      const flicker = (Math.random() - 0.5) * flickerRange * (1 - progress);

      const animatedPrice = targetPrice * eased + flicker;
      setPrice(animatedPrice);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setPrice(targetPrice);
        setPriceBg('#fff');
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className={`${flexCenter} mx-auto mt-8 w-[95%] gap-5 sm:w-fit *:md:text-xl`}
    >
      <div className="flex items-center max-sm:flex-col max-sm:gap-y-2.5 sm:pl-10 md:gap-2">
        <label
          htmlFor="calculate-price"
          className="has-focus-visible:border-b-primary flex items-center rounded-sm border-2 border-neutral-600 px-4 max-md:scale-[0.8]"
        >
          <Pencil color="#ccc" size={20} />
          <Input
            id="calculate-price"
            className="!border-0 !bg-transparent !ring-0 !outline-0"
            placeholder="Coin count (1)"
            autoComplete="off"
            inputMode="decimal"
            pattern="[0-9]*"
            value={factor}
            ref={inputRef}
            onChange={(e) => {
              const raw = e.target.value.trim();
              const parsed = parseFloat(raw);
              if (!isNaN(parsed) && raw !== '0') {
                setFactor(parsed.toString());
              } else if (raw === '') {
                setFactor('');
              }
            }}
          />
          <Button
            variant={'secondary'}
            size={'icon'}
            className="max-h-6 max-w-6 cursor-pointer"
            onClick={() =>
              +factor === 1
                ? setFactor('')
                : +factor > 1 && setFactor((prev) => (+prev - 1).toString())
            }
          >
            -
          </Button>
          <Button
            variant={'secondary'}
            size={'icon'}
            className="ml-1 max-h-6 max-w-6 cursor-pointer"
            onClick={() => setFactor((prev) => (+prev + 1).toString())}
          >
            +
          </Button>
        </label>
        <div className={`${flexCenter} gap-2 max-sm:w-full`}>
          <span className="ml-20 sm:ml-2">{symbol.toUpperCase()}</span>
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
    </div>
  );
};
export default Price;
