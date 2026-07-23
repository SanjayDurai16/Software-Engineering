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

const rfqStates = [
  {
    state: 'Draft',
    actor: 'Buyer',
    description: 'Buyer creates an RFQ with required items, quantities, and delivery timeline. Not yet visible to vendors.',
    actions: ['Add line items', 'Set delivery date', 'Attach specifications'],
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    dot: 'bg-slate-400',
  },
  {
    state: 'Pending Vendor',
    actor: 'Vendor',
    description: 'RFQ is published to eligible vendors. Vendors submit quotations with pricing, which may include tiered price slabs.',
    actions: ['Submit quotation', 'Add price slabs', 'Set validity period'],
    color: 'bg-amber-50 text-amber-700 border-amber-300',
    dot: 'bg-amber-400',
  },
  {
    state: 'Pending Buyer',
    actor: 'Buyer',
    description: 'Buyer reviews all submitted quotations, compares pricing across vendors, and selects the preferred quotation.',
    actions: ['Compare quotations', 'Accept/reject bids', 'Request revision'],
    color: 'bg-blue-50 text-blue-700 border-blue-300',
    dot: 'bg-blue-400',
  },
  {
    state: 'Pending Finance',
    actor: 'Finance',
    description: 'Finance team reviews the selected quotation against budget limits and approval thresholds. May approve, reject, or escalate.',
    actions: ['Verify budget', 'Approve/reject', 'Escalate if above limit'],
    color: 'bg-purple-50 text-purple-700 border-purple-300',
    dot: 'bg-purple-400',
  },
  {
    state: 'Purchase Order Generated',
    actor: 'System',
    description: 'On final approval, the system automatically generates a Purchase Order document with all negotiated terms, vendor details, and line items.',
    actions: ['Auto-generate PO', 'Notify all parties', 'Archive RFQ'],
    color: 'bg-green-50 text-green-700 border-green-300',
    dot: 'bg-green-400',
  },
];

export default function WorkflowSection() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">03</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          System Workflow — RFQ Lifecycle
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          The RFQ (Request for Quotation) lifecycle is modeled as a state machine. Each state
          transition is triggered by a specific actor performing a specific action.
        </p>
      </motion.div>

      {/* State machine visual */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="doc-card p-6 mb-8 overflow-x-auto"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          State Transition Diagram
        </p>
        <div className="flex flex-wrap items-center gap-2 min-w-[500px]">
          {rfqStates.map((s, i) => (
            <React.Fragment key={s.state}>
              <div className={`state-node border ${s.color} whitespace-nowrap`}>{s.state}</div>
              {i < rfqStates.length - 1 && (
                <div className="flex flex-col items-center gap-0.5">
                  <svg className="w-5 h-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* State detail cards */}
      <div className="space-y-4">
        {rfqStates.map((s, i) => (
          <motion.div
            key={s.state}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="doc-card p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${s.dot} flex-shrink-0`} />
                <span className={`state-node border ${s.color} text-xs`}>{s.state}</span>
                <span className="text-xs text-muted-foreground font-medium">Actor: {s.actor}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.actions.map((action) => (
                    <span
                      key={action}
                      className="text-xs px-2.5 py-1 bg-muted border border-border rounded-full text-muted-foreground font-medium"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}