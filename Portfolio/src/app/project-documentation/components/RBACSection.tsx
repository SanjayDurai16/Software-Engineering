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

const roles = [
  {
    role: 'Buyer',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Creates and manages RFQs, reviews quotations, selects preferred vendors.',
    permissions: [
      'Create / Edit / Delete RFQs (Draft state only)',
      'View all submitted quotations for their RFQs',
      'Accept or reject vendor quotations',
      'View own purchase orders',
    ],
    limit: 'No direct PO approval authority',
  },
  {
    role: 'Vendor',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Receives RFQ notifications, submits quotations with tiered pricing.',
    permissions: [
      'View RFQs published to their organization',
      'Submit quotations with price slabs',
      'Edit quotations before buyer acceptance',
      'View own quotation history',
    ],
    limit: 'Cannot view other vendors\' quotations',
  },
  {
    role: 'Finance',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Reviews approved quotations against budget limits, provides final authorization.',
    permissions: [
      'View all quotations in Pending Finance state',
      'Approve quotations within their limit',
      'Reject with mandatory reason',
      'Escalate to Admin if above threshold',
    ],
    limit: 'Approval limited by configured spend threshold',
  },
  {
    role: 'Admin',
    color: 'bg-red-50 text-red-700 border-red-200',
    description: 'Full system access. Manages users, organizations, approval limits, and overrides.',
    permissions: [
      'Manage all users and organizations',
      'Configure approval limits per Finance user',
      'Override any workflow state',
      'Access full audit trail',
    ],
    limit: 'No restrictions',
  },
];

const approvalMatrix = [
  { role: 'Buyer', limit: '₹0 (no PO authority)', escalateTo: 'Finance' },
  { role: 'Finance (Junior)', limit: 'Up to ₹50,000', escalateTo: 'Finance (Senior)' },
  { role: 'Finance (Senior)', limit: 'Up to ₹5,00,000', escalateTo: 'Admin' },
  { role: 'Admin', limit: 'Unlimited', escalateTo: '—' },
];

export default function RBACSection() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">05</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Role Based Access Control
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          Access control is enforced at the API middleware layer. Every route checks the JWT token
          for role claims before executing the handler.
        </p>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {roles.map((r, i) => (
          <motion.div
            key={r.role}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="doc-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border ${r.color}`}>
                {r.role}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.description}</p>
            <ul className="space-y-2 mb-4">
              {r.permissions.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-foreground/80">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Restriction: </span>
                {r.limit}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Approval Limits Matrix */}
      <motion.div
        custom={roles.length + 1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="doc-card overflow-hidden"
      >
        <div className="px-5 py-3 bg-muted/60 border-b border-border">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Approval Limits Matrix
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {['Role', 'Approval Limit', 'Escalates To'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvalMatrix.map((row) => (
                <tr key={row.role} className="border-b border-border/50 last:border-0 table-row-hover">
                  <td className="px-5 py-3 font-semibold text-foreground">{row.role}</td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-sm">{row.limit}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.escalateTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}