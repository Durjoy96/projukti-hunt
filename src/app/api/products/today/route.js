import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const query = {
    status: "approved",
  };
  const result = await db.collection("submissions").find(query).toArray();
  return NextResponse.json(result, {
    status: 200,
  });
}
