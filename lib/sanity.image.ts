import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/app/api/pages/sanity";

// Helper function to get image URLs
export function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}
