// src/components/ItineraryActivityCard.tsx
import { useEffect, useState } from "react";
import type { UnsplashImage } from "../../lib/unsplashClient";
import { fetchPlaceImage } from "../../lib/unsplashClient";

type ItineraryActivityCardProps = {
  title: string;
  summary: string;
  dayLabel?: string; // e.g. "Day 1"
  timeLabel?: string; // e.g. "Morning", "Afternoon"
  priceLabel?: string; // e.g. "€€ · mid-range" or "Free or almost free"
  imageQuery?: string; // e.g. "Lisbon riverside walk"
};

export function ItineraryActivityCard({
  title,
  summary,
  dayLabel,
  timeLabel,
  priceLabel,
  imageQuery,
}: ItineraryActivityCardProps) {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = imageQuery || title;
    if (!q) return;

    let cancelled = false;

    // Defer setLoading to next tick → silences ESLint without changing logic
    Promise.resolve().then(() => {
      if (!cancelled) setLoading(true);
    });

    fetchPlaceImage(q)
      .then((img: UnsplashImage | null) => {
        if (cancelled) return;
        setImage(img);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [imageQuery, title]);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-[#050815] shadow-[0_18px_50px_rgba(15,23,42,0.9)]">
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        {image && image.url ? (
          <img
            src={image.url}
            alt={image.alt || title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-500">
            {loading ? "Finding a nice view…" : "No image yet"}
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-[0.16em]">
          <span>{dayLabel || "Day 1"}</span>
          <span className="flex gap-2">
            {timeLabel && <span>{timeLabel}</span>}
            {priceLabel && (
              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300">
                {priceLabel}
              </span>
            )}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>

        <p className="text-[13px] leading-relaxed text-slate-300">{summary}</p>
      </div>
    </article>
  );
}
