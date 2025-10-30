import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/app/api/pages/sanity";

// Helper function to get image URLs
export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}
