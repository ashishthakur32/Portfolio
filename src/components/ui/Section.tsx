import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/animations/ScrollReveal';

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
};

export default function Section({
  id,
  className,
  children,
  eyebrow,
  title,
  subtitle,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28 scroll-mt-20', className)}>
      <div className="container-portfolio">
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16 text-center">
            {eyebrow && (
              <ScrollReveal>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  {eyebrow}
                </p>
              </ScrollReveal>
            )}
            {title && (
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {title}
                </h2>
              </ScrollReveal>
            )}
            {subtitle && (
              <ScrollReveal delay={0.2}>
                <p className="mt-4 text-soft-gray max-w-2xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              </ScrollReveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
