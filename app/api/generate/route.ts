import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert startup founder who creates detailed business plans.",
        },
        {
          role: "user",
          content: `
Turn this idea into a complete business plan:

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
    console.error("OpenAI API Error:", error);

    return Response.json(
      {
        error: "Failed to generate business plan",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
