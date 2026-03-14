
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
  {
    name: 'ASP.NET_CORE',
    level: 92,
    icon: 'code',
    color: '#4ecdc4',
    subtext: 'Web API // Clean Architecture // Microservices'
  },
  {
    name: 'PYTHON',
    level: 85,
    icon: 'terminal',
    color: '#ffe66d',
    subtext: 'Data Analysis // Automation // Scripting'
  },
  {
    name: 'REACT_NEXT',
    level: 80,
    icon: 'deployed_code',
    color: '#ff6b9d',
    subtext: 'React // Next.js // Modern Frontend'
  },
  {
    name: 'DATABASE_SYSTEMS',
    level: 88,
    icon: 'database',
    color: '#9d84b7',
    subtext: 'MSSQL // MongoDB // PostgreSQL'
  },
  {
    name: 'MESSAGE_BROKERS',
    level: 82,
    icon: 'podcasts',
    color: '#ff6b9d',
    subtext: 'RabbitMQ // Kafka // Redis // Event-Driven'
  },
  {
    name: 'DEVOPS_TOOLS',
    level: 79,
    icon: 'deployed_code_account',
    color: '#4ecdc4',
    subtext: 'Docker // CI/CD // Containerization'
  }
];
