"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { translations } from '../translations'
import type { Language } from '../types'
import {useLanguage} from "@/app/context/LanguageContext";

const navItems = [
    { path: '/',         label: 'home',     icon: 'home' },
    { path: '/projects', label: 'projects', icon: 'folder_open' },
    { path: '/skills',   label: 'skills',   icon: 'bolt' },
    { path: '/blog',     label: 'blog',     icon: 'edit_note' },
    { path: '/publications',  label: 'publications', icon: 'menu_book' },
    { path: '/contact',  label: 'contact',  icon: 'send' },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { language, setLanguage } = useLanguage()
    const pathname = usePathname()
    const t = translations[language]

    const currentPath = navItems.find(item =>
        item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path)
    )?.path || '/'

    const currentViewLabel = navItems.find(item =>
        item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path)
    )?.label.toUpperCase() || 'HOME'

    return (
        <div className="relative min-h-screen flex overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 grid-background z-0 opacity-40 pointer-events-none" />
            <div className="fixed bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none">
                <div className="grid-floor w-[200%]" />
            </div>
            <div className="fixed inset-0 scanlines z-50 pointer-events-none opacity-20" />

            {/* Hamburger */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden fixed top-2 left-4 z-[70] p-1.5 bg-black/80 border border-[#ff71ce]/50 text-[#ff71ce] backdrop-blur-md"
                    aria-label="Open menu"
                >
                    <span className="material-symbols-outlined text-xl">menu</span>
                </button>
            )}

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed z-50 h-screen w-72
        bg-black/95 lg:bg-black/40
        backdrop-blur-xl border-r border-[#ff71ce]/30
        flex flex-col p-8 select-none
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Brand */}
                <div className="mb-12 lg:mb-16">
                    <div className="flex items-start justify-between mb-4">
                        <Link href="/" onClick={() => setIsSidebarOpen(false)}>
                            <h1 className="retro-text-gradient text-2xl font-['Syncopate'] font-bold leading-tight">
                                EDA DERYA<br />TOPER
                            </h1>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden flex-shrink-0 ml-2 p-1.5 border border-[#ff71ce]/30 text-[#ff71ce] hover:bg-[#ff71ce]/10 transition-all"
                        >
                            <span className="material-symbols-outlined text-lg leading-none">close</span>
                        </button>
                    </div>

                    {/* Sosyal medya */}
                    <div className="flex gap-4 mb-6 items-center">
                        <a href="https://github.com/edaderyatoper" target="_blank" rel="noopener noreferrer"
                           className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/eda-derya-toper" target="_blank" rel="noopener noreferrer"
                           className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect x="2" y="9" width="4" height="12"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                        <a href="https://x.com/ToperEda" target="_blank" rel="noopener noreferrer"
                           className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                            </svg>
                        </a>
                    </div>

                    <div className="text-[10px] font-mono text-[#01cdfe] tracking-[0.3em] uppercase opacity-80 border-t border-[#01cdfe]/20 pt-2">
                        {t.sidebar.subtitle}
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-3">
                    {navItems.map((item) => {
                        const isActive = item.path === '/'
                            ? pathname === '/'
                            : pathname?.startsWith(item.path)
                        const label = (item.label === 'blog' || item.label === 'publications')
                            ? t.sidebar.nav[item.label as keyof typeof t.sidebar.nav] || item.label.toUpperCase()
                            : t.sidebar.nav[item.label as keyof typeof t.sidebar.nav]
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`w-full flex items-center gap-4 px-4 py-3 border-2 transition-all duration-200 group relative
                  ${isActive
                                    ? 'border-[#ff71ce] bg-[#ff71ce]/10 text-white shadow-[4px_4px_0px_#01cdfe]'
                                    : 'border-transparent text-gray-400 hover:text-[#01cdfe] hover:border-[#01cdfe]/40 hover:translate-x-1'
                                }`}
                            >
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'text-[#ff71ce]' : 'group-hover:text-[#01cdfe]'}`}>
                  {item.icon}
                </span>
                                <span className="font-['Syncopate'] text-xs font-bold tracking-widest uppercase">
                  {label}
                </span>
                                {isActive && (
                                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#ff71ce] animate-pulse" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* System Status */}
                <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-mono text-[#fffb96]">
                            <span>{t.sidebar.cpuUsage}</span>
                            <span>2.4%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 overflow-hidden">
                            <div className="h-full bg-[#fffb96]" style={{ width: '24%' }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-mono text-[#01cdfe]">
                            <span>{t.sidebar.memBuffer}</span>
                            <span>OK</span>
                        </div>
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className={`h-1 flex-1 ${i <= 3 ? 'bg-[#01cdfe]' : 'bg-white/5'}`} />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                        <span>{t.sidebar.established}</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-[#ff71ce]" />
                            <div className="w-2 h-2 bg-[#01cdfe]" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="relative z-10 flex-1 lg:ml-72 h-screen overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#120422]/95 backdrop-blur-xl border-b border-[#01cdfe]/20 px-4 sm:px-8 lg:px-12 py-3">
                    <div className="flex justify-between items-center">
                        <div className="hidden sm:flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#ff71ce] text-base">terminal</span>
                            <span className="font-mono text-xs text-[#01cdfe]/80 tracking-widest uppercase">
                {t.system.path.replace('{view}', currentViewLabel)}
              </span>
                        </div>
                        <div className="flex items-center gap-3 ml-auto">
                            <div className="hidden sm:flex gap-4 items-center mr-2">
                                <a href="https://github.com/edaderyatoper" target="_blank" rel="noopener noreferrer"
                                   className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/eda-derya-toper" target="_blank" rel="noopener noreferrer"
                                   className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect x="2" y="9" width="4" height="12"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a href="https://x.com/ToperEda" target="_blank" rel="noopener noreferrer"
                                   className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                                    </svg>
                                </a>
                            </div>

                            <button
                                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                                className="flex items-center gap-2 px-3 py-1.5 border border-[#fffb96]/30 bg-black/40 hover:bg-[#fffb96]/10 hover:border-[#fffb96] transition-all"
                            >
                                <span className="material-symbols-outlined text-sm text-[#fffb96]">language</span>
                                <span className="font-mono text-[10px] text-[#fffb96] uppercase tracking-widest">
                  {language === 'tr' ? 'EN' : 'TR'}
                </span>
                            </button>

                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#05ffa1] shadow-[0_0_8px_#05ffa1]" />
                                <span className="font-mono text-[10px] text-[#05ffa1] hidden sm:inline">
                  {t.system.systemActive}
                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="px-4 sm:px-8 lg:px-12 pt-8 pb-24 animate-[fadeSlide_0.5s_ease-out]">
                    {children}
                </div>

                {/* Footer */}
                <div className="hidden sm:block fixed bottom-4 right-8 z-50 pointer-events-none text-right font-mono text-[10px] text-[#ff71ce] opacity-60">
                    {t.system.latency}: 14ms<br />
                    {t.system.encryption}
                </div>
            </div>

            <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}