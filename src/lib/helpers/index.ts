export const jsonParser = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const makeRandomID = () => {
  return Math.floor(Date.now() * (Math.random() * 100));
};
export const makeRandomCode = (length: number = 6): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};

export const minutesToMillisecond = (min: number): number => {
  return min * 60 * 1000;
};
export const hoursToMillisecond = (hr: number): number => {
  return hr * 60 * 60 * 1000;
};
export const daysToMillisecond = (day: number): number => {
  return day * 24 * 60 * 60 * 1000;
};
export const millisecondToMinutes = (ms: number): number => {
  return ms / 1000 / 60;
};
export const millisecondToHours = (ms: number): number => {
  return millisecondToMinutes(ms) / 60;
};
export const durationToSeconds = (duration: string): number => {
  const regex = /^(\d+)\s*(h|d)$/i;
  const match = duration.match(regex);

  if (!match) {
    throw new Error(`Invalid duration format: "${duration}". Use "X h" or "X d".`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "h":
      return value * 60 * 60; // hours to seconds
    case "d":
      return value * 60 * 60 * 24; // days to seconds
    default:
      throw new Error(`Unsupported time unit: "${unit}"`);
  }
};

export const padNumber = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const isDatePassedTime = (date: Date, minutes: number): boolean => {
  const threshold = new Date(date.getTime() + minutesToMillisecond(minutes));
  return Date.now() >= threshold.getTime();
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
      onTick("");
      return;
    }

    const seconds = Math.floor((remainMs / 1000) % 60);
    const minutes = Math.floor((remainMs / 1000 / 60) % 60);

    onTick(`${padNumber(minutes)}:${padNumber(seconds)}`);
  }, 1000);

  return () => clearInterval(timer);
};
