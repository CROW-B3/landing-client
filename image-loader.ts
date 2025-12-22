import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
        return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
        src,
}: ImageLoaderProps) {
        // For external URLs, return as-is
        if (src.startsWith("http://") || src.startsWith("https://")) {
                return src;
        }

        // For local images, just return the path
        // Images in /public will be served directly by Cloudflare Pages
        return src;
}
