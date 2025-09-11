// Packages imports
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Local imports
import { AuthService } from "~services/auth.service";
import { UserService } from "~services/user.service";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) return NextResponse.json({ success: false });

  const userData = await UserService.getUserDataById(userId);
  const creationResult = await AuthService.createUserSessions(userData?.username || "", "on", true);
  if (!creationResult.success) {
    const response = NextResponse.json({ success: false });
    await AuthService.deleteUserSessions(userId);
    response.cookies.delete("access_token");
    return response;
  }

  const response = NextResponse.json({ success: true });
  const isDev = process.env.NODE_ENV !== "production";
  response.cookies.set("access_token", creationResult.data.access_token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: "lax",
    path: "/",
    expires: creationResult.data.access_token_exp,
  });
  response.cookies.set("refresh_token", creationResult.data.refresh_token!, {
    httpOnly: true,
    secure: !isDev,
    sameSite: "lax",
    path: "/",
    expires: creationResult.data.refresh_token_exp!,
  });
  return response;
}
