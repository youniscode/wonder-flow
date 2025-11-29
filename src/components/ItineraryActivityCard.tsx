// src/components/ItineraryActivityCard.tsx
// Nice: use the Unsplash proxy to decorate activities with real photos.

import { useEffect, useState } from "react";
import type { UnsplashImage } from "../lib/unsplashClient";
import { fetchPlaceImage } from "../lib/unsplashClient";

type ItineraryActivityCardProps = {
  title: string;
  summary: string;
  dayLabel?: string; // e.g. "Day 1"
  timeLabel?: string; // e.g. "Morning", "Afternoon"
  priceLabel?: string; // e.g. "€€, mid-range" or "Free or almost free"
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

  useEffect(() => {
    const q = imageQuery || title;
    if (!q) return;

    let cancelled = false;

    fetchPlaceImage(q)
      .then((img) => {
        if (cancelled) return;
        if (img) setImage(img);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Unsplash image fetch error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [imageQuery, title]);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-800/80 bg-slate-900/70 shadow-[0_18px_40px_rgba(15,23,42,0.8)] overflow-hidden">
      {/* IMAGE */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-800">
        {image ? (
          <img
            src={image.url}
            alt={image.alt || title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
        )}

        {/* Day / time chips on top of the photo */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-[11px] font-medium">
          {dayLabel && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-slate-100 border border-slate-700/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {dayLabel}
            </span>
          )}
          {timeLabel && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-slate-200 border border-slate-700/70">
              {timeLabel}
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        <p className="text-[12px] leading-relaxed text-slate-300 line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-slate-400">
          {priceLabel && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5">
              {priceLabel}
            </span>
          )}

          {image?.photographerName && (
            <a
              href={
                image.photographerProfileUrl ||
                image.unsplashLink ||
                "https://unsplash.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-[10px] text-slate-500 hover:text-slate-300 hover:underline"
            >
              Photo: {image.photographerName} / Unsplash
            </a>
          )}

          {/* Attribution (only if provided) */}
          {image?.photographerName && (
            <a
              href={
                image.unsplashLink || image.photographerProfileUrl || undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-[10px] text-slate-500 hover:text-slate-300 underline underline-offset-2"
            >
              Photo by {image.photographerName} on Unsplash
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
