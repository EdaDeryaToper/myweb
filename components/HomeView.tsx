
import React from 'react';

const HomeView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
      {/* Text Content */}
      <div className="order-2 lg:order-1">
        <div className="inline-block px-3 py-1 bg-[#ff71ce]/20 border border-[#ff71ce] text-[#ff71ce] font-mono text-[10px] tracking-[0.3em] uppercase mb-6">
          Protocol: Senior_Software_Architect
        </div>
        
        <h2 className="retro-text-gradient text-6xl lg:text-7xl font-['Syncopate'] font-bold leading-none mb-8">
          DIGITAL<br/>REALITIES
        </h2>
        
        <div className="max-w-xl space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Bridging the gap between <span className="text-[#01cdfe] font-medium shadow-[0_0_10px_rgba(1,205,254,0.3)]">legacy aesthetics</span> and <span className="text-[#ff71ce] font-medium">modern performance</span>. 
            I architect robust systems with a retro-futuristic soul, specializing in high-performance WebGL, complex state orchestration, and high-fidelity user experiences.
          </p>
          
          <div className="p-6 bg-white/5 border-l-4 border-[#ff71ce] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#fffb96]">info</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#fffb96] uppercase">Identity // Summary</span>
            </div>
            <p className="text-sm font-mono text-gray-400">
               Based in Shibuya District, Tokyo<br/>
               Specializing in 3D Visualization & FinTech Architectures<br/>
               Available for high-priority contract uplinks
            </p>
          </div>
        </div>

        {/* Japanese Accent */}
        <div className="mt-12 opacity-30 pointer-events-none select-none">
          <span className="font-['Noto_Sans_JP'] text-7xl lg:text-9xl font-bold tracking-tighter text-white">
            ソフトウェア
          </span>
        </div>
      </div>

      {/* Visual Component */}
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-md aspect-square">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 border border-[#01cdfe] rounded-full opacity-20 animate-[pulse_3s_infinite]"></div>
          <div className="absolute inset-10 border border-[#ff71ce] rounded-full opacity-10 animate-[reversePulse_4s_infinite]"></div>
          <div className="absolute inset-20 border border-[#b967ff] rounded-full opacity-5"></div>
          
          <style>{`
            @keyframes reversePulse {
              0%, 100% { transform: scale(1); opacity: 0.1; }
              50% { transform: scale(1.1); opacity: 0.2; }
            }
          `}</style>

          {/* Core Visual: The Marble Bust */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="absolute inset-1/4 bg-gradient-to-tr from-[#b967ff] via-[#ff71ce] to-transparent opacity-30 blur-3xl animate-pulse"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCemP1ugofr5nMYJHlrw4mPZyLuck8D_tC0pAlZQwoLmFQcbkql2zK5jLKN21oAK7MxghT1enSlQZD2ulOvbvVSWCwKlzfQeTtJYqRoMnOyRw-4sEefmEjYJDzB6LJ0DTRBGe1Xl4UvwpA6bgIBZSSGQ3yH1yMITCOjNrRo-_2I0zsTbAHU2_bBWqr9m8J6bS1jy9QHsfZbj4wSmFz_59xfSV2gU2z7SCM-avTcD__vfcKToNHKf4ThjSJoKxMfwbfI9iY--5WPxhBS" 
              alt="Aesthetic Marble Bust" 
              className="w-4/5 h-4/5 object-contain mix-blend-screen filter grayscale invert brightness-125 contrast-125 drop-shadow-[0_0_30px_#01cdfe]"
            />
          </div>

          {/* Floating HUD elements */}
          <div className="absolute -top-4 right-10 flex flex-col items-center animate-bounce">
            <span className="material-symbols-outlined text-4xl text-[#fffb96] drop-shadow-[0_0_8px_#fffb96]">token</span>
            <span className="text-[8px] font-mono text-[#fffb96] mt-1">TOKEN_ID: 0x88F</span>
          </div>
          <div className="absolute bottom-12 -left-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-3xl text-[#05ffa1] drop-shadow-[0_0_8px_#05ffa1]">deployed_code</span>
            <span className="text-[8px] font-mono text-[#05ffa1] mt-1">NODE: LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
