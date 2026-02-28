import React, { useState, useEffect } from 'react';
import { ViewType, Language } from './types';
import { translations } from './translations';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import SkillsView from './components/SkillsView';
import ContactView from './components/ContactView';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('HOME');
    const [language, setLanguage] = useState<Language>('tr');
    const [isBooted, setIsBooted] = useState(false);

    const t = translations[language];

    useEffect(() => {
        // Artificial boot delay for aesthetic
        const timer = setTimeout(() => setIsBooted(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isBooted) {
        return (
            <div className="fixed inset-0 bg-[#120422] flex flex-col items-center justify-center font-mono text-[#01cdfe]">
                <div className="mb-4 text-xl tracking-[0.5em] animate-pulse">{t.system.booting}</div>
                <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#ff71ce] animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                </div>
                <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
        `}</style>
            </div>
        );
    }

    const renderView = () => {
        switch (currentView) {
            case 'HOME': return <HomeView language={language} />;
            case 'PROJECTS': return <ProjectsView language={language} />;
            case 'SKILLS': return <SkillsView language={language} />;
            case 'CONTACT': return <ContactView language={language} />;
            default: return <HomeView language={language} />;
        }
    };

    return (
        <div className="relative min-h-screen flex overflow-hidden">
            {/* Background Layer */}
            <div className="fixed inset-0 grid-background z-0 opacity-40"></div>
            <div className="fixed bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none">
                <div className="grid-floor w-[200%]"></div>
            </div>
            <div className="fixed inset-0 scanlines z-50 pointer-events-none opacity-20"></div>

            {/* Persistent Sidebar */}
            <Sidebar activeView={currentView} onViewChange={setCurrentView} language={language} />

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 h-screen overflow-y-auto pt-8 px-12 pb-24 lg:px-24">
                {/* View Header Info */}
                <div className="flex justify-between items-center mb-8 border-b border-[#01cdfe]/20 pb-4">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[#ff71ce]">terminal</span>
                        <span className="font-mono text-xs text-[#01cdfe]/80 tracking-widest uppercase">
              {t.system.path.replace('{view}', currentView)}
            </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Sosyal Medya İkonları - Retro-Futuristic Glow Edition */}
                        <div className="flex gap-4 mb-2 items-center mr-6">
                            {/* GitHub */}
                            <a href="https://github.com/edaderyatoper" target="_blank" rel="noopener noreferrer"
                               className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://linkedin.com/in/eda-derya-toper" target="_blank" rel="noopener noreferrer"
                               className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/xlink" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>

                            {/* X (Twitter) */}
                            <a href="https://x.com/ToperEda" target="_blank" rel="noopener noreferrer"
                               className="text-[#01cdfe] hover:text-[#ff71ce] transition-all duration-300 drop-shadow-[0_0_5px_#01cdfe] hover:drop-shadow-[0_0_10px_#ff71ce]" title="X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </a>
                        </div>
                        {/* Language Toggle Button */}
                        <button
                            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                            className="flex items-center gap-2 px-3 py-1.5 border border-[#fffb96]/30 bg-black/40 hover:bg-[#fffb96]/10 hover:border-[#fffb96] transition-all group"
                        >
                            <span className="material-symbols-outlined text-sm text-[#fffb96]">language</span>
                            <span className="font-mono text-[10px] text-[#fffb96] uppercase tracking-widest">
                {language === 'tr' ? 'EN' : 'TR'}
              </span>
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#05ffa1] shadow-[0_0_8px_#05ffa1]"></div>
                            <span className="font-mono text-[10px] text-[#05ffa1]">{t.system.systemActive}</span>
                        </div>
                    </div>
                </div>

                {/* Dynamic View Content */}
                <div className="animate-[fadeSlide_0.5s_ease-out]">
                    {renderView()}
                </div>
            </main>

            <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* Global Aesthetics */}
            <div className="fixed bottom-4 right-8 z-50 pointer-events-none text-right font-mono text-[10px] text-[#ff71ce] opacity-60">
                {t.system.latency}: 14ms<br/>
                {t.system.encryption}
            </div>
        </div>
    );
};

export default App;