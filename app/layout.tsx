import type { Metadata } from 'next'
import { Space_Grotesk, Syncopate, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
})

const syncopate = Syncopate({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-syncopate',
})

const notoSansJP = Noto_Sans_JP({
    weight: ['300', '700'],
    subsets: ['latin'],
    variable: '--font-noto-jp',
})

export const metadata: Metadata = {
    title: 'EDA DERYA TOPER // PORTFOLIO',
    description: 'Full Stack Developer - Web Architectures & Modern Solutions',
    authors: [{ name: 'Eda Derya Toper' }],
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className={`
        ${spaceGrotesk.variable}
        ${syncopate.variable}
        ${notoSansJP.variable}
        font-['Space_Grotesk']
        bg-[#120422] text-white
      `}>
        {children}
        </body>
        </html>
    )
}