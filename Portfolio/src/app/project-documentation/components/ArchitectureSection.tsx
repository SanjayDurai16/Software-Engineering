'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const techChoices = [
  {
    tech: 'Node.js',
    role: 'Runtime',
    reason:
      'Non-blocking I/O model handles concurrent RFQ negotiations efficiently. JavaScript across the full stack reduces context-switching.',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    tech: 'Express.js',
    role: 'API Framework',
    reason:
      'Minimal, unopinionated framework. Middleware-based architecture maps cleanly to the approval chain — each approval stage is a middleware layer.',
    color: 'bg-slate-50 border-slate-200 text-slate-700',
  },
  {
    tech: 'MongoDB',
    role: 'Database',
    reason:
      'Document model fits procurement data naturally. An RFQ with nested quotations, line items, and approval history is one document — no complex joins.',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
  {
    tech: 'React',
    role: 'Frontend',
    reason:
      'Component-based architecture matches the modular workflow UI. Different role dashboards (Buyer, Vendor, Finance) are composed from shared components.',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  },
  {
    tech: 'Tailwind CSS',
    role: 'Styling',
    reason:
      'Utility-first approach speeds up dashboard development. Consistent design system without a heavyweight component library.',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
];

export default function ArchitectureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="mb-16">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mb-8"
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">02</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Architecture Overview
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          The system follows a three-tier architecture: React frontend, Express REST API layer, and
          MongoDB data store. Each technology was selected for a specific architectural reason, not
          convenience.
        </p>
      </motion.div>

      {/* Architecture diagram */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="doc-card p-6 mb-6 overflow-x-auto"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          System Layers
        </p>
        <div className="flex flex-col sm:flex-row items-stretch gap-0 min-w-[320px]">
          {[
            { layer: 'Client', detail: 'React + Tailwind CSS', sub: 'Role-based dashboards', bg: 'bg-blue-50 border-blue-200' },
            { layer: 'API', detail: 'Express.js REST API', sub: 'JWT Auth · RBAC Middleware', bg: 'bg-primary/8 border-primary/30' },
            { layer: 'Data', detail: 'MongoDB', sub: 'Documents · Indexes · Aggregations', bg: 'bg-green-50 border-green-200' },
          ].map((item, i, arr) => (
            <React.Fragment key={item.layer}>
              <div className={`flex-1 border ${item.bg} rounded-xl p-5 text-center`}>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {item.layer}
                </p>
                <p className="text-sm font-bold text-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="flex items-center justify-center px-2 py-2 sm:py-0">
                  <svg className="w-5 h-5 text-muted-foreground/40 rotate-90 sm:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Tech choices */}
      <div className="space-y-3">
        {techChoices.map((item, i) => (
          <motion.div
            key={item.tech}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="doc-card p-5 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            <div className="flex-shrink-0 flex items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border ${item.color}`}
              >
                {item.tech}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{item.role}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.reason}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}