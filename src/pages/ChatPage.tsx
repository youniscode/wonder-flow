// src/pages/ChatPage.tsx
import { Link } from "react-router-dom";
import React, { useState } from "react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi, I’m your WanderFlow concierge. Tell me about your next trip or weekend and I’ll help you design it.",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "You can share things like: “3 days in Lisbon, calm vibe, good food, budget mid-range, 2 people.”",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Create a user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    // Optimistically show the user message
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setErrorText("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach concierge API.");
      }

      const data = await response.json();
      const replyText: string =
        (data.reply && typeof data.reply === "string" && data.reply.trim()) ||
        "I’m here, but I couldn’t generate a proper reply. Please try again.";

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setErrorText("Something went wrong. Please try again in a moment.");

      const assistantErrorMessage: ChatMessage = {
        id: Date.now() + 2,
        role: "assistant",
        content:
          "I ran into an issue talking to my planning engine. Please try sending your message again in a moment.",
      };

      setMessages((prev) => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const hasUserMessage = messages.some((m) => m.role === "user");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* BG */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute -top-40 left-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-300 text-sm hover:bg-slate-800 hover:text-slate-50 transition-colors"
            >
              ←
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-xs font-semibold text-slate-950">
                W
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  WanderFlow Concierge
                </p>
                <p className="text-[11px] text-slate-400">
                  AI trip assistant · Beta
                </p>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 text-[11px] text-slate-400 sm:flex">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 border border-slate-700/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
            <span>One assistant for your whole trip.</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:py-6">
        {/* Left: chat */}
        <section className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-[0_26px_70px_rgba(15,23,42,0.9)] flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Conversation</p>
              <p className="text-[11px] text-slate-400">
                Describe your trip, mood and budget. I’ll shape it into a plan.
              </p>
            </div>
            <span className="hidden rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">
              Tip: be honest about budget — it helps.
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl bg-cyan-400 px-3 py-2 text-[13px] text-slate-950"
                      : "max-w-[80%] rounded-2xl bg-slate-800/70 px-3 py-2 text-[13px] text-slate-100"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing / status bubble */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                …
              </span>
              <span>
                {isLoading
                  ? "Concierge is crafting your plan…"
                  : hasUserMessage
                  ? "Concierge uses what you’ve shared to refine the next suggestions."
                  : "Concierge is ready for your first message."}
              </span>
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 bg-slate-950/90 px-3 py-3 sm:px-4"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950/90 px-3 py-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={2}
                  placeholder="Example: “3 days in Lisbon, relaxed, 2 people, good food, not too expensive.”"
                  className="w-full resize-none bg-transparent text-[13px] text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300 transition-colors disabled:opacity-60"
                disabled={!input.trim() || isLoading}
              >
                ↩
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Your messages are used only to shape the itinerary in this demo.
            </p>
            {errorText && (
              <p className="mt-1 text-[10px] text-red-400">{errorText}</p>
            )}
          </form>
        </section>

        {/* Right: trip context / helper */}
        <aside className="lg:w-80 flex-shrink-0 space-y-4">
          {/* Trip context card (placeholder for now) */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Trip context
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-50">
              No trip set yet
            </p>
            <p className="mt-1 text-[13px] text-slate-400">
              Start by telling WanderFlow where you’re going, for how long, who
              you’re with, and what kind of vibe you want.
            </p>

            <ul className="mt-3 space-y-1.5 text-[12px] text-slate-300">
              <li>• City or region</li>
              <li>• Dates or rough timing</li>
              <li>• Group (solo, couple, friends, family)</li>
              <li>• Budget & vibe (calm, foodie, nightlife, outdoors…)</li>
            </ul>
          </div>

          {/* Quick prompts */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Try asking
            </p>
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Weekend in Barcelona, 2 people, good food and some nightlife."
                  )
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-left text-[13px] text-slate-200 hover:border-cyan-400/70 hover:text-cyan-100 hover:bg-slate-900 transition-colors"
              >
                “Weekend in Barcelona, 2 people, good food and some nightlife.”
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Family trip to Lisbon, 3 days, kids 7 and 10, calm but fun."
                  )
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-left text-[13px] text-slate-200 hover:border-cyan-400/70 hover:text-cyan-100 hover:bg-slate-900 transition-colors"
              >
                “Family trip to Lisbon, 3 days, kids 7 and 10, calm but fun.”
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Solo weekend in Paris, low budget, walkable, museums and cafés."
                  )
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-left text-[13px] text-slate-200 hover:border-cyan-400/70 hover:text-cyan-100 hover:bg-slate-900 transition-colors"
              >
                “Solo weekend in Paris, low budget, walkable, museums and
                cafés.”
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
