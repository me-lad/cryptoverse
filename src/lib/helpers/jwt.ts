import { SignJWT, jwtVerify } from "jose";
import { durationToSeconds } from "./time";

export const encrypt = async (
  payload: string,
  expiresAt: `${number}${"d" | "h"}`,
  secret: Uint8Array,
) => {
  const exp = Math.floor(Date.now() / 1000) + durationToSeconds(expiresAt);

  return new SignJWT({ sub: payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
};

export const decrypt = async (session: string, secret: Uint8Array) => {
  try {
    const { payload } = await jwtVerify(session, secret, {
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
};
