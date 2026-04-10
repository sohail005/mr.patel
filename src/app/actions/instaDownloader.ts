"use server";

export async function fetchInstagramReel(url: string) {
    if (!url || !url.includes("instagram.com")) {
        throw new Error("Invalid Instagram URL");
    }

    try {
        // Clean URL to ensure it's a direct reel link
        const cleanUrl = url.split("?")[0];
        const fetchUrl = `${cleanUrl}?__a=1&__d=dis`;

        const response = await fetch(fetchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Reel data from Instagram");
        }

        const data = await response.json();
        
        // Structure of __a=1 response
        const media = data.graphql?.shortcode_media || data.items?.[0];
        
        if (!media) {
            throw new Error("Could not find video data. The post might be private.");
        }

        const videoUrl = media.video_url || media.video_versions?.[0]?.url;
        const thumbnailUrl = media.display_url || media.image_versions2?.candidates?.[0]?.url;
        const username = media.owner?.username || media.user?.username;

        if (!videoUrl) {
            throw new Error("This post does not contain a video.");
        }

        return {
            videoUrl,
            thumbnailUrl,
            username,
            title: media.edge_media_to_caption?.edges?.[0]?.node?.text || "Instagram Reel",
        };
    } catch (error: any) {
        console.error("IG Fetch Error:", error.message);
        throw new Error(error.message || "Something went wrong while fetching the Reel.");
    }
}
