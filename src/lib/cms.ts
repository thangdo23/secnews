import { api, API_BASE } from './api'
import { News } from '@/types/news'

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

async function tryV4List(): Promise<News[] | null> {
  const url = `/api/${CONTENT_TYPE}?populate=*&sort[0]=published_at:desc`
  if (process.env.NODE_ENV !== 'production') console.debug('[cms] tryV4List ->', url)
  const res = await api.get(url)
  const resData = isRecord(res.data) ? res.data as Record<string, unknown> : undefined
  const data = resData && resData['data'] ? resData['data'] : null
  if (Array.isArray(data)) return data.map(mapAnyItem)
  return null
}

async function tryV3List(): Promise<News[] | null> {
  const url = `/${CONTENT_TYPE}?_limit=100&_sort=published_at:DESC`
  if (process.env.NODE_ENV !== 'production') console.debug('[cms] tryV3List ->', url)
  const res = await api.get(url)
  // v3 often returns array directly, but some proxies may wrap it
  if (Array.isArray(res.data)) return res.data.map(mapAnyItem)
  if (isRecord(res.data) && Array.isArray((res.data as Record<string, unknown>)['data'])) return ((res.data as Record<string, unknown>)['data'] as unknown[]).map(mapAnyItem)
  return null
}

export async function fetchNewsList(): Promise<News[]> {
  try {
    if (STRAPI_VERSION === '3') {
      const v3 = await tryV3List()
      if (v3) return v3
    } else if (STRAPI_VERSION === '4') {
      const v4 = await tryV4List()
      if (v4) return v4
    } else {
      // auto: try v4 first, then v3
      try {
        const v4 = await tryV4List()
        if (v4) return v4
      } catch (e) {
        // ignore and fallback
      }
      const v3 = await tryV3List()
      if (v3) return v3
    }
    return []
  } catch (err) {
    console.warn('fetchNewsList failed, returning mock data', err)
    return [
      {
        id: 1,
        tieude: 'Mock: LastPass Data Breach',
        noidung: 'Mock summary',
        author: 'Dev',
        published_at: new Date().toISOString(),
        image: { url: 'https://picsum.photos/seed/mock/300/200' },
      },
    ]
  }
}

async function tryV4ById(id: number | string): Promise<News | null> {
  const url = `/api/${CONTENT_TYPE}/${id}?populate=*`
  if (process.env.NODE_ENV !== 'production') console.debug('[cms] tryV4ById ->', url)
  const res = await api.get(url)
  const resData = isRecord(res.data) ? res.data as Record<string, unknown> : undefined
  const payload = resData && resData['data'] ? resData['data'] : null
  if (!payload) return null
  return mapAnyItem(payload)
}

async function tryV3ById(id: number | string): Promise<News | null> {
  const url = `/${CONTENT_TYPE}/${id}`
  if (process.env.NODE_ENV !== 'production') console.debug('[cms] tryV3ById ->', url)
  const res = await api.get(url)
  if (isRecord(res.data)) return mapAnyItem(res.data)
  return null
}

export async function fetchNewsById(id: number | string): Promise<News | null> {
  try {
    if (STRAPI_VERSION === '3') {
      return await tryV3ById(id)
    } else if (STRAPI_VERSION === '4') {
      return await tryV4ById(id)
    } else {
      try {
        const v4 = await tryV4ById(id)
        if (v4) return v4
      } catch (e) {
        // ignore and fallback
      }
      return await tryV3ById(id)
    }
  } catch (err) {
    console.warn('fetchNewsById failed', err)
    return null
  }
}
