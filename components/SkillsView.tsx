import React from 'react';
import { SKILLS } from '../constants';
import { Skill, Language } from '../types';
import { translations } from '../translations';

interface SkillCardProps {
    skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className="bg-black/40 border border-[var(--neon-cyan)]/20 p-5 lg:p-6 backdrop-blur-lg relative overflow-hidden group hover:border-[var(--neon-cyan)]/40 transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/3 to-transparent pointer-events-none"></div>

            <div className="flex items-center gap-4 lg:gap-5 mb-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 border border-[var(--neon-cyan)]/30 flex items-center justify-center bg-[var(--neon-cyan)]/5 group-hover:bg-[var(--neon-cyan)]/10 transition-colors flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl lg:text-3xl opacity-80" style={{ color: skill.color }}>{skill.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="font-['Syncopate'] text-xs lg:text-sm font-bold tracking-tighter text-white/90 truncate pr-2">{skill.name}</h3>
                        <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--neon-pink)' }}>{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-black/60 border border-[var(--neon-cyan)]/20 p-[2px] rounded-sm">
                        <div
                            className="h-full rounded-sm"
                            style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(to right, var(--neon-pink), var(--neon-purple), var(--neon-cyan))`
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <p className="text-[10px] font-mono uppercase tracking-widest opacity-70" style={{ color: 'var(--neon-cyan)' }}>
                {skill.subtext}
            </p>
        </div>
    );
};

interface SkillsViewProps {
    language: Language;
}

const SkillsView: React.FC<SkillsViewProps> = ({ language }) => {
    const t = translations[language];

    return (
        <div className="space-y-8 lg:space-y-12 max-w-6xl">
            <header className="flex flex-col gap-2 mb-8 lg:mb-12">
                <p className="text-xs tracking-[0.5em] uppercase font-bold" style={{ color: 'var(--neon-yellow)' }}>
                    {t.skills.subtitle}
                </p>
                <h2 className="retro-text-gradient text-4xl sm:text-5xl font-['Syncopate'] uppercase" style={{ lineHeight: '1.2' }}>
                    {t.skills.title}
                </h2>
                <div className="h-1 w-32" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }}></div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                {SKILLS.map(skill => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>

            <div className="mt-12 lg:mt-16 flex flex-col items-center gap-8">
                <div className="flex gap-4">
                    <div className="w-16 lg:w-20 h-1" style={{ backgroundColor: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }}></div>
                    <div className="w-16 lg:w-20 h-1" style={{ backgroundColor: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }}></div>
                    <div className="w-16 lg:w-20 h-1" style={{ backgroundColor: 'var(--neon-yellow)', boxShadow: '0 0 8px var(--neon-yellow)' }}></div>
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] animate-pulse" style={{ color: 'var(--neon-green)' }}>
                    {t.skills.systemStatus}
                </div>
            </div>
        </div>
    );
};

export default SkillsView;