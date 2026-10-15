"use client";

import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/BrandIcons';
import { personalInfo } from '@/lib/data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-10">
      <div className="container-portfolio flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gradient">Ashish</span>
          <span className="text-sm text-soft-gray">Â© {new Date().getFullYear()}</span>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-soft-gray hover:text-primary transition-colors duration-200"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-soft-gray hover:text-primary transition-colors duration-200"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="text-soft-gray hover:text-primary transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${personalInfo.phone.replace(/-/g, '')}`}
            aria-label="Phone"
            className="text-soft-gray hover:text-primary transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location"
            className="text-soft-gray hover:text-primary transition-colors duration-200"
          >
            <MapPin className="w-5 h-5" />
          </a>
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors duration-200 text-soft-gray"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
