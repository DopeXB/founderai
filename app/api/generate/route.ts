import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const idea = body.idea;

  const prompt = `
You are an expert startup builder.

Turn this idea into a complete business plan:

Idea: ${idea}

Return:
- Business name
- Slogan
- Target audience
- Pricing tiers
- Marketing strategy
- Website copy outline
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({
    result: response.choices[0].message.content,
  });
}
