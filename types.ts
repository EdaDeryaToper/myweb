
export type ViewType = 'HOME' | 'PROJECTS' | 'SKILLS' | 'CONTACT';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'STABLE' | 'DEBUG' | 'COMPILED';
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  subtext: string;
}
