import { supabase } from './lib/supabase'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: posts } = await supabase
        .from('technical_posts')
        .select('slug, published_at, created_at')
        .eq('published', true)

    const postUrls = (posts || []).map(post => ({
        url: `https://www.edaderyatoper.com/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: 'https://www.edaderyatoper.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://www.edaderyatoper.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://www.edaderyatoper.com/projects',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: 'https://www.edaderyatoper.com/skills',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://www.edaderyatoper.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...postUrls,
    ]
}