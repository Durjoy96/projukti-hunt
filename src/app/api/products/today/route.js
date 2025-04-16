import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const today = new Date();
  const start = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  ).toISOString(); // 12:00 AM UTC today
  const end = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() + 1
    )
  ).toDateString(); // 12:00 AM UTC tomorrow

  const query = {
    createdAt: {
      $gte: start,
      $lt: end,
    },
  };
  const result = await db.collection("products").find(query).toArray();
  return NextResponse.json(result, {
    status: 200,
  });
}
