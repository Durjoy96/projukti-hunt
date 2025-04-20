import { serialize } from "cookie";

const isProd = process.env.NODE_ENV === "production";

export function createAuthCookie(token) {
  return serialize("authToken", token, {
    httpOnly: true,
    secure: isProd, //  dynamic based on environment
    sameSite: "lax", // Changed for cross-origin requests
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    // domain: isProd ? process.env.NEXT_PUBLIC_DOMAIN : "localhost", // Add your domain
  });
}
