export async function POST(req: Request) {
  const body = await req.json();
  const idea = body.idea;

  const result = `
BUSINESS GENERATED

Idea: ${idea}

Name: ApexAI Ventures
Slogan: Build. Launch. Scale.

Target Market: Small business starters

Pricing:
- Basic: $19.99
- Pro: $49.99

Marketing Plan:
- TikTok content
- SEO blog strategy
- Paid ads funnel

Website Copy:
Home page + services + contact page structure included
`;

  return Response.json({ result });
}
