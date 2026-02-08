
import React from 'react';

const ContactView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl">
      {/* Contact Form Terminal */}
      <div className="lg:col-span-2">
        <div className="bg-black/60 border-2 border-[#b967ff] shadow-[8px_8px_0px_#01cdfe] p-8 backdrop-blur-xl relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff71ce]"></div>
            <div className="w-3 h-3 rounded-full bg-[#fffb96]"></div>
            <div className="w-3 h-3 rounded-full bg-[#05ffa1]"></div>
          </div>

          <div className="flex items-center gap-4 mb-10 border-b border-[#01cdfe]/20 pb-4">
            <h2 className="retro-text-gradient text-4xl font-['Syncopate'] uppercase">Uplink</h2>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-2">SMTP/95.GATEWAY</span>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#ff71ce] mb-3 font-bold">
                  Identity // Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-black/80 border-2 border-[#b967ff]/50 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none focus:border-[#01cdfe] focus:shadow-[0_0_15px_#01cdfe] transition-all"
                  placeholder="GUEST_USER"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#ff71ce] mb-3 font-bold">
                  Channel // Email
                </label>
                <input 
                  type="email" 
                  className="w-full bg-black/80 border-2 border-[#b967ff]/50 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none focus:border-[#01cdfe] focus:shadow-[0_0_15px_#01cdfe] transition-all"
                  placeholder="USER@NETSCAPE.NET"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#ff71ce] mb-3 font-bold">
                Data // Packet
              </label>
              <textarea 
                rows={6}
                className="w-full bg-black/80 border-2 border-[#b967ff]/50 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none focus:border-[#01cdfe] focus:shadow-[0_0_15px_#01cdfe] transition-all resize-none"
                placeholder="INITIATE DATA TRANSFER..."
              ></textarea>
            </div>

            <button className="group relative w-full py-5 bg-[#ff71ce] text-black font-['Syncopate'] font-bold text-xl uppercase tracking-tighter shadow-[8px_8px_0px_#b967ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#b967ff] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Transmit Packet
                <span className="material-symbols-outlined text-2xl">send</span>
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Side Info / Socials */}
      <div className="space-y-8">
        <div className="bg-black/40 border border-[#01cdfe]/30 p-6 backdrop-blur-md">
          <div className="japanese-vertical text-[#fffb96] text-[10px] font-bold absolute -right-6 top-10 opacity-40">
            電子メール
          </div>
          <h3 className="font-['Syncopate'] text-sm font-bold text-[#01cdfe] mb-6 uppercase tracking-widest border-b border-[#01cdfe]/20 pb-2">
            External_Nodes
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <a href="#" className="flex items-center gap-4 p-4 border border-[#b967ff]/30 hover:bg-[#b967ff]/10 hover:border-[#ff71ce] transition-all group">
              <span className="material-symbols-outlined text-3xl text-[#ff71ce]">save</span>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">Source_Code</div>
                <div className="text-[8px] font-mono text-gray-500">GITHUB.DAT</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-4 p-4 border border-[#b967ff]/30 hover:bg-[#01cdfe]/10 hover:border-[#01cdfe] transition-all group">
              <span className="material-symbols-outlined text-3xl text-[#01cdfe]">cable</span>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">Network</div>
                <div className="text-[8px] font-mono text-gray-500">LINKEDIN.EXE</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-4 p-4 border border-[#b967ff]/30 hover:bg-[#fffb96]/10 hover:border-[#fffb96] transition-all group">
              <span className="material-symbols-outlined text-3xl text-[#fffb96]">podcasts</span>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">Transmission</div>
                <div className="text-[8px] font-mono text-gray-500">DISCORD.SIG</div>
              </div>
            </a>
          </div>
        </div>

        <div className="p-6 bg-[#ff71ce]/5 border border-[#ff71ce]/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#05ffa1] animate-ping"></div>
            <span className="text-[10px] font-mono text-[#05ffa1]">NODE_404_READY</span>
          </div>
          <p className="text-[10px] leading-relaxed text-gray-500 font-mono">
            SHIBUYA NETWORK SYSTEMS // ESTABLISHED CONNECTION SECURE. DATA IS ENCRYPTED VIA END-TO-END NOSTALGIA PROTOCOL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
