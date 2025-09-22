import Link from "next/link";

export default function Sidebar({ categories = ["Network","System","Security"] }) {
  return (
    <aside className="space-y-6">
      <div className="p-4 border rounded">
        <h4 className="font-semibold mb-2">Chuyên mục</h4>
        <ul className="space-y-2 text-sm">
          {categories.map(c => <li key={c}><Link href={`/kien-thuc/${c.toLowerCase()}`}>{c}</Link></li>)}
        </ul>
      </div>

      <div className="p-4 border rounded">
        <h4 className="font-semibold mb-2">Đăng ký nhận tin</h4>
        <form>
          <input className="w-full border rounded px-2 py-1 mb-2" placeholder="Email..." />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Đăng ký</button>
        </form>
      </div>
    </aside>
  );
}
