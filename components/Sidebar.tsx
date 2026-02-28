import React, { useState } from 'react';
import { ViewType, Language } from '../types';
import { translations } from '../translations';
import { LogoModern, LogoGlitch, LogoPixel } from './Logo';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, language }) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: ViewType; icon: string }[] = [
    { id: 'HOME', icon: 'home' },
    { id: 'PROJECTS', icon: 'folder_open' },
    { id: 'SKILLS', icon: 'bolt' },
    { id: 'CONTACT', icon: 'send' },
  ];

  const handleNavClick = (view: ViewType) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
      <>
        {/* Mobil Hamburger Butonu - sidebar açıkken gizle */}
        {!isOpen && (
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-black/70 border border-[#ff71ce]/50 text-[#ff71ce] backdrop-blur-sm hover:bg-[#ff71ce]/10 transition-all"
                aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
        )}

        {/* Overlay */}
        {isOpen && (
            <div
                className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />
        )}

        {/* Sidebar */}
        <aside className={`
        fixed lg:relative z-50 lg:z-40
        h-screen w-72
        bg-black/95 lg:bg-black/40
        backdrop-blur-xl
        border-r border-[#ff71ce]/30
        flex flex-col p-8
        select-none
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

          {/* Brand */}
          <div className="mb-12 lg:mb-16">
            {/* İsim + Kapat butonu */}
            <div className="flex items-start justify-between mb-4">
              
              <h1 className="retro-text-gradient text-2xl font-['Syncopate'] font-bold leading-tight">
                EDA DERYA<br />TOPER
              </h1>
              <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden flex-shrink-0 ml-2 p-1.5 border border-[#ff71ce]/30 text-[#ff71ce] hover:bg-[#ff71ce]/10 transition-all"
                  aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-lg leading-none">close</span>
              </button>
            </div>

            {/* Sosyal Medya İkonları */}
            <div className="flex gap-4 mb-6 items-center">
              <a href="https://github.com/edaderyatoper" target="_blank" rel="noopener noreferrer"
                 className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/in/eda-derya-toper" target="_blank" rel="noopener noreferrer"
                 className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/xlink" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/ToperEda" target="_blank" rel="noopener noreferrer"
                 className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
            

            <div className="text-[10px] font-mono text-[#01cdfe] tracking-[0.3em] uppercase opacity-80 border-t border-[#01cdfe]/20 pt-2">
              {t.sidebar.subtitle}
            </div>
          </div>
          

          {/* Navigation */}
          <nav className="flex-1 space-y-4 lg:space-y-6">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 border-2 transition-all duration-200 group relative
                ${activeView === item.id
                        ? 'border-[#ff71ce] bg-[#ff71ce]/10 text-white shadow-[4px_4px_0px_#01cdfe]'
                        : 'border-transparent text-gray-400 hover:text-[#01cdfe] hover:border-[#01cdfe]/40 hover:translate-x-1'
                    }`}
                >
              <span className={`material-symbols-outlined text-2xl
                ${activeView === item.id ? 'text-[#ff71ce]' : 'group-hover:text-[#01cdfe]'}`}>
                {item.icon}
              </span>
                  <span className="font-['Syncopate'] text-xs font-bold tracking-widest uppercase">
                {t.sidebar.nav[item.id.toLowerCase() as keyof typeof t.sidebar.nav]}
              </span>
                  {activeView === item.id && (
                      <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#ff71ce] animate-pulse"></div>
                  )}
                </button>
            ))}
          </nav>
          

          {/* System Status Display */}
          <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-[#fffb96]">
                <span>{t.sidebar.cpuUsage}</span>
                <span>2.4%</span>
              </div>
              <div className="w-full h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-[#fffb96]" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-[#01cdfe]">
                <span>{t.sidebar.memBuffer}</span>
                <span>OK</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 ${i <= 3 ? 'bg-[#01cdfe]' : 'bg-white/5'}`}></div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
              <span>{t.sidebar.established}</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#ff71ce]"></div>
                <div className="w-2 h-2 bg-[#01cdfe]"></div>
              </div>
            </div>
          </div>
        </aside>
      </>
  );
};

export default Sidebar;