// src/pages/ChatPage.tsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTheme } from "../theme";

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
      "Hi, I’m your WonderFlow concierge. Tell me where you’re going, who you’re with, and what kind of vibe you want.",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "For example: “3 days in Lisbon, calm vibe, good food, mid-range budget, 2 people.”",
  },
];

const KNOWN_TITLES = ["Intro", "Stay", "Food", "Activities", "Tips"];

type TravelSection = {
  title: string;
  lines: string[];
};

function parseTravelSections(text: string): TravelSection[] | null {
  const rawLines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (rawLines.length === 0) return null;

  const sections: TravelSection[] = [];
  let current: TravelSection | null = null;

  for (const line of rawLines) {
    const m = line.match(/^(Intro|Stay|Food|Activities|Tips):\s*$/i);
    if (m) {
      if (current) sections.push(current);
      current = { title: m[1], lines: [] };
    } else if (current) {
      // strip leading "- " if present
      current.lines.push(line.replace(/^-+\s*/, ""));
    } else {
      // text before the first heading → treat as Intro
      current = { title: "Intro", lines: [line] };
    }
  }

  if (current) sections.push(current);

  const hasKnown = sections.some((s) => KNOWN_TITLES.includes(s.title));
  return hasKnown ? sections : null;
}

function AssistantBubble({ text }: { text: string }) {
  const sections = parseTravelSections(text);

  // Fallback: no structure detected → simple bubble
  if (!sections) {
    return (
      <div className="max-w-[80%] rounded-2xl bg-slate-100 px-3.5 py-2.5 text-[13px] text-slate-900 leading-relaxed border border-slate-200 shadow-sm dark:bg-[#060B17]/95 dark:text-slate-100 dark:border-slate-800/90">
        {text}
      </div>
    );
  }

  return (
    <div className="max-w-[80%] rounded-2xl bg-slate-100 px-3.5 py-2.5 text-[13px] text-slate-900 leading-relaxed border border-slate-200 shadow-sm space-y-3 dark:bg-[#060B17]/95 dark:text-slate-100 dark:border-slate-800/90">
      {sections.map((section) => (
        <div key={section.title} className="space-y-1">
          {section.title !== "Intro" && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {section.title}
            </p>
          )}

          {section.title === "Intro" ? (
            <p>{section.lines.join(" ")}</p>
          ) : (
            <ul className="list-disc list-inside space-y-0.5">
              {section.lines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const { theme, toggle } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

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
          "I ran into an issue shaping the plan. Please try sending your message again shortly.",
      };

      setMessages((prev) => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const hasUserMessage = messages.some((m) => m.role === "user");
  const lastUserTrip =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#020618]" />
        <div className="absolute -top-40 left-[-4rem] h-80 w-80 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-400/20" />
        <div className="absolute bottom-[-4rem] right-[-3rem] h-96 w-72 rounded-full bg-amber-200/24 blur-3xl dark:bg-amber-200/18" />
      </div>

      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand + back button */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 hover:text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
              ←
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-semibold text-slate-900">
                W
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  WonderFlow Concierge
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  City, stays, food and plans · Beta
                </p>
              </div>
            </div>
          </div>

          {/* Desktop status + theme toggle */}
          <div className="hidden items-center gap-4 sm:flex">
            <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 border border-slate-300 dark:bg-slate-900 dark:border-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
              <span>Plan a weekend, city break, or full trip.</span>
            </div>

            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-900 hover:border-sky-400 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-100 transition-colors"
            >
              <span>{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {/* Mobile theme toggle */}
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-900 hover:border-sky-400 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-100 transition-colors sm:hidden"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 lg:flex-row">
        {/* Concierge card (chat) */}
        <section className="flex-1 rounded-3xl border border-slate-200 bg-white/95 shadow-[0_20px_55px_rgba(15,23,42,0.16)] flex flex-col dark:border-slate-800/80 dark:bg-[#050815]/95 dark:shadow-[0_26px_80px_rgba(15,23,42,0.9)]">
          {/* Card header */}
          <div className="border-b border-slate-200 px-4 py-3 sm:px-5 dark:border-slate-800/80">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Trip concierge
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Tell me how you like to travel, I’ll handle the plan.
                </p>
                <p className="mt-1 text-[12px] text-slate-600 leading-relaxed dark:text-slate-400">
                  Share city, dates, who you’re with, your budget and mood. I’ll
                  respond with a tailored itinerary you can tweak.
                </p>
              </div>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 border border-slate-300 sm:inline-flex whitespace-nowrap dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700/70">
                One assistant for your whole trip
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                {m.role === "user" ? (
                  <div className="max-w-[80%] rounded-2xl bg-[#F5EDE0] px-3.5 py-2.5 text-[13px] text-slate-900 leading-relaxed shadow-[0_16px_40px_rgba(250,235,215,0.35)] border border-[#E4D6C1] dark:bg-[#F5EDE0] dark:text-slate-900">
                    {m.content}
                  </div>
                ) : (
                  <AssistantBubble text={m.content} />
                )}
              </div>
            ))}

            {/* Status line */}
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:border-slate-700/80">
                …
              </span>
              <span className="leading-relaxed">
                {isLoading
                  ? "Concierge is crafting your plan…"
                  : hasUserMessage
                  ? "Ask to adjust neighborhoods, budget, or vibe and I’ll reshape the itinerary."
                  : "Start with where, when, who you’re traveling with, and the kind of trip you’re in the mood for."}
              </span>
            </div>

            {errorText && (
              <p className="text-[11px] text-red-400">{errorText}</p>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white/95 px-3 py-3 sm:px-5 dark:border-slate-800/80 dark:bg-[#050815]/95"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-[#020617]/90">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={2}
                  placeholder="Example: “3 days in Lisbon, relaxed, 2 people, love walking, mid-range budget.”"
                  className="w-full resize-none bg-transparent text-[13px] text-slate-900 leading-relaxed outline-none placeholder:text-slate-500 dark:text-slate-100"
                />
              </div>
              <button
                type="submit"
                aria-label="Send message"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EDE0] text-slate-900 text-sm font-semibold shadow-[0_12px_32px_rgba(250,235,215,0.5)] hover:bg-[#F1E4D4] transition-colors disabled:opacity-60 disabled:shadow-none"
                disabled={!input.trim() || isLoading}
              >
                ↗
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
              Start simple. You can always say things like “make it calmer”,
              “add a nicer dinner”, or “keep it cheaper”.
            </p>
          </form>
        </section>

        {/* Right column: trip context + quick prompts */}
        <aside className="lg:w-72 flex-shrink-0 space-y-4">
          {/* Trip context card */}
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800/80 dark:bg-[#050815]/95 dark:shadow-none">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Trip context
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              {hasUserMessage ? "Current trip" : "No trip set yet"}
            </p>

            {/* Current trip summary chip */}
            {hasUserMessage && lastUserTrip && (
              <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.15)] dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 dark:shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                  📍
                </span>
                <span className="truncate">
                  {lastUserTrip.length > 110
                    ? lastUserTrip.slice(0, 107) + "…"
                    : lastUserTrip}
                </span>
              </div>
            )}

            <p className="mt-3 text-[13px] text-slate-600 leading-relaxed dark:text-slate-400">
              {hasUserMessage
                ? "You can now ask to make it calmer, fancier, cheaper, or swap neighborhoods and I’ll reshape it."
                : "Start with a simple description: city, dates, who you’re with and the kind of weekend you’re hoping for."}
            </p>

            <ul className="mt-3 space-y-1.5 text-[12px] text-slate-700 leading-relaxed dark:text-slate-300">
              <li>• City or area</li>
              <li>• Dates or rough timing</li>
              <li>• Who you’re with (solo, couple, friends, family)</li>
              <li>• Budget & mood: calm, foodie, nightlife, outdoors…</li>
            </ul>
          </div>

          {/* Quick prompts */}
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800/80 dark:bg-[#050815]/95 dark:shadow-none">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Try asking
            </p>
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Weekend in Barcelona, 2 people, good food, some nightlife, mid-range budget."
                  )
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[13px] text-slate-800 leading-relaxed hover:border-sky-400/70 hover:text-sky-900 hover:bg-white transition-colors dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-sky-400/70 dark:hover:text-sky-100 dark:hover:bg-slate-900"
              >
                “Weekend in Barcelona, 2 people, good food and some nightlife.”
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Family trip to Lisbon, 3 days, kids 7 and 10, calm but fun, want walks and easy food."
                  )
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[13px] text-slate-800 leading-relaxed hover:border-sky-400/70 hover:text-sky-900 hover:bg-white transition-colors dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-sky-400/70 dark:hover:text-sky-100 dark:hover:bg-slate-900"
              >
                “Family trip to Lisbon, 3 days, kids 7 and 10, calm but fun.”
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Solo weekend in Paris, low budget, walkable, cafés and a couple of museums."
                  )
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[13px] text-slate-800 leading-relaxed hover:border-sky-400/70 hover:text-sky-900 hover:bg-white transition-colors dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-sky-400/70 dark:hover:text-sky-100 dark:hover:bg-slate-900"
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
