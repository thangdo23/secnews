import Link from "next/link";
import { News } from "@/types/news";

export default function NewsCard({ item }: { item: News }) {
  return (
    <article className="flex flex-col md:flex-row gap-4">
      {item.image && (
        <img src={`http://cms.secnews.local${item.image.url}`} alt={item.tieude}
             className="w-full md:w-48 h-32 object-cover rounded"/>
      )}
      <div>
        <h3 className="text-xl font-semibold"><Link href={`/tin-tuc/${item.id}`}>{item.tieude}</Link></h3>
        <p className="text-sm text-gray-600 mt-1">{item.noidung.slice(0, 160)}...</p>
        <div className="text-xs text-gray-400 mt-2">{item.author} • {new Date(item.published_at).toLocaleDateString()}</div>
      </div>
    </article>
  );
}
