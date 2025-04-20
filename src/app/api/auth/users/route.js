import { createAuthCookie } from "@/lib/cookie";
import { signToken } from "@/lib/jwt";
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
      // Generate token for existing user
      const token = signToken({
        uid: isExist._id,
        email: isExist.email,
      });

      const cookie = createAuthCookie(token);

      const res = NextResponse.json({ message: "Login success" });
      res.headers.set("Set-Cookie", cookie);
      return res;
    }

    //create new user
    user.username = user.email.split("@")[0];
    await db.collection("users").insertOne(user);

    // Generate token for new user
    const token = signToken({
      uid: user._id,
      email: user.email,
    });

    const cookie = createAuthCookie(token);

    const res = NextResponse.json({ message: "Login success" });
    res.headers.set("Set-Cookie", cookie);
    return res;
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    let username;
    let query;
    if (!uid) {
      username = searchParams.get("username").split("%40")[0].split("@")[1];
      console.log("username", username);
      query = { username: username };
    } else {
      query = { _id: uid };
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne(query, {
      projection: { name: 1, photo_url: 1, username: 1 },
    });
    return NextResponse.json(user, { status: 200 });
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
