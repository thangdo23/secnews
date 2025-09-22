export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-gray-200 h-40 flex items-center justify-center rounded">
        Banner Ad
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-3">Trending News</h3>
        <ul className="list-disc ml-5 space-y-2 text-blue-700">
          <li><a href="#">Big Breach Hits Company X</a></li>
          <li><a href="#">Zero-Day Exploit Found</a></li>
          <li><a href="#">How to Secure Your Data</a></li>
        </ul>
      </div>
    </aside>
  );
}
