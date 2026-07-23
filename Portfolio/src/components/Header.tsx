'use client';

import { useState, useEffect } from 'react';
import AppLogo from './ui/AppLogo';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'nav-blur border-b border-border shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <AppLogo size={32} />
            <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              Sanjay
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-2 bg-muted/60 rounded-full border border-border">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="mailto:sanjaydurai1612@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20"
          >
            Get in touch
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                href="mailto:sanjaydurai1612@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-primary text-primary-foreground text-base font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Get in touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}