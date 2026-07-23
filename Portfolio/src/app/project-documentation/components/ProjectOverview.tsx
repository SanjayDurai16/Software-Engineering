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

export default function ProjectOverview() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">01</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Project Overview
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Problem Statement */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="md:col-span-3 doc-card p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Problem Statement
          </p>
          <p className="text-base text-foreground leading-relaxed">
            Traditional B2B procurement relies on fixed-price purchasing, phone-based negotiations,
            and manual purchase order creation. For MSMEs, wholesalers, and multi-vendor
            organizations, this creates significant inefficiencies: no audit trail for negotiations,
            no structured approval hierarchy, and no automated workflow from quotation to purchase
            order. The result is slow procurement cycles, pricing inconsistencies, and uncontrolled
            spending.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="md:col-span-2 doc-card p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Objectives
          </p>
          <ul className="space-y-3">
            {[
              'Replace fixed-price procurement with a negotiation-first RFQ workflow',
              'Implement role-based access control for Buyers, Vendors, Finance, and Admins',
              'Automate purchase order generation once quotations are approved',
              'Introduce tiered pricing (price slabs) based on quantity ordered',
              'Provide a multi-level approval chain with configurable spending limits',
              'Build a scalable backend architecture using Node.js, Express, and MongoDB',
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                  <span className="text-primary text-xs font-bold">{i + 1}</span>
                </div>
                {obj}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expected Outcomes */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="md:col-span-1 doc-card p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Expected Outcomes
          </p>
          <div className="space-y-4">
            {[
              { label: 'Procurement Cycle', value: 'Reduced by structured RFQ flow' },
              { label: 'Audit Trail', value: 'Complete negotiation history' },
              { label: 'PO Generation', value: 'Automated on final approval' },
              { label: 'Access Control', value: 'Role-based, configurable' },
            ].map((item) => (
              <div key={item.label} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}