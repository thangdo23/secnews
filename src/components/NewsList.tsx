import NewsCard from "./NewsCard";
import { News } from "@/types/news";

export default function NewsList({ items }: { items: News[] }) {
  return (
    <div className="space-y-8">
      {items.map(i => (
        <div key={i.id} className="border-b pb-6">
          <NewsCard item={i} />
        </div>
      ))}
    </div>
  );
}
