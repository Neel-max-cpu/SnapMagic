import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  if (!prompt || prompt.length === 0) {
    return NextResponse.json(
      { error: "Invalid request. Check key and prompt." },
      { status: 400 }
    );
  }

  console.log("YOUR PROMPT: ", prompt); // -> This will show in your Server Terminal

  return NextResponse.json({ prompt }, { status: 200 });
}