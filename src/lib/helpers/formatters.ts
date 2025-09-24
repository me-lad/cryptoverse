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

export const formatPrice = (value: number): string => {
  const [intPart, decimalPart] = value.toFixed(3).split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedInt}.${decimalPart}`;
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};
