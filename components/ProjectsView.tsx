import React from 'react';
import { PROJECTS } from '../constants';
import { Project, Language } from '../types';
import { translations } from '../translations';

interface ProjectCardProps {
    project: Project;
    language: Language;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, language }) => {
    const statusColors = {
        'STABLE': 'var(--neon-green)',
        'DEBUG': 'var(--neon-yellow)',
        'COMPILED': 'var(--neon-pink)'
    };

    const getStatusText = (status: string) => {
        if (language === 'tr') {
            const statusMap: Record<string, string> = {
                'STABLE': 'STABİL',
                'DEBUG': 'DEBUG',
                'COMPILED': 'DERLENDİ'
            };
            return statusMap[status] || status;
        }
        return status;
    };

    return (
        <div className="group relative bg-black/40 border p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
             style={{ borderColor: 'var(--neon-cyan)', borderWidth: '1px' }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.borderColor = 'var(--neon-pink)';
                 e.currentTarget.style.boxShadow = '8px 8px 0px var(--neon-pink)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                 e.currentTarget.style.boxShadow = 'none';
             }}>
            {/* Image Container */}
            <div className="relative aspect-video bg-black overflow-hidden mb-5 border border-white/5">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120422] to-transparent opacity-60"></div>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border text-[8px] font-mono tracking-widest"
                     style={{ borderColor: statusColors[project.status], color: statusColors[project.status] }}>
                    {getStatusText(project.status)}
                </div>
            </div>

            {/* Content */}
            <div className="mb-6">
                <h3 className="font-['Syncopate'] text-base lg:text-lg font-bold mb-2 transition-colors uppercase group-hover:text-[var(--neon-pink)]"
                    style={{ color: 'var(--neon-cyan)' }}>
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
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-pink)' }}></div>
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-cyan)' }}></div>
                    <div className="w-4 h-1" style={{ backgroundColor: 'var(--neon-yellow)' }}></div>
                </div>
                <button className="material-symbols-outlined transition-colors hover:text-[var(--neon-cyan)]"
                        style={{ color: 'var(--neon-pink)' }}>
                    arrow_forward_ios
                </button>
            </div>
        </div>
    );
};

interface ProjectsViewProps {
    language: Language;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ language }) => {
    const t = translations[language];

    return (
        <div className="space-y-8 lg:space-y-12">
            <div className="flex items-end gap-6 mb-8 lg:mb-12">
                <h2 className="retro-text-gradient text-4xl sm:text-5xl font-['Syncopate'] uppercase" style={{ lineHeight: '1.2' }}>
                    {t.projects.title}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {PROJECTS.map(project => (
                    <ProjectCard key={project.id} project={project} language={language} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsView;