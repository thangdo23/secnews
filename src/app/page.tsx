import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { News } from "@/types/news";
import { API_BASE } from "@/lib/api";

// Server component: SEO tốt, nhanh
async function fetchNews(): Promise<News[]> {
  try {
    // Strapi v3 hỗ trợ _limit / _start
    const res = await fetch(`${API_BASE}/tintucs?_limit=10`, {
      // Cache 2 phút, giống ISR nhẹ
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    return (await res.json()) as News[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const items = await fetchNews();
  const featured = items[0] ?? null;
  const list = items.slice(1);

  return (
    <>
      <Navbar />
      <Hero item={featured} />
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <NewsList items={list} />
        </section>
        <aside className="md:col-span-1">
          <Sidebar />
        </aside>
      </main>
      <Footer />
    </>
  );
}