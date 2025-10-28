import { PageProps } from "@/app/type/page";
import PageContent from "@/components/pages/Page";
import { getPageBySlug } from "@/lib/sanity";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPageBySlug(slug);

  if (!content) {
    return (
      <div className="w-screen h-screen items-center justify-center flex text-red-500 font-3xl font-bold font-gabarito">
        Page not found
      </div>
    );
  }

  return <PageContent content={content as PageProps} />;
}
