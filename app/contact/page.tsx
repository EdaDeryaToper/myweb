"use client"

import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function ContactPage() {
    const { language } = useLanguage()
    const t = translations[language]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl">
            <div className="lg:col-span-2">
                <div className="bg-black/60 border-2 p-5 lg:p-8 backdrop-blur-xl relative"
                     style={{ borderColor: 'var(--neon-purple)', boxShadow: '8px 8px 0px var(--neon-cyan)' }}>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-pink)' }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }} />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 border-b pb-4"
                         style={{ borderColor: 'var(--neon-cyan)' }}>
                        <h2 className="retro-text-gradient text-3xl lg:text-4xl font-['Syncopate'] uppercase">{t.contact.title}</h2>
                        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">{t.contact.subtitle}</span>
                    </div>
                    <form className="space-y-6 lg:space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
                            {[
                                { label: t.contact.formLabels.name, type: 'text', placeholder: t.contact.formLabels.namePlaceholder },
                                { label: t.contact.formLabels.email, type: 'email', placeholder: t.contact.formLabels.emailPlaceholder },
                            ].map((field) => (
                                <div key={field.label}>
                                    <label className="block text-[10px] uppercase tracking-widest mb-3 font-bold" style={{ color: 'var(--neon-pink)' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full bg-black/80 border-2 px-4 py-3 text-white placeholder-white/10 font-mono focus:outline-none transition-all"
                                        style={{ borderColor: 'var(--neon-purple)' }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 15px var(--neon-cyan)' }}
                                        onBlur={(e) => { e.target.style.borderColor = 'var(--neon-purple)'; e.target.style.boxShadow = 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest mb-3 font-bold" style={{ color: 'var(--neon-pink)' }}>
                                {t.contact.formLabels.message}
                            </label>
                            <textarea
                                rows={5}
                                placeholder={t.contact.formLabels.messagePlaceholder}
                                className="w-full bg-black/80 border-2 px-4 py-3 text-white placeholder-white/10 font-mono focus:outline-none transition-all resize-none"
                                style={{ borderColor: 'var(--neon-purple)' }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 15px var(--neon-cyan)' }}
                                onBlur={(e) => { e.target.style.borderColor = 'var(--neon-purple)'; e.target.style.boxShadow = 'none' }}
                            />
                        </div>
                        <button
                            className="group relative w-full py-4 lg:py-5 text-black font-['Syncopate'] font-bold text-base lg:text-xl uppercase tracking-tighter transition-all active:translate-x-2 active:translate-y-2"
                            style={{ backgroundColor: 'var(--neon-pink)', boxShadow: '8px 8px 0px var(--neon-purple)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(1px,1px)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--neon-purple)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '8px 8px 0px var(--neon-purple)' }}
                        >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {t.contact.formLabels.submit}
                  <span className="material-symbols-outlined text-xl">send</span>
              </span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
                <div className="bg-black/40 border p-5 lg:p-6 backdrop-blur-md" style={{ borderColor: 'var(--neon-cyan)' }}>
                    <h3 className="font-['Syncopate'] text-sm font-bold mb-5 uppercase tracking-widest border-b pb-2"
                        style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}>
                        {t.contact.externalNodes}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 lg:gap-4">
                        {[
                            { icon: 'save', label: t.contact.links.github, sub: t.contact.links.githubSub, color: 'var(--neon-pink)', href: 'https://github.com/edaderyatoper' },
                            { icon: 'cable', label: t.contact.links.linkedin, sub: t.contact.links.linkedinSub, color: 'var(--neon-cyan)', href: 'https://linkedin.com/in/eda-derya-toper' },
                            { icon: 'podcasts', label: t.contact.links.discord, sub: t.contact.links.discordSub, color: 'var(--neon-yellow)', href: '#' },
                        ].map((link) => (
                            <a key={link.label} href={link.href}
                               className="flex items-center gap-4 p-3 lg:p-4 border transition-all"
                               style={{ borderColor: 'var(--neon-purple)' }}
                               onMouseEnter={(e) => { e.currentTarget.style.borderColor = link.color; e.currentTarget.style.backgroundColor = `${link.color}15` }}
                               onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neon-purple)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                            >
                                <span className="material-symbols-outlined text-2xl lg:text-3xl" style={{ color: link.color }}>{link.icon}</span>
                                <div>
                                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">{link.label}</div>
                                    <div className="text-[8px] font-mono text-gray-500">{link.sub}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="p-5 lg:p-6 border" style={{ backgroundColor: 'rgba(255, 107, 157, 0.05)', borderColor: 'var(--neon-pink)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--neon-green)' }} />
                        <span className="text-[10px] font-mono" style={{ color: 'var(--neon-green)' }}>{t.contact.nodeStatus}</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-gray-500 font-mono">{t.contact.statusMessage}</p>
                </div>
            </div>
        </div>
    )
}