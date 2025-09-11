export const minutesToMillisecond = (min: number): number => {
  return min * 60 * 1000;
};
export const hoursToMillisecond = (hr: number): number => {
  return hr * 60 * 60 * 1000;
};
export const daysToMillisecond = (day: number): number => {
  return day * 24 * 60 * 60 * 1000;
};

export const daysToMinutes = (day: number): number => {
  return day * 24 * 60;
};
export const millisecondToMinutes = (ms: number): number => {
  return ms / 1000 / 60;
};

export const millisecondToHours = (ms: number): number => {
  return millisecondToMinutes(ms) / 60;
};

export const isDatePassedTime = (date: Date, minutes: number): boolean => {
  const threshold = new Date(date.getTime() + minutesToMillisecond(minutes));
  return Date.now() >= threshold.getTime();
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
