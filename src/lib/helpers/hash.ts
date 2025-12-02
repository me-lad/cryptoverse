import { hash, compare } from 'bcrypt';

export const doHash = async (text: string): Promise<string> => {
  return await hash(text, 10);
};

export const verifyHash = async (
  originalText: string,
  hashedText: string,
): Promise<boolean> => {
  try {
    return await compare(originalText, hashedText);
  } catch (err) {
    return false;
  }
};
