'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, personalInfo } from '@/lib/data/resume';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const sections = navLinks
          .map((link) => link.href.slice(1))
          .filter(Boolean);

        const scrollPos = window.scrollY + 120;
        let current = '';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            current = id;
          }
        }
        setActiveSection(current);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-card-border py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="container-portfolio flex items-center justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold tracking-tight group"
        >
          <span className="text-gradient">A</span>
          <span className="group-hover:text-gradient transition-all duration-300">shish</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    'text-sm transition-colors duration-200 nav-link',
                    activeSection === link.href.slice(1)
                      ? 'text-gradient font-medium'
                      : 'text-soft-gray hover:text-foreground'
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:opacity-90 transition-opacity glow-primary"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-card-border transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="container-portfolio py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg text-sm transition-colors',
                  activeSection === link.href.slice(1)
                    ? 'text-gradient font-medium bg-card-bg'
                    : 'text-soft-gray hover:text-foreground hover:bg-foreground/5'
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg mt-2 text-center"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
