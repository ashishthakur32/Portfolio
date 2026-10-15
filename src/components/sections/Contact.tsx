'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/BrandIcons';
import { personalInfo } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '528a2725-ba20-4758-b8a3-0686c4a25e45',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
          to_email: personalInfo.email,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/-/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      external: true,
    },
    {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ashish-kumar-thakur-487364211',
      href: personalInfo.linkedin,
      external: true,
    },
    {
      icon: GitHubIcon,
      label: 'GitHub',
      value: 'github.com/ashishthakur32',
      href: personalInfo.github,
      external: true,
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Get in Touch"
      title={
        <>
          Let&apos;s Build Something <span className="text-gradient">Great Together</span>
        </>
      }
      subtitle="Have a project in mind or want to discuss an opportunity? I'm always excited to connect."
    >
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Contact info */}
        <div className="space-y-4">
          <ScrollReveal direction="right">
            <p className="text-soft-gray leading-relaxed mb-6">
              I&apos;m currently looking for software development opportunities and open
              to collaborating on interesting projects. Feel free to reach out â€” I&apos;ll
              get back to you as soon as I can.
            </p>
          </ScrollReveal>

          {contactItems.map((item, i) => (
            <ScrollReveal key={item.label} direction="right" delay={i * 0.08}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="glass-card p-4 flex items-center gap-4 group hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-600/20 text-orange-400 group-hover:from-orange-500/30 group-hover:to-amber-600/30 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-soft-gray uppercase tracking-wide">{item.label}</p>
                  <p className="font-medium text-sm group-hover:text-orange-400 transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact form */}
        <ScrollReveal direction="left" delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card-bg border border-card-border focus:border-orange-500/50 outline-none transition-colors text-sm text-foreground placeholder-soft-gray/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card-bg border border-card-border focus:border-orange-500/50 outline-none transition-colors text-sm text-foreground placeholder-soft-gray/50"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card-bg border border-card-border focus:border-orange-500/50 outline-none transition-colors text-sm text-foreground placeholder-soft-gray/50 resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium transition-all hover:opacity-90 disabled:opacity-60 glow-primary"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <Send className="w-4 h-4" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-emerald-400"
              >
                Thanks for reaching out! I&apos;ll get back to you soon.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-red-400"
              >
                Something went wrong. Please try again or email me directly.
              </motion.p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </Section>
  );
}
