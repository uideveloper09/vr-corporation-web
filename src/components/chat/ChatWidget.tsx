"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { createChatClient } from "./chatClient";
import { chatWelcome } from "./chatKnowledge";
import type { ChatMessage } from "./types";
import { contactVisitData } from "@/data/home/contactVisit";

import "./ChatWidget.css";

const HISTORY_KEY = "vr-chat-history";
const SESSION_KEY = "vr-chat-session";
const HISTORY_TTL_MS = 1000 * 60 * 60 * 24; // keep chat for 24h

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const createWelcomeMessages = (): ChatMessage[] => [
  {
    id: "welcome",
    role: "assistant",
    content: chatWelcome.greeting,
    createdAt: Date.now(),
  },
];

type StoredChat = {
  messages: ChatMessage[];
  suggestions: string[];
  savedAt: number;
};

const readStoredChat = (): StoredChat | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredChat;
    if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) {
      return null;
    }
    if (
      typeof parsed.savedAt !== "number" ||
      Date.now() - parsed.savedAt > HISTORY_TTL_MS
    ) {
      window.localStorage.removeItem(HISTORY_KEY);
      return null;
    }
    return {
      messages: parsed.messages,
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions
        : chatWelcome.suggestions,
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
};

const createSessionId = (forceNew = false) => {
  if (typeof window === "undefined") return "server";
  if (!forceNew) {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
  }
  const next = createId();
  window.sessionStorage.setItem(SESSION_KEY, next);
  return next;
};

const hasUserHistory = (items: ChatMessage[]) =>
  items.some((item) => item.role === "user");


const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

const MessageText = ({ content }: { content: string }) => {
  const parts = content.split(URL_PATTERN);

  return (
    <p>
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          const href = part.replace(/[),.;]+$/, "");
          const trailing = part.slice(href.length);
          return (
            <span key={`${href}-${index}`}>
              <a
                className="chat-widget__link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {href.includes("whatsapp.com") || href.includes("wa.me")
                  ? "Open WhatsApp →"
                  : href}
              </a>
              {trailing}
            </span>
          );
        }
        return <span key={`text-${index}`}>{part}</span>;
      })}
    </p>
  );
};

/** Theme-matched robot mark — uses currentColor, no background box */
const RobotIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 3.2v2.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle cx="12" cy="2.4" r="1.15" fill="currentColor" />
    <rect
      x="5.2"
      y="5.8"
      width="13.6"
      height="11.2"
      rx="3.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <circle cx="9.2" cy="11" r="1.35" fill="currentColor" />
    <circle cx="14.8" cy="11" r="1.35" fill="currentColor" />
    <path
      d="M9.1 14.4c.8.9 1.8 1.35 2.9 1.35s2.1-.45 2.9-1.35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <path
      d="M5.2 10.2H3.6a1 1 0 0 0-1 1v1.6a1 1 0 0 0 1 1H5.2M18.8 10.2h1.6a1 1 0 0 1 1 1v1.6a1 1 0 0 1-1 1h-1.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.2 18.8h7.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const ChatWidget = () => {
  const client = useMemo(() => createChatClient(), []);
  const sessionIdRef = useRef("pending");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hydratedRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(
    chatWelcome.suggestions,
  );
  const [messages, setMessages] = useState<ChatMessage[]>(createWelcomeMessages);
  const [, startTransition] = useTransition();
  const undoSnapshotRef = useRef<{
    messages: ChatMessage[];
    suggestions: string[];
  } | null>(null);

  const chatHasHistory = hasUserHistory(messages);

  useEffect(() => {
    const stored = readStoredChat();
    sessionIdRef.current = createSessionId();
    if (stored && hasUserHistory(stored.messages)) {
      setMessages(stored.messages);
      setSuggestions(stored.suggestions);
      setShowResumeBanner(true);
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current || typeof window === "undefined") return;
    if (!chatHasHistory) {
      window.localStorage.removeItem(HISTORY_KEY);
      return;
    }
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify({
        messages,
        suggestions,
        savedAt: Date.now(),
      } satisfies StoredChat),
    );
  }, [messages, suggestions, chatHasHistory]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!open) {
      setConfirmReset(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(timer);
  }, [open]);

  const applyFreshChat = () => {
    setMessages(createWelcomeMessages());
    setSuggestions(chatWelcome.suggestions);
    setInput("");
    setTyping(false);
    setConfirmReset(false);
    setShowResumeBanner(false);
    sessionIdRef.current = createSessionId(true);
    window.localStorage.removeItem(HISTORY_KEY);
  };

  const requestReset = () => {
    if (!chatHasHistory) return;
    setConfirmReset(true);
  };

  const confirmResetChat = () => {
    undoSnapshotRef.current = { messages, suggestions };
    applyFreshChat();
    setToast("Chat cleared");
  };

  const undoReset = () => {
    const snapshot = undoSnapshotRef.current;
    if (!snapshot) return;
    setMessages(snapshot.messages);
    setSuggestions(snapshot.suggestions);
    setShowResumeBanner(false);
    setToast(null);
    undoSnapshotRef.current = null;
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    startTransition(() => {
      setMessages((current) => [...current, userMessage]);
      setInput("");
      setSuggestions([]);
      setTyping(true);
    });

    try {
      const history = [...messages, userMessage].filter(
        (item) => item.role !== "system",
      );
      const result = await client.sendMessage({
        message: text,
        history,
        sessionId: sessionIdRef.current,
      });

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: result.reply,
        createdAt: Date.now(),
      };

      setMessages((current) => [...current, assistantMessage]);
      setSuggestions(result.suggestions ?? []);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            "I’m having a brief connection hiccup on my side. You can retry in a moment, or reach the Cooling Desk from Visit Us / Call options on the site.",
          createdAt: Date.now(),
        },
      ]);
      setSuggestions([
        "Showroom timings",
        "Book a site visit",
        "Call the Cooling Desk",
      ]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(input);
  };

  return (
    <div className={open ? "chat-widget chat-widget--open" : "chat-widget"}>
      {open ? (
        <section
          className="chat-widget__panel"
          aria-label="V R Cooling Desk chat"
        >
          <header className="chat-widget__header">
            <div className="chat-widget__identity">
              <span className="chat-widget__avatar" aria-hidden="true">
                <RobotIcon className="chat-widget__avatar-robot" />
              </span>
              <div>
                <p className="chat-widget__title">{chatWelcome.title}</p>
                <p className="chat-widget__status">
                  <span className="chat-widget__status-dot" aria-hidden="true" />
                  {chatWelcome.subtitle}
                </p>
              </div>
            </div>

            <div className="chat-widget__header-actions">
              {chatHasHistory ? (
                <button
                  type="button"
                  className="chat-widget__new-chat"
                  onClick={requestReset}
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  New chat
                </button>
              ) : null}

              <button
                type="button"
                className="chat-widget__close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path
                    d="M5 5l10 10M15 5 5 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </header>

          {showResumeBanner && chatHasHistory ? (
            <div className="chat-widget__banner" role="status">
              <p>Continuing your previous chat</p>
              <div className="chat-widget__banner-actions">
                <button
                  type="button"
                  className="chat-widget__banner-btn"
                  onClick={() => setShowResumeBanner(false)}
                >
                  Continue
                </button>
                <button
                  type="button"
                  className="chat-widget__banner-btn chat-widget__banner-btn--ghost"
                  onClick={requestReset}
                >
                  Start fresh
                </button>
              </div>
            </div>
          ) : null}

          {confirmReset ? (
            <div className="chat-widget__confirm" role="dialog" aria-label="Clear chat">
              <p>Clear this conversation and start fresh with Aria?</p>
              <div className="chat-widget__confirm-actions">
                <button
                  type="button"
                  className="chat-widget__confirm-btn chat-widget__confirm-btn--ghost"
                  onClick={() => setConfirmReset(false)}
                >
                  Keep chat
                </button>
                <button
                  type="button"
                  className="chat-widget__confirm-btn"
                  onClick={confirmResetChat}
                >
                  Clear chat
                </button>
              </div>
            </div>
          ) : null}

          {toast ? (
            <div className="chat-widget__toast" role="status">
              <span>{toast}</span>
              {undoSnapshotRef.current ? (
                <button
                  type="button"
                  className="chat-widget__toast-undo"
                  onClick={undoReset}
                >
                  Undo
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="chat-widget__body" ref={listRef}>
            <div className="chat-widget__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "chat-widget__bubble chat-widget__bubble--user"
                      : "chat-widget__bubble chat-widget__bubble--assistant"
                  }
                >
                  {message.role === "assistant" ? (
                    <span className="chat-widget__bubble-label">Aria</span>
                  ) : null}
                  <MessageText content={message.content} />
                </div>
              ))}

              {typing ? (
                <div className="chat-widget__bubble chat-widget__bubble--assistant chat-widget__bubble--typing">
                  <span className="chat-widget__bubble-label">Aria</span>
                  <span className="chat-widget__typing" aria-label="Aria is typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              ) : null}
            </div>

            {suggestions.length > 0 && !typing ? (
              <div className="chat-widget__suggestions" aria-label="Suggestions">
                {suggestions.map((item) => {
                  const isWhatsApp = /whats\s*app/i.test(item);

                  if (isWhatsApp) {
                    return (
                      <a
                        key={item}
                        className="chat-widget__chip chat-widget__chip--whatsapp"
                        href={contactVisitData.whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          void send(item);
                        }}
                      >
                        {item}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item}
                      type="button"
                      className="chat-widget__chip"
                      onClick={() => void send(item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <form className="chat-widget__composer" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className="chat-widget__input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about AC sizing, visits, care…"
              autoComplete="off"
              maxLength={500}
              disabled={typing}
            />
            <button
              type="submit"
              className="chat-widget__send"
              disabled={typing || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path
                  d="M3.2 10.2 16.5 3.8l-3.4 12.5-3.2-4.8-6.7-.3Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="chat-widget__launcher"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open Cooling Desk chat"}
        aria-expanded={open}
      >
        <span className="chat-widget__launcher-glow" aria-hidden="true" />
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M6 6l12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <RobotIcon className="chat-widget__launcher-robot" />
        )}
        {!open ? <span className="chat-widget__pulse" aria-hidden="true" /> : null}
      </button>
    </div>
  );
};

export default ChatWidget;
