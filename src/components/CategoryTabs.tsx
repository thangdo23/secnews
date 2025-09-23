"use client"
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { buildImageUrl } from '@/lib/api'
import { News } from '@/types/news'

type Props = {
  items: News[]
  // optional explicit categories; if not provided we derive from items or fall back to defaults
  categories?: string[]
}

export default function CategoryTabs({ items, categories }: Props) {
  // derive categories from items if they have a 'category' property
  const derived = useMemo(() => {
    const set = new Set<string>()
    for (const it of items) {
      // attempt to read a category field in different keys
      const cat = (it as any).category || (it as any).categories || (it as any).tag
      if (typeof cat === 'string' && cat.trim()) set.add(cat.trim())
      else if (Array.isArray(cat)) cat.forEach((c) => typeof c === 'string' && set.add(c.trim()))
    }
    return Array.from(set)
  }, [items])

  const defaultCats = ['All', 'Cyber Security', 'Vulnerabilities']
  const tabs = categories && categories.length > 0 ? categories : (derived.length > 0 ? ['All', ...derived] : defaultCats)

  const [active, setActive] = useState<string>(tabs[0])

  const filtered = useMemo(() => {
    if (!items) return []
    if (active === 'All') return items
    // prefer explicit item.category
    const exact = items.filter((it) => {
      const cat = (it as any).category || (it as any).categories || (it as any).tag
      if (typeof cat === 'string') return cat.toLowerCase() === active.toLowerCase()
      if (Array.isArray(cat)) return cat.map(String).some((c) => c.toLowerCase() === active.toLowerCase())
      // fallback: check title or content contains the active word
      const hay = (it.tieude + ' ' + it.noidung).toLowerCase()
      return hay.includes(active.toLowerCase())
    })
    return exact
  }, [items, active])

  return (
    <div>
      {/* Banner / header similar to TheHackerNews category header */}
      <div className="bg-white border rounded-md mb-6 shadow-sm">
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">Category — <span className="text-blue-700">{active}</span></h2>
          <p className="text-sm text-gray-600 mt-2">Tin tức mới nhất và phân loại liên quan tới <span className="font-medium">{active}</span>. Click vào các tab để lọc ngay lập tức mà không cần load lại trang.</p>
        </div>
      </div>

      <div className="flex items-center justify-start space-x-3 overflow-auto pb-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${t === active ? 'bg-blue-700 text-white shadow' : 'bg-gray-100 text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((item) => {
          const src = buildImageUrl(item.image?.url)
          return (
            <Link key={item.id} href={`/tin-tuc/${item.id}`} className="flex items-start md:items-center space-x-4 hover:bg-gray-50 p-4 rounded">
              <div className="relative w-36 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                {src ? <Image src={src} alt={item.tieude} fill className="object-cover" /> : null}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.tieude}</h3>
                <p className="text-sm text-gray-500 mb-1">{new Date(item.published_at).toLocaleDateString('vi-VN')} • {item.author || '—'}</p>
                <p className="text-gray-700">{item.noidung?.slice(0, 240)}{item.noidung && item.noidung.length > 240 ? '...' : ''}</p>
              </div>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-center text-gray-600">Không có bài viết cho chuyên mục này.</p>
        )}
      </div>

    </div>
  )
}
