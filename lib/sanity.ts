import { createClient } from "@sanity/client";
import { PortableTextBlock } from "next-sanity";
import { z } from "zod";

// Sanity client configuration from environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN; // server-side only

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: !token, // if we have a token (server), prefer fresh data
  token, // optional; do not expose in client code
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
    const data = await client.fetch(query, { slug });
    if (!data) return null;
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

// NEWS
export type News = {
  date: string;
  image: string;
  link: string;
  linkType: string;
  summary: PortableTextBlock[];
  title: string;
};

export async function getNews(): Promise<News[]> {
  const query = `*[_type == "news"][]{
    date,
    "image": image.asset->url,
    link,
    linkType,
    summary,
    title
  }`;
  try {
    const data = await client.fetch(query);
    return data as News[];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
