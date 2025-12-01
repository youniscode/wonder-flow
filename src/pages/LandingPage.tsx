// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { useTheme } from "../theme";

export default function LandingPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
        <div className="absolute -top-40 left-[-4rem] h-96 w-96 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-400/25" />
        <div className="absolute top-40 right-[-6rem] h-80 w-80 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-200/20" />
        <div className="absolute bottom-[-6rem] left-1/2 h-96 w-[28rem] -translate-x-1/2 rounded-full bg-slate-100/80 blur-3xl dark:bg-slate-900/80" />
      </div>

      {/* HEADER START */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Brand (logo + text) */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-semibold text-slate-900 shadow-sm">
              W
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                WanderFlow
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Trips, stays, food and experiences · in one flow
              </p>
            </div>
          </div>

          {/* Desktop nav + theme toggle */}
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
              <button className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
                How it works
              </button>
              <Link
                to="/search"
                className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/admin"
                className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              >
                For hosts
              </Link>
              <Link
                to="/profile"
                className="rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-900 hover:border-sky-400 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-100 transition-colors"
              >
                Sign in
              </Link>
            </nav>

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
            className="flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-900 hover:border-sky-400 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-100 transition-colors md:hidden"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </header>
      {/* HEADER END */}

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          {/* Left: copy */}
          <section>
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] text-slate-200 border border-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI concierge for weekends, trips, and nights out.
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-slate-900 dark:text-slate-50">
                Plan less.
              </span>
              <span className="block text-sky-500 dark:text-sky-300">
                Enjoy the city more.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-600 sm:text-base dark:text-slate-300">
              WonderFlow is your quiet travel concierge. Tell it who you’re
              with, how you feel and what you’re up for it finds the area,
              suggests stays, picks restaurants and lines up a few things to do.
              One place, one flow, no tab overload.
            </p>

            {/* Value props row */}
            <div className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-3 text-[13px] shadow-[0_18px_40px_rgba(15,23,42,0.8)]">
                <p className="font-semibold text-slate-50">What it does</p>
                <p className="mt-1 text-slate-300">
                  One place to choose a city, share your mood, and get a
                  ready-to-use plan.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-3 text-[13px] shadow-[0_18px_40px_rgba(15,23,42,0.8)]">
                <p className="font-semibold text-slate-50">
                  Why it’s different
                </p>
                <p className="mt-1 text-slate-300">
                  Feels like a hotel concierge: concrete places, realistic
                  timings, no fluff.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-3 text-[13px] shadow-[0_18px_40px_rgba(15,23,42,0.8)]">
                <p className="font-semibold text-slate-50">Why it’s fast</p>
                <p className="mt-1 text-slate-300">
                  Share one message, get a full itinerary in seconds, ready to
                  tweak or share.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-full bg-amber-100 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(250,250,250,0.28)] hover:bg-amber-50 transition-colors"
              >
                Start planning with AI
              </Link>

              <button className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-100 transition-colors">
                Watch the flow · 2 min
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live beta · Limited early access
              </span>
              <span>Built for spontaneous weekends and slow travel.</span>
            </div>
          </section>

          {/* Right: category cards + how it works */}
          <section className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {/* Destinations */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 md:h-40 overflow-hidden">
                  <img
                    src="/trips/destinations.png"
                    alt="Coastal destination view"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent px-3 pb-3 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-300">
                    Destinations
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    Find the right city for your mood.
                  </p>
                </div>
              </div>

              {/* Hotels */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 md:h-40 overflow-hidden">
                  <img
                    src="/trips/hotel.png"
                    alt="Warm hotel room interior"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent px-3 pb-3 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-300">
                    Stays
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    Calm boutique hotels and cozy apartments.
                  </p>
                </div>
              </div>

              {/* Experiences */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 md:h-40 overflow-hidden">
                  <img
                    src="/trips/experiences.png"
                    alt="Travel experiences at sunset"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent px-3 pb-3 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-300">
                    Experiences
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    Food, rooftops, walks, and hidden corners.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works — clean steps */}
            <div className="mt-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                How it works
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 text-xs font-semibold">
                    1
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-slate-50">
                      Tell WanderFlow how you feel.
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                      Share mood, budget, and who you&apos;re traveling with
                      just like chatting with a concierge.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                    2
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-slate-50">
                      Get a curated itinerary in seconds.
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                      Stays, neighborhoods, food, and experiences matched to
                      your vibe not generic lists.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-xs font-semibold">
                    3
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-slate-50">
                      Book or tweak everything in one flow.
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                      Swap options, adjust the vibe and confirm plans without
                      juggling six different apps or tabs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer mini */}
        <footer className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 text-[11px] text-slate-500 dark:border-slate-900 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WanderFlow. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Designed & built by JonasCode.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
