import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { pusher } from "@/lib/pusher";
import { checkAuth } from "@/lib/middleware";

export async function POST(req) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let { productId, userId } = await req.json();

  if (userId !== user.uid) {
    return NextResponse.json(
      { error: "Forbidden: user ID mismatch" },
      { status: 403 }
    );
  }
  try {
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
