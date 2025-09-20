"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";

export default function TinTucPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tintucs").then(res => setNews(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (!news.length) return <p className="text-center mt-10">Chưa có tin tức nào.</p>;

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tin tức mới nhất</h1>
      <div className="space-y-8">
        {news.map(item => (
          <div key={item.id} className="border-b border-gray-300 pb-6 last:border-b-0">
            <h2 className="text-2xl font-semibold mb-2">{item.tieude}</h2>
            <p className="text-sm text-gray-500 mb-2">Tác giả: {item.author}</p>
            {item.image && (
              <img
                src={`http://cms.secnews.local${item.image.url}`}
                alt={item.tieude}
                className="my-3 rounded shadow-md w-full max-w-2xl"
              />
            )}
            <p className="text-gray-700 mb-3">
              {item.noidung.length > 200 ? item.noidung.slice(0, 200) + "..." : item.noidung}
            </p>
            <Link href={`/tin-tuc/${item.id}`} className="text-blue-600 hover:underline font-medium">
              Đọc tiếp →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

