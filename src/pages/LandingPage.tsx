// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute -top-40 left-[-4rem] h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute top-40 right-[-6rem] h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-96 w-[28rem] -translate-x-1/2 rounded-full bg-slate-900/80 blur-3xl" />
      </div>

      {/* Top nav */}
      <header className="border-b border-slate-800/80 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-semibold text-slate-900">
              W
            </div>
            <div>
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
            <Link
              to="/search"
              className="hover:text-slate-50 transition-colors"
            >
              Categories
            </Link>
            <Link to="/admin" className="hover:text-slate-50 transition-colors">
              For hosts
            </Link>
            <Link
              to="/profile"
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-100 transition-colors"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          {/* Left: copy */}
          <section>
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300 border border-slate-700/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI concierge for weekends, trips, and nights out.
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-slate-50">Plan less,</span>
              <span className="block text-sky-300">travel more.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              WanderFlow is your AI-first trip concierge. Tell it how you feel
              and what you’re up for — it designs the trip, suggests stays,
              finds dinner, and books activities. One flow. One assistant. No
              tab chaos.
            </p>

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

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live beta · Limited early access
              </span>
              <span>Built for spontaneous weekends and slow travel.</span>
            </div>
          </section>

          {/* Right: category cards */}
          <section className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {/* Destinations */}
              <div className="group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 bg-gradient-to-tr from-sky-500 via-sky-300 to-amber-200" />
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
              <div className="group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 bg-gradient-to-tr from-amber-300 via-amber-200 to-rose-200" />
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
              <div className="group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
                <div className="h-32 bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-300" />
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

            {/* “How it feels to use” teaser */}
            <div className="grid gap-3 sm:grid-cols-3 text-[12px] text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Step 1
                </p>
                <p className="mt-1 font-medium text-slate-50">
                  Tell WanderFlow how you feel.
                </p>
                <p className="mt-1 text-[12px]">
                  Share mood, budget, and who you’re traveling with. No forms,
                  just a simple conversation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Step 2
                </p>
                <p className="mt-1 font-medium text-slate-50">
                  Get a curated itinerary in seconds.
                </p>
                <p className="mt-1 text-[12px]">
                  Your concierge suggests stays, dining, and experiences that
                  actually fit your trip.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Step 3
                </p>
                <p className="mt-1 font-medium text-slate-50">
                  Book everything in one place.
                </p>
                <p className="mt-1 text-[12px]">
                  Adjust, swap options, and confirm — without juggling six
                  different apps and tabs.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer mini */}
        <footer className="mt-10 flex flex-col gap-3 border-t border-slate-900 pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
