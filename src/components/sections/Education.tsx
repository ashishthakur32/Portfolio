'use client';

import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { education, certifications } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, {
  slideLeftVariants,
  slideRightVariants,
} from '@/components/animations/StaggerContainer';

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & Certifications"
      title={
        <>
          My <span className="text-gradient">Academic Journey</span>
        </>
      }
      subtitle="The foundations and continuous learning that shaped my career."
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Education */}
        <StaggerContainer className="space-y-6" stagger={0.15}>
          {education.map((edu) => (
            <motion.div key={edu.institution} variants={slideLeftVariants}>
              <div className="glass-card p-6 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-600/20 text-orange-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold group-hover:text-orange-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-primary text-sm font-medium mt-1">
                      {edu.institution} Â· {edu.location}
                    </p>
                    <p className="text-sm text-soft-gray mt-2">{edu.period}</p>
                    <p className="text-sm text-soft-gray mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                    {edu.highlights && (
                      <ul className="mt-4 space-y-2">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-soft-gray">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Certifications */}
        <div className="space-y-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold">Certifications</h3>
            </div>
          </ScrollReveal>
          <StaggerContainer className="space-y-6" stagger={0.15}>
            {certifications.map((cert) => (
              <motion.div key={cert.title} variants={slideRightVariants}>
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card p-6 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold group-hover:text-orange-400 transition-colors flex items-center gap-2">
                        {cert.title}
                        <ExternalLink className="w-4 h-4 text-soft-gray group-hover:text-orange-400 transition-colors" />
                      </h4>
                      <p className="text-sm text-soft-gray mt-1">
                        {cert.issuer} Â· {cert.year}
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-600/10 text-orange-400 text-xs font-medium border border-orange-500/20 shrink-0">
                      Certified
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}
