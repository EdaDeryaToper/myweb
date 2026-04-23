"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import { supabase, Post } from '../lib/supabase'

const lowlight = createLowlight(common)
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin1992'

type View = 'list' | 'new' | 'edit'

// ─── Araç çubuğu butonu ──────────────────────────────
function ToolBtn({ active, onClick, title, children }: {
    active?: boolean; onClick: () => void; title?: string; children: React.ReactNode
}) {
    return (
        <button type="button" title={title} onClick={onClick}
                className="px-2 py-1 font-mono text-[11px] border transition-all"
                style={{
                    borderColor: active ? 'var(--neon-pink)' : 'rgba(255,255,255,0.1)',
                    color: active ? 'var(--neon-pink)' : 'rgba(156,163,175,0.8)',
                    backgroundColor: active ? 'rgba(255,113,206,0.1)' : 'transparent',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--neon-cyan)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
            {children}
        </button>
    )
}

// ─── Input yardımcıları ───────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-[10px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--neon-pink)' }}>
                {label}
            </label>
            {children}
        </div>
    )
}
const iCls = "w-full bg-black/80 border-2 px-4 py-3 text-white placeholder-white/10 font-mono text-sm focus:outline-none transition-all"
const iSty = { borderColor: 'var(--neon-purple)' }
const iFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 15px rgba(1,205,254,0.15)'
}
const iBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--neon-purple)'; e.target.style.boxShadow = 'none'
}

// ─── Giriş ekranı ────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [pass, setPass] = useState('')
    const [error, setError] = useState(false)
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (pass === ADMIN_PASS) { sessionStorage.setItem('admin_auth', '1'); onLogin() }
        else { setError(true); setTimeout(() => setError(false), 2000) }
    }
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-full max-w-sm p-8 border-2 backdrop-blur-xl"
                 style={{ borderColor: 'var(--neon-purple)', boxShadow: '8px 8px 0px var(--neon-cyan)', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                <div className="mb-8">
                    <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-4">SYS://ADMIN_AUTH</div>
                    <h1 className="font-['Syncopate'] text-2xl font-bold" style={{ color: 'var(--neon-cyan)' }}>ADMIN<br />PANELİ</h1>
                </div>
                <form onSubmit={submit} className="space-y-5">
                    <Field label="Şifre // Auth_Key">
                        <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
                               className={iCls} style={{ borderColor: error ? 'var(--neon-pink)' : 'var(--neon-purple)' }}
                               onFocus={iFocus} onBlur={iBlur} />
                        {error && <p className="mt-2 font-mono text-[10px]" style={{ color: 'var(--neon-pink)' }}>// hatalı şifre</p>}
                    </Field>
                    <button type="submit" className="w-full py-3 font-['Syncopate'] font-bold text-sm uppercase tracking-widest text-black transition-all"
                            style={{ backgroundColor: 'var(--neon-cyan)', boxShadow: '4px 4px 0px var(--neon-purple)' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--neon-purple)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--neon-purple)' }}>
                        Giriş
                    </button>
                </form>
            </div>
        </div>
    )
}

// ─── Editör (yeni + düzenle için ortak) ──────────────
function PostEditor({ initialPost, onSaved, onCancel }: {
    initialPost?: Post; onSaved: () => void; onCancel: () => void
}) {
    const isEdit = !!initialPost
    const [form, setForm] = useState({
        title: initialPost?.title || '',
        slug: initialPost?.slug || '',
        excerpt: initialPost?.excerpt || '',
        author: initialPost?.author || 'Eda Derya Toper',
        tags: initialPost?.tags || '',
        reading_time: initialPost?.reading_time?.toString() || '',
        cover_image_url: initialPost?.cover_image_url || '',
        cover_image_alt: initialPost?.cover_image_alt || '',
        language: (initialPost?.language || 'tr') as 'tr' | 'en',
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight }),
        ],
        content: (initialPost?.content as object) || '<p>Yazmaya başla...</p>',
        editorProps: { attributes: { class: 'blog-content min-h-[400px] focus:outline-none' } },
    })

    const handleTitleChange = (val: string) => {
        const slug = val.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
        setForm(f => ({ ...f, title: val, slug: isEdit ? f.slug : slug }))
    }

    const handleSave = useCallback(async (publish: boolean) => {
        if (!form.title || !form.slug) { setError('Başlık ve slug zorunlu.'); return }
        setSaving(true); setError('')
        const payload = {
            title: form.title, slug: form.slug,
            excerpt: form.excerpt || null,
            content: editor?.getJSON() || null,
            author: form.author,
            tags: form.tags || null,
            reading_time: form.reading_time ? parseInt(form.reading_time) : null,
            cover_image_url: form.cover_image_url || null,
            cover_image_alt: form.cover_image_alt || null,
            language: form.language,
            published: publish,
            published_at: publish ? (initialPost?.published_at || new Date().toISOString()) : null,
            updated_at: new Date().toISOString(),
        }
        const { error: dbError } = isEdit
            ? await supabase.from('technical_posts').update(payload).eq('id', initialPost!.id)
            : await supabase.from('technical_posts').insert(payload)
        setSaving(false)
        if (dbError) { setError(dbError.message) }
        else { setSaved(true); setTimeout(() => { setSaved(false); onSaved() }, 1200) }
    }, [form, editor, isEdit, initialPost, onSaved])

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Üst bar */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
                        {isEdit ? 'SYS://EDIT_POST' : 'SYS://NEW_POST'}
                    </div>
                    <h1 className="font-['Syncopate'] text-2xl font-bold" style={{ color: 'var(--neon-cyan)' }}>
                        {isEdit ? 'DÜZENLE' : 'YENİ YAZI'}
                    </h1>
                </div>
                <button onClick={onCancel}
                        className="flex items-center gap-2 font-mono text-[11px] tracking-widest transition-colors"
                        style={{ color: 'rgba(156,163,175,0.6)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(156,163,175,0.6)')}>
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Listeye dön
                </button>
            </div>

            {/* Meta alanlar */}
            <div className="border-2 p-6 lg:p-8 backdrop-blur-xl space-y-5"
                 style={{ borderColor: 'var(--neon-purple)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--neon-cyan)' }}>// META BİLGİLER</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                        <Field label="Başlık *">
                            <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
                                   placeholder="YAZI BAŞLIĞI" className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                        </Field>
                    </div>
                    <Field label="Slug *">
                        <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                               placeholder="yazi-basligi" className={iCls} style={{ ...iSty, color: 'var(--neon-yellow)' }} onFocus={iFocus} onBlur={iBlur} />
                    </Field>
                    <Field label="Yazar">
                        <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                               className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Özet">
                            <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                      placeholder="Kısa açıklama..." className={`${iCls} resize-none`} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                        </Field>
                    </div>
                    <Field label="Etiketler (virgülle ayır)">
                        <input type="text" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                               placeholder="react, nextjs, typescript" className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                    </Field>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Field label="Okuma süresi (dk)">
                                <input type="number" value={form.reading_time} onChange={e => setForm(f => ({ ...f, reading_time: e.target.value }))}
                                       placeholder="5" className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                            </Field>
                        </div>
                        <div className="flex-1">
                            <Field label="Dil">
                                <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value as 'tr' | 'en' }))}
                                        className={`${iCls} appearance-none`} style={{ ...iSty, color: 'var(--neon-yellow)' }} onFocus={iFocus} onBlur={iBlur}>
                                    <option value="tr">TR — Türkçe</option>
                                    <option value="en">EN — English</option>
                                </select>
                            </Field>
                        </div>
                    </div>
                    <Field label="Kapak görseli URL">
                        <input type="url" value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
                               placeholder="https://..." className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                    </Field>
                    <Field label="Kapak görseli alt metni">
                        <input type="text" value={form.cover_image_alt} onChange={e => setForm(f => ({ ...f, cover_image_alt: e.target.value }))}
                               placeholder="Görsel açıklaması" className={iCls} style={iSty} onFocus={iFocus} onBlur={iBlur} />
                    </Field>
                </div>
            </div>

            {/* Tiptap editörü */}
            <div className="border-2 backdrop-blur-xl overflow-hidden"
                 style={{ borderColor: 'var(--neon-purple)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <div className="flex flex-wrap gap-1.5 p-3 border-b"
                     style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Kalın">B</ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="İtalik"><em>I</em></ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive('code')} title="Inline kod">`</ToolBtn>
                    <div className="w-px bg-white/10 mx-1" />
                    <ToolBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })} title="Başlık 1">H1</ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Başlık 2">H2</ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Başlık 3">H3</ToolBtn>
                    <div className="w-px bg-white/10 mx-1" />
                    <ToolBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Liste">• —</ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Numaralı liste">1.</ToolBtn>
                    <div className="w-px bg-white/10 mx-1" />
                    <ToolBtn onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')} title="Kod bloğu">{'</>'}</ToolBtn>
                    {editor?.isActive('codeBlock') && (
                        <select className="px-2 py-1 font-mono text-[11px] border bg-black text-white focus:outline-none"
                                style={{ borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                                defaultValue=""
                                onChange={e => { if (e.target.value) editor?.chain().focus().setCodeBlock({ language: e.target.value }).run() }}>
                            <option value="" disabled>dil seç</option>
                            <option value="typescript">TypeScript</option>
                            <option value="javascript">JavaScript</option>
                            <option value="csharp">C#</option>
                            <option value="python">Python</option>
                            <option value="bash">Bash</option>
                            <option value="sql">SQL</option>
                            <option value="json">JSON</option>
                            <option value="css">CSS</option>
                            <option value="html">HTML</option>
                        </select>
                    )}
                    <ToolBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Alıntı">"</ToolBtn>
                    <ToolBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Ayırıcı">—</ToolBtn>
                </div>
                <div className="p-6 lg:p-8">
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Kaydet butonları */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button type="button" onClick={() => handleSave(false)} disabled={saving}
                        className="px-8 py-3 border-2 font-['Syncopate'] text-sm font-bold uppercase tracking-widest transition-all"
                        style={{ borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)', opacity: saving ? 0.5 : 1 }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(1,205,254,0.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                    Taslak Kaydet
                </button>
                <button type="button" onClick={() => handleSave(true)} disabled={saving}
                        className="px-8 py-3 font-['Syncopate'] text-sm font-bold uppercase tracking-widest text-black transition-all"
                        style={{ backgroundColor: 'var(--neon-pink)', boxShadow: '6px 6px 0px var(--neon-purple)', opacity: saving ? 0.5 : 1 }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '3px 3px 0px var(--neon-purple)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--neon-purple)' }}>
                    {saving ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Yayınla')}
                </button>
                <div className="flex items-center gap-3 ml-auto">
                    {saved && (
                        <div className="flex items-center gap-2 font-mono text-[11px]" style={{ color: 'var(--neon-green)' }}>
                            <div className="w-2 h-2 rounded-full bg-[#05ffa1] animate-pulse" />
                            {isEdit ? 'GÜNCELLENDİ' : 'KAYDEDİLDİ'}
                        </div>
                    )}
                    {error && <p className="font-mono text-[11px]" style={{ color: 'var(--neon-pink)' }}>// {error}</p>}
                </div>
            </div>
        </div>
    )
}

// ─── Yazı listesi ─────────────────────────────────────
function PostList({ onNew, onEdit }: { onNew: () => void; onEdit: (post: Post) => void }) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<number | null>(null)

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('technical_posts')
            .select('id, title, slug, published, language, published_at, reading_time, tags')
            .order('created_at', { ascending: false })
        setPosts((data as Post[]) || [])
        setLoading(false)
    }

    useEffect(() => { fetchPosts() }, [])

    const handleDelete = async (id: number) => {
        if (!confirm('Bu yazıyı silmek istediğine emin misin?')) return
        setDeleting(id)
        await supabase.from('technical_posts').delete().eq('id', id)
        await fetchPosts()
        setDeleting(null)
    }

    const handleTogglePublish = async (post: Post) => {
        await supabase.from('technical_posts')
            .update({ published: !post.published, published_at: !post.published ? new Date().toISOString() : null })
            .eq('id', post.id)
        await fetchPosts()
    }

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex items-end justify-between">
                <div>
                    <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
                        SYS://ADMIN_PANEL
                    </div>
                    <h1 className="font-['Syncopate'] text-3xl font-bold" style={{ color: 'var(--neon-cyan)' }}>YAZILAR</h1>
                </div>
                <button onClick={onNew}
                        className="flex items-center gap-2 px-6 py-3 font-['Syncopate'] text-sm font-bold uppercase tracking-widest text-black transition-all"
                        style={{ backgroundColor: 'var(--neon-pink)', boxShadow: '4px 4px 0px var(--neon-purple)' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--neon-purple)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--neon-purple)' }}>
                    <span className="material-symbols-outlined text-base">add</span>
                    Yeni Yazı
                </button>
            </div>

            {loading && (
                <div className="flex items-center gap-3 py-12">
                    <div className="w-2 h-2 rounded-full bg-[#01cdfe] animate-ping" />
                    <span className="font-mono text-xs text-[#01cdfe]/60 tracking-widest">LOADING...</span>
                </div>
            )}

            {!loading && posts.length === 0 && (
                <div className="border border-[#01cdfe]/20 p-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#01cdfe]/40 block mb-4">edit_note</span>
                    <p className="font-mono text-gray-500 text-sm">// henüz yazı yok</p>
                </div>
            )}

            {!loading && posts.length > 0 && (
                <div className="space-y-3">
                    {posts.map(post => (
                        <div key={post.id}
                             className="flex items-center gap-4 border p-4 transition-all"
                             style={{ borderColor: 'rgba(1,205,254,0.15)', backgroundColor: 'rgba(0,0,0,0.4)' }}
                             onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(1,205,254,0.3)')}
                             onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(1,205,254,0.15)')}>

                            {/* Yayın durumu — tıklanabilir */}
                            <button onClick={() => handleTogglePublish(post)}
                                    title={post.published ? 'Yayından kaldır' : 'Yayınla'}
                                    className="flex-shrink-0 w-3 h-3 rounded-full transition-all hover:scale-125"
                                    style={{
                                        backgroundColor: post.published ? 'var(--neon-green)' : 'rgba(255,255,255,0.15)',
                                        boxShadow: post.published ? '0 0 6px var(--neon-green)' : 'none',
                                    }} />

                            {/* Başlık + meta */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-['Syncopate'] text-sm font-bold truncate" style={{ color: 'var(--neon-cyan)' }}>
                                        {post.title}
                                    </span>
                                    <span className="flex-shrink-0 font-mono text-[9px] border px-1.5 py-0.5 uppercase"
                                          style={{ borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)' }}>
                                        {post.language}
                                    </span>
                                    {!post.published && (
                                        <span className="flex-shrink-0 font-mono text-[9px] border px-1.5 py-0.5 uppercase"
                                              style={{ borderColor: 'rgba(156,163,175,0.3)', color: 'rgba(156,163,175,0.5)' }}>
                                            taslak
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 font-mono text-[10px] text-gray-600">
                                    <span>/{post.slug}</span>
                                    {post.published_at && <span>{new Date(post.published_at).toLocaleDateString('tr-TR')}</span>}
                                    {post.tags && <span className="truncate">{post.tags}</span>}
                                </div>
                            </div>

                            {/* Aksiyonlar */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => onEdit(post)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] tracking-widest transition-all"
                                        style={{ borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(1,205,254,0.1)' }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Düzenle
                                </button>
                                <button onClick={() => handleDelete(post.id)} disabled={deleting === post.id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] tracking-widest transition-all"
                                        style={{ borderColor: 'rgba(255,113,206,0.3)', color: 'rgba(255,113,206,0.5)', opacity: deleting === post.id ? 0.4 : 1 }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-pink)'; e.currentTarget.style.color = 'var(--neon-pink)' }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,113,206,0.3)'; e.currentTarget.style.color = 'rgba(255,113,206,0.5)' }}>
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Ana bileşen ──────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed] = useState(false)
    const [view, setView] = useState<View>('list')
    const [editingPost, setEditingPost] = useState<Post | undefined>(undefined)

    useEffect(() => {
        if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true)
    }, [])

    const handleEdit = async (post: Post) => {
        const { data } = await supabase.from('technical_posts').select('*').eq('id', post.id).single()
        if (data) { setEditingPost(data as Post); setView('edit') }
    }

    const handleSaved = () => { setEditingPost(undefined); setView('list') }
    const handleCancel = () => { setEditingPost(undefined); setView('list') }

    if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }}
                        className="font-mono text-[10px] tracking-widest transition-colors"
                        style={{ color: 'rgba(156,163,175,0.4)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-pink)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(156,163,175,0.4)')}>
                    ÇIKIŞ
                </button>
            </div>
            {view === 'list' && <PostList onNew={() => setView('new')} onEdit={handleEdit} />}
            {view === 'new' && <PostEditor onSaved={handleSaved} onCancel={handleCancel} />}
            {view === 'edit' && editingPost && <PostEditor initialPost={editingPost} onSaved={handleSaved} onCancel={handleCancel} />}
        </div>
    )
}