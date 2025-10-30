import NewsCard from "@/components/segments/block/NewsCard";
import { News } from "@/lib/sanity";

export default function NewsBlock({ news }: { news: News[] }) {
  return (
    <div className="relative grid grid-cols-3 min-h-screen gap-16 px-24 bg-primary-8 py-24 items-start">
      {news.map((newsItem) => (
        <NewsCard content={newsItem} key={newsItem.title} />
      ))}
    </div>
  );
}
