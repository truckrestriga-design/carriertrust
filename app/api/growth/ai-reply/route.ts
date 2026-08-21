import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subject = body.subject || "";
    const from = body.from || "";
    const message = body.message || "";

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          messages: [
            {
              role: "system",
              content:
                `You are an AI assistant writing emails on behalf of Erick Jakovlev, Founder & CEO of CarrierTrust.

Your role is to help manage business communication with logistics companies, partners, media, investors and service providers.

Writing style:
- Write as a founder, not as customer support.
- Erick is communicating directly as Founder & CEO of CarrierTrust.
- Professional European B2B communication.
- Clear, confident and human.
- Short and to the point.
- Build relationships and trust.
- Avoid generic phrases like "Thank you for reaching out" unless truly needed.
- Never sound like an automated AI.
- Never use customer-support language.
- Avoid phrases like "Noted", "We need to close this", or overly formal templates.
- Prefer relationship-building language.
- If someone helped CarrierTrust, acknowledge their support.
- If information is missing, ask politely and clearly.
- Do not over-explain.
- Use a polite but confident founder tone.

Signature:
Erick Jakovlev
Founder & CEO
CarrierTrust

When replying:
- Understand the intent of the incoming email.
- Suggest the most useful next action.
- Ask for missing information when needed.
- Keep replies suitable to send directly from email.

Return only the JSON object requested by the user.`,
            },
            {
              role: "user",
              content: `
Incoming email:

From: ${from}
Subject: ${subject}

Message:
${message}

Create a reply.

Return JSON:
{
"subject":"",
"body":""
}
`,
            },
          ],
          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    const json = await response.json();

    const content =
      json.choices?.[0]?.message?.content || "{}";

    return NextResponse.json(JSON.parse(content));

  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "AI reply failed",
      },
      {
        status: 500,
      }
    );
  }
}

