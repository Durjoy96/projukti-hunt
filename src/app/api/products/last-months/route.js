import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const today = new Date();

  // Last month's range
  const lastMonthStart = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)
  ).toISOString(); // 12:00 AM UTC on the 1st day of the previous month
  const lastMonthEnd = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)
  ).toISOString(); // 12:00 AM UTC on the 1st day of the current month

  const query = {
    createdAt: {
      $gte: lastMonthStart,
      $lt: lastMonthEnd,
    },
  };

  const result = await db.collection("products").find(query).toArray();
  return NextResponse.json(result, {
    status: 200,
  });
}
