# Google Fonts & API Usage

## 🎨 Available Fonts

The following Google Fonts have been added and are available through Tailwind CSS:

### 1. Gabarito

**Variable**: `--font-gabarito`

**Usage in Tailwind:**

```tsx
<h1 className="font-gabarito">Heading with Gabarito</h1>
```

**Usage in CSS:**

```css
font-family: var(--font-gabarito);
```

### 2. DM Serif Text

**Variable**: `--font-dm-serif`

**Usage in Tailwind:**

```tsx
<p className="font-dm-serif">Text with DM Serif</p>
```

**Usage in CSS:**

```css
font-family: var(--font-dm-serif);
```

### 3. Other Available Fonts

- `font-geist-sans` - Geist Sans (default sans)
- `font-geist-mono` - Geist Mono (monospace)

## 📡 API Endpoints

### Fetch All Pages

```bash
GET /api/pages
```

**Example Response:**

```json
[
  {
    "title": "Home",
    "slug": { "current": "home" },
    "headline": "Welcome",
    "subtitle": "Subtitle here",
    "headerImage": { ... },
    "content": [ ... ]
  }
]
```

### Fetch Page by Slug

```bash
GET /api/pages/[slug]
```

**Example:**

```bash
GET /api/pages/home
```

**Example Response:**

```json
{
  "title": "Home",
  "slug": { "current": "home" },
  "headline": "Welcome",
  "subtitle": "Subtitle here",
  "headerImage": { ... },
  "content": [ ... ]
}
```

**Query Used:**

```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  headline,
  subtitle,
  headerImage,
  content
}
```

## 💻 Usage Examples

### Using Fonts in Components

```tsx
// Example 1: Heading with Gabarito
<h1 className="font-gabarito text-4xl font-bold">
  This is Gabarito font
</h1>

// Example 2: Body text with DM Serif
<p className="font-dm-serif text-lg">
  This is DM Serif Text
</p>

// Example 3: Combining fonts
<div>
  <h1 className="font-gabarito">Main Title</h1>
  <p className="font-dm-serif">Subtitle</p>
  <p className="font-sans">Body text</p>
</div>
```

### Fetching All Pages in a Component

```tsx
import { getPages } from "@/lib/sanity";

export default async function PageList() {
  const pages = await getPages();

  return (
    <div>
      {pages.map((page) => (
        <div key={page.slug.current}>
          <h2 className="font-gabarito">{page.title}</h2>
        </div>
      ))}
    </div>
  );
}
```

### Fetching a Specific Page

```tsx
import { getPageBySlug } from "@/lib/sanity";

export default async function HomePage() {
  const page = await getPageBySlug("home");

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1 className="font-gabarito text-6xl">{page.title}</h1>
      {page.headline && (
        <p className="font-dm-serif text-2xl">{page.headline}</p>
      )}
    </div>
  );
}
```

### Using the API Route

```tsx
// Client-side fetch
async function fetchPage(slug: string) {
  const response = await fetch(`/api/pages/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

// Usage
const page = await fetchPage("home");
```

### Dynamic Page Route Example

Create `app/pages/[slug]/page.tsx`:

```tsx
import { getPageBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      {page.headerImage && (
        <Image
          src={urlFor(page.headerImage).width(1200).url()}
          alt={page.title}
          width={1200}
          height={600}
          className="w-full"
        />
      )}
      <h1 className="font-gabarito text-5xl">{page.title}</h1>
      {page.headline && (
        <h2 className="font-dm-serif text-3xl">{page.headline}</h2>
      )}
      {page.subtitle && <p>{page.subtitle}</p>}
    </div>
  );
}
```

## 🎯 Groq Query Reference

The slug-based query matches your example:

```groq
*[_type == "page" && slug.current == $slug][0]
```

Returns the first (and only) page that matches the slug, or `null` if no match.

## 📝 Tailwind Font Classes

You can now use these classes anywhere in your project:

- `font-gabarito` - Gabarito font
- `font-dm-serif` - DM Serif Text font
- `font-geist-sans` - Geist Sans font
- `font-geist-mono` - Geist Mono font

## 🎨 Font Pairing Suggestions

- **Headings**: Use `font-gabarito` for bold, modern headings
- **Body Text**: Use `font-dm-serif` for elegant, serif text
- **Navigation**: Use `font-geist-sans` for clean, readable text
- **Code/Preformatted**: Use `font-geist-mono` for monospace

Example:

```tsx
<nav className="font-geist-sans">
  <h1 className="font-gabarito">Logo</h1>
  <p className="font-dm-serif">Elegant description</p>
  <code className="font-geist-mono">Code snippet</code>
</nav>
```
