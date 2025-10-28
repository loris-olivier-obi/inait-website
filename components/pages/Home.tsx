import HeaderPage from "@/components/segments/block/HeaderPage";
import { getPageBySlug } from "@/lib/sanity";

export default async function Home() {
  // Fetch the "home" page from Sanity
  const page = await getPageBySlug("home");

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Page not found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      <HeaderPage
        headline={page.headline || page.title}
        subtitle={page.subtitle || ""}
        headerImage={page.headerImage}
        title={page.title}
      />
    </div>
  );
}
