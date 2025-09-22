import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsList from "../components/NewsList";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const sampleNews = [
  { id: 1, title: "LastPass Data Breach: What We Know", date: "Sep 21, 2025", category: "Security", image: "https://via.placeholder.com/150" },
  { id: 2, title: "GPT-4 Malware Creates Reverse Shell", date: "Sep 20, 2025", category: "AI Security", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Zero-Day Exploit Leaks Gmail Data", date: "Sep 19, 2025", category: "Cloud Security", image: "https://via.placeholder.com/150" }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero 
        title="Researchers Uncover New Cyber Threat"
        description="Security researchers have discovered a new strain of malware targeting cloud services."
        image="https://via.placeholder.com/600x400"
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
