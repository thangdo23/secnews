import { API_URL, API_BASE } from './api'
import { News } from '@/types/news'
import { cache } from 'react'

const CONTENT_TYPE = process.env.NEXT_PUBLIC_CMS_CONTENT_TYPE || 'tintucs'
const STRAPI_VERSION = (process.env.NEXT_PUBLIC_CMS_STRAPI_VERSION || 'auto').toLowerCase() // '3' | '4' | 'auto'

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function prefixIfRelative(url: unknown) {
  if (typeof url !== 'string') return undefined
  return url.startsWith('http') ? url : `${API_BASE}${url}`
}

function mapV4Item(item: Record<string, unknown>): News {
  const id = item['id'] as number | string | undefined
  const attributes = item['attributes']
  const attrs = isRecord(attributes) ? attributes as Record<string, unknown> : {}
  const rawImage = attrs['image']
  const imageData = isRecord(rawImage) && isRecord((rawImage as Record<string, unknown>)['data']) ? (rawImage as Record<string, unknown>)['data'] : rawImage
  let imageUrl: string | undefined
  if (isRecord(imageData)) {
    const attrs2 = (imageData as Record<string, unknown>)['attributes']
    const url = isRecord(attrs2) ? (attrs2 as Record<string, unknown>)['url'] : (imageData as Record<string, unknown>)['url']
    imageUrl = prefixIfRelative(url)
  }

  const toStr = (v: unknown) => (typeof v === 'string' ? v : '')
  const toId = (v: unknown) => (typeof v === 'number' ? v : (typeof v === 'string' && v ? parseInt(v, 10) : 0))
  return {
    id: toId(id),
    tieude: toStr(attrs['tieude']) || toStr(attrs['title']),
    noidung: toStr(attrs['noidung']) || toStr(attrs['content']),
    author: toStr(attrs['author']) || '—',
    category: toStr(attrs['category']),
    published_at: toStr(attrs['published_at']) || toStr(attrs['publishedAt']) || new Date().toISOString(),
    image: imageUrl ? { url: imageUrl } : undefined,
  }
}

function mapV3Item(item: Record<string, unknown>): News {
  // Strapi v3 typically returns items directly (no attributes wrapper)
  const toStr = (v: unknown) => (typeof v === 'string' ? v : '')
  const toId = (v: unknown) => (typeof v === 'number' ? v : (typeof v === 'string' && v ? parseInt(v, 10) : 0))
  const id = item['id'] as number | string | undefined

  // image in v3 can be object or array. Try a few common shapes.
  let imageUrl: string | undefined
  const rawImage = item['image']
  if (typeof rawImage === 'string') {
    imageUrl = prefixIfRelative(rawImage)
  } else if (isRecord(rawImage)) {
    // common: { url } or { formats: { small: { url }}}
    const url = (rawImage as Record<string, unknown>)['url']
    if (url) imageUrl = prefixIfRelative(url)
    else if (isRecord((rawImage as Record<string, unknown>)['formats'])) {
      const formats = (rawImage as Record<string, unknown>)['formats'] as Record<string, unknown>
      const pick = ['thumbnail', 'small', 'medium', 'large']
      for (const p of pick) {
        const f = formats[p]
        if (isRecord(f) && typeof f['url'] === 'string') {
          imageUrl = prefixIfRelative(f['url'])
          break
        }
      }
    }
  } else if (Array.isArray(rawImage) && rawImage.length > 0) {
    const first = rawImage[0]
    if (isRecord(first) && typeof first['url'] === 'string') imageUrl = prefixIfRelative(first['url'])
  }

  return {
    id: toId(id),
    tieude: toStr(item['tieude']) || toStr(item['title']),
    noidung: toStr(item['noidung']) || toStr(item['content']),
    author: toStr(item['author']) || '—',
    category: toStr(item['category']),
    published_at: toStr(item['published_at']) || toStr(item['publishedAt']) || new Date().toISOString(),
    image: imageUrl ? { url: imageUrl } : undefined,
  }
}

function mapAnyItem(item: unknown): News {
  if (!isRecord(item)) return mapV3Item({})
  // detect v4 by presence of attributes key
  if ('attributes' in item) return mapV4Item(item as Record<string, unknown>)
  return mapV3Item(item as Record<string, unknown>)
}

export const fetchNewsList = cache(async (page = 1, pageSize = 10, category?: string): Promise<{ data: News[]; pageCount: number }> => {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined. Please set it in your .env file.");
    }

    const isV3 = STRAPI_VERSION === '3';

    if (isV3) {
      // Strapi v3 logic
      const listUrl = new URL(`${API_URL}/${CONTENT_TYPE}`);
      listUrl.searchParams.set("_limit", pageSize.toString());
      listUrl.searchParams.set("_start", ((page - 1) * pageSize).toString());
      listUrl.searchParams.set("_sort", "published_at:DESC");
      if (category && category !== 'All') {
        listUrl.searchParams.set("category_eq", category);
      }

      const countUrl = new URL(`${API_URL}/${CONTENT_TYPE}/count`);
      if (category && category !== 'All') {
        countUrl.searchParams.set("category_eq", category);
      }

      const [listRes, countRes] = await Promise.all([
        fetch(listUrl.toString(), { next: { revalidate: 60 } }),
        fetch(countUrl.toString(), { next: { revalidate: 60 } })
      ]);

      if (!listRes.ok) throw new Error('Failed to fetch news list (v3)');
      
      const listBody = await listRes.json();
      const totalCount = countRes.ok ? await countRes.json() : 0;
      
      const data = Array.isArray(listBody) ? listBody.map(mapAnyItem) : [];
      const pageCount = Math.ceil(totalCount / pageSize) || 1;

      return { data, pageCount };
    } else {
      // Strapi v4 logic
      const url = new URL(`${API_URL}/api/${CONTENT_TYPE}`);
      url.searchParams.set("fields[0]", "tieude");
      url.searchParams.set("fields[1]", "noidung");
      url.searchParams.set("fields[2]", "published_at");
      url.searchParams.set("fields[3]", "author");
      url.searchParams.set("fields[4]", "category");
      url.searchParams.set("populate", "image");
      url.searchParams.set("sort[0]", "published_at:desc");
      url.searchParams.set("pagination[page]", page.toString());
      url.searchParams.set("pagination[pageSize]", pageSize.toString());

      if (category && category !== 'All') {
        url.searchParams.set("filters[category][$eq]", category);
      }

      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error('Failed to fetch news list (v4)');

      const body = await res.json();
      const data = Array.isArray(body.data) ? body.data.map(mapAnyItem) : [];
      const pageCount = body.meta?.pagination?.pageCount || 1;

      return { data, pageCount };
    }
  } catch (err) {
    console.warn('fetchNewsList failed, returning empty data', err)
    return { data: [], pageCount: 0 };
  }
});

export const fetchNewsById = cache(async (id: number | string): Promise<News | null> => {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined. Please set it in your .env file.");
    }
    const isV3 = STRAPI_VERSION === '3';
    const urlPath = isV3 
      ? `${API_URL}/${CONTENT_TYPE}/${id}`
      : `${API_URL}/api/${CONTENT_TYPE}/${id}`;
    
    const url = new URL(urlPath);

    if (!isV3) {
      url.searchParams.set("populate", "image,author");
    }

    const res = await fetch(url.toString(), { next: { revalidate: 60 } }); // Cache for 60 seconds
    if (!res.ok) throw new Error(`Failed to fetch news with id ${id}`);
    const body = await res.json();
    return mapAnyItem(body.data ?? body);
  } catch (err) {
    console.warn('fetchNewsById failed', err)
    return null
  }
});

export async function fetchRelatedNews(category: string, currentId: number): Promise<News[]> {
  if (!category) return [];
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined. Please set it in your .env file.");
    }
    const isV3 = STRAPI_VERSION === '3';
    const url = new URL(isV3 ? `${API_URL}/${CONTENT_TYPE}` : `${API_URL}/api/${CONTENT_TYPE}`);

    if (isV3) {
      url.searchParams.set("category", category);
      url.searchParams.set("id_ne", currentId.toString());
      url.searchParams.set("_sort", "published_at:DESC");
      url.searchParams.set("_limit", "3");
    } else {
      // Strapi v4 filtering syntax.
      url.searchParams.set("fields[0]", "tieude");
      url.searchParams.set("filters[category][$eq]", category);
      url.searchParams.set("filters[id][$ne]", currentId.toString());
      url.searchParams.set("sort[0]", "published_at:desc");
      url.searchParams.set("pagination[limit]", "3");
      url.searchParams.set("populate", "image");
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) return [];
    const body = await res.json();
    const items = isV3 ? body : body.data;
    return Array.isArray(items) ? items.map(mapAnyItem) : [];
  } catch (err) {
    console.warn('fetchRelatedNews failed', err);
    return [];
  }
}
