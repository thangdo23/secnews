import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const sampleNews = [
  {
    id: 1,
    tieude: "LastPass Data Breach: What We Know",
    noidung: "Summary of the breach...",
    author: "Admin",
    published_at: "2025-09-21T00:00:00.000Z",
    image: { url: "https://picsum.photos/seed/1/300/200" },
  },
  {
    id: 2,
    tieude: "GPT-4 Malware Creates Reverse Shell",
    noidung: "Short summary about malware",
    author: "Security Team",
    published_at: "2025-09-20T00:00:00.000Z",
    image: { url: "https://picsum.photos/seed/2/300/200" },
  },
  {
    id: 3,
    tieude: "Zero-Day Exploit Leaks Gmail Data",
    noidung: "Exploit affects multiple services",
    author: "Reporter",
    published_at: "2025-09-19T00:00:00.000Z",
    image: { url: "https://picsum.photos/seed/3/300/200" },
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero
        title="Researchers Uncover New Cyber Threat"
        description="Security researchers have discovered a new strain of malware targeting cloud services."
        image="https://picsum.photos/seed/hero/800/500"
      />
      <main className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <NewsList items={sampleNews} />
        </section>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}
