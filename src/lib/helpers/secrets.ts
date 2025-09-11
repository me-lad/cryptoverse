const encoder = new TextEncoder();
const getEncodedSecret = (envKey: string | undefined, keyName: string): Uint8Array => {
  if (!envKey) {
    throw new Error(`Environment variable ${keyName} is missing.`);
  }
  return encoder.encode(envKey);
};

export const getAccessTokenSecret = () =>
  getEncodedSecret(process.env.ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET");

export const getRefreshTokenSecret = () =>
  getEncodedSecret(process.env.REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET");
