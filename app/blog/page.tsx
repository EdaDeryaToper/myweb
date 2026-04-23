"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, Post } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function BlogPage() {
    const { language } = useLanguage()
    const t = translations[language]
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('technical_posts')
            .select('id, title, slug, excerpt, cover_image_url, cover_image_alt, published_at, author, tags, reading_time, language')
            .eq('published', true)
            .eq('language', language)
            .order('published_at', { ascending: false })
            .then(({ data }) => {
                setPosts((data as Post[]) || [])
                setLoading(false)
            })
    }, [language])

    return (
        <div className="max-w-4xl">
            <div className="mb-12 lg:mb-16">
                <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-5">
                    {t.blog.sysTag}
                </div>
                <h1 className="retro-text-gradient text-4xl sm:text-6xl font-['Syncopate'] font-bold mb-6" style={{ lineHeight: '1.2' }}>
                    {t.blog.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                    ))}
                </h1>
                <p className="text-gray-400 font-mono text-sm max-w-xl">{t.blog.subtitle}</p>
                <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
            </div>

            {loading && (
                <div className="flex items-center gap-3 py-12">
                    <div className="w-2 h-2 rounded-full bg-[#01cdfe] animate-ping" />
                    <span className="font-mono text-xs text-[#01cdfe]/60 tracking-widest">LOADING...</span>
                </div>
            )}

            {!loading && posts.length === 0 && (
                <div className="border border-[#01cdfe]/20 p-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#01cdfe]/40 block mb-4">terminal</span>
                    <p className="font-mono text-gray-500 text-sm">{t.blog.empty}</p>
                </div>
            )}

            {!loading && posts.length > 0 && (
                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                            <article
                                className="group relative border p-6 sm:p-8 backdrop-blur-md transition-all duration-300"
                                style={{ borderColor: 'rgba(1, 205, 254, 0.2)', backgroundColor: 'rgba(0,0,0,0.4)' }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = 'var(--neon-pink)'
                                    el.style.boxShadow = '4px 4px 0px var(--neon-pink)'
                                    el.style.transform = 'translate(-2px, -2px)'
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = 'rgba(1, 205, 254, 0.2)'
                                    el.style.boxShadow = 'none'
                                    el.style.transform = 'translate(0, 0)'
                                }}
                            >
                                <div className="absolute top-6 right-6 font-mono text-[10px] text-gray-600">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {post.cover_image_url && (
                                    <div className="mb-6 aspect-video overflow-hidden border border-white/5">
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.cover_image_alt || post.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                )}

                                {post.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.split(',').map(tag => (
                                            <span key={tag} className="text-[8px] font-mono border border-white/10 px-2 py-0.5 text-gray-500 uppercase tracking-widest">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <h2
                                    className="font-['Syncopate'] text-lg sm:text-xl font-bold mb-3 uppercase transition-colors group-hover:text-[var(--neon-pink)]"
                                    style={{ color: 'var(--neon-cyan)' }}
                                >
                                    {post.title}
                                </h2>

                                {post.excerpt && (
                                    <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 max-w-2xl">
                                        {post.excerpt}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-4 font-mono text-[10px] text-gray-500">
                                        {post.published_at && (
                                            <span>
                                                {new Date(post.published_at).toLocaleDateString(
                                                    language === 'tr' ? 'tr-TR' : 'en-US',
                                                    { day: 'numeric', month: 'long', year: 'numeric' }
                                                )}
                                            </span>
                                        )}
                                        {post.reading_time && <span>{post.reading_time} {t.blog.readingTime}</span>}
                                        <span style={{ color: 'var(--neon-green)' }}>{post.author}</span>
                                    </div>
                                    <span className="font-mono text-[10px] font-bold tracking-widest transition-colors group-hover:text-[var(--neon-pink)]" style={{ color: 'var(--neon-cyan)' }}>
                                        {t.blog.readMore} →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}