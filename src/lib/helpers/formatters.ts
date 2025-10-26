import { minutesToMillisecond } from './time';

export const padNumber = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const startCountdownTimer = (
  startDate: Date,
  durationInMinutes: number,
  onTick: (formattedTime: string) => void,
) => {
  const totalMs = minutesToMillisecond(durationInMinutes);

  const timer = setInterval(() => {
    const passedMs = Date.now() - startDate.getTime();
    const remainMs = totalMs - passedMs;

    if (remainMs <= 0) {
      clearInterval(timer);
      onTick('');
      return;
    }

    const seconds = Math.floor((remainMs / 1000) % 60);
    const minutes = Math.floor((remainMs / 1000 / 60) % 60);

    onTick(`${padNumber(minutes)}:${padNumber(seconds)}`);
  }, 1000);

  return () => clearInterval(timer);
};

export const formatPrice = (
  priceUSD: number,
  rateUSD: number = 1,
  rateTarget: number = 1,
  shortenUnits?: boolean,
  fullPrecision?: boolean,
): string => {
  if (!priceUSD) return '';

  const convertedPrice = (priceUSD * rateTarget) / rateUSD;

  if (shortenUnits && !fullPrecision) {
    const absValue = Math.abs(convertedPrice);
    const units = [
      { value: 1e15, suffix: 'Q' },
      { value: 1e12, suffix: 'T' },
      { value: 1e9, suffix: 'B' },
      { value: 1e6, suffix: 'M' },
    ];

    for (const unit of units) {
      if (absValue >= unit.value) {
        const compact = (convertedPrice / unit.value).toFixed(2);
        return `${compact} ${unit.suffix}`;
      }
    }
  }

  if (fullPrecision) {
    const [intPart, decimalPart] = convertedPrice.toString().split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedInt}.${decimalPart}`;
  }

  const [intPart, decimalPart] = convertedPrice.toFixed(3).split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart === '000' && intPart.length > 1) return formattedInt;
  return `${formattedInt}.${decimalPart}`;
};

export const formatPercentage = (value: number): string => {
  if (!value) return '';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};
