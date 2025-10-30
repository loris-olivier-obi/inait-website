# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development

```bash
pnpm dev              # Start Next.js dev server (localhost:3000)
pnpm sanity           # Start Sanity Studio (localhost:3000/studio)
```

**Note**: For full development, run both commands in separate terminals.

### Build & Deploy

```bash
pnpm build            # Build Next.js production app
pnpm start            # Start production server
pnpm sanity:build     # Build Sanity Studio
pnpm sanity:deploy    # Deploy Sanity Studio to sanity.io
```

### Code Quality

```bash
pnpm lint             # Run ESLint
```

### Sanity Utilities

```bash
pnpm sanity:open      # Open Sanity Studio in browser
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity CMS with embedded Studio
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Validation**: Zod for runtime type safety
- **Package Manager**: pnpm

### Key Architectural Patterns

#### Sanity Integration

This project uses **Sanity CMS** as a headless CMS with the Studio embedded at `/studio`. The integration follows these patterns:

1. **Dual-layer Type Safety**:
   - Sanity schema definitions in `sanity/schemaTypes/` define the CMS structure
   - Zod schemas in `lib/sanity.ts` validate data at runtime
   - TypeScript types are inferred from Zod schemas

2. **Data Fetching**:
   - Use helper functions from `lib/sanity.ts` (`getPages()`, `getPageBySlug()`)
   - All data is validated with Zod before being returned
   - API client is configured with CDN for production performance

3. **Image Handling**:
   - Use `urlFor()` helper from `lib/sanity.image.ts` to generate optimized image URLs
   - Supports width, height, and fit parameters for responsive images

#### Project Structure

```
app/
├── api/pages/           # REST API endpoints for Sanity data
├── studio/[[...index]]/ # Embedded Sanity Studio (CMS interface)
├── layout.tsx           # Root layout with Geist fonts
└── page.tsx             # Homepage

lib/
├── sanity.ts            # Sanity client + Zod schemas + data fetchers
└── sanity.image.ts      # Image URL builder helper

sanity/
└── schemaTypes/         # Sanity schema definitions (page.ts, etc.)
```

### Environment Variables

Required environment variables (see `env.local.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v04zsz7d
NEXT_PUBLIC_SANITY_DATASET=production
```

**Important**: Create `.env.local` before running the app (file is gitignored).

## Development Guidelines

### Adding New Sanity Schema Types

1. Create schema file in `sanity/schemaTypes/[type].ts` using `defineType()` and `defineField()`
2. Export it from `sanity/schemaTypes/index.ts`
3. Create corresponding Zod schema in `lib/sanity.ts` for validation
4. Add data fetching function in `lib/sanity.ts`

Example pattern:

```typescript
// sanity/schemaTypes/author.ts
export default defineType({
  name: "author",
  type: "document",
  fields: [
    /* ... */
  ],
});

// lib/sanity.ts
export const AuthorSchema = z.object({
  /* ... */
});
export async function getAuthors() {
  const data = await client.fetch(`*[_type == "author"]{...}`);
  return data.map((item: unknown) => AuthorSchema.parse(item));
}
```

### Working with Images

Always use the `urlFor()` helper for Sanity images:

```typescript
import { urlFor } from "@/lib/sanity.image";

const imageUrl = urlFor(page.headerImage)
  .width(800)
  .height(600)
  .fit("max")
  .url();
```

### API Routes

API routes in `app/api/` should use the data fetching helpers from `lib/sanity.ts`. Data is already validated, so you can safely return it as JSON.

### TypeScript Paths

Use `@/` alias for imports (e.g., `@/lib/sanity`).

## Sanity Project Details

- **Project ID**: `v04zsz7d`
- **Dataset**: `production`
- **API Version**: `2024-01-01`
- **Studio Path**: `/studio` (embedded in Next.js app)

## Testing Content

1. Start both dev servers (`pnpm dev` + `pnpm sanity`)
2. Navigate to http://localhost:3000/studio
3. Create a new Page document
4. Publish it
5. Access via API at http://localhost:3000/api/pages or through data fetching functions
