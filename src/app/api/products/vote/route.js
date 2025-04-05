import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { productId } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("submissions")
      .findOneAndUpdate(
        { _id: new ObjectId(productId) },
        { $inc: { votes: 1 } },
        { returnDocument: "after" }
      );

    if (result) {
      // Use the global io instance
      global.io.emit("voteUpdate", {
        productId: result._id.toString(),
        votes: result.votes,
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
