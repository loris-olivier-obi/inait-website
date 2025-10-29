import {
  DoubleColumnBlockProps,
  TitleHeadlineBlockProps,
} from "@/app/type/page";
import HeaderPage from "@/components/segments/block/HeaderPage";
import PageContent from "@/components/segments/content";
import { getPageBySlug } from "@/lib/sanity";

export default async function Home() {
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
      <PageContent
        content={
          page.content as (TitleHeadlineBlockProps | DoubleColumnBlockProps)[]
        }
      />
    </div>
  );
}
