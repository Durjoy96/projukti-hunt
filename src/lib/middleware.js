import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function authMiddleware(req) {
  const cookie = req.cookies.get("authToken")?.value;

  if (!cookie) {
    return NextResponse.json({ error: "No auth token" }, { status: 401 });
  }

  const decoded = verifyToken(cookie);

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Optionally attach the user to request for later use
  req.user = decoded;

  return NextResponse.next(); // let the request through
}
