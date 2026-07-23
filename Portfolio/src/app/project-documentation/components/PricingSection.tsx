'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const exampleSlabs = [
  { min: 1, max: 49, price: '₹120 / unit', tier: 'Standard', color: 'bg-slate-50 border-slate-200' },
  { min: 50, max: 199, price: '₹105 / unit', tier: 'Bulk', color: 'bg-blue-50 border-blue-200' },
  { min: 200, max: 499, price: '₹92 / unit', tier: 'Wholesale', color: 'bg-primary/8 border-primary/30' },
  { min: 500, max: null, price: '₹80 / unit', tier: 'Enterprise', color: 'bg-green-50 border-green-200' },
];

export default function PricingSection() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">06</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Tiered Pricing — Price Slabs
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          Instead of a single price per product, vendors define price slabs — quantity ranges with
          corresponding unit prices. The system automatically applies the correct slab based on
          the ordered quantity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual slab diagram */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="lg:col-span-7 doc-card p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Example: Industrial Screws — Price Slab Configuration
          </p>
          <div className="space-y-3">
            {exampleSlabs.map((slab, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${slab.color}`}>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {slab.tier}
                    </span>
                    <span className="text-base font-bold text-foreground">{slab.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Qty: {slab.min}–{slab.max !== null ? slab.max : '∞'}
                    </span>
                    {/* Visual bar */}
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/40 rounded-full"
                        style={{ width: `${100 - i * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">How it works: </span>
              When a buyer specifies a quantity of 250 units in an RFQ, the system evaluates all
              active price slabs and returns the Wholesale tier price of ₹92/unit automatically.
              No manual calculation required.
            </p>
          </div>
        </motion.div>

        {/* Explanation cards */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="lg:col-span-5 space-y-4"
        >
          <div className="doc-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Data Model
            </p>
            <div className="space-y-2 font-mono text-xs text-foreground/80 bg-muted rounded-lg p-4 border border-border">
              <p className="text-muted-foreground">// Price Slab document</p>
              <p>{'{'}</p>
              <p className="pl-4">productId: ObjectId,</p>
              <p className="pl-4">minQty: 200,</p>
              <p className="pl-4">maxQty: 499,</p>
              <p className="pl-4">pricePerUnit: 92,</p>
              <p className="pl-4">currency: <span className="text-green-600">"INR"</span></p>
              <p>{'}'}</p>
            </div>
          </div>

          <div className="doc-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Lookup Logic
            </p>
            <div className="space-y-2.5">
              {[
                { step: '1', text: 'Buyer specifies quantity in RFQ line item' },
                { step: '2', text: 'System queries price slabs where minQty ≤ qty ≤ maxQty' },
                { step: '3', text: 'Matched slab price is applied to quotation' },
                { step: '4', text: 'Total is computed and shown to buyer' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                    <span className="text-primary text-xs font-bold">{s.step}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="doc-card p-5 bg-primary/4 border-primary/20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Business Impact
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vendors can incentivize bulk purchasing without manual negotiation. Buyers
              automatically receive the best applicable price for their order size.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}