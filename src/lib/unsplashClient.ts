// src/lib/unsplashClient.ts
export type UnsplashImage = {
    url: string;
    thumbUrl: string;
    alt: string;
};

export async function fetchPlaceImage(
    query: string
): Promise<UnsplashImage | null> {
    const trimmed = query.trim();
    if (!trimmed) return null;

    const res = await fetch(
        `/api/unsplash-search?q=${encodeURIComponent(trimmed)}`
    );

    if (!res.ok) {
        console.error("Unsplash proxy error:", res.status);
        return null;
    }

    const data = (await res.json()) as {
        url?: string;
        thumbUrl?: string;
        alt?: string;
    };

    if (!data.url) return null;

    return {
        url: data.url,
        thumbUrl: data.thumbUrl ?? data.url,
        alt: data.alt ?? `Photo of ${trimmed}`,
    };
}
