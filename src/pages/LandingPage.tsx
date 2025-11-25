// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";

import React from "react";

const categories = [
  { label: "Travel", desc: "Trains, flights, getaways.", pill: "Move" },
  { label: "Stays", desc: "Hotels, boutiques, hideaways.", pill: "Stay" },
  {
    label: "Food & Drink",
    desc: "Restaurants, cafés, rooftops.",
    pill: "Taste",
  },
  { label: "Experiences", desc: "Tours, activities, nightlife.", pill: "Live" },
];

const steps = [
  {
    title: "Tell WanderFlow how you feel",
    desc: "Share your mood, budget, and who you’re traveling with. No forms. Just a simple conversation.",
    tag: "Step 1",
  },
  {
    title: "Get a curated itinerary in seconds",
    desc: "Your AI concierge suggests stays, dining, and experiences that actually fit your trip.",
    tag: "Step 2",
  },
  {
    title: "Book everything in one place",
    desc: "Confirm, adjust, swap options — without jumping between 6 different apps and tabs.",
    tag: "Step 3",
  },
];

const highlights = [
  {
    title: "One assistant for your whole trip",
    desc: "Stop stitching together flights, hotels, and restaurants from different apps. WanderFlow brings it all into one flow.",
  },
  {
    title: "AI-powered, human-feeling guidance",
    desc: "Your concierge remembers context, refines suggestions, and adapts as you change your mind.",
  },
  {
    title: "Design that calms, not overwhelms",
    desc: "Minimalist, cinematic UI built for evenings on the sofa and last-minute train rides.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Top navigation */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-[0_0_24px_rgba(56,189,248,0.65)]">
            <span className="text-sm font-semibold text-slate-950">W</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight">WanderFlow</p>
            <p className="text-[11px] text-slate-400">
              AI-powered trip concierge
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <button className="hover:text-slate-50 transition-colors">
            How it works
          </button>

          <Link to="/search" className="hover:text-slate-50 transition-colors">
            Categories
          </Link>

          <Link to="/admin" className="hover:text-slate-50 transition-colors">
            For hosts
          </Link>

          <Link
            to="/profile"
            className="rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/20 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-12">
          {/* Hero text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-300">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] text-cyan-300">
                ✨
              </span>
              AI concierge for trips, weekends, and nights out.
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Plan less,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                live more.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
              WanderFlow is your all-in-one smart concierge. Tell it how you
              feel and what you’re up for — it designs the trip, suggests stays,
              finds dinner, and books activities. One assistant. One flow. No
              tab chaos.
            </p>

            {/* Hero CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.45)] hover:bg-cyan-300 transition-colors"
              >
                Start planning with AI
                <span className="text-xs">→</span>
              </Link>

              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-400/60 hover:text-cyan-100 hover:bg-slate-900 transition-colors">
                Watch the flow
                <span className="text-[10px] text-slate-400">2 min</span>
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live beta · Limited early access
              </div>
              <span>
                Built for spontaneous weekends, slow travel, and city breaks.
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-slate-900 to-indigo-500/25 blur-2xl" />

            <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-[0_28px_80px_rgba(15,23,42,0.9)]">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-xs font-semibold text-slate-950">
                    W
                  </div>
                  <div>
                    <p className="text-xs font-semibold">
                      WanderFlow Concierge
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Trip to Lisbon · May 24–27
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </div>

              {/* Chat + mini cards */}
              <div className="grid gap-0 border-b border-slate-800/60 bg-slate-950/90 sm:grid-cols-[1.3fr_minmax(0,1fr)]">
                {/* Chat */}
                <div className="space-y-3 px-4 py-4">
                  <div className="space-y-1">
                    <p className="text-[11px] text-slate-400">Concierge · AI</p>
                    <div className="inline-flex max-w-full rounded-2xl bg-slate-800/60 px-3 py-2 text-[12px] text-slate-100">
                      I’ve planned a long-weekend in Lisbon based on your
                      budget, love of walking, and late-night food. Want to
                      review stays, food, or experiences first?
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="inline-flex max-w-[85%] rounded-2xl bg-cyan-500 px-3 py-2 text-[12px] text-slate-950">
                      Show me a calm stay near the old town and a first-night
                      dinner.
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] text-slate-400">Concierge</p>
                    <div className="inline-flex max-w-full rounded-2xl bg-slate-800/60 px-3 py-2 text-[12px] text-slate-100">
                      Perfect. I’ve found a boutique hotel in Alfama and two
                      restaurant options for tonight. You can book both in one
                      tap below.
                    </div>
                  </div>
                </div>

                {/* Mini cards */}
                <div className="border-t border-slate-800/60 bg-slate-950/80 sm:border-l sm:border-t-0">
                  <div className="px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      Tonight’s picks
                    </p>

                    <div className="mt-2 space-y-2.5">
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                        <p className="text-xs font-semibold text-slate-100">
                          Casa do Miradouro
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Boutique stay · Alfama · Quiet, city views.
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                          <span>€140 · 3 nights</span>
                          <button className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/40">
                            Select stay
                          </button>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                        <p className="text-xs font-semibold text-slate-100">
                          Bairro Alto · Tapas Route
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Easy walk · 3 stops · Late-night friendly.
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                          <span>Starts 20:30</span>
                          <button className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-500/40">
                            Add to plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center gap-2 border-t border-slate-800/70 bg-slate-900/80 px-4 py-2.5">
                <div className="flex-1 rounded-full border border-slate-700/80 bg-slate-950/90 px-3 py-1.5 text-[11px] text-slate-400">
                  “Long weekend in Lisbon, 2 friends, walkable, good food…”
                </div>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition-colors">
                  ↩
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">
                Built for every part of your trip
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-md">
                WanderFlow connects the dots between where you go, where you
                stay, what you eat, and how you spend your time — all guided by
                one AI concierge.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Start with a weekend. Scale to a full journey.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-cyan-400/60 hover:bg-slate-900/90 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{cat.label}</h3>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-200 transition-colors">
                    {cat.pill}
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-slate-400">{cat.desc}</p>
                <p className="mt-3 text-[11px] text-slate-500">
                  Ask the concierge: “Find me {cat.label.toLowerCase()} that
                  match my mood and budget.”
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16 border-t border-slate-800 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">
                How WanderFlow feels to use
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-md">
                No more juggling dates, screenshots, and separate tabs.
                WanderFlow behaves like a calm, capable friend who happens to
                know every city you visit.
              </p>
            </div>
            <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] text-slate-400 border border-slate-700/60">
              From idea → itinerary → booked in minutes
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  {step.tag}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-16 mb-10 border-t border-slate-800 pt-10">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">
                What makes WanderFlow different
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-md">
                It’s not another booking website. It’s an AI-first flow that’s
                designed around how you actually plan your days — messy ideas,
                changing minds, and last-minute decisions included.
              </p>

              <div className="mt-5 space-y-4">
                {highlights.map((h) => (
                  <div
                    key={h.title}
                    className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <h3 className="text-sm font-semibold text-slate-50">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-400">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/15 via-slate-950 to-indigo-500/15 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/80">
                Early access
              </p>
              <h3 className="mt-2 text-sm font-semibold">
                Try WanderFlow on your next weekend trip.
              </h3>
              <p className="mt-2 text-[13px] text-slate-100/80">
                We’re opening limited beta access for travelers and creators who
                want to plan smarter, not harder. Share your next destination
                and we’ll send you a private invite.
              </p>

              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  // hook to backend later
                }}
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="flex-1 rounded-full border border-cyan-500/50 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400/60"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-300 transition-colors"
                  >
                    Request invite
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  No spam. Just a link when WanderFlow is ready in your city.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} WanderFlow. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="hover:text-slate-300 transition-colors">
              Privacy
            </button>
            <button className="hover:text-slate-300 transition-colors">
              Terms
            </button>
            <span className="text-slate-600">
              Designed & built by JonasCode.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
