import NewsList from "@/components/NewsList";
import { fetchNewsList } from "@/lib/cms";

export default async function SecurityPage() {
  const { data: news } = await fetchNewsList(1, 10, "Cyber Security");
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Security</h1>
      <p className="text-center text-gray-600 mb-6">Danh sách bài viết về bảo mật (Security).</p>
      <NewsList items={news} />
    </main>
  )
}
