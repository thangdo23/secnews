import { News } from "@/types/news";
import Link from "next/link";
import Image from "next/image";

type Ad = {
  imageUrl: string;
  link: string;
  alt: string;
};

type SidebarProps = {
  trendingItems: News[];
  ad?: Ad;
};

// Một icon đơn giản cho mục tin tức xu hướng
const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
    <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM4 9a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM15 9a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM8 13a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
  </svg>
);

export default function Sidebar({ trendingItems, ad }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {ad && (
        <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative bg-gray-100 border border-gray-200 h-60 rounded-lg text-gray-400 overflow-hidden">
            <Image src={ad.imageUrl} alt={ad.alt} fill className="object-cover" />
          </div>
        </a>
      )}
      {trendingItems.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Tin tức xu hướng</h3>
          <ul className="space-y-3">
            {trendingItems.map((item) => (
              <li key={item.id}>
                <Link href={`/tin-tuc/${item.id}`} className="flex items-start space-x-2 group">
                  <div className="mt-1">
                    <FireIcon />
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.tieude}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
