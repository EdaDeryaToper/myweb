import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactViewProps {
  language: Language;
}

const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const t = translations[language];

  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl">
        {/* Contact Form Terminal */}
        <div className="lg:col-span-2">
          <div className="bg-black/60 border-2 p-8 backdrop-blur-xl relative"
               style={{
                 borderColor: 'var(--neon-purple)',
                 boxShadow: '8px 8px 0px var(--neon-cyan)'
               }}>
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-pink)' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-yellow)' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }}></div>
            </div>

            <div className="flex items-center gap-4 mb-10 border-b pb-4"
                 style={{ borderColor: 'var(--neon-cyan)', borderOpacity: 0.2 }}>
              <h2 className="retro-text-gradient text-4xl font-['Syncopate'] uppercase">{t.contact.title}</h2>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-2">{t.contact.subtitle}</span>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-3 font-bold"
                         style={{ color: 'var(--neon-pink)' }}>
                    {t.contact.formLabels.name}
                  </label>
                  <input
                      type="text"
                      className="w-full bg-black/80 border-2 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none transition-all"
                      style={{ borderColor: 'var(--neon-purple)' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--neon-cyan)';
                        e.target.style.boxShadow = '0 0 15px var(--neon-cyan)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--neon-purple)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder={t.contact.formLabels.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-3 font-bold"
                         style={{ color: 'var(--neon-pink)' }}>
                    {t.contact.formLabels.email}
                  </label>
                  <input
                      type="email"
                      className="w-full bg-black/80 border-2 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none transition-all"
                      style={{ borderColor: 'var(--neon-purple)' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--neon-cyan)';
                        e.target.style.boxShadow = '0 0 15px var(--neon-cyan)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--neon-purple)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder={t.contact.formLabels.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-3 font-bold"
                       style={{ color: 'var(--neon-pink)' }}>
                  {t.contact.formLabels.message}
                </label>
                <textarea
                    rows={6}
                    className="w-full bg-black/80 border-2 px-5 py-3 text-white placeholder-white/10 font-mono focus:outline-none transition-all resize-none"
                    style={{ borderColor: 'var(--neon-purple)' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--neon-cyan)';
                      e.target.style.boxShadow = '0 0 15px var(--neon-cyan)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--neon-purple)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder={t.contact.formLabels.messagePlaceholder}
                ></textarea>
              </div>

              <button className="group relative w-full py-5 text-black font-['Syncopate'] font-bold text-xl uppercase tracking-tighter transition-all active:translate-x-2 active:translate-y-2 active:shadow-none"
                      style={{
                        backgroundColor: 'var(--neon-pink)',
                        boxShadow: '8px 8px 0px var(--neon-purple)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(1px, 1px)';
                        e.currentTarget.style.boxShadow = '4px 4px 0px var(--neon-purple)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '8px 8px 0px var(--neon-purple)';
                      }}>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {t.contact.formLabels.submit}
                <span className="material-symbols-outlined text-2xl">send</span>
              </span>
              </button>
            </form>
          </div>
        </div>

        {/* Side Info / Socials */}
        <div className="space-y-8">
          <div className="bg-black/40 border p-6 backdrop-blur-md relative"
               style={{ borderColor: 'var(--neon-cyan)', borderOpacity: 0.3 }}>
            {/* Japonca dekoratif - kalacak */}
            <div className="japanese-vertical text-[10px] font-bold absolute -right-6 top-10 opacity-40"
                 style={{ color: 'var(--neon-yellow)' }}>
              電子メール
            </div>
            <h3 className="font-['Syncopate'] text-sm font-bold mb-6 uppercase tracking-widest border-b pb-2"
                style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', borderOpacity: 0.2 }}>
              {t.contact.externalNodes}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <a href="#" className="flex items-center gap-4 p-4 border transition-all group"
                 style={{ borderColor: 'var(--neon-purple)', borderOpacity: 0.3 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(157, 132, 183, 0.1)';
                   e.currentTarget.style.borderColor = 'var(--neon-pink)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'transparent';
                   e.currentTarget.style.borderColor = 'var(--neon-purple)';
                 }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--neon-pink)' }}>save</span>
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-widest">{t.contact.links.github}</div>
                  <div className="text-[8px] font-mono text-gray-500">{t.contact.links.githubSub}</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 p-4 border transition-all group"
                 style={{ borderColor: 'var(--neon-purple)', borderOpacity: 0.3 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(78, 205, 196, 0.1)';
                   e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'transparent';
                   e.currentTarget.style.borderColor = 'var(--neon-purple)';
                 }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--neon-cyan)' }}>cable</span>
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-widest">{t.contact.links.linkedin}</div>
                  <div className="text-[8px] font-mono text-gray-500">{t.contact.links.linkedinSub}</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 p-4 border transition-all group"
                 style={{ borderColor: 'var(--neon-purple)', borderOpacity: 0.3 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 230, 109, 0.1)';
                   e.currentTarget.style.borderColor = 'var(--neon-yellow)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'transparent';
                   e.currentTarget.style.borderColor = 'var(--neon-purple)';
                 }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--neon-yellow)' }}>podcasts</span>
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-widest">{t.contact.links.discord}</div>
                  <div className="text-[8px] font-mono text-gray-500">{t.contact.links.discordSub}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="p-6 border"
               style={{
                 backgroundColor: 'rgba(255, 107, 157, 0.05)',
                 borderColor: 'var(--neon-pink)',
                 borderOpacity: 0.2
               }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--neon-green)' }}></div>
              <span className="text-[10px] font-mono" style={{ color: 'var(--neon-green)' }}>{t.contact.nodeStatus}</span>
            </div>
            <p className="text-[10px] leading-relaxed text-gray-500 font-mono">
              {t.contact.statusMessage}
            </p>
          </div>
        </div>
      </div>
  );
};

export default ContactView;