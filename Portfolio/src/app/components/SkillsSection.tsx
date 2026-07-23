'use client';

import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  accent: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: '{ }',
    skills: ['C', 'C++', 'Java', 'JavaScript'],
    accent: 'text-primary',
  },
  {
    title: 'Frontend',
    icon: '◻',
    skills: ['React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS'],
    accent: 'text-primary',
  },
  {
    title: 'Backend',
    icon: '⚡',
    skills: ['Node.js', 'Express.js'],
    accent: 'text-primary',
  },
  {
    title: 'Database',
    icon: '🗃',
    skills: ['MongoDB'],
    accent: 'text-primary',
  },
  {
    title: 'Version Control',
    icon: '⑂',
    skills: ['Git', 'GitHub'],
    accent: 'text-primary',
  },
  {
    title: 'Concepts',
    icon: '🧩',
    skills: ['REST APIs', 'RBAC', 'Database Design', 'State Machines', 'System Design'],
    accent: 'text-primary',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 bg-muted/40" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Skills</span>
          <div className="mt-3 w-8 h-0.5 bg-primary rounded-full" />
          <h2 className="text-section-title font-extrabold text-foreground mt-6 tracking-tight">
            Technical toolkit
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-lg">
            A focused set of technologies I&apos;m actively working with and building on.
          </p>
        </motion.div>

        {/* BENTO GRID AUDIT:
          Array has 6 cards: [Programming Languages, Frontend, Backend, Database, Version Control, Concepts]
          Row 1: [col-1: Programming cs-1] [col-2: Frontend cs-1] [col-3: Backend cs-1]
          Row 2: [col-1: Database cs-1] [col-2: Version Control cs-1] [col-3: Concepts cs-1]
          Placed 6/6 cards ✓
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            /* card index: {i} */
            <motion.div
              key={cat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="bg-card border border-border rounded-2xl p-6 card-hover group"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center border border-primary/15 group-hover:bg-primary/15 transition-colors">
                  <span className={`text-base font-bold ${cat.accent}`}>{cat.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground tracking-tight">{cat.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}