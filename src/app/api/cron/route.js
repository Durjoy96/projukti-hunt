import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Verify the authorization header
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Your cron job logic here
    console.log("Authorized cron job executed at:", new Date().toISOString());

    const client = await clientPromise;
    const db = client.db();
    const findProducts = await db
      .collection("submissions")
      .find({ status: "approved" }, { projection: { _id: 0 } })
      .toArray();

    // add created date and status
    for (let product of findProducts) {
      product.createdAt = new Date().toISOString();
      product.status = "published";
    }

    //insert on the products collection
    await db.collection("products").insertMany(findProducts);

    //clear submissions
    await db.collection("submissions").deleteMany({ status: "approved" });

    return NextResponse.json({
      success: true,
      message: "Cron job executed successfully",
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
