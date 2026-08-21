type InteractionForSummary = {
  type: string;
  subject?: string | null;
  summary?: string | null;
  body?: string | null;
  occurred_at?: string | null;
  created_at?: string | null;
};

function clip(text: string | null | undefined, max = 220) {
  const value = (text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function buildInteractionSummary(
  interactions: InteractionForSummary[]
): string {
  if (!interactions.length) {
    return "No previous communication recorded.";
  }

  const sent = interactions.filter((x) => x.type === "sent").length;
  const received = interactions.filter((x) => x.type === "received").length;

  const latestReceived = interactions.find((x) => x.type === "received");
  const latest = interactions[0];

  const lines: string[] = [];

  lines.push(`${interactions.length} recent interactions.`);
  lines.push(`${sent} sent, ${received} received.`);

  if (latest) {
    lines.push(
      `Latest interaction: ${latest.type}${
        latest.subject ? ` — ${clip(latest.subject, 140)}` : ""
      }.`
    );
  }

  if (latestReceived) {
    const replyText =
      clip(latestReceived.summary, 220) ||
      clip(latestReceived.body, 220);

    lines.push(
      `Latest reply received${
        latestReceived.subject
          ? `: ${clip(latestReceived.subject, 140)}`
          : "."
      }`
    );

    if (replyText) {
      lines.push(`Latest reply context: ${replyText}`);
    }
  } else {
    lines.push("No received reply found in the recent interaction window.");
  }

  return lines.join("\n");
}
