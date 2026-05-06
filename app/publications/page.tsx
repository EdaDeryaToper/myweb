"use client"

import React, { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const PUBLICATION = {
    title: "Virtual Reality-Based Control and Simulation of a Real Robotic Arm",
    authors: [
        { name: "Eda Derya Toper", email: "edaderya.toper@iuc.ogr.edu.tr" },
        { name: "Prof. Dr. Fırat Kaçar", email: "fkacar@iuc.edu.tr" },
        { name: "Doc. Dr. Serap Cekli", email: "serap.cekli@iuc.edu.tr" },
    ],
    affiliation: "Electrical-Electronics Engineering Department, Istanbul University - Cerrahpasa, Istanbul, Turkey",
    journal: "CEAI — Control Engineering and Applied Informatics",
    vol: "Vol.28, No.1, pp. 38-47, 2026",
    keywords: ["Robotic arm", "Virtual reality", "Robot operating system", "Kinematics", "Robot manipulator"],
    abstract: `Industry 4.0 and digital factories leverage key technologies such as virtual reality (VR) to design, simulate, optimise, and interact with physical production systems remotely or collaboratively. Recent advancements in industrial and aerospace applications demonstrate that integrating VR with versatile robotic control techniques can unlock new opportunities. VR offers an "extended arm" for physical environments by providing a user-friendly human-machine interface, enhancing sustainability, testability, and functionality in robotic control systems.

This research focuses on a widely used and continuously evolving robotic arm, designed to operate in an integrated system that functions in both real and virtual environments. A 3-degree-of-freedom (3DOF) robotic arm was initially developed and later upgraded to a 5DOF system. The robotic arm is integrated with Virtual Reality (VR) interfaces based on the Robot Operating System (ROS) and Unity3D platforms.

In the real-world scenario, inverse kinematics is applied for the robot's movement mechanism, while gradient descent algorithms are used for the virtual model. Forward kinematics using homogeneous transformation matrices has been employed to verify the accuracy of the robotic arm's movements. VR headsets and controllers are used to direct the virtual control of the robotic arm.

The goal of this study is to develop integrated systems that enable control of real-world operations via remote observation, addressing challenges such as prototyping costs and safety risks. By offering an innovative approach to robotic arm control through VR integration, this work contributes to the advancement of Industry 4.0 technologies.`,
    pdfUrl: "http://www.ceai.srait.ro/index.php?journal=ceai&page=article&op=viewFile&path[]=9592&path[]=1797",
    links: [
        {
            label: "CEAI Journal",
            sub: "CEAI.SRAIT.RO",
            icon: "article",
            url: "http://www.ceai.srait.ro/index.php?journal=ceai&page=article&op=viewFile&path[]=9592&path[]=1797",
            color: "var(--neon-pink)",
        },
        {
            label: "ResearchGate",
            sub: "RESEARCHGATE.NET",
            icon: "science",
            url: "https://www.researchgate.net/publication/403203305_Virtual_Reality-Based_Control_and_Simulation_of_a_Real_Robotic_Arm",
            color: "var(--neon-cyan)",
        },
        {
            label: "Avesis",
            sub: "AVESIS.ISTANBUL.EDU.TR",
            icon: "school",
            url: "https://avesis.istanbul.edu.tr/yayin/ab86e5b2-46dd-4655-b764-5675e3c04980/virtual-reality-based-control-and-simulation-of-a-real-robotic-arm",
            color: "var(--neon-yellow)",
        },
    ],
}

export default function PublicationsPage() {
    const { language } = useLanguage()
    const t = translations[language]
    const [pdfOpen, setPdfOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(true)
    const pdfRef = useRef<HTMLDivElement>(null)

    const handleCopyAbstract = () => {
        navigator.clipboard.writeText(PUBLICATION.abstract)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
//google arama motoru makale yayını için 
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ScholarlyArticle",
                "headline": "Virtual Reality-Based Control and Simulation of a Real Robotic Arm",
                "author": [
                    { "@type": "Person", "name": "Eda Derya Toper", "url": "https://www.edaderyatoper.com" },
                    { "@type": "Person", "name": "Fırat Kaçar" },
                    { "@type": "Person", "name": "Serap Cekli" }
                ],
                "publisher": {
                    "@type": "Organization",
                    "name": "CEAI — Control Engineering and Applied Informatics"
                },
                "isPartOf": {
                    "@type": "PublicationVolume",
                    "volumeNumber": "28",
                    "issueNumber": "1",
                    "pageStart": "38",
                    "pageEnd": "47"
                },
                "datePublished": "2026",
                "url": "https://www.edaderyatoper.com/publications",
                "sameAs": [
                    "https://www.researchgate.net/publication/403203305_Virtual_Reality-Based_Control_and_Simulation_of_a_Real_Robotic_Arm",
                    "https://avesis.istanbul.edu.tr/yayin/ab86e5b2-46dd-4655-b764-5675e3c04980/virtual-reality-based-control-and-simulation-of-a-real-robotic-arm",
                    "http://www.ceai.srait.ro/index.php?journal=ceai&page=article&op=viewFile&path[]=9592&path[]=1797"
                ],
                "keywords": "Robotic arm, Virtual reality, Robot operating system, Kinematics, Robot manipulator",
                "description": "A 3DOF/5DOF robotic arm integrated with VR interfaces based on ROS and Unity3D platforms for remote control and simulation."
            })
        }}
    />
    return (
        <div className="max-w-5xl space-y-10">

            {/* Header */}
            <div>
                <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-5">
                    {t.publications.sysTag}
                </div>
                <h1
                    className="retro-text-gradient text-4xl sm:text-5xl font-['Syncopate'] font-bold mb-3"
                    style={{ lineHeight: '1.2' }}
                >
                    {t.publications.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                    ))}
                </h1>
                <p className="text-gray-400 font-mono text-sm">{t.publications.subtitle}</p>
                <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
            </div>

            {/* Makale kartı */}
            <div
                className="border-2 backdrop-blur-xl overflow-hidden"
                style={{ borderColor: 'var(--neon-purple)', backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                {/* Kart bar */}
                <div
                    className="flex items-center justify-between px-6 py-3 border-b"
                    style={{ borderColor: 'rgba(157,132,183,0.2)', backgroundColor: 'rgba(157,132,183,0.05)' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--neon-pink)' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--neon-purple)' }}>
                        PAPER_01.PDF
                    </span>
                </div>

                <div className="p-6 lg:p-8 space-y-8">

                    {/* Journal satırı — journal solda, vol sağda */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {/*<span
                                className="font-mono text-[9px] border px-2 py-0.5 uppercase tracking-widest"
                                style={{ borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}
                            >
                                {t.publications.peerReviewed}
                            </span>*/}
                            <span
                                className="font-mono text-[9px] border px-2 py-0.5 tracking-widest"
                                style={{ borderColor: 'rgba(157,132,183,0.35)', color: 'var(--neon-yellow)' }}
                            >
                                {PUBLICATION.journal}
                            </span>
                        </div>
                        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(255,230,109,0.65)' }}>
                            {PUBLICATION.vol}
                        </span>
                    </div>

                    {/* Başlık + yazarlar */}
                    <div>
                        <h2
                            className="font-['Syncopate'] text-xl sm:text-2xl font-bold uppercase mb-5 leading-snug"
                            style={{ color: 'var(--neon-cyan)' }}
                        >
                            {PUBLICATION.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 mb-3">
                            {PUBLICATION.authors.map((author, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: i === 0 ? 'var(--neon-pink)' : 'var(--neon-purple)' }}
                                    />
                                    <span className="font-mono text-xs text-white">
                                        {author.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="font-mono text-[10px] text-gray-500 italic">{PUBLICATION.affiliation}</p>
                    </div>

                    {/* Abstract */}
                    <div
                        className="border p-5 lg:p-6"
                        style={{ borderColor: 'rgba(78,205,196,0.12)', backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span
                                className="font-['Syncopate'] text-[10px] font-bold tracking-[0.3em] uppercase"
                                style={{ color: 'var(--neon-cyan)' }}
                            >
                                {t.publications.abstract}
                            </span>
                            <button
                                onClick={handleCopyAbstract}
                                className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest transition-colors"
                                style={{ color: copied ? 'var(--neon-green)' : 'rgba(156,163,175,0.35)' }}
                                onMouseEnter={e => { if (!copied) e.currentTarget.style.color = 'var(--neon-cyan)' }}
                                onMouseLeave={e => { if (!copied) e.currentTarget.style.color = 'rgba(156,163,175,0.35)' }}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {copied ? 'check' : 'content_copy'}
                                </span>
                                {copied ? t.publications.copied : t.publications.copy}
                            </button>
                        </div>
                        {PUBLICATION.abstract.split('\n\n').map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: '#cdd0d6' }}>
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Keywords */}
                    <div>
                        <span
                            className="font-['Syncopate'] text-[10px] font-bold tracking-[0.3em] uppercase block mb-3"
                            style={{ color: 'var(--neon-yellow)' }}
                        >
                            {t.publications.keywords}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {PUBLICATION.keywords.map(kw => (
                                <span
                                    key={kw}
                                    className="font-mono text-[9px] border px-2.5 py-1 uppercase tracking-widest"
                                    style={{ borderColor: 'rgba(255,230,109,0.2)', color: 'rgba(255,230,109,0.55)' }}
                                >
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Erişim linkleri */}
                    <div>
                        <span
                            className="font-['Syncopate'] text-[10px] font-bold tracking-[0.3em] uppercase block mb-3"
                            style={{ color: 'var(--neon-cyan)' }}
                        >
                            {t.publications.accessLinks}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {PUBLICATION.links.map(link => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 border transition-all duration-200"
                                    style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(0,0,0,0.3)' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = link.color
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                >
                                    <span className="material-symbols-outlined text-2xl flex-shrink-0" style={{ color: link.color }}>
                                        {link.icon}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-[11px] font-bold text-white uppercase tracking-widest truncate">
                                            {link.label}
                                        </div>
                                        <div className="text-[9px] font-mono text-gray-600 mt-0.5 truncate">
                                            {link.sub}
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-sm ml-auto flex-shrink-0" style={{ color: link.color, opacity: 0.4 }}>
                                        open_in_new
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                        {/* PDF Görüntüle */}
                        <button
                            onClick={() => {
                                const opening = !pdfOpen
                                setPdfOpen(opening)
                                setPdfLoading(true)
                                if (opening) {
                                    setTimeout(() => {
                                        pdfRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                                    }, 100)
                                }
                            }}
                            className="flex items-center gap-3 px-5 py-3 border-2 transition-all duration-200 relative"
                            style={{
                                borderColor: pdfOpen ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                                backgroundColor: pdfOpen ? 'rgba(255,107,157,0.1)' : 'transparent',
                                boxShadow: pdfOpen ? '4px 4px 0px var(--neon-purple)' : 'none',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'var(--neon-pink)'
                                e.currentTarget.style.backgroundColor = 'rgba(255,107,157,0.08)'
                                e.currentTarget.style.boxShadow = '4px 4px 0px var(--neon-purple)'
                                e.currentTarget.style.transform = 'translate(1px,1px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = pdfOpen ? 'var(--neon-pink)' : 'var(--neon-cyan)'
                                e.currentTarget.style.backgroundColor = pdfOpen ? 'rgba(255,107,157,0.1)' : 'transparent'
                                e.currentTarget.style.boxShadow = pdfOpen ? '4px 4px 0px var(--neon-purple)' : 'none'
                                e.currentTarget.style.transform = 'translate(0,0)'
                            }}
                        >
                            <span
                                className="material-symbols-outlined text-2xl"
                                style={{ color: pdfOpen ? 'var(--neon-pink)' : 'var(--neon-cyan)' }}
                            >
                                {pdfOpen ? 'close' : 'picture_as_pdf'}
                            </span>
                            <span
                                className="font-['Syncopate'] text-xs font-bold tracking-widest uppercase"
                                style={{ color: pdfOpen ? 'var(--neon-pink)' : 'var(--neon-white)' }}
                            >
                                {pdfOpen ? t.publications.closePdf : t.publications.viewPdf}
                            </span>
                            {pdfOpen && (
                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-pink)' }} />
                            )}
                        </button>

                        {/* Yeni Sekmede Aç */}
                        <a
                            href={PUBLICATION.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-5 py-3 border-2 transition-all duration-200"
                            style={{ borderColor: 'var(--neon-cyan)', color: '#fff' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(78,205,196,0.35)'
                                e.currentTarget.style.color = 'var(--neon-cyan)'
                                e.currentTarget.style.transform = 'translate(1px,0)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--neon-cyan)'
                                e.currentTarget.style.color = '#fff'
                                e.currentTarget.style.transform = 'translate(0,0)'
                            }}
                        >
                            <span className="material-symbols-outlined text-2xl" style={{color: 'var(--neon-cyan)'}}>open_in_new</span>
                            <span className="font-['Syncopate'] text-xs font-bold tracking-widest uppercase">
                                {t.publications.openNewTab}
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* PDF Embed */}
            {pdfOpen && (
                <div ref={pdfRef} className="border-2 overflow-hidden" style={{ borderColor: 'var(--neon-purple)' }}>
                    <div
                        className="flex items-center justify-between px-5 py-3 border-b"
                        style={{ borderColor: 'rgba(157,132,183,0.2)', backgroundColor: 'rgba(157,132,183,0.05)' }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm" style={{ color: 'var(--neon-pink)' }}>picture_as_pdf</span>
                            <span className="font-mono text-[10px] tracking-widest text-gray-500">
                                CEAI_PAPER_VR_ROBOTIC_ARM.PDF
                            </span>
                        </div>
                        <button
                            onClick={() => { setPdfOpen(false); setPdfLoading(true) }}
                            className="material-symbols-outlined text-lg transition-colors"
                            style={{ color: 'rgba(156,163,175,0.4)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-pink)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(156,163,175,0.4)')}
                        >
                            close
                        </button>
                    </div>
                    <div className="relative w-full" style={{ height: '80vh', backgroundColor: '#1a1a2e' }}>
                        {/* Loading overlay */}
                        {pdfLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                                 style={{ backgroundColor: '#1a1a2e' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full animate-ping"
                                         style={{ backgroundColor: 'var(--neon-cyan)' }} />
                                    <span className="font-mono text-xs tracking-widest"
                                          style={{ color: 'rgba(78,205,196,0.6)' }}>
                                        LOADING PDF...
                                    </span>
                                </div>
                                <div className="h-0.5 w-32 overflow-hidden" style={{ backgroundColor: 'rgba(78,205,196,0.15)' }}>
                                    <div className="h-full animate-[slideIn_1.2s_ease-in-out_infinite]"
                                         style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)', width: '60%' }} />
                                </div>
                            </div>
                        )}
                        <iframe
                            src={PUBLICATION.pdfUrl}
                            className="w-full h-full"
                            style={{ opacity: pdfLoading ? 0 : 1, transition: 'opacity 0.3s' }}
                            title={PUBLICATION.title}
                            onLoad={() => setPdfLoading(false)}
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 pt-4">
                <div className="flex gap-1">
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-pink)' }} />
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-cyan)' }} />
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-yellow)' }} />
                </div>
                <span className="font-mono text-[9px] text-gray-700 tracking-widest">
                    RESEARCH_OUTPUT // ISTANBUL_UNIVERSITY_CERRAHPASA
                </span>
            </div>
        </div>
    )
}