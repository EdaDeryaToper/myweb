import { supabase, Post } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props {
    params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('technical_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
    if (error || !data) return null
    return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)
    if (!post) return { title: 'Yazı bulunamadı' }
    return {
        title: `${post.title} | Eda Derya Toper`,
        description: post.excerpt || '',
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            images: post.cover_image_url
                ? [{ url: post.cover_image_url, alt: post.cover_image_alt || post.title }]
                : [],
            type: 'article',
            publishedTime: post.published_at || undefined,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || '',
            images: post.cover_image_url ? [post.cover_image_url] : [],
        },
    }
}

export async function generateStaticParams() {
    const { data } = await supabase
        .from('technical_posts')
        .select('slug')
        .eq('published', true)
    return (data || []).map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await getPost(slug)
    if (!post) notFound()

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.excerpt || '',
                        author: { '@type': 'Person', name: post.author, url: 'https://www.edaderyatoper.com' },
                        datePublished: post.published_at,
                        dateModified: post.updated_at || post.published_at,
                        image: post.cover_image_url || '',
                        url: `https://www.edaderyatoper.com/blog/${post.slug}`,
                        publisher: { '@type': 'Person', name: 'Eda Derya Toper', url: 'https://www.edaderyatoper.com' },
                    }),
                }}
            />
            <BlogPostClient post={post} />
        </>
    )
}