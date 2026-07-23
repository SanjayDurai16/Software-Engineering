'use client';

import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const repos = [
  {
    name: 'b2b-vendors-aggregator',
    description:
      'Enterprise B2B procurement platform with RFQ workflow, RBAC, tiered pricing, and automated PO generation.',
    language: 'JavaScript',
    stars: 3,
    forks: 0,
    tags: ['Node.js', 'Express', 'MongoDB', 'React'],
  },
];

const langColor: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-orange-500',
};

export default function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="github" className="py-24 bg-muted/40" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">GitHub</span>
          <div className="mt-3 w-8 h-0.5 bg-primary rounded-full" />
          <h2 className="text-section-title font-extrabold text-foreground mt-6 tracking-tight">
            Open source work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* GitHub Profile Card */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-4"
          >
            <div className="bg-card border border-border rounded-2xl p-6 card-hover">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-foreground rounded-full flex items-center justify-center">
                  <span className="text-background font-bold text-lg">SD</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Sanjay Durai</p>
                  <p className="text-sm text-muted-foreground">@SanjayDurai16</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                CS Engineering student building real-world backend systems and full-stack
                applications.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border mb-6">
                <div>
                  <p className="text-lg font-bold text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Repositories</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">MIT</p>
                  <p className="text-xs text-muted-foreground">Chennai</p>
                </div>
              </div>

              <a
                href="https://github.com/SanjayDurai16"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View GitHub Profile
              </a>
            </div>
          </motion.div>

          {/* Repo Cards */}
          <div className="lg:col-span-8 space-y-4">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="bg-card border border-border rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <a
                      href={`https://github.com/SanjayDurai16/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-foreground group-hover:text-primary transition-colors"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-muted border border-border rounded-full text-muted-foreground font-medium flex-shrink-0">
                    Public
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.tags.map((tag) => (
                    <span key={tag} className="skill-tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${langColor[repo.language] || 'bg-gray-400'}`} />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
                    </svg>
                    {repo.forks} forks
                  </span>
                </div>
              </motion.div>
            ))}

            {/* View all repos CTA */}
            <motion.div
              custom={repos.length + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <a
                href="https://github.com/SanjayDurai16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 border border-dashed border-border rounded-2xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/4 transition-all duration-200"
              >
                View all repositories on GitHub
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}