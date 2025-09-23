import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { fetchNewsList } from '@/lib/cms'

export default async function Home() {
  const items = await fetchNewsList().catch(() => [])
  return (
    <>
      <Hero
        title="Researchers Uncover New Cyber Threat"
        description="Security researchers have discovered a new strain of malware targeting cloud services."
        image="https://picsum.photos/seed/hero/800/500"
      />
      <main className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          {items && items.length > 0 ? (
            <NewsList items={items} />
          ) : (
            <p className="text-center text-gray-600">Chưa có bài viết nào. Vui lòng kiểm tra backend Strapi.</p>
          )}
        </section>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}
