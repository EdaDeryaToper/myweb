import type { Metadata } from 'next'
import { Space_Grotesk, Syncopate, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import AppShell from './components/AppShell'
import { LanguageProvider } from './context/LanguageContext'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const syncopate = Syncopate({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-syncopate' })
const notoSansJP = Noto_Sans_JP({ weight: ['300', '700'], subsets: ['latin'], variable: '--font-noto-jp' })

export const metadata: Metadata = {
    title: 'EDA DERYA TOPER',
    description: 'Full Stack Developer - Web Architectures & Modern Solutions',
    authors: [{ name: 'Eda Derya Toper' }],
    icons: {
        icon: '/icon.png', // Burası sekmedeki görseli belirler
        shortcut: '/icon.png',
        apple: '/icon.png', // iPhone ana ekrana ekleme simgesi
    },
    openGraph: {
        images: ['/icon.png'],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className={`${spaceGrotesk.variable} ${syncopate.variable} ${notoSansJP.variable} font-['Space_Grotesk'] bg-[#120422] text-white`}>
        <LanguageProvider>
            <AppShell>{children}</AppShell>
        </LanguageProvider>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Eda Derya Toper",
                    "url": "https://www.edaderyatoper.com",
                    "jobTitle": "Software Specialist",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Ankara",
                        "addressCountry": "TR"
                    },
                    "sameAs": [
                        "https://github.com/edaderyatoper",
                        "https://linkedin.com/in/eda-derya-toper",
                        "https://x.com/ToperEda",
                        "https://www.researchgate.net/profile/Eda-Toper",
                        "https://www.researchgate.net/publication/403203305_Virtual_Reality-Based_Control_and_Simulation_of_a_Real_Robotic_Arm",
                        "https://avesis.istanbul.edu.tr/yayin/ab86e5b2-46dd-4655-b764-5675e3c04980/virtual-reality-based-control-and-simulation-of-a-real-robotic-arm",
                        "https://scholar.google.com/citations?user=rDU7kuUAAAAJ"
                    ]
                })
            }}
        />
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
        
    )
}