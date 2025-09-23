import { fetchNewsList } from "@/lib/cms";
import CategoryTabs from "@/components/CategoryTabs";

export default async function TinTucPage() {
  const news = await fetchNewsList();

  if (!news || news.length === 0)
    return <p className="text-center mt-10">Chưa có tin tức nào.</p>;

  // Pass the server-fetched news into a client component that will render category tabs
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tin tức</h1>
      <CategoryTabs items={news} />
    </main>
  );
}

