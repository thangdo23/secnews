"use client"
import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { buildImageUrl } from '@/lib/api'
import { News } from '@/types/news'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  items: News[]
  pageCount: number
}

export default function CategoryTabs({ items, pageCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const activeCategory = searchParams.get('category') || 'All';

  const tabs = ['All', 'Cyber Security', 'Vulnerabilities', 'Data Breach', 'Malware'];

  const handleNavigation = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(value));
    // Khi đổi category, reset về trang 1
    if (key === 'category') {
      params.set('page', '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-2 border-b border-t py-3 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => handleNavigation('category', t)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              t === activeCategory
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => {
          const src = buildImageUrl(item.image?.url)
          return (
            <Link key={item.id} href={`/tin-tuc/${item.id}`} className="block py-5 group">
              <div className="flex items-start space-x-4">
                <div className="relative w-40 h-28 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  {src ? <Image src={src} alt={item.tieude} fill className="object-cover" /> : <div className="w-full h-full bg-gray-200"></div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">{item.tieude}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-2">{new Date(item.published_at).toLocaleDateString('vi-VN')} • {item.author || 'SecNews'}</p>
                  <p className="text-gray-600 text-sm leading-relaxed hidden md:block">{item.noidung?.slice(0, 150)}{item.noidung && item.noidung.length > 150 ? '...' : ''}</p>
                </div>
              </div>
            </Link>
          )
        })}
        {items.length === 0 && (
          <p className="text-center text-gray-600">Không có bài viết cho chuyên mục này.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={(page) => handleNavigation('page', page)}
      />
    </div>
  )
}
