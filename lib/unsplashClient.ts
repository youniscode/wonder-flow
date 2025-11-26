// src/lib/unsplashClient.ts

export type UnsplashImage = {
    url: string;
    thumbUrl: string;
    alt: string;
};

export async function fetchPlaceImage(
    query: string
): Promise<UnsplashImage | null> {
    try {
        const res = await fetch(
            `/api/unsplash-search?q=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
            console.error("Unsplash client error:", res.status);
            return null;
        }

        const data = (await res.json()) as UnsplashImage;
        if (!data.url) return null;

        return data;
    } catch (err) {
        console.error("Unsplash client network error:", err);
        return null;
    }
}
