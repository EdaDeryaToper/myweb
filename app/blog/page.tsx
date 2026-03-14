import { supabase, Post } from '../lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Teknik Yazılar | Eda Derya Toper',
    description: 'Eda Derya Toper tarafından yazılmış yazılım, web teknolojileri ve yazılım mimarisi üzerine teknik yazılar.',
}

async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('technical_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Supabase error:', error)
        return []
    }

    return data || []
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="relative min-h-screen bg-[#120422]">
            {/* Background */}
            
           

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">

                {/* Header */}
                <div className="mb-16">
                    <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-5">
                        SYS://TECHNICAL_POSTS
                    </div>
                    <h1 className="retro-text-gradient text-4xl sm:text-6xl font-['Syncopate'] font-bold mb-6" style={{ lineHeight: '1.2' }}>
                        TEKNİK<br />YAZILARI
                    </h1>
                    <p className="text-gray-400 font-mono text-sm max-w-xl">
                        Yazılım mimarisi, web teknolojileri ve modern geliştirme pratikleri üzerine notlar.
                    </p>
                    <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
                </div>

                {/* Post listesi */}
                {posts.length === 0 ? (
                    <div className="border border-[#01cdfe]/20 p-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-[#01cdfe]/40 block mb-4">terminal</span>
                        <p className="font-mono text-gray-500 text-sm">// henüz yazı yok</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post, index) => (
                            <Link key={post.id} href={`/blog/${post.slug}`}>
                                <article
                                    className="group relative border p-6 sm:p-8 backdrop-blur-md transition-all duration-300"
                                    style={{ borderColor: 'rgba(1, 205, 254, 0.2)', backgroundColor: 'rgba(0,0,0,0.4)' }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon-pink)'
                                        ;(e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px var(--neon-pink)'
                                        ;(e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(1, 205, 254, 0.2)'
                                        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                                        ;(e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)'
                                    }}
                                >
                                    {/* Numara */}
                                    <div className="absolute top-6 right-6 font-mono text-[10px] text-gray-600">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Cover image */}
                                    {post.cover_image_url && (
                                        <div className="mb-6 aspect-video overflow-hidden border border-white/5">
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.cover_image_alt || post.title}
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {post.tags && (
                                        <div className="flex flex-wrap gap-2 mb-4">
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
                                    <h2
                                        className="font-['Syncopate'] text-lg sm:text-xl font-bold mb-3 uppercase transition-colors group-hover:text-[var(--neon-pink)]"
                                        style={{ color: 'var(--neon-cyan)' }}
                                    >
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 max-w-2xl">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-4 font-mono text-[10px] text-gray-500">
                                            {post.published_at && (
                                                <span>
                          {new Date(post.published_at).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                          })}
                        </span>
                                            )}
                                            {post.reading_time && (
                                                <span>{post.reading_time} dk okuma</span>
                                            )}
                                            <span style={{ color: 'var(--neon-green)' }}>{post.author}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-pink)' }} />
                                            <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-cyan)' }} />
                                            <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}