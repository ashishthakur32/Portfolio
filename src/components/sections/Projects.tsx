'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Folder } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/BrandIcons';
import { projects } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { sideVariants } from '@/components/animations/StaggerContainer';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'fullstack' | 'frontend' | 'ai-ml' | 'backend';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'AI/ML', value: 'ai-ml' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
];

function TiltCard({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showGlow, setShowGlow] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const glowX = useTransform(mx, [0, 1], [0, 100]);
  const glowY = useTransform(my, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowGlow(true)}
      onMouseLeave={() => setShowGlow(false)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="h-full"
    >
      <div className="relative h-full">
        <div className="glass-card p-6 h-full group border-card-border relative overflow-hidden">
          {/* Gradient top bar */}
          <div
            className={cn(
              'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80',
              gradient
            )}
          />
          {children}
        </div>
        {/* Glow effect */}
        {showGlow && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(400px circle at ${glowX}px ${glowY}px, rgba(255,90,31,0.2), transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={
        <>
          Featured <span className="text-gradient">Projects</span>
        </>
      }
      subtitle="A collection of my best work Ã¢â‚¬â€ full-stack applications, AI integrations, and production-grade systems."
    >
      {/* Filters */}
      <ScrollReveal className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border',
              activeFilter === filter.value
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-transparent glow-primary'
                : 'border-card-border text-soft-gray hover:border-orange-500/40 hover:text-orange-400'
            )}
          >
            {filter.label}
          </button>
        ))}
      </ScrollReveal>

      {/* Projects grid */}
      <StaggerContainer className="grid md:grid-cols-2 gap-6" stagger={0.15}>
        {filteredProjects.map((project, index) => (
          <motion.div key={project.title} variants={sideVariants(index)}>
            <TiltCard gradient={project.gradient}>
              <div className="flex items-start justify-between mb-4" style={{ transform: 'translateZ(30px)' }}>
                <div
                  className={cn(
                    'p-3 rounded-xl bg-gradient-to-br text-white',
                    project.gradient
                  )}
                >
                  <Folder className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="p-2 rounded-lg text-soft-gray hover:text-orange-400 hover:bg-foreground/5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="p-2 rounded-lg text-soft-gray hover:text-orange-400 hover:bg-foreground/5 transition-colors"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors mb-3" style={{ transform: 'translateZ(20px)' }}>
                {project.title}
              </h3>

              <p className="text-sm text-soft-gray leading-relaxed mb-5" style={{ transform: 'translateZ(15px)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </StaggerContainer>
    </Section>
  );
}