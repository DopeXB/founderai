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
        { error: "Missing OpenAI API key" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert startup founder who creates business plans.",
        },
        {
          role: "user",
          content: `
Turn this idea into a full business plan:

Idea: ${idea}

Include:
- Business name
- Slogan
- Target audience
- Pricing tiers
- Marketing strategy
- Website copy outline
          `,
        },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        error: "Failed to generate response",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
