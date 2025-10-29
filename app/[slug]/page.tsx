import { PageProps } from "@/app/type/page";
import { getPageBySlug } from "@/lib/sanity";

import PageComponent from "@/components/pages/Page";

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

  return <PageComponent content={content as PageProps} />;
}
