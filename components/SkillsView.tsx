
import React from 'react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="bg-black/60 border-2 border-[#01cdfe]/20 p-6 backdrop-blur-lg relative overflow-hidden group hover:border-[#ff71ce]/50 transition-all">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="flex items-center gap-5 mb-4">
        <div className="w-14 h-14 border border-[#fffb96]/40 flex items-center justify-center bg-[#fffb96]/5 text-[#fffb96] group-hover:bg-[#fffb96]/10 transition-colors">
          <span className="material-symbols-outlined text-3xl" style={{ color: skill.color }}>{skill.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-['Syncopate'] text-sm font-bold tracking-tighter text-white">{skill.name}</h3>
            <span className="text-[#ff71ce] font-mono text-xs">{skill.level}%</span>
          </div>
          <div className="h-3 bg-black border border-[#01cdfe]/30 p-[2px]">
            <div 
              className="h-full bg-gradient-to-r from-[#ff71ce] to-[#b967ff] shadow-[0_0_10px_#ff71ce]"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#01cdfe] opacity-70">
        {skill.subtext}
      </p>
    </div>
  );
};

const SkillsView: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl">
      <header className="flex flex-col gap-2 mb-12">
        <p className="text-[#fffb96] text-xs tracking-[0.5em] uppercase font-bold">Technical Capacities</p>
        <h2 className="retro-text-gradient text-5xl font-['Syncopate'] uppercase">Power Levels</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-[#01cdfe] to-transparent"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SKILLS.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-8">
        <div className="flex gap-4">
          <div className="w-20 h-1 bg-[#ff71ce] shadow-[0_0_10px_#ff71ce]"></div>
          <div className="w-20 h-1 bg-[#01cdfe] shadow-[0_0_10px_#01cdfe]"></div>
          <div className="w-20 h-1 bg-[#fffb96] shadow-[0_0_10px_#fffb96]"></div>
        </div>
        <div className="text-[10px] font-mono text-[#05ffa1] tracking-[0.2em] animate-pulse">
           ALL_SYSTEMS_OPTIMIZED: READY
        </div>
      </div>
    </div>
  );
};

export default SkillsView;
