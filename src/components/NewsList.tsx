import Image from "next/image";
import Link from "next/link";
import { buildImageUrl } from "@/lib/api";
import { News } from "@/types/news";

export default function NewsList({ items }: { items: News[] }) {
  return (
    <div className="space-y-6">
      {(items || []).map((item) => {
        const src = buildImageUrl(item.image?.url);
        return (
          <Link key={item.id} href={`/tin-tuc/${item.id}`} className="flex space-x-4 items-start hover:bg-gray-50 p-2 rounded">
            <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
              {src ? (
                <Image src={src} alt={item.tieude} fill className="object-cover" />
              ) : (
                <div className="bg-gray-200 w-32 h-20" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">{item.tieude}</h3>
              <p className="text-sm text-gray-500">{new Date(item.published_at).toLocaleDateString()}  {item.author}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
