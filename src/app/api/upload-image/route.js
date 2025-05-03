import { checkAuth } from "@/lib/middleware";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { img } = await req.json();
  const formData = new FormData();
  formData.append("image", img);
  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
