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

const collections = [
  {
    name: 'Products',
    fields: [
      { field: '_id', type: 'ObjectId', note: 'Primary key' },
      { field: 'name', type: 'String', note: 'Product name' },
      { field: 'description', type: 'String', note: 'Product details' },
      { field: 'category', type: 'String', note: 'Classification' },
      { field: 'unit', type: 'String', note: 'kg, piece, litre, etc.' },
      { field: 'priceSlabs', type: '[ObjectId]', note: 'Ref → Price Slabs' },
      { field: 'organizationId', type: 'ObjectId', note: 'Ref → Organizations' },
    ],
  },
  {
    name: 'Price Slabs',
    fields: [
      { field: '_id', type: 'ObjectId', note: 'Primary key' },
      { field: 'productId', type: 'ObjectId', note: 'Ref → Products' },
      { field: 'minQty', type: 'Number', note: 'Minimum quantity threshold' },
      { field: 'maxQty', type: 'Number', note: 'Maximum quantity threshold' },
      { field: 'pricePerUnit', type: 'Number', note: 'Price at this tier' },
      { field: 'currency', type: 'String', note: 'INR, USD, etc.' },
    ],
  },
  {
    name: 'Organizations',
    fields: [
      { field: '_id', type: 'ObjectId', note: 'Primary key' },
      { field: 'name', type: 'String', note: 'Company name' },
      { field: 'type', type: 'Enum', note: 'BUYER | VENDOR | BOTH' },
      { field: 'gstin', type: 'String', note: 'Tax identifier' },
      { field: 'address', type: 'Object', note: 'Embedded address document' },
      { field: 'users', type: '[ObjectId]', note: 'Ref → Users' },
    ],
  },
  {
    name: 'Users',
    fields: [
      { field: '_id', type: 'ObjectId', note: 'Primary key' },
      { field: 'name', type: 'String', note: 'Full name' },
      { field: 'email', type: 'String', note: 'Unique, indexed' },
      { field: 'passwordHash', type: 'String', note: 'bcrypt hashed' },
      { field: 'role', type: 'Enum', note: 'BUYER | VENDOR | FINANCE | ADMIN' },
      { field: 'organizationId', type: 'ObjectId', note: 'Ref → Organizations' },
      { field: 'approvalLimit', type: 'Number', note: 'Max spend authority (INR)' },
    ],
  },
];

const relationships = [
  { from: 'Users', to: 'Organizations', type: 'Many-to-One', note: 'Many users belong to one organization' },
  { from: 'Products', to: 'Organizations', type: 'Many-to-One', note: 'Products are owned by an organization' },
  { from: 'Price Slabs', to: 'Products', type: 'Many-to-One', note: 'Multiple price tiers per product' },
  { from: 'RFQ', to: 'Users (Buyer)', type: 'Many-to-One', note: 'Each RFQ is created by one buyer' },
  { from: 'Quotation', to: 'RFQ', type: 'Many-to-One', note: 'Multiple vendors can quote on one RFQ' },
];

export default function DatabaseSection() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">04</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Database Design
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          MongoDB document collections with explicit relationships modeled via ObjectId references.
          Embedded documents used for frequently-read nested data.
        </p>
      </motion.div>

      {/* Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {collections.map((col, i) => (
          <motion.div
            key={col.name}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="doc-card overflow-hidden"
          >
            <div className="px-5 py-3 bg-primary/5 border-b border-border flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-bold text-foreground">{col.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">Collection</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Field
                    </th>
                    <th className="text-left px-4 py-2.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-2.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {col.fields.map((f) => (
                    <tr key={f.field} className="border-b border-border/50 last:border-0 table-row-hover">
                      <td className="px-4 py-2.5 font-mono text-foreground font-semibold">
                        {f.field}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 bg-primary/8 text-primary rounded text-xs font-semibold">
                          {f.type}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Relationships */}
      <motion.div
        custom={collections.length + 1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="doc-card overflow-hidden"
      >
        <div className="px-5 py-3 bg-muted/60 border-b border-border">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Entity Relationships
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  From
                </th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  To
                </th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  Cardinality
                </th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {relationships.map((rel) => (
                <tr key={`${rel.from}-${rel.to}`} className="border-b border-border/50 last:border-0 table-row-hover">
                  <td className="px-5 py-3 font-semibold text-foreground text-sm">{rel.from}</td>
                  <td className="px-5 py-3 font-semibold text-foreground text-sm">{rel.to}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2.5 py-1 bg-primary/8 text-primary rounded-full font-semibold border border-primary/20">
                      {rel.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-sm">{rel.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}