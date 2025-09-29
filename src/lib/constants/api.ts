const Api_Key = process.env.API_KEY_CRYPTOCOMPARE;

export const Base_Headers: HeadersInit = {
  'Content-Type': 'application/json; charset=UTF-8',
  'Accept-Encoding': 'deflate, gzip',
  Accept: 'application/json',
  authorization: `Apikey ${Api_Key}`,
};
