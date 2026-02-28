import React from 'react';

// VARYASYON 1: Modern & Keskin (Orijinal)
export const LogoModern = () => (
    <svg width="60" height="60" viewBox="0 0 200 200" fill="none" className="drop-shadow-[0_0_8px_#01cdfe]">
        <path d="M60 50H150V75H85V90H140V115H85V130H150V155H60V50Z" fill="url(#grad1)" />
        <rect x="155" y="140" width="20" height="5" fill="#ff71ce" className="animate-pulse" />
        <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#01cdfe"/><stop offset="100%" stopColor="#b967ff"/></linearGradient></defs>
    </svg>
);

// VARYASYON 2: Glitch & Outline (Cyberpunk Esintili)
export const LogoGlitch = () => (
    <svg width="60" height="60" viewBox="0 0 200 200" fill="none" className="drop-shadow-[0_0_8px_#ff71ce]">
        <path d="M60 50H150V70H85V95H140V110H85V135H150V155H60V50Z" stroke="#ff71ce" strokeWidth="4" />
        <path d="M65 55H155V75H90V100H145V115H90V140H155V160H65V55Z" stroke="#01cdfe" strokeWidth="2" opacity="0.5" />
        <text x="140" y="45" fill="#fffb96" fontSize="12" className="font-mono">V95.0</text>
    </svg>
);

// VARYASYON 3: Pixel Art (Road Fighter & Retro Game Temalı)
export const LogoPixel = () => (
    <svg width="60" height="60" viewBox="0 0 200 200" fill="none">
        <rect x="60" y="50" width="80" height="20" fill="#01cdfe" />
        <rect x="60" y="70" width="20" height="80" fill="#01cdfe" />
        <rect x="60" y="90" width="60" height="20" fill="#ff71ce" />
        <rect x="60" y="130" width="80" height="20" fill="#b967ff" />
        <rect x="145" y="135" width="15" height="15" fill="#fffb96" className="animate-bounce" />
    </svg>
);