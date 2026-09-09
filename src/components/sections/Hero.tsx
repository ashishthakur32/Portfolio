'use client';

import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { personalInfo, typingRoles, heroStats } from '@/lib/data/resume';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/BrandIcons';
import ParticleBackground from './ParticleBackground';
import ScrambleText from '@/components/animations/ScrambleText';
import MagneticButton from '@/components/animations/MagneticButton';
import GlowCard from '@/components/animations/GlowCard';

export default function Hero() {
  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 animated-gradient overflow-hidden">
      <ParticleBackground />

      {/* Content */}
      <div className="container-portfolio relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-soft-gray mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient bg-clip-text">
                <ScrambleText text="Ashish Kumar" delay={300} speed={40} />
              </span>{' '}
              <span className="text-gradient bg-clip-text">
                <ScrambleText text="Thakur" delay={600} speed={40} />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-xl sm:text-2xl font-medium text-soft-gray h-8"
            >
              <TypeAnimation
                sequence={typingRoles.flatMap((role) => [role, 1500])}
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
              <span className="cursor-blink ml-1" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base md:text-lg text-soft-gray leading-relaxed max-w-xl"
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <button
                  onClick={() => handleScrollTo('#projects')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium transition-all hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => handleScrollTo('#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-card-border bg-card-bg text-foreground font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  Contact Me
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-soft-gray font-medium hover:text-primary transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-3"
            >
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-lg border border-card-border bg-card-bg text-foreground hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 hover:-translate-y-1"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-lg border border-card-border bg-card-bg text-foreground hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 hover:-translate-y-1"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="p-3 rounded-lg border border-card-border bg-card-bg text-foreground hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right column - stats / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={i % 2 === 1 ? 'translate-y-6' : ''}
                >
                  <GlowCard>
                    <div className="p-6 text-center">
                      <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                      <p className="mt-2 text-sm text-soft-gray">{stat.label}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-6 mt-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Current Focus</span>
                <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SD</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Software Development Engineer</p>
                  <p className="text-xs text-soft-gray">AIVI Technologies</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-soft-gray">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Building Smart Attendance Systems
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-soft-gray hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
            <rect x="1" y="1" width="14" height="22" rx="7" strokeWidth="2" />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}
