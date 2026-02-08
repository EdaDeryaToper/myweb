
import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import SkillsView from './components/SkillsView';
import ContactView from './components/ContactView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    // Artificial boot delay for aesthetic
    const timer = setTimeout(() => setIsBooted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isBooted) {
    return (
      <div className="fixed inset-0 bg-[#120422] flex flex-col items-center justify-center font-mono text-[#01cdfe]">
        <div className="mb-4 text-xl tracking-[0.5em] animate-pulse">BOOTING_SYSTEM_V95...</div>
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
      case 'HOME': return <HomeView />;
      case 'PROJECTS': return <ProjectsView />;
      case 'SKILLS': return <SkillsView />;
      case 'CONTACT': return <ContactView />;
      default: return <HomeView />;
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
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto pt-8 px-12 pb-24 lg:px-24">
        {/* View Header Info */}
        <div className="flex justify-between items-center mb-8 border-b border-[#01cdfe]/20 pb-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#ff71ce]">terminal</span>
            <span className="font-mono text-xs text-[#01cdfe]/80 tracking-widest uppercase">
              C:\PORTFOLIO\{currentView}.EXE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#05ffa1] shadow-[0_0_8px_#05ffa1]"></div>
            <span className="font-mono text-[10px] text-[#05ffa1]">SYSTEM_ACTIVE</span>
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
        LATENCY: 14ms<br/>
        ENCRYPTION: ENABLED
      </div>
    </div>
  );
};

export default App;
