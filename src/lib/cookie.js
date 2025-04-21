import { cookies } from "next/headers";

export async function createAuthCookie(token) {
  if (!token) {
    throw new Error("Token is required to create a cookie");
  }

  return (await cookies()).set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 days
  });
}
