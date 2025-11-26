// api/unsplash-search.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Minimal shape of the fetch response so TypeScript knows about ok/status/json/text
interface SimpleResponse {
    ok: boolean;
    status: number;
    text(): Promise<string>;
    json(): Promise<unknown>;
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
        return res.status(405).json({ error: "Method not allowed" });
    }

    const query = (req.query.q as string | undefined)?.trim();
    if (!query) {
        return res.status(400).json({ error: "Missing 'q' query parameter." });
    }

    try {
        const apiUrl = new URL("https://api.unsplash.com/search/photos");
        apiUrl.searchParams.set("query", query);
        apiUrl.searchParams.set("orientation", "landscape");
        apiUrl.searchParams.set("content_filter", "high");
        apiUrl.searchParams.set("per_page", "1");

        const unsplashRes = (await fetch(apiUrl.toString(), {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
        })) as SimpleResponse;

        if (!unsplashRes.ok) {
            const text = await unsplashRes.text();
            console.error("Unsplash error:", unsplashRes.status, text);
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
        if (!first || !first.urls?.regular) {
            return res.status(404).json({ error: "No image found for this query." });
        }

        return res.status(200).json({
            url: first.urls.regular,
            thumbUrl: first.urls.small,
            alt: first.alt_description || `Photo of ${query}`,
        });
    } catch (err) {
        console.error("Unsplash proxy error:", err);
        return res
            .status(500)
            .json({ error: "Unexpected error talking to Unsplash." });
    }
}
