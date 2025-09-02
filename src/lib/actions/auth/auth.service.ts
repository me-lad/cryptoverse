// Directives
import "server-only";

// Packages imports
import { Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Local imports
import { daysToMillisecond, durationToSeconds, hoursToMillisecond } from "@/lib/helpers";
import { connectToDB } from "@/lib/configs/mongoose";
import UserModel from "@/lib/models/User";
import SessionModel from "@/lib/models/Session";

export class AuthService {
  accessTokenSecretKey: string | undefined;
  accessTokenEncodedKey: Uint8Array;
  refreshTokenSecretKey: string | undefined;
  refreshTokenEncodedKey: Uint8Array;
  constructor() {
    this.accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
    this.accessTokenEncodedKey = new TextEncoder().encode(this.accessTokenSecretKey);
    this.refreshTokenEncodedKey = new TextEncoder().encode(this.refreshTokenSecretKey);
  }

  // Password related methods
  async passwordHasher(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async passwordVerifier(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch (err) {
      console.log("Error in password verification =>", err);
      return false;
    }
  }

  // JWT related methods
  async encrypt(payload: string, expiresAt: `${number}${"d" | "h"}`, secret: Uint8Array) {
    const exp = Math.floor(Date.now() / 1000) + durationToSeconds(expiresAt);

    return new SignJWT({ sub: payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(exp)
      .sign(secret);
  }

  async decrypt(session: string) {
    try {
      const { payload } = await jwtVerify(session, this.accessTokenEncodedKey, {
        algorithms: ["HS256"],
      });

      return payload;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
      } else if (err.name === "JWTInvalid") {
        console.log("Invalid token");
      } else {
        console.log("Other JWT error:", err);
      }
      return false;
    }
  }

  // Cookies related methods
  async setCookie(name: string, value: string, expires: Date) {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires,
    });
  }

  async getCookie(name: string) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value || "";
  }

  async deleteCookie(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }

  // Authorization session related methods
  async createUserSessions(username: string, remember?: true) {
    try {
      await connectToDB();
      await SessionModel.model.init();

      // 1. Find user data
      const userData = await UserModel.model.findOne({ username });
      if (!userData) return false;

      // 2. Create DB session to use that ID in tokens
      const sessionData = { userId: userData._id, role: userData.role };
      const createdSession = await SessionModel.model.create(sessionData);

      // 3. Set Access token in cookies
      const access_token = await this.encrypt(
        String(createdSession._id),
        "12h",
        this.accessTokenEncodedKey,
      );
      const access_token_exp = new Date(Date.now() + hoursToMillisecond(12));
      this.setCookie("access_token", access_token, access_token_exp);

      // 4. Set refresh token in user document
      const refresh_token = await this.encrypt(
        String(createdSession._id),
        "14d",
        this.refreshTokenEncodedKey,
      );
      const refresh_token_exp = new Date(
        Date.now() + (!remember ? hoursToMillisecond(12) : daysToMillisecond(14)),
      );
      this.setCookie("refresh_token", refresh_token, refresh_token_exp);

      const hashed_refresh_token = await this.passwordHasher(refresh_token);
      userData.refreshToken = hashed_refresh_token;
      userData.sessionId = createdSession._id as Schema.Types.ObjectId;
      await userData.save();

      return true;
    } catch (err) {
      console.log("Error in user session creation ->", err);
      return false;
    }
  }
}

export default new AuthService();
