// api/unsplash-search.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Build several candidate search queries from a raw activity title.
// Example: "Barri Gòtic stroll" → [
//   "Barri Gòtic stroll",
//   "Barri Gòtic",
//   "Gòtic"
// ]
function buildImageQueries(original: string): string[] {
    const base = original.trim();
    if (!base) return [];

    // Remove weird quotes
    const cleaned = base.replace(/[“”"']/g, "").trim();
    const lower = cleaned.toLowerCase();

    const variants: string[] = [];

    // 1) Full cleaned title
    variants.push(cleaned);

    // 2) Remove generic activity words (walk, show, tour, etc.)
    const stopWords = [
        "walk",
        "stroll",
        "show",
        "tour",
        "nightlife",
        "crawl",
        "museum",
        "visit",
        "view",
        "views",
        "bar",
        "rooftop",
        "area",
        "district",
        "neighborhood",
        "quarter",
        "park",
        "square",
    ];

    const words = lower.split(/\s+/);
    const strippedWords = words.filter((w) => !stopWords.includes(w));
    const stripped = strippedWords.join(" ").trim();

    if (stripped && stripped !== lower) {
        variants.push(stripped);
    }

    // 3) Last two words (often the actual place name)
    const tailSource = strippedWords.length > 0 ? strippedWords : words;
    if (tailSource.length >= 2) {
        const lastTwo = tailSource.slice(-2).join(" ").trim();
        if (lastTwo && !variants.includes(lastTwo)) {
            variants.push(lastTwo);
        }
    }

    // Deduplicate and keep non-empty
    return Array.from(new Set(variants)).filter(Boolean);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!ACCESS_KEY) {
        return res
            .status(500)
            .json({ error: "Unsplash access key is not configured on the server." });
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const query = (req.query.q as string | undefined)?.trim();
    if (!query) {
        return res.status(400).json({ error: "Missing 'q' query parameter." });
    }

    try {
        const candidates = buildImageQueries(query);
        if (candidates.length === 0) {
            return res.status(400).json({ error: "Query was empty after cleaning." });
        }

        // Try each candidate in order until one returns a usable photo
        for (const candidate of candidates) {
            const apiUrl = new URL("https://api.unsplash.com/search/photos");
            apiUrl.searchParams.set("query", candidate);
            apiUrl.searchParams.set("orientation", "landscape");
            apiUrl.searchParams.set("content_filter", "high");
            apiUrl.searchParams.set("per_page", "1");

            const unsplashRes = await fetch(apiUrl.toString(), {
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                },
            });


            if (!unsplashRes.ok) {
                const text = await unsplashRes.text();
                console.error("Unsplash error:", unsplashRes.status, text);
                // If Unsplash itself errors (rate limit, etc.), surface that and stop.
                return res
                    .status(unsplashRes.status)
                    .json({ error: "Unsplash API error" });
            }

            const data = (await unsplashRes.json()) as {
                results?: Array<{
                    urls?: { small?: string; regular?: string };
                    alt_description?: string | null;
                }>;
            };



            const first = data.results?.[0];
            if (first && first.urls?.regular) {
                // Success on this candidate → return immediately
                return res.status(200).json({
                    url: first.urls.regular,
                    thumbUrl: first.urls.small,
                    alt: first.alt_description || `Photo of ${candidate}`,
                });
            }
            // else: no usable image for this candidate → try the next one
        }

        // None of the candidates returned a usable image
        console.warn("Unsplash: no image found for any candidate", {
            original: query,
            candidates,
        });
        return res
            .status(404)
            .json({ error: "No image found for this query." });
    } catch (err) {
        console.error("Unsplash proxy error:", err);
        return res
            .status(500)
            .json({ error: "Unexpected error talking to Unsplash." });
    }
}
