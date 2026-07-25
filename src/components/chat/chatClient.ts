import {
  chatFallback,
  chatKnowledge,
  type KnowledgeEntry,
} from "./chatKnowledge";
import type { ChatClient, ChatSendRequest, ChatSendResponse } from "./types";

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const hasKeyword = (message: string, keyword: string) => {
  // Word-boundary match so short tokens like "hi" don't hit inside "which"
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`);
  return pattern.test(message);
};

const scoreEntry = (message: string, entry: KnowledgeEntry) => {
  let score = 0;
  for (const keyword of entry.keywords) {
    if (hasKeyword(message, keyword)) {
      const words = keyword.trim().split(/\s+/).length;
      score += keyword.length > 6 ? 4 : 2;
      score += Math.max(0, words - 1) * 2;
    }
  }
  return score;
};

const pickReply = (message: string): ChatSendResponse => {
  const normalized = normalize(message);
  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of chatKnowledge) {
    const score = scoreEntry(normalized, entry);
    if (score <= 0) continue;
    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  if (!best || best.score < 2) {
    return {
      reply: chatFallback.reply,
      suggestions: chatFallback.suggestions,
    };
  }

  return {
    reply: best.entry.reply,
    suggestions: best.entry.suggestions,
  };
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Local client — feels conversational with realistic latency.
 * Replace with `createApiChatClient` when backend is ready.
 */
export const createLocalChatClient = (): ChatClient => ({
  async sendMessage(request: ChatSendRequest): Promise<ChatSendResponse> {
    const trimmed = request.message.trim();
    if (!trimmed) {
      return {
        reply: "Whenever you’re ready, type a question — or tap a suggestion below.",
        suggestions: chatFallback.suggestions,
      };
    }

    const result = pickReply(trimmed);
    // Human-like pause: longer replies take a beat longer + light jitter
    const jitter = 180 + Math.floor(Math.random() * 420);
    const delay = Math.min(2600, 700 + result.reply.length * 7 + jitter);
    await wait(delay);
    return result;
  },
});

/**
 * Future API client. Point NEXT_PUBLIC_CHAT_API_URL at your endpoint.
 * Expected: POST { message, history, sessionId } → { reply, suggestions? }
 */
export const createApiChatClient = (endpoint: string): ChatClient => ({
  async sendMessage(request: ChatSendRequest): Promise<ChatSendResponse> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Chat API error (${response.status})`);
    }

    const data = (await response.json()) as ChatSendResponse;
    if (!data?.reply) {
      throw new Error("Chat API returned an empty reply");
    }
    return data;
  },
});

export const createChatClient = (): ChatClient => {
  const endpoint = process.env.NEXT_PUBLIC_CHAT_API_URL;
  if (endpoint) {
    return createApiChatClient(endpoint);
  }
  return createLocalChatClient();
};
