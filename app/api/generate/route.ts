import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idea = body.idea;

    if (!idea) {
      return Response.json(
        { error: "No idea provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing OpenAI API key in Vercel environment variables" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

    const response = await
