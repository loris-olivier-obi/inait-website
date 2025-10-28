# Sanity CMS Setup

This project is configured with Sanity CMS for content management.

## Configuration

- **Project ID**: `v04zsz7d`
- **Dataset**: `production`
- **Query**: Uses Zod for field validation

## Getting Started

### 1. Environment Variables

The project requires environment variables to be set. Copy `.env.local.example` to `.env.local`:

```bash
cp env.local.example .env.local
```

The file should contain:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v04zsz7d
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Run Sanity Studio

To start the Sanity Studio (content management interface), run:

```bash
pnpm sanity
```

The studio will be available at: `http://localhost:3000/studio`

### 3. Deploy Sanity Studio

To deploy your Sanity Studio to sanity.io:

```bash
pnpm sanity:deploy
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── pages/
│   │       └── route.ts          # API endpoint to fetch pages
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx          # Sanity Studio page
├── lib/
│   ├── sanity.ts                 # Sanity client and Zod schemas
│   └── sanity.image.ts          # Image URL helpers
├── sanity/
│   ├── schemaTypes/
│   │   ├── page.ts               # Page schema definition
│   │   └── index.ts              # Export all schemas
│   ├── config.ts                 # Sanity configuration
│   └── cli.ts                    # Sanity CLI configuration
```

## API Usage

### Fetch All Pages

```typescript
import { getPages } from "@/lib/sanity";

const pages = await getPages();
```

This fetches all pages with the following fields:

- `title`
- `slug`
- `headline`
- `subtitle`
- `headerImage`
- `content`

All fields are validated using Zod schema (`PageSchema`).

### Fetch Single Page by Slug

```typescript
import { getPageBySlug } from "@/lib/sanity";

const page = await getPageBySlug("my-page-slug");
```

### API Route

You can also use the REST API endpoint:

```bash
GET /api/pages
```

Returns a JSON array of all pages.

## Image URLs

To get image URLs from Sanity, use the `urlFor` helper:

```typescript
import { urlFor } from "@/lib/sanity.image";

const imageUrl = urlFor(page.headerImage).width(800).height(600).url();
```

## Schema Definition

The Page document includes:

- **title** (string, required) - Page title
- **slug** (slug, required) - URL-friendly identifier
- **headline** (string, optional) - Page headline
- **subtitle** (string, optional) - Page subtitle
- **headerImage** (image, optional) - Header image with hotspot
- **content** (portable text, optional) - Rich text content with images

## Validation

All fetched pages are validated using Zod schemas defined in `lib/sanity.ts`. This ensures type safety and data integrity.

## Example: Using in a Component

```tsx
import { getPages } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";

export default async function PageList() {
  const pages = await getPages();

  return (
    <div>
      {pages.map((page) => (
        <div key={page.slug.current}>
          <h2>{page.title}</h2>
          {page.headline && <h3>{page.headline}</h3>}
          {page.headerImage && (
            <img
              src={urlFor(page.headerImage).width(400).url()}
              alt={page.title}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

## Sanity CLI Commands

- `pnpm sanity` - Start development server for Sanity Studio
- `pnpm sanity:build` - Build Sanity Studio
- `pnpm sanity:deploy` - Deploy Sanity Studio
- `pnpm sanity:open` - Open Sanity Studio in browser

## Next Steps

1. Start the development server: `pnpm dev`
2. Start Sanity Studio: `pnpm sanity`
3. Visit `http://localhost:3000/studio` to manage your content
4. Create your first page in the Sanity Studio
5. Use the API to display pages in your application
