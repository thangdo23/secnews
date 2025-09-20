"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { News } from "@/types/news";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    if (id) api.get(`/tintucs/${id}`).then(res => setNews(res.data));
  }, [id]);

  if (!news) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{news.tieude}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Tác giả: {news.author} | Ngày đăng: {new Date(news.published_at).toLocaleDateString("vi-VN")}
      </p>
      {news.image && (
        <img
          src={`http://cms.secnews.local${news.image.url}`}
          alt={news.tieude}
          className="my-5 rounded shadow-lg w-full max-w-2xl"
        />
      )}
      <div className="prose max-w-none"><p>{news.noidung}</p></div>
    </main>
  );
}

