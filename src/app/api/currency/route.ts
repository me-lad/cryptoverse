import { hoursToMillisecond } from '~helpers/time';

let cachedStamp = 0;
let cachedValue: any = null;
let cachedCurrency = '';

export async function POST(req: Request) {
  const { baseCurrency } = (await req.json()) || 'USD';

  if (
    cachedStamp > Date.now() &&
    baseCurrency === cachedCurrency &&
    cachedValue
  ) {
    return Response.json(cachedValue);
  }

  const baseUrl = 'https://open.er-api.com/v6/latest';
  const fetchUrl = `${baseUrl}/${baseCurrency}`;
  const res = await fetch(fetchUrl, {
    headers: { 'Content-Type': 'application/json' },
  });

  cachedValue = await res.json();
  cachedStamp = new Date(Date.now() + hoursToMillisecond(24)).getTime();
  cachedCurrency = baseCurrency;

  return Response.json(cachedValue);
}
