// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { VerifyService } from '~actions/auth/verify.service';
import { Messages } from '~constants/messages';

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({
      success: false,
      message: Messages.Error.DataLack,
    });
  }

  const result = await VerifyService.resendOtp(username);

  return NextResponse.json(result);
}
