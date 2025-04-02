import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { logo } = await req.json();
  console.log("API Key:", process.env.IMGBB_API_KEY);
  console.log("Image data length:", logo?.length);
  const formData = new FormData();
  formData.append("image", logo);
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
