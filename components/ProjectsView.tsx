
import React from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const statusColors = {
    'STABLE': '#05ffa1',
    'DEBUG': '#fffb96',
    'COMPILED': '#ff71ce'
  };

  return (
    <div className="group relative bg-black/40 border border-[#01cdfe]/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#ff71ce] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#ff71ce]">
      {/* Image Container */}
      <div className="relative aspect-video bg-black overflow-hidden mb-5 border border-white/5">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120422] to-transparent opacity-60"></div>
        
        {/* Status Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-[var(--status-color)] text-[8px] font-mono tracking-widest"
             style={{ '--status-color': statusColors[project.status] } as React.CSSProperties}>
          <span style={{ color: statusColors[project.status] }}>{project.status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="font-['Syncopate'] text-lg font-bold text-[#01cdfe] mb-2 group-hover:text-[#ff71ce] transition-colors uppercase">
          {project.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[8px] font-mono border border-white/10 px-2 py-0.5 text-gray-500 uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="flex gap-1">
          <div className="w-4 h-1 bg-[#ff71ce]"></div>
          <div className="w-4 h-1 bg-[#01cdfe]"></div>
          <div className="w-4 h-1 bg-[#fffb96]"></div>
        </div>
        <button className="material-symbols-outlined text-[#ff71ce] hover:text-[#01cdfe] transition-colors">
          arrow_forward_ios
        </button>
      </div>
    </div>
  );
};

const ProjectsView: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-end gap-6 mb-12">
        <h2 className="retro-text-gradient text-5xl font-['Syncopate'] uppercase">Archives</h2>
        <div className="font-['Noto_Sans_JP'] text-[#ff71ce] font-bold text-sm tracking-tighter opacity-70 pb-2">
          プロジェクト
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
