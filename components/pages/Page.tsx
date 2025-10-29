import {
  DoubleColumnBlockProps,
  PageProps,
  TitleHeadlineBlockProps,
} from "@/app/type/page";
import HeaderPage from "@/components/segments/block/HeaderPage";
import PageContent from "@/components/segments/content";

export default async function Page({ content }: { content: PageProps }) {
  return (
    <div className="relative w-full min-h-screen">
      <HeaderPage
        headline={content.headline || content.title}
        subtitle={content.subtitle || ""}
        headerImage={content.headerImage}
        title={content.title}
      />
      <PageContent
        content={
          content.content as (
            | TitleHeadlineBlockProps
            | DoubleColumnBlockProps
          )[]
        }
      />
    </div>
  );
}
