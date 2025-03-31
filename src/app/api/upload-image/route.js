export async function POST(req) {
  const imgFile = await req.json();
  console.log(imgFile);
}
