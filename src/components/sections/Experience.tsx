'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Award } from 'lucide-react';
import { experience } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve <span className="text-gradient">Worked</span>
        </>
      }
      subtitle="My professional journey building production-grade software solutions."
    >
      <div className="relative" ref={timelineRef}>
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-orange-500 via-amber-500 to-orange-400"
        />

        <div className="space-y-12">
          {experience.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <ScrollReveal
                key={`${item.company}-${item.role}`}
                direction={isLeft ? 'left' : 'right'}
              >
                <div
                  className={`relative flex md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 glow-primary" />
                    <div className="absolute inset-0 rounded-full animate-ping bg-orange-400/50" />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-12 md:w-1/2 md:px-8" />

                  {/* Content card */}
                  <div
                    className={`w-full md:w-1/2 md:px-8 ${
                      !isLeft ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <div className="glass-card p-6 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-orange-400 transition-colors">
                            {item.role}
                          </h3>
                          <p className="text-primary text-sm font-medium mt-1">
                            {item.company}
                            {item.location ? ` Â· ${item.location}` : ''}
                          </p>
                        </div>
                        {item.current && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-soft-gray mb-3">{item.period}</p>

                      <div className="block md:hidden mb-3">
                        <a
                          href={item.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {item.company === 'AIVI Technologies'
                            ? 'Live Demo'
                            : item.company === 'Acmegrade'
                            ? 'Certificate'
                            : 'Learn More'}
                        </a>
                      </div>

                      <ul className="space-y-2.5 text-sm text-soft-gray leading-relaxed">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {item.liveDemo && (
                        <div className="mt-4 hidden md:block">
                          <a
                            href={item.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {item.company === 'AIVI Technologies'
                              ? 'View Live System'
                              : 'View Details'}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
