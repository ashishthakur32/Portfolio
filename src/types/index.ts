export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  photo?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  liveDemo?: string;
  certificateUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'fullstack' | 'frontend' | 'ai-ml' | 'backend';
  gradient: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarColor: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  certificateUrl: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  gradient: string;
}

export type NavLink = {
  label: string;
  href: string;
};
