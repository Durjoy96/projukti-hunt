import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { pusher } from "@/lib/pusher";

export async function POST(req) {
  try {
    const { productId, userId } = await req.json();
    console.log(userId);
    const client = await clientPromise;
    const db = client.db();

    const isVoted = await db.collection("products").findOne({
      _id: new ObjectId(productId),
      voters: userId,
    });

    let result;

    if (isVoted) {
      result = await db
        .collection("products")
        .findOneAndUpdate(
          { _id: new ObjectId(productId) },
          { $inc: { votes: -1 }, $pull: { voters: userId } },
          { returnDocument: "after" }
        );
    } else {
      result = await db
        .collection("products")
        .findOneAndUpdate(
          { _id: new ObjectId(productId) },
          { $inc: { votes: 1 }, $push: { voters: userId } },
          { returnDocument: "after" }
        );
    }

    if (result) {
      await pusher.trigger("votes", "vote-updated", {
        productId: result._id.toString(),
        votes: result.votes,
        voters: result.voters,
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
