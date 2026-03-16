import { supabase, Post } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

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
            images: post.cover_image_url ? [{ url: post.cover_image_url, alt: post.cover_image_alt || post.title }] : [],
            type: 'article',
            publishedTime: post.published_at || undefined,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || '',
            images: post.cover_image_url ? [post.cover_image_url] : [],
        }
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
        <div className="relative min-h-screen bg-[#120422]">
            {/* Background */}
            
            

            <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24">

                {/* Geri butonu */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mb-12 transition-colors"
                    style={{ color: 'var(--neon-cyan)' }}
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Tüm yazılar
                </Link>

                {/* Cover image */}
                {post.cover_image_url && (
                    <div className="mb-10 aspect-video overflow-hidden border border-white/10">
                        <img
                            src={post.cover_image_url}
                            alt={post.cover_image_alt || post.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                )}

                {/* Tags */}
                {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.split(',').map(tag => (
                            <span
                                key={tag}
                                className="text-[8px] font-mono border border-white/10 px-2 py-0.5 text-gray-500 uppercase tracking-widest"
                            >
                {tag.trim()}
              </span>
                        ))}
                    </div>
                )}

                {/* Başlık */}
                <h1
                    className="retro-text-gradient font-['Syncopate'] text-3xl sm:text-4xl font-bold uppercase mb-6"
                    style={{ lineHeight: '1.3' }}
                >
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-gray-500 mb-10 pb-6 border-b border-white/10">
                    <span style={{ color: 'var(--neon-green)' }}>{post.author}</span>
                    {post.published_at && (
                        <span>
              {new Date(post.published_at).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
              })}
            </span>
                    )}
                    {post.reading_time && <span>{post.reading_time} dk okuma</span>}
                </div>

                {/* İçerik */}
                <div
                    className="prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:font-['Syncopate'] prose-headings:uppercase
            prose-h1:text-[var(--neon-cyan)] prose-h2:text-[var(--neon-pink)]
            prose-h3:text-[var(--neon-yellow)]
            prose-a:text-[var(--neon-cyan)] prose-a:no-underline hover:prose-a:text-[var(--neon-pink)]
            prose-code:text-[var(--neon-green)] prose-code:bg-black/40
            prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-[var(--neon-pink)] prose-blockquote:text-gray-400
            prose-strong:text-white"
                >
                    {post.content ? (
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                        <p className="text-gray-500 font-mono">// içerik henüz yok</p>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-1">
                        <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-pink)' }} />
                        <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-cyan)' }} />
                        <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                    </div>
                    <Link
                        href="/blog"
                        className="font-mono text-[10px] uppercase tracking-widest transition-colors"
                        style={{ color: 'var(--neon-cyan)' }}
                    >
                        ← Tüm yazılar
                    </Link>
                </div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": post.title,
                            "description": post.excerpt || '',
                            "author": {
                                "@type": "Person",
                                "name": post.author,
                                "url": "https://www.edaderyatoper.com"
                            },
                            "datePublished": post.published_at,
                            "dateModified": post.published_at,
                            "image": post.cover_image_url || '',
                            "url": `https://www.edaderyatoper.com/blog/${post.slug}`,
                            "publisher": {
                                "@type": "Person",
                                "name": "Eda Derya Toper",
                                "url": "https://www.edaderyatoper.com"
                            }
                        })
                    }}
                />
            </main>
        </div>
        
    )
}