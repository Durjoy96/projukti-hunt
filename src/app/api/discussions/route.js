import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const comment = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("discussions").insertOne(comment);

    const insertedDoc = await db
      .collection("discussions")
      .findOne({ _id: new ObjectId(result.insertedId) });

    return NextResponse.json(insertedDoc, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");
    const client = await clientPromise;
    const db = client.db();

    const comments = await db
      .collection("discussions")
      .find({ postId: postId })
      .toArray();

    const userIds = [...new Set(comments.map((comment) => comment.userId))];

    const usersData = await db
      .collection("users")
      .find(
        { _id: { $in: userIds } },
        { projection: { name: 1, photo_url: 1, username: 1 } }
      )
      .toArray();

    const userMap = {};
    usersData.forEach((user) => (userMap[user._id] = user));

    const enrichedComments = comments.map((comment) => ({
      ...comment,
      author: userMap[comment.userId],
    }));

    return NextResponse.json(enrichedComments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
