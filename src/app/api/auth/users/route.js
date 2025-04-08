import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await req.json();
    const query = { email: user.email };
    const isExist = await db.collection("users").findOne(query);
    if (isExist) {
      return new NextResponse(
        { error: "User already exists" },
        {
          status: 409,
        }
      );
    }
    const result = await db.collection("users").insertOne(user);
    return NextResponse(result);
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    console.log("uid", uid);
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection("users").findOne({ _id: uid });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new NextResponse(
      { error: "Failed to fetch users" },
      {
        status: 500,
      }
    );
  }
}
