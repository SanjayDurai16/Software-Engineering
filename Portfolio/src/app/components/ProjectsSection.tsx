'use client';

import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const highlights = [
  'RFQ-driven purchasing workflow',
  'Quotation negotiation engine',
  'Multi-level approval workflows',
  'Automated PO generation',
  'Role-based access control',
  'Tiered pricing system',
];

const techStack = ['Node.js', 'Express.js', 'MongoDB', 'React', 'Tailwind CSS', 'REST APIs'];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Projects</span>
          <div className="mt-3 w-8 h-0.5 bg-primary rounded-full" />
          <h2 className="text-section-title font-extrabold text-foreground mt-6 tracking-tight">
            Featured work
          </h2>
        </motion.div>

        {/* Featured Project Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/8 transition-all duration-500 group"
        >
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Description */}
              <div className="lg:col-span-7">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                    Semester Project
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                    Full-Stack
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                    B2B Platform
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                  Enterprise B2B Vendors Aggregator
                </h3>

                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  This platform addresses inefficiencies in traditional B2B procurement by introducing
                  an RFQ-driven purchasing workflow for MSMEs, wholesalers, and vendors. Instead of
                  fixed-price purchasing, organizations can negotiate quotations, manage approval
                  workflows, automate purchase order generation, and streamline procurement using a
                  scalable backend architecture.
                </p>

                {/* Highlights */}
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Key Features
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {highlights?.map((h) => (
                      <div key={h} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="/project-documentation"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  View Complete Project Documentation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Right: Tech stack + visual */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                {/* Tech Stack */}
                <div className="bg-muted rounded-2xl p-6 border border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack?.map((tech) => (
                      <span key={tech} className="skill-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture visual */}
                <div className="bg-muted rounded-2xl p-6 border border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    RFQ Lifecycle
                  </p>
                  <div className="space-y-2">
                    {[
                      { state: 'Draft', color: 'bg-slate-100 text-slate-600 border-slate-200' },
                      { state: 'Pending Vendor', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                      { state: 'Pending Buyer', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                      { state: 'Pending Finance', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                      { state: 'PO Generated', color: 'bg-green-50 text-green-700 border-green-200' },
                    ]?.map((item, idx, arr) => (
                      <div key={item?.state} className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${item?.color}`}
                        >
                          {item?.state}
                        </span>
                        {idx < arr?.length - 1 && (
                          <svg className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}