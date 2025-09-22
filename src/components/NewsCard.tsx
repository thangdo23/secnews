import Link from "next/link";
import Image from "next/image";
import { News } from "@/types/news";
import { buildImageUrl } from "@/lib/api";

export default function NewsCard({ item }: { item: News }) {
  const src = buildImageUrl(item.image?.url);
  const date = item.published_at ? new Date(item.published_at).toLocaleDateString() : "—";
  return (
    <article className="flex flex-col md:flex-row gap-4">
      {src && (
        <div className="relative w-full md:w-48 h-32 object-cover rounded overflow-hidden">
          <Image src={src} alt={item.tieude} fill className="object-cover" />
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold"><Link href={`/tin-tuc/${item.id}`}>{item.tieude}</Link></h3>
        <p className="text-sm text-gray-600 mt-1">{item.noidung.slice(0, 160)}...</p>
        <div className="text-xs text-gray-400 mt-2">{item.author} \u2022 {date}</div>
      </div>
    </article>
  );
}
