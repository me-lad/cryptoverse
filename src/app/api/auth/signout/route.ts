import { NextResponse } from 'next/server';

import { doSignout } from '~services/repositories/shared';
import { Messages } from '~constants/messages';

export async function POST() {
  const result = await doSignout();

  if (!result) {
    const response = NextResponse.json(Messages.Error.CatchHandler, {
      status: 500,
    });
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  const response = NextResponse.json(result);
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
}
