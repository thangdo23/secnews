import Link from "next/link";
import { News } from "@/types/news";

export default function Hero({ item }: { item: News | null }) {
  if (!item) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {item.image && (
            <img src={`http://cms.secnews.local${item.image.url}`} alt={item.tieude}
                 className="w-full h-72 object-cover rounded" />
          )}
          <h1 className="text-3xl font-bold mt-4">{item.tieude}</h1>
          <p className="text-gray-700 mt-2">{item.noidung.slice(0, 220)}...</p>
          <Link href={`/tin-tuc/${item.id}`} className="inline-block mt-3 text-blue-600">Xem chi tiết →</Link>
        </div>
        <aside className="hidden md:block">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Bài đọc nhiều</h3>
            {/* list small items */}
            <ul className="space-y-2 text-sm">
              <li>Sample popular 1</li>
              <li>Sample popular 2</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
