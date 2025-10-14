import { hoursToMillisecond } from '~helpers/time';

let cachedStamp = 0;
let cachedValue = 0;

export async function GET() {
  if (cachedStamp > Date.now()) {
    return Response.json(cachedValue);
  }

  try {
    const fetchUrl = 'http://api.navasan.tech/latest';
    const resp = await fetch(
      `${fetchUrl}?api_key=${process.env.API_KEY_NAVASAN}&item=usd`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    );
    const result = await resp.json();

    cachedValue = result.usd.value;
    cachedStamp = new Date(Date.now() + hoursToMillisecond(8)).getTime();

    return Response.json(result.usd.value);
  } catch (err: any) {
    console.log(
      'Error in getting NAVASAN api for usd price ->',
      err && err?.message,
    );
    return Response.json(err);
  }
}
