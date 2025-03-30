import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const info = await req.json();
    const query = { web_app_link: info.web_app_link };
    const isExist = await db.collection("submissions").findOne(query);
    if (isExist) {
      return new NextResponse(
        { error: "Product already exists" },
        {
          status: 409,
        }
      );
    }
    const result = await db.collection("submissions").insertOne(info);
    return new NextResponse(result);
  } catch (error) {
    console.error("Database error:", error);
    return new NextResponse(
      { error: "Failed to create user" },
      {
        status: 500,
      }
    );
  }
}
