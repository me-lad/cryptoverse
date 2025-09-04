// Packages imports
import { jwtVerify } from "jose";
import validator from "validator";

// Local imports
import { AuthPatterns } from "../actions/auth/auth.patterns";

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
export const daysToMinutes = (day: number): number => {
  return day * 24 * 60;
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

export const decrypt = async (session: string, secret: Uint8Array) => {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.log("Token has expired");
    } else if (err.name === "JWTInvalid") {
      console.log("Invalid token");
    } else {
      console.log("Other JWT error:", err);
    }
    return false;
  }
};
export const isValidObjectId = (val?: string) => {
  return AuthPatterns.ObjectId.test(val || "");
};

export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized: Record<string, any> = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === "string") {
      sanitized[key] = validator.escape(value.trim());
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
