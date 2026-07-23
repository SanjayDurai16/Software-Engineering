'use client';

import  { useState, useEffect } from 'react';
import AppLogo from './ui/AppLogo';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-3">
            <AppLogo size={28} />
            <span className="text-sm text-muted-foreground">
              {year && `© ${year}`} Sanjay Durai
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="text-muted-foreground/60">
              Built with React · Tailwind CSS · Framer Motion
            </span>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a
              href="https://github.com/SanjayDurai16"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}