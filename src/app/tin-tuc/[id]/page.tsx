import Image from "next/image";
import { fetchNewsById } from "@/lib/cms";
import { buildImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: { id: string } } | any) {
  // Next.js App Router may provide lazy params; await if it's a promise
  const resolvedParams = await (params as Promise<any> || params)
  const id = resolvedParams?.id as string | undefined
  if (!id) return notFound();
  const news = await fetchNewsById(id);
  if (!news) return notFound();

  const src = buildImageUrl(news.image?.url);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{news.tieude}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Tác giả: {news.author} | Ngày đăng: {new Date(news.published_at).toLocaleDateString("vi-VN")}
      </p>
      {src && (
        <div className="my-5 rounded shadow-lg w-full max-w-2xl relative h-96">
          <Image src={src} alt={news.tieude} fill className="object-cover rounded" />
        </div>
      )}
      <div className="prose max-w-none"><p>{news.noidung}</p></div>
    </main>
  );
}

