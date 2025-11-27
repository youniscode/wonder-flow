// api/unsplash-search.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Normalize the incoming query a bit
function cleanQuery(raw: string): string {
    return (raw || "")
        .replace(/["“”]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// Build several candidate search queries for Unsplash.
// We try them in order until one returns a good photo.
function buildImageQueries(raw: string): string[] {
    const q = cleanQuery(raw);
    const lower = q.toLowerCase();

    // Very small list of common city names for now
    const knownCities = [
        "barcelona",
        "lisbon",
        "porto",
        "paris",
        "london",
        "rome",
        "madrid",
        "berlin",
        "amsterdam",
        "athens",
    ];

    let city: string | null = null;
    for (const c of knownCities) {
        if (lower.includes(c)) {
            city = c;
            break;
        }
    }

    // Detect a loose "theme" for better images
    let theme = "";
    if (/\b(rooftop|terrace)\b/i.test(lower)) {
        theme = "rooftop bar view";
    } else if (/\b(nightlife|cocktail|bar|club)\b/i.test(lower)) {
        theme = "night street lights";
    } else if (/\b(museum|gallery)\b/i.test(lower)) {
        theme = "museum interior art";
    } else if (/\b(park|garden)\b/i.test(lower)) {
        theme = "green city park";
    } else if (/\b(beach|coast)\b/i.test(lower)) {
        theme = "beach and sea";
    } else if (/\b(viewpoint|miradouro|hill)\b/i.test(lower)) {
        theme = "city viewpoint";
    } else if (/\b(old town|historic|gothic|quarter|alley|lanes?)\b/i.test(lower)) {
        theme = "old town street";
    }

    const baseWithoutCity =
        city != null ? q.replace(new RegExp(city, "i"), "").trim() : q;

    const candidates: string[] = [];

    // 1) Full phrase as-is (best for very concrete things)
    candidates.push(q);

    // 2) Phrase + theme (e.g. "Barri Gòtic walk night street lights")
    if (theme) {
        candidates.push(`${baseWithoutCity} ${theme}`.trim());
    }

    // 3) City + theme (e.g. "Barcelona night street lights")
    if (city) {
        candidates.push(`${city} ${theme || "city view"}`.trim());
    }

    // 4) Generic travel fallback for the city
    if (city) {
        candidates.push(`${city} travel ${theme || "streets"}`.trim());
    } else {
        candidates.push(`${q} travel`.trim());
    }

    // De-dupe empty or repeated queries
    return [...new Set(candidates)].filter(Boolean);
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (!ACCESS_KEY) {
        return res
            .status(500)
            .json({ error: "Unsplash access key is not configured on the server." });
    }

    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const rawQ = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
    const query = cleanQuery(String(rawQ || ""));

    if (!query) {
        return res
            .status(400)
            .json({ error: "Missing or empty 'q' query parameter." });
    }

    const candidates = buildImageQueries(query);
    if (candidates.length === 0) {
        return res
            .status(400)
            .json({ error: "Query was empty after cleaning / parsing." });
    }

    // Try each candidate until we get a usable result
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

            // Hard errors (403/5xx) → bail out instead of looping
            if (unsplashRes.status === 403 || unsplashRes.status >= 500) {
                return res
                    .status(unsplashRes.status)
                    .json({ error: "Unsplash API error" });
            }

            // For 400/404 etc., just try the next candidate
            continue;
        }

        const data = (await unsplashRes.json()) as {
            results?: Array<{
                urls?: { regular?: string; small?: string };
                alt_description?: string | null;
            }>;
        };

        const first = data.results?.[0];
        if (first?.urls?.regular) {
            return res.status(200).json({
                url: first.urls.regular,
                thumbUrl: first.urls.small ?? first.urls.regular,
                alt: first.alt_description || `${query} travel photo`,
            });
        }
    }

    // Nothing worked
    return res
        .status(404)
        .json({ error: "No suitable image found for this query." });
}
