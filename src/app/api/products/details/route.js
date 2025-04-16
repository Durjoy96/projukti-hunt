import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const client = await clientPromise;
    const db = client.db();
    const query = {
      title: title,
    };
    const result = await db.collection("products").findOne(query);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
