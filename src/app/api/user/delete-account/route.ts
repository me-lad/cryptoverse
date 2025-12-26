import { NextResponse } from 'next/server';

import { UserServices } from '~services/repositories/user';

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username)
    return NextResponse.json('Username is not valid', { status: 400 });

  try {
    await UserServices.deleteUserAccount(username);

    const response = NextResponse.json(
      'Account has been deleted successfully',
      { status: 200 },
    );
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');

    return response;
  } catch {
    return NextResponse.json('Server Error !!!', { status: 500 });
  }
}
