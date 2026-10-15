'use client';

import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Cloud,
  Brain,
  Cpu,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { skillCategories } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { sideVariants } from '@/components/animations/StaggerContainer';
import { motion } from 'motion/react';

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  layout: Layout,
  server: Server,
  database: Database,
  wrench: Wrench,
  cloud: Cloud,
  brain: Brain,
  cpu: Cpu,
  users: Users,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          My <span className="text-gradient">Technical Arsenal</span>
        </>
      }
      subtitle="A comprehensive toolkit of technologies and methodologies I use to build modern, scalable applications."
    >
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        stagger={0.12}
      >
        {skillCategories.map((category, i) => {
          const Icon = iconMap[category.icon] ?? Code2;
          return (
            <motion.div key={category.category} variants={sideVariants(i)}>
              <div className="glass-card p-6 h-full group hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 hover:glow-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-600/20 text-orange-400 group-hover:from-orange-500/30 group-hover:to-amber-600/30 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold group-hover:text-orange-400 transition-colors">
                    {category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs rounded-full border border-card-border text-soft-gray hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/5 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
