import Link from "next/link";
import Image from "next/image";
import { fetchNewsList } from "@/lib/cms";
import { buildImageUrl } from "@/lib/api";

export default async function TinTucPage() {
  const news = await fetchNewsList();

  if (!news || news.length === 0)
    return <p className="text-center mt-10">Chưa có tin tức nào.</p>;

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tin tức mới nhất</h1>
      <div className="space-y-8">
        {news.map((item) => {
          const src = buildImageUrl(item.image?.url);
          return (
            <div key={item.id} className="border-b border-gray-300 pb-6 last:border-b-0">
              <h2 className="text-2xl font-semibold mb-2">{item.tieude}</h2>
              <p className="text-sm text-gray-500 mb-2">Tác giả: {item.author}</p>
              {src && (
                <div className="my-3 rounded shadow-md w-full max-w-2xl relative h-64">
                  <Image src={src} alt={item.tieude} fill className="object-cover rounded" />
                </div>
              )}
              <p className="text-gray-700 mb-3">
                {item.noidung.length > 200 ? item.noidung.slice(0, 200) + "..." : item.noidung}
              </p>
              <Link href={`/tin-tuc/${item.id}`} className="text-blue-600 hover:underline font-medium">
                Đọc tiếp →
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

