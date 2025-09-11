export const makeRandomID = () => {
  return Math.floor(Date.now() * (Math.random() * 100));
};

export const makeRandomCode = (length: number = 6): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};
