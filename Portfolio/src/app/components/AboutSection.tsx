'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const interests = [
  { icon: '⚙️', label: 'Backend Engineering' },
  { icon: '🏗️', label: 'System Design' },
  { icon: '🌐', label: 'Full-Stack Dev' },
  { icon: '📐', label: 'Software Architecture' },
  { icon: '🧠', label: 'Psychology' },
  { icon: '🔭', label: 'Philosophy & Science' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            About
          </span>
          <div className="mt-3 w-8 h-0.5 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Main text */}
          <motion.div
            className="lg:col-span-7"
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={fadeUp}
              className="text-section-title font-extrabold text-foreground mb-8 tracking-tight"
            >
              Engineering student who thinks in{' '}
              <span className="text-primary">systems.</span>
            </motion.h2>

            <motion.div variants={stagger} className="space-y-5 text-base text-muted-foreground leading-relaxed">
              <motion.p variants={fadeUp}>
                I&apos;m Sanjay Durai, 18, studying Computer Science Engineering at Madras Institute
                of Technology (MIT Chennai). I got interested in software not because of code syntax,
                but because of what software can actually do — how a well-designed system can solve
                a real problem at scale.
              </motion.p>
              <motion.p variants={fadeUp}>
                My focus right now is backend engineering and system design. I want to understand how
                applications handle thousands of users, how data flows through complex pipelines, and
                how architectural decisions made early on affect a system years later. I&apos;m learning
                Node.js, Express, React, and MongoDB while building things that go beyond academic
                exercises.
              </motion.p>
              <motion.p variants={fadeUp}>
                I&apos;m comfortable with C, C++, Java, and JavaScript. Outside of engineering, I read
                about psychology, philosophy, and science — not because they&apos;re required, but because
                understanding how people think and how the world works makes me a better problem-solver.
              </motion.p>
              <motion.p variants={fadeUp}>
                I believe software engineering is fundamentally about designing systems — not just
                writing code that works, but building something that&apos;s maintainable, scalable, and
                worth handing off to someone else.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right: Info cards */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Education card */}
            <motion.div
              variants={fadeUp}
              className="bg-muted rounded-2xl p-6 border border-border"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Education
              </p>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary text-sm font-bold">MIT</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    Madras Institute of Technology
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    B.E. Computer Science Engineering
                  </p>
                  <p className="text-xs text-muted-foreground">Chennai</p>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              variants={fadeUp}
              className="bg-muted rounded-2xl p-6 border border-border"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests?.map((item) => (
                  <span
                    key={item?.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <span>{item?.icon}</span>
                    {item?.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Currently learning */}
            <motion.div
              variants={fadeUp}
              className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Currently Learning
              </p>
              <div className="space-y-2">
                {[
                  'Node.js & Express.js',
                  'React & Tailwind CSS',
                  'MongoDB & Database Design',
                  'REST API Architecture',
                  'System Design Fundamentals',
                ]?.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}