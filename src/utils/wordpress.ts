const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://blog-teste.infy.uk/wp-json/wp/v2/'

interface FetchOptions {
  per_page?: number
  page?: number
  orderby?: string
  order?: 'asc' | 'desc'
  categories?: number[]
}

export async function getPosts(options: FetchOptions = {}): Promise<WPPost[]> {
  try {
    const {
      per_page = 10,
      page = 1,
      orderby = 'date',
      order = 'desc',
      categories
    } = options

    const params = new URLSearchParams({
      _embed: '',
      per_page: per_page.toString(),
      page: page.toString(),
      orderby,
      order
    })

    if (categories?.length) {
      params.append('categories', categories.join(','))
    }

    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?${params.toString()}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch posts. Status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) return null

    const data = await res.json()
    return data[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPageBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/pages?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 86400 } } // 24 horas
    )

    if (!res.ok) return null

    const data = await res.json()
    return data[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}