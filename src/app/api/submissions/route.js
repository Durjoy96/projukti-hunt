import { checkAuth } from "@/lib/middleware";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const info = await req.json();

  if (info.hunter !== user.uid) {
    return NextResponse.json(
      { error: "Forbidden: user ID mismatch" },
      { status: 403 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const query = { web_app_link: info.web_app_link };
    const isExist = await db.collection("submissions").findOne(query);
    if (isExist) {
      return NextResponse.json(
        { error: "Product already exists" },
        {
          status: 409,
        }
      );
    }

    let baseTitle = info.title;
    let finalTitle = baseTitle;
    let counter = 1;

    while (true) {
      const isTitleExist = await db
        .collection("submissions")
        .findOne({ title: finalTitle });
      if (!isTitleExist) {
        break; // Title is unique, exit the loop
      }
      // Increment the title by appending a number
      finalTitle = `${baseTitle}-${counter}`;
      counter++;
    }

    info.title = finalTitle; // Set the unique title

    const result = await db.collection("submissions").insertOne(info);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      {
        status: 500,
      }
    );
  }
}
