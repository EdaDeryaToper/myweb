import React from 'react';
import { ViewType, Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, language }) => {
  const t = translations[language];

  const navItems: { id: ViewType; icon: string }[] = [
    { id: 'HOME', icon: 'home' },
    { id: 'PROJECTS', icon: 'folder_open' },
    { id: 'SKILLS', icon: 'bolt' },
    { id: 'CONTACT', icon: 'send' },
  ];

  return (
      <aside className="relative z-40 w-72 bg-black/40 backdrop-blur-xl border-r border-[#ff71ce]/30 flex flex-col p-8 select-none">
        {/* Brand */}
        <div className="mb-16">
          <h1 className="retro-text-gradient text-2xl font-['Syncopate'] font-bold leading-tight mb-2">
            EDA DERYA<br/>TOPER
          </h1>
          <div className="text-[10px] font-mono text-[#01cdfe] tracking-[0.3em] uppercase opacity-80 border-t border-[#01cdfe]/20 pt-2">
            {t.sidebar.subtitle}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6">
          {navItems.map((item) => (
              <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
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
  );
};

export default Sidebar;