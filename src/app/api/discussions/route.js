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
