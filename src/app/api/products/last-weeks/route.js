import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const today = new Date();

  // Last week's range
  const lastWeekStart = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - 7
    )
  ).toISOString(); // 12:00 AM UTC 7 days ago
  const lastWeekEnd = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  ).toISOString(); // 12:00 AM UTC today

  const query = {
    createdAt: {
      $gte: lastWeekStart,
      $lt: lastWeekEnd,
    },
  };

  const result = await db.collection("products").find(query).toArray();
  return NextResponse.json(result, {
    status: 200,
  });
}
