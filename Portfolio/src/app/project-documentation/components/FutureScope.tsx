'use client';

import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const futureItems = [
  {
    title: 'AI-Assisted Procurement',
    description:
      'ML model trained on historical RFQ data to suggest optimal vendors, predict delivery timelines, and flag anomalous pricing.',
    tag: 'AI/ML',
    icon: '🤖',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    title: 'Procurement Analytics Dashboard',
    description:
      'Real-time spend analytics, vendor performance scoring, category-wise procurement trends, and budget utilization reports.',
    tag: 'Analytics',
    icon: '📊',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Real-Time Notifications',
    description:
      'WebSocket-based notification system for RFQ state transitions. Email and in-app alerts for approvals, rejections, and deadlines.',
    tag: 'Infrastructure',
    icon: '🔔',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    title: 'Inventory Integration',
    description:
      'Connect procurement to inventory management. Auto-trigger RFQs when stock falls below reorder thresholds.',
    tag: 'Integration',
    icon: '📦',
    color: 'bg-green-50 border-green-200',
  },
  {
    title: 'Payment Gateway',
    description:
      'Integrate Razorpay/Stripe for direct vendor payments from approved POs. Track payment status within the platform.',
    tag: 'Payments',
    icon: '💳',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Warehouse Management',
    description:
      'Track goods receipt against purchase orders. Partial deliveries, quality inspection workflows, and GRN generation.',
    tag: 'Logistics',
    icon: '🏭',
    color: 'bg-slate-50 border-slate-200',
  },
];

export default function FutureScope() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">08</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Future Scope
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          Planned extensions that would take this from a semester project to a production-grade
          procurement platform.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {futureItems.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={`doc-card p-5 border ${item.color} card-hover`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs px-2 py-0.5 bg-background border border-border rounded-full text-muted-foreground font-semibold">
                {item.tag}
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}