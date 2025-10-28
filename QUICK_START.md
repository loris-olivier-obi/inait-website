# Quick Start Guide

## 🚀 Getting Started with Sanity CMS

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v04zsz7d
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Start the Development Servers

In two separate terminals:

**Terminal 1 - Next.js App:**

```bash
pnpm dev
```

**Terminal 2 - Sanity Studio:**

```bash
pnpm sanity
```

### 4. Access Your Application

- **Your App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio
- **API Endpoint**: http://localhost:3000/api/pages

## 📝 Create Your First Page

1. Go to http://localhost:3000/studio
2. Click "Create" and select "Page"
3. Fill in the fields:
   - **Title**: My First Page
   - **Slug**: my-first-page (auto-generated from title)
   - **Headline**: Welcome!
   - **Subtitle**: This is a subtitle
   - **Header Image**: Upload an image
   - **Content**: Add rich text content
4. Click "Publish"

## 🧪 Test the API

### Using the API Endpoint

```bash
curl http://localhost:3000/api/pages
```

### Using in Components

```tsx
import { getPages } from "@/lib/sanity";

export default async function MyComponent() {
  const pages = await getPages();
  console.log(pages);
  return <div>...</div>;
}
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── pages/
│   │       └── route.ts           # REST API for pages
│   ├── studio/
│   │   └── [[...index]]/
│   │       └── page.tsx            # Sanity Studio UI
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── PageList.tsx                # Example component using Sanity
├── lib/
│   ├── sanity.ts                   # Client & Zod validation
│   └── sanity.image.ts            # Image URL helpers
├── sanity/
│   ├── schemaTypes/
│   │   ├── page.ts                 # Page schema
│   │   └── index.ts                # Schema exports
│   ├── config.ts                    # Sanity config
│   └── cli.ts                       # CLI config
└── .env.local                       # Environment variables
```

## 🔍 Key Files

### `lib/sanity.ts`

Contains the Sanity client and Zod validation schemas:

- `PageSchema` - Zod schema for page validation
- `getPages()` - Fetch all pages with validation
- `getPageBySlug(slug)` - Fetch single page by slug

### `lib/sanity.image.ts`

Helper functions for generating image URLs:

- `urlFor(source)` - Generate optimized image URLs

### `app/api/pages/route.ts`

REST API endpoint returning JSON array of all pages

### `sanity/schemaTypes/page.ts`

Defines the page document structure in Sanity Studio

## 📊 Query Details

The pages are fetched with this GROQ query:

```
*[_type == "page"][]{
  title,
  slug,
  headline,
  subtitle,
  headerImage,
  content
}
```

All fields are validated using Zod before being returned.

## 🎨 Using Images

```tsx
import { urlFor } from "@/lib/sanity.image";

const imageUrl = urlFor(page.headerImage)
  .width(800)
  .height(600)
  .fit("max")
  .url();
```

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev/)

## ⚙️ Commands

```bash
# Start Next.js dev server
pnpm dev

# Start Sanity Studio
pnpm sanity

# Build Sanity Studio
pnpm sanity:build

# Deploy Sanity Studio
pnpm sanity:deploy

# Open Sanity Studio in browser
pnpm sanity:open
```

## 🐛 Troubleshooting

### Error: "Project not found"

- Make sure your project ID is correct: `v04zsz7d`
- Check `.env.local` has the correct values

### Error: "Dataset not found"

- Dataset should be `production` (default)
- Verify in `.env.local`

### Studio not loading

- Make sure both `pnpm dev` and `pnpm sanity` are running
- Check browser console for errors

### API returns empty array

- Create at least one page in the Sanity Studio
- Verify the page is published (not draft)
