const Api_Key_Compare = process.env.API_KEY_CRYPTOCOMPARE ?? '';
const Api_Key_Gecko = process.env.API_KEY_COINGECKO ?? '';

export const AdditiveApiKeyHeaderCompare = {
  authorization: `Apikey ${Api_Key_Compare}`,
};

export const AdditiveApiKeyHeaderGecko = {
  'x-cg-demo-api-key': Api_Key_Gecko,
};

export const BaseHeaders: HeadersInit = {
  'Content-Type': 'application/json; charset=UTF-8',
  'Accept-Encoding': 'deflate, gzip',
  Accept: 'application/json',
};
