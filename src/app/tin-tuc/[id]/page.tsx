import { fetchNewsById, fetchRelatedNews } from "@/lib/cms";
import { buildImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import RelatedPosts from "@/components/RelatedPosts";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  params: { id: string };
};

// Function để tạo metadata động cho SEO
export async function generateMetadata({ params }: Props) {
  const news = await fetchNewsById(params.id).catch(() => null);

  if (!news) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Trang bạn đang tìm kiếm không tồn tại.",
    };
  }

  return {
    title: news.tieude,
    description: news.noidung?.slice(0, 160).trim() + "...",
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const news = await fetchNewsById(params.id);

  // If the current article is not found, show 404 page
  if (!news) {
    notFound();
  }

  // Fetch related posts efficiently after getting the current article's category
  const relatedPosts = await fetchRelatedNews(news.category, news.id);

  const imageUrl = news.image?.url ? buildImageUrl(news.image.url) : null;

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
    {
      label:
        news.tieude.length > 50
          ? news.tieude.slice(0, 50) + "..."
          : news.tieude,
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <Breadcrumbs items={breadcrumbItems} />
      <article>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{news.tieude}</h1>
        <div className="text-sm text-gray-500 mb-6">
          <span>Đăng ngày {new Date(news.published_at).toLocaleDateString('vi-VN')}</span>
          {news.author && <span> • bởi {news.author}</span>}
        </div>

        {imageUrl && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={imageUrl}
              alt={news.tieude}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{news.noidung}</ReactMarkdown>
        </div>
        <RelatedPosts posts={relatedPosts} />
      </article>
    </main>
  );
}