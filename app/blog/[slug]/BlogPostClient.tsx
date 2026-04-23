"use client"

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import { Post } from '../../lib/supabase'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../translations'

const lowlight = createLowlight(common)

interface TocItem {
    id: string
    text: string
    level: number
}

// Tiptap JSON içinden h2/h3 başlıklarını çıkar
function extractToc(content: Record<string, unknown> | null): TocItem[] {
    if (!content) return []
    const nodes = (content as { content?: unknown[] }).content || []
    const items: TocItem[] = []
    for (const node of nodes as { type: string; attrs?: { level?: number }; content?: { type: string; text?: string }[] }[]) {
        if (node.type === 'heading' && (node.attrs?.level === 2 || node.attrs?.level === 3)) {
            const text = node.content?.map(c => c.text || '').join('') || ''
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')
            items.push({ id, text, level: node.attrs?.level || 2 })
        }
    }
    return items
}

// generateHTML başlıklara id eklemez, CSS counter ile hedefliyoruz
// Bu yüzden render sonrası DOM'da id ataması yapıyoruz
function injectHeadingIds(tocItems: TocItem[]) {
    if (typeof window === 'undefined') return
    const headings = document.querySelectorAll('.blog-content h2, .blog-content h3')
    headings.forEach((el, i) => {
        if (tocItems[i]) el.id = tocItems[i].id
    })
}

export default function BlogPostClient({ post }: { post: Post }) {
    const { language } = useLanguage()
    const t = translations[language]
    const [readProgress, setReadProgress] = useState(0)
    const [activeHeading, setActiveHeading] = useState('')

    const tocItems = useMemo(() => extractToc(post.content), [post.content])

    // Readonly Tiptap editörü — generateHTML yerine bu kullanılıyor
    // Böylece CodeBlockLowlight highlight sınıflarını düzgün render eder
    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight }),
        ],
        content: post.content as object || null,
        editorProps: {
            attributes: { class: 'blog-content' },
        },
    })

    // Başlıklara id enjeksiyonu — editör render tamamlanınca çalış
    useEffect(() => {
        if (!editor) return
        const timer = setTimeout(() => injectHeadingIds(tocItems), 150)
        return () => clearTimeout(timer)
    }, [editor, tocItems])

    // Okuma ilerlemesi
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            const total = el.scrollHeight - el.clientHeight
            setReadProgress(total > 0 ? Math.round((el.scrollTop / total) * 100) : 0)
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Aktif başlık takibi
    useEffect(() => {
        if (!tocItems.length) return
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => { if (e.isIntersecting) setActiveHeading(e.target.id) })
            },
            { rootMargin: '-10% 0% -80% 0%' }
        )
        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [tocItems])

    return (
        <>
            {/* Okuma ilerleme çubuğu */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5 pointer-events-none">
                <div
                    className="h-full transition-all duration-150"
                    style={{
                        width: `${readProgress}%`,
                        background: 'linear-gradient(to right, var(--neon-pink), var(--neon-cyan))',
                    }}
                />
            </div>

            <div className="max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">

                    {/* Ana içerik */}
                    <article>
                        {/* Geri */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 mb-10 font-mono text-[11px] tracking-widest transition-colors"
                            style={{ color: 'var(--neon-cyan)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-pink)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            {t.blog.backToBlog}
                        </Link>

                        {/* Cover */}
                        {post.cover_image_url && (
                            <div className="mb-10 aspect-video overflow-hidden border border-white/10">
                                <img
                                    src={post.cover_image_url}
                                    alt={post.cover_image_alt || post.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                        )}

                        {/* Header */}
                        <header className="mb-10">
                            {post.tags && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.split(',').map(tag => (
                                        <span key={tag} className="text-[9px] font-mono border border-white/10 px-2 py-0.5 text-gray-500 uppercase tracking-widest">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h1
                                className="font-['Syncopate'] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-6"
                                style={{ color: 'var(--neon-cyan)', lineHeight: '1.25' }}
                            >
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] text-gray-500 pb-6 border-b border-white/10">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm" style={{ color: 'var(--neon-green)' }}>person</span>
                                    <span style={{ color: 'var(--neon-green)' }}>{post.author}</span>
                                </div>
                                {post.published_at && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                        <span>
                                            {new Date(post.published_at).toLocaleDateString(
                                                language === 'tr' ? 'tr-TR' : 'en-US',
                                                { day: 'numeric', month: 'long', year: 'numeric' }
                                            )}
                                        </span>
                                    </div>
                                )}
                                {post.reading_time && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        <span>{post.reading_time} {t.blog.readingTime}</span>
                                    </div>
                                )}
                                <div className="ml-auto font-mono text-[10px]" style={{ color: 'var(--neon-cyan)' }}>
                                    {readProgress}%
                                </div>
                            </div>
                        </header>

                        {/* İçerik — readonly Tiptap editörü */}
                        <EditorContent editor={editor} />

                        {/* Footer */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                            <div className="flex gap-1">
                                <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-pink)' }} />
                                <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-cyan)' }} />
                                <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                            </div>
                            <Link
                                href="/blog"
                                className="font-mono text-[11px] uppercase tracking-widest transition-colors"
                                style={{ color: 'var(--neon-cyan)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-pink)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                            >
                                {t.blog.backToBlog}
                            </Link>
                        </div>
                    </article>

                    {/* TOC — yan panel */}
                    {tocItems.length > 0 && (
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <div className="border p-5" style={{ borderColor: 'rgba(1, 205, 254, 0.2)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                    <h3
                                        className="font-['Syncopate'] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 pb-3 border-b"
                                        style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(1, 205, 254, 0.2)' }}
                                    >
                                        {t.blog.toc}
                                    </h3>
                                    <nav className="space-y-2">
                                        {tocItems.map(item => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block font-mono text-[11px] leading-relaxed transition-colors"
                                                style={{
                                                    paddingLeft: item.level === 3 ? '12px' : '0',
                                                    color: activeHeading === item.id ? 'var(--neon-pink)' : 'rgba(156,163,175,0.7)',
                                                }}
                                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                                                onMouseLeave={e => (e.currentTarget.style.color = activeHeading === item.id ? 'var(--neon-pink)' : 'rgba(156,163,175,0.7)')}
                                            >
                                                {activeHeading === item.id && <span style={{ color: 'var(--neon-pink)' }}>▸ </span>}
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>

                                    {/* İlerleme */}
                                    <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(1, 205, 254, 0.1)' }}>
                                        <div className="flex justify-between font-mono text-[9px] text-gray-600 mb-2">
                                            <span>PROGRESS</span>
                                            <span style={{ color: 'var(--neon-cyan)' }}>{readProgress}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-300"
                                                style={{
                                                    width: `${readProgress}%`,
                                                    background: 'linear-gradient(to right, var(--neon-pink), var(--neon-cyan))',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </>
    )
}