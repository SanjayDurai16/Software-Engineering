'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend connection point — wire up email service here
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Contact</span>
          <div className="mt-3 w-8 h-0.5 bg-primary rounded-full" />
          <h2 className="text-section-title font-extrabold text-foreground mt-6 tracking-tight">
            Let&apos;s talk
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-lg">
            Whether you have a project in mind, want to discuss engineering topics, or just want to
            connect — I&apos;m reachable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact info */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-4 space-y-5"
          >
            {/* Email */}
            <a
              href="mailto:sanjaydurai1612@gmail.com"
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Email
                </p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  sanjaydurai1612@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:8610970260"
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Phone
                </p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  +91 86109 70260
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/SanjayDurai16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  GitHub
                </p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  @SanjayDurai16
                </p>
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-8"
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 border border-green-100">
                    <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-muted-foreground text-sm">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}