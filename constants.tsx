
import React from 'react';
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'CyberGrid OS',
    description: 'High-performance kernel architecture optimized for low-poly rendering and synth-wave synchronization protocols.',
    image: 'https://picsum.photos/seed/vapor1/800/450',
    status: 'STABLE',
    tags: ['C++', 'OpenGL', 'Kernel']
  },
  {
    id: '2',
    title: 'NeonStream',
    description: 'Real-time data visualization engine utilizing 90s hardware aesthetic and CRT distortion effects.',
    image: 'https://picsum.photos/seed/vapor2/800/450',
    status: 'DEBUG',
    tags: ['React', 'D3.js', 'WebGL']
  },
  {
    id: '3',
    title: 'Marble.JS',
    description: 'A lightweight framework for generating procedural Greco-Roman textures on wireframe meshes.',
    image: 'https://picsum.photos/seed/vapor3/800/450',
    status: 'COMPILED',
    tags: ['TypeScript', 'Three.js']
  },
  {
    id: '4',
    title: 'Shibuya Gateway',
    description: 'Distributed network routing system designed for the Tokyo tech underground.',
    image: 'https://picsum.photos/seed/vapor4/800/450',
    status: 'STABLE',
    tags: ['Node.js', 'Redis', 'TCP']
  }
];

export const SKILLS: Skill[] = [
  { name: 'REACT_UI', level: 92, icon: 'deployed_code', color: '#01cdfe', subtext: 'Component Architecture // State Hooks' },
  { name: 'PYTHON_CORE', level: 88, icon: 'terminal', color: '#fffb96', subtext: 'Data Science // Automation // Scripting' },
  { name: 'NODE_JS', level: 85, icon: 'javascript', color: '#05ffa1', subtext: 'Event-Loop // Microservices' },
  { name: 'SQL_SYSTEMS', level: 79, icon: 'database', color: '#b967ff', subtext: 'Query Optimization // Scalability' },
  { name: 'DESIGN_UX', level: 95, icon: 'palette', color: '#ff71ce', subtext: 'Vaporwave // Retro-Futurism' },
  { name: 'AI_INTEGRATION', level: 82, icon: 'smart_toy', color: '#ffffff', subtext: 'Gemini API // LLM Orchestration' }
];
