import { fetchNewsList } from "@/lib/cms";
import CategoryTabs from "@/components/CategoryTabs";

type TinTucPageProps = {
  searchParams: {
    page?: string;
    category?: string;
  };
}

export default async function TinTucPage({ searchParams }: TinTucPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const currentCategory = searchParams.category || 'All';
  const { data: news, pageCount } = await fetchNewsList(currentPage, 10, currentCategory);

  if (!news || news.length === 0 && currentPage === 1)
    return <p className="text-center mt-10">Chưa có tin tức nào.</p>;

  // Pass the server-fetched news into a client component that will render category tabs
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Tin Tức An Ninh Mạng</h1>
      <p className="text-center text-gray-500 mb-8">Các tin tức, phân tích và báo cáo mới nhất về an ninh mạng.</p>
      <CategoryTabs items={news} pageCount={pageCount} />
    </main>
  );
}
