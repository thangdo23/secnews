import NewsList from "@/components/NewsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { fetchNewsList } from "@/lib/cms";

export default async function Home() {
  const { data: allItems } = await fetchNewsList(1, 20).catch(() => ({ data: [], pageCount: 0 })); // Lấy 20 bài mới nhất cho trang chủ

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          {allItems.length > 0 ? (
            <NewsList items={allItems} />
          ) : (
            <p className="text-center text-gray-600">
              Chưa có bài viết nào. Vui lòng kiểm tra lại sau.
            </p>
          )}
        </section>
        <Sidebar trendingItems={allItems.slice(0, 5)} />
      </main>
      <Footer />
    </>
  );
}
