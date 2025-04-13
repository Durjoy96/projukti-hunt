import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username").split("%40")[0].split("@")[1];
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ username: username });

  const upvotes = await db
    .collection("submissions")
    .find({ voters: user._id })
    .toArray();

  return NextResponse.json(upvotes, { status: 200 });
}
