/**
 * Minimal OpenAI Chat Completions client.
 * Uses OPENAI_API_KEY from env — never hardcode secrets.
 */

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionResult = {
  content: string;
  model: string;
};

function getOpenAiApiKey() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return key;
}

export async function createChatCompletion(input: {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<ChatCompletionResult> {
  const apiKey = getOpenAiApiKey();
  const model = input.model || process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: input.temperature ?? 0.6,
      max_tokens: input.maxTokens ?? 900,
      messages: input.messages,
      response_format: { type: "json_object" },
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    error?: { message?: string };
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
  };

  if (!res.ok) {
    throw new Error(
      json?.error?.message || `OpenAI request failed (${res.status})`
    );
  }

  const content = json?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("OpenAI returned an empty response");
  }

  return { content, model: json.model || model };
}
