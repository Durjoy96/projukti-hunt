import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username").split("%40")[0].split("@")[1];
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ username: username });

    const products = await db
      .collection("submissions")
      .find({ hunter: user._id })
      .toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}
