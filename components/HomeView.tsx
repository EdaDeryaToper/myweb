import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface HomeViewProps {
  language: Language;
}

const HomeView: React.FC<HomeViewProps> = ({ language }) => {
  const t = translations[language];

  return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[70vh]">
        {/* Text Content */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#fffb96] text-[#fffb96] font-mono text-[10px] tracking-[0.3em] uppercase mb-5">
            {t.home.protocol}
          </div>

          <h2 className="retro-text-gradient text-4xl sm:text-5xl lg:text-7xl font-['Syncopate'] font-bold mb-6 lg:mb-8" style={{ lineHeight: '1.2' }}>
            {t.home.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br />}
                </React.Fragment>
            ))}
          </h2>

          <div className="max-w-xl space-y-5">
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed font-light">
              {t.home.description}
            </p>

            <div className="p-5 bg-white/5 border-l-4 border-[#ff71ce] backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#fffb96]">info</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#fffb96] uppercase">
                  {t.home.identityTitle}
                </span>
              </div>
              <p className="text-sm font-mono text-gray-400">
                {t.home.location}<br/>
                {t.home.specialization}<br/>
                {t.home.availability}
              </p>
            </div>
          </div>

          {/* Japanese Accent */}
          <div className="mt-8 lg:mt-12 opacity-30 pointer-events-none select-none overflow-hidden">
            <span className="font-['Noto_Sans_JP'] text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-white">
              ソフトウェア
            </span>
          </div>
        </div>

        {/* Visual Component */}
        <div className="order-1 lg:order-2 lg:col-span-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-lg aspect-square">
            <div className="absolute inset-0 border border-[#01cdfe] rounded-full opacity-20 animate-[pulse_3s_infinite]"></div>
            <div className="absolute inset-10 border border-[#ff71ce] rounded-full opacity-10 animate-[reversePulse_4s_infinite]"></div>
            <div className="absolute inset-20 border border-[#b967ff] rounded-full opacity-5"></div>

            <style>{`
              @keyframes reversePulse {
                0%, 100% { transform: scale(1); opacity: 0.1; }
                50% { transform: scale(1.1); opacity: 0.2; }
              }
            `}</style>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="absolute inset-1/4 bg-gradient-to-tr from-[#b967ff] via-[#ff71ce] to-transparent opacity-30 blur-3xl animate-pulse"></div>
              <div className="w-4/5 h-4/5 flex items-center justify-center">
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                  <div className="absolute inset-0 border-2 border-[var(--neon-cyan)] transform rotate-45 opacity-60"></div>
                  <div className="absolute inset-4 border-2 border-[var(--neon-pink)] transform -rotate-12 opacity-40"></div>
                  <div className="absolute inset-8 border-2 border-[var(--neon-purple)] transform rotate-12 opacity-30"></div>
                  <div className="absolute inset-12 bg-[var(--neon-cyan)] opacity-10 blur-xl"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-10 flex flex-col items-center animate-bounce">
              <span className="material-symbols-outlined text-3xl lg:text-4xl text-[#fffb96] drop-shadow-[0_0_8px_#fffb96]">token</span>
              <span className="text-[8px] font-mono text-[#fffb96] mt-1">TOKEN_ID: 0x88F</span>
            </div>
            <div className="absolute bottom-12 -left-4 flex flex-col items-center">
              <span className="material-symbols-outlined text-2xl lg:text-3xl text-[#05ffa1] drop-shadow-[0_0_8px_#05ffa1]">deployed_code</span>
              <span className="text-[8px] font-mono text-[#05ffa1] mt-1">NODE: LIVE</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomeView;