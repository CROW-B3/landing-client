import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
        return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
        src,
}: ImageLoaderProps) {
        if (src.startsWith("http://") || src.startsWith("https://")) {
                return src;
        }

        return src;
}
