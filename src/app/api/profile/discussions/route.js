import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username").split("%40")[0].split("@")[1];
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ username: username });

    const discussions = await db
      .collection("discussions")
      .find({ userId: user._id })
      .toArray();

    const postIds = [
      ...new Set(discussions.map((discussion) => discussion.postId)),
    ];

    const posts = await db
      .collection("submissions")
      .find(
        { _id: { $in: postIds.map((post) => new ObjectId(post)) } },
        { projection: { product_name: 1, title: 1 } }
      )
      .toArray();

    const postsMap = {};
    posts.forEach((post) => (postsMap[post._id] = post));

    const enrichedDiscussions = discussions.map((comment) => ({
      ...comment,
      product: postsMap[comment.postId],
    }));

    return NextResponse.json(enrichedDiscussions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}
