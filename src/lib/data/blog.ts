import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-mern',
    title: 'Getting Started with the MERN Stack: A Practical Guide',
    excerpt:
      'Learn how to architect and build your first MERN stack application with best practices for folder structure, authentication, and API design.',
    date: 'Jun 15, 2026',
    readTime: '8 min read',
    tags: ['MERN', 'JavaScript', 'Web Development'],
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    slug: 'jwt-authentication',
    title: 'Securing Your APIs with JWT: A Complete Guide',
    excerpt:
      'Dive deep into JSON Web Token authentication - from token generation to role-based access control implementation.',
    date: 'May 28, 2026',
    readTime: '6 min read',
    tags: ['Security', 'JWT', 'Node.js'],
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    slug: 'ai-saas-applications',
    title: 'Building AI-Powered SaaS Applications with OpenAI',
    excerpt:
      'Explore how to integrate OpenAI APIs into production-grade SaaS platforms for content generation, resume building, and more.',
    date: 'Apr 10, 2026',
    readTime: '10 min read',
    tags: ['AI', 'SaaS', 'OpenAI'],
    gradient: 'from-teal-400 to-cyan-500',
  },
];