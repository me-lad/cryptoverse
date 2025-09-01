// Packages imports
import { NextResponse } from "next/server";

// Local imports
import VerifyService from "@/lib/actions/auth/verify.service";
import { AuthMessages } from "@/lib/actions/auth/auth.messages";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({
      success: false,
      message: AuthMessages.Error_DataLack,
    });
  }

  const result = await VerifyService.resendOtp(username);

  return NextResponse.json(result);
}
