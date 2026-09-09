'use client';

import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

export default function Blog() {
  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title={
        <>
          Latest <span className="text-gradient">Articles</span>
        </>
      }
      subtitle="Thoughts, insights, and learnings from my development journey."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <article className="glass-card p-6 h-full flex flex-col group hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300">
              <div
                className={cn(
                  'w-full h-1 rounded-full bg-gradient-to-r opacity-80 mb-5',
                  post.gradient
                )}
              />
              <div className="flex items-center gap-3 text-xs text-soft-gray mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="font-bold text-lg group-hover:text-cyan-400 transition-colors mb-2">
                {post.title}
              </h3>

              <p className="text-sm text-soft-gray leading-relaxed mb-4 flex-grow">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-soft-gray border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}