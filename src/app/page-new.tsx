import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { fetchNewsList } from "@/lib/cms";
import { buildImageUrl } from "@/lib/api";

export default async function Home() {
  const { data: allItems } = await fetchNewsList(1, 20).catch(() => ({ data: [], pageCount: 0 }));

  // Lấy bài viết đầu tiên cho Hero và các bài còn lại cho NewsList
  const heroItem = allItems.length > 0 ? allItems[0] : null;
  const newsItems = allItems.length > 1 ? allItems.slice(1) : [];

  return (
    <>
      {heroItem && (
        <Hero
          title={heroItem.tieude}
          description={heroItem.noidung?.slice(0, 150) + "..."}
          image={heroItem.image?.url ? buildImageUrl(heroItem.image.url) : null} // No change here, it's already correct
          link={`/tin-tuc/${heroItem.id}`}
        />
      )}
      <main className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          {newsItems.length > 0 ? (
            <NewsList items={newsItems} />
          ) : (
            <p className="text-center text-gray-600">
              Không có bài viết nào khác để hiển thị.
            </p>
          )}
        </section>
        <Sidebar trendingItems={allItems.slice(0, 5)} />
      </main>
      <Footer />
    </>
  );
}
