import { verifyToken } from "@/lib/jwt";

export async function checkAuth(req) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1];
  const decoded = verifyToken(token);
  return decoded;
}
