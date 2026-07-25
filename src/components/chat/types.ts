export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type ChatSendRequest = {
  message: string;
  history: ChatMessage[];
  sessionId: string;
};

export type ChatSendResponse = {
  reply: string;
  suggestions?: string[];
};

/**
 * Swap `createChatClient()` to point at a real backend later.
 * Keep this interface stable so the UI never needs to change.
 */
export interface ChatClient {
  sendMessage(request: ChatSendRequest): Promise<ChatSendResponse>;
}
