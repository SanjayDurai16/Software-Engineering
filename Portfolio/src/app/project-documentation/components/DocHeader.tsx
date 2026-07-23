'use client';


import { motion } from 'framer-motion';

import AppLogo from '../../../components/ui/AppLogo';
/* function AppLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M8 23 16 7l8 16h-4.5L16 15l-3.5 8H8Z"
        className="fill-primary-foreground"
      />
    </svg>
  );
} */

export default function DocHeader() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 nav-blur border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <AppLogo size={28} />
          <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
            Sanjay Durai
          </span>
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            Project Documentation
          </span>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </a>
        </div>
      </div>
    </motion.header>
  );
}