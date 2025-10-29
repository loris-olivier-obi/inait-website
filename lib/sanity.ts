import { createClient } from "@sanity/client";
import { z } from "zod";

// Sanity client configuration
// CRITICAL: Hardcoded values to override any incorrect Vercel environment variables

// Force ignore environment variables that might have wrong values
// This ensures we ALWAYS use the correct project ID regardless of Vercel settings
if (typeof process !== "undefined" && process.env) {
  const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (envProjectId && envProjectId === "f015aq3i") {
    // Explicitly warn about the problematic value
    console.error(
      `❌ ERROR: Found incorrect project ID "f015aq3i" in environment variables. Using correct ID "v04zsz7d" instead.`
    );
  }
}

export const client = createClient({
  projectId: "v04zsz7d", // Explicitly hardcoded - do not change
  dataset: "production", // Explicitly hardcoded - do not change
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const PageSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  headerImage: z.string().optional(),
  content: z.array(z.any()).nullable().optional(),
});

export const PageForNavigationSchema = z.object({
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
});

export type Page = z.infer<typeof PageSchema>;

export const MenuItemsSchema = z.object({
  menuItems: z.array(PageForNavigationSchema),
});

export type MenuItems = z.infer<typeof MenuItemsSchema>;

// ALL PAGES
export async function getPages(): Promise<Page[]> {
  const query = `*[_type == "page"]{
  _id,
    title,
    slug,
    headline,
    subtitle,
    'headerImage': headerImage.asset->url,
    content[] {
      _key,
      _type,
      mediaType,
      mediaAlignment,
      title,
      titleLevel,
      theme,
      content,
      "image": image.asset -> url,
      video,
      leftColumn,
      rightColumn,
      has_description,
      description,
      cells[] {
        _key,
        title,
        description,
        mediaType,
        "image": image.asset -> url,
        video,
      },
    },
  }`;

  try {
    const data = await client.fetch(query);
    return data.map((page: unknown) => PageSchema.parse(page));
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
}

// SINGLE PAGE
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    headline,
    subtitle,
    'headerImage': headerImage.asset->url,
    content[] {
      _key,
      _type,
      mediaType,
      mediaAlignment,
      title,
      titleLevel,
      theme,
      content,
      "image": image.asset -> url,
      video,
      leftColumn,
      rightColumn,
      has_description,
      description,
      cells[] {
        _key,
        title,
        description,
        mediaType,
        "image": image.asset -> url,
        video,
      },
    }
  }`;

  try {
    // Debug: log the slug being searched for
    console.log("Searching for slug:", slug);

    const data = await client.fetch(query, { slug });

    // Debug: if no data, try to see what slugs exist
    if (!data) {
      const allPages = await client.fetch(
        `*[_type == "page"]{ title, "slug": slug.current }`
      );
      console.log("Available pages:", JSON.stringify(allPages, null, 2));
      return null;
    }

    return PageSchema.parse(data);
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// NAVIGATION
export async function getMenuItems(): Promise<MenuItems> {
  const query = `*[_type == "settings"][0]{
    menuItems[]-> {
      title,
      slug
    }
  }`;

  try {
    const data = await client.fetch(query);
    if (!data) return { menuItems: [] };
    const validated = MenuItemsSchema.parse(data);
    return validated;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return { menuItems: [] };
  }
}
