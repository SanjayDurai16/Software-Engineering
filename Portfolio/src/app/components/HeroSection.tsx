'use client';

import { motion } from 'framer-motion';


const GeometricBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Grid overlay */}
    <div className="absolute inset-0 geometric-grid" />
    {/* Radial glow */}
    <div className="absolute inset-0 hero-radial" />

    {/* Animated blobs */}
    <div
      className="absolute top-1/4 right-1/4 w-96 h-96 blob-blue animate-gradient-shift"
      style={{ transform: 'translate(30%, -20%)' }}
    />
    <div
      className="absolute bottom-1/3 left-1/4 w-72 h-72 blob-blue animate-gradient-shift-delayed"
      style={{ transform: 'translate(-20%, 20%)' }}
    />

    {/* Floating geometric shapes */}
    <motion.div
      className="absolute top-20 right-16 w-12 h-12 border-2 border-primary/20 rounded-lg floating-shape"
      animate={{ rotate: [0, 10, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/3 right-1/3 w-6 h-6 bg-primary/10 rounded-full floating-shape-delayed"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-1/4 right-20 w-20 h-20 border border-primary/10 rounded-2xl floating-shape-slow"
      animate={{ rotate: [0, -8, 4, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/2 left-16 w-3 h-3 bg-primary/30 rounded-full"
      animate={{ y: [-6, 6, -6], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/4 left-1/3 w-8 h-8 border border-primary/15 rounded-full floating-shape"
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />

    {/* SVG Abstract Lines */}
    <svg
      className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]"
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="300" cy="200" r="180" stroke="#2563EB" strokeWidth="1" />
      <circle cx="300" cy="200" r="120" stroke="#2563EB" strokeWidth="1" />
      <circle cx="300" cy="200" r="60" stroke="#2563EB" strokeWidth="1" />
      <line x1="120" y1="200" x2="480" y2="200" stroke="#2563EB" strokeWidth="1" />
      <line x1="300" y1="20" x2="300" y2="380" stroke="#2563EB" strokeWidth="1" />
      <line x1="173" y1="73" x2="427" y2="327" stroke="#2563EB" strokeWidth="0.5" />
      <line x1="427" y1="73" x2="173" y2="327" stroke="#2563EB" strokeWidth="0.5" />
    </svg>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background"
    >
      <GeometricBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/8 border border-primary/20 text-primary text-xs font-semibold rounded-full tracking-wide">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Open to internship opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-hero-xl font-extrabold text-foreground tracking-tight mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="text-primary">Sanjay.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-semibold text-muted-foreground mb-5 tracking-tight"
            >
              Computer Science Engineering Student
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 font-medium mb-6 leading-relaxed max-w-lg"
            >
              Building scalable backend systems and modern web applications.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground leading-relaxed max-w-xl mb-10"
            >
              I enjoy designing software systems, solving real engineering problems, and learning how
              scalable applications work under the hood. My interests span backend engineering,
              system design, full-stack development, and software architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button
                onClick={() => handleScroll('projects')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                View Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <a
                href="https://github.com/SanjayDurai16"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-background text-foreground text-sm font-semibold rounded-full border border-border hover:border-foreground/40 hover:bg-muted transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/5">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                  <span className="text-2xl font-extrabold text-primary">SD</span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-1">Sanjay Durai</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  CS Engineering · MIT Chennai
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Backend', 'System Design', 'Full-Stack', 'Node.js'].map((tag) => (
                    <span key={tag} className="skill-tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">6+</p>
                    <p className="text-xs text-muted-foreground">Languages</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-lg font-bold text-foreground">35+</p>
                    <p className="text-xs text-muted-foreground">Commits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">1</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>

              {/* Floating mini card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Available</p>
                  <p className="text-xs text-muted-foreground">For internships</p>
                </div>
              </motion.div>

              {/* Floating tech card */}
              <motion.div
                className="absolute -top-5 -right-5 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-xs font-semibold text-foreground">MIT Chennai</p>
                <p className="text-xs text-muted-foreground">B.E. CSE · 2027</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}