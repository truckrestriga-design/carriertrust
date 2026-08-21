export type GrowthDraftMode = "cold" | "follow_up" | "reply";

export function buildModeInstructions(mode: GrowthDraftMode): string {
  if (mode === "follow_up") {
    return `
FOLLOW-UP MODE

This is not first outreach.

Highest-priority rules:
- Assume the recipient already knows what CarrierTrust is.
- Never explain CarrierTrust again.
- Never describe the product, platform, reputation network, features, or value proposition again.
- Never restart the original pitch.
- Do not use phrases such as:
  "regarding CarrierTrust"
  "our platform"
  "our reputation network"
  "our solution"
- Sound like a real person checking back after a previous email.
- Refer to the previous email only briefly when useful.
- If there is no genuinely new fact, do not invent one.
- Use one simple, low-pressure CTA.
- Body target: 40–70 words.
- The email must be impossible to mistake for first outreach.
`.trim();
  }

  if (mode === "reply") {
    return `
REPLY MODE

This is an existing conversation.

Highest-priority rules:
- Reply directly to the latest received message.
- Address what the person actually wrote.
- Do not restart the CarrierTrust pitch.
- Do not re-explain the product unless explicitly necessary to answer their question.
- Preserve the existing language and conversational context when possible.
- Be concise, natural, and useful.
- If they asked a question, answer it before adding any CTA.
`.trim();
  }

  return `
COLD OUTREACH MODE

This is first outreach.

Rules:
- Briefly explain why CarrierTrust may be relevant.
- Keep the message specific and low-pressure.
- Do not sound like mass sales outreach.
- Body target: 90–150 words.
- Use one light CTA.
`.trim();
}
