import { serialize } from "cookie";

const isProd = process.env.NODE_ENV === "production";

export function createAuthCookie(token) {
  return serialize("authToken", token, {
    httpOnly: true,
    secure: isProd, //  dynamic based on environment
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}
