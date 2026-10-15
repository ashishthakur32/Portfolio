'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Code2, Terminal, MapPin, Mail, Phone, GraduationCap } from 'lucide-react';
import { personalInfo } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { slideLeftVariants } from '@/components/animations/StaggerContainer';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title={
        <>
          Passionate Developer Building{' '}
          <span className="text-gradient">Scalable Solutions</span>
        </>
      }
    >
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left - profile card */}
        <ScrollReveal direction="right">
          <div className="glass-card p-8 relative overflow-hidden group">
            {/* Glow decoration */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500" />

            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {personalInfo.photo ? (
                  <Image
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-2xl object-cover glow-primary"
                    priority
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-3xl font-bold text-white glow-primary">
                    A
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-4 border-background animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                <p className="text-soft-gray text-sm">{personalInfo.title}</p>
              </div>
            </div>

            <p className="text-soft-gray leading-relaxed mb-6">
              {personalInfo.summary}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-soft-gray">
                <MapPin className="w-4 h-4 text-orange-400" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-3 text-soft-gray">
                <Mail className="w-4 h-4 text-orange-400" />
                {personalInfo.email}
              </div>
              <div className="flex items-center gap-3 text-soft-gray">
                <Phone className="w-4 h-4 text-orange-400" />
                {personalInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-soft-gray">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                B.Tech in CSE
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right - what I do */}
        <div className="space-y-6">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">What I Do</h4>
              </div>
              <p className="text-soft-gray text-sm leading-relaxed">
                I specialize in building full-stack web applications using the MERN stack.
                From architecting RESTful APIs to crafting responsive React interfaces,
                I focus on writing clean, scalable, and maintainable code that delivers
                real business value.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">My Strengths</h4>
              </div>
              <StaggerContainer className="space-y-2" stagger={0.12}>
                {[
                  'MERN Stack Development',
                  'RESTful API Design & Implementation',
                  'Secure Authentication (JWT) & RBAC',
                  'MVC Architecture & Best Practices',
                  'Agile/Scrum Methodology',
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={slideLeftVariants}
                    className="flex items-center gap-2 text-sm text-soft-gray"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                    {item}
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
