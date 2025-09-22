import { api, API_BASE } from './api'
import { News } from '@/types/news'

const CONTENT_TYPE = process.env.NEXT_PUBLIC_CMS_CONTENT_TYPE || 'tintucs'

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function mapStrapiItem(item: unknown): News {
  // Strapi v4 shape: { id, attributes: { tieude, noidung, author, published_at, image: { data: { attributes: { url }}}}}
  const record = isRecord(item) ? item as Record<string, unknown> : {}
  const id = record['id'] as number | string | undefined
  const attributes = record['attributes']
  const attrs = isRecord(attributes) ? attributes as Record<string, unknown> : record
  const rawImage = attrs['image']
  const imageData = isRecord(rawImage) && isRecord((rawImage as Record<string, unknown>)['data']) ? (rawImage as Record<string, unknown>)['data'] : rawImage
  let imageUrl: string | undefined
  if (isRecord(imageData)) {
    const attrs2 = (imageData as Record<string, unknown>)['attributes']
    const url = isRecord(attrs2) ? (attrs2 as Record<string, unknown>)['url'] : (imageData as Record<string, unknown>)['url']
    // If url is relative, prefix with API_BASE
    imageUrl = typeof url === 'string' ? (url.startsWith('http') ? url : `${API_BASE}${url}`) : undefined
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

export async function fetchNewsList(): Promise<News[]> {
  try {
    const url = `/api/${CONTENT_TYPE}?populate=*&sort[0]=published_at:desc`
    const res = await api.get(url)
    const resData = isRecord(res.data) ? res.data as Record<string, unknown> : undefined
    const data = resData && resData['data'] ? resData['data'] : []
    if (Array.isArray(data)) return data.map(mapStrapiItem)
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

export async function fetchNewsById(id: number | string): Promise<News | null> {
  try {
    const url = `/api/${CONTENT_TYPE}/${id}?populate=*`
    const res = await api.get(url)
  const resData = isRecord(res.data) ? res.data as Record<string, unknown> : undefined
  const payload = resData && resData['data'] ? resData['data'] : null
    if (!payload) return null
    return mapStrapiItem(payload)
  } catch (err) {
    console.warn('fetchNewsById failed', err)
    return null
  }
}
