import NewsBlock from "@/components/segments/block/NewsBlock";
import Footer from "@/components/segments/navigation/Footer";
import { getNews } from "@/lib/sanity";

export default async function NewsPage() {
  const newsList = await getNews();
  return (
    <div className="relative w-full min-h-screen">
      <NewsBlock news={newsList} />
      <Footer />
    </div>
  );
}
