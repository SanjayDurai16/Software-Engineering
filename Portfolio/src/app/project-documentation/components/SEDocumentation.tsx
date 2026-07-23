'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface SECard {
  id: string;
  title: string;
  tag: string;
  description: string;
  content: React.ReactNode;
}

// ── Predecessor Table ──────────────────────────────────────────────────────────
const predecessorData = [
  { activity: 'A', description: 'Requirements Analysis', predecessor: '—', duration: '3 days' },
  { activity: 'B', description: 'System Architecture Design', predecessor: 'A', duration: '2 days' },
  { activity: 'C', description: 'Database Schema Design', predecessor: 'B', duration: '2 days' },
  { activity: 'D', description: 'RBAC & Auth Implementation', predecessor: 'B', duration: '3 days' },
  { activity: 'E', description: 'RFQ Module Backend', predecessor: 'C, D', duration: '4 days' },
  { activity: 'F', description: 'Quotation Module Backend', predecessor: 'E', duration: '3 days' },
  { activity: 'G', description: 'PO Generation Module', predecessor: 'F', duration: '2 days' },
  { activity: 'H', description: 'React Frontend — Auth & Layout', predecessor: 'D', duration: '3 days' },
  { activity: 'I', description: 'React Frontend — RFQ Dashboard', predecessor: 'E, H', duration: '4 days' },
  { activity: 'J', description: 'Integration Testing', predecessor: 'G, I', duration: '2 days' },
  { activity: 'K', description: 'Documentation & Deployment', predecessor: 'J', duration: '2 days' },
];

// ── Successor Table ────────────────────────────────────────────────────────────
const successorData = predecessorData.map((row) => {
  const successors = predecessorData
    .filter((r) =>
      r.predecessor
        .split(',')
        .map((s) => s.trim())
        .includes(row.activity)
    )
    .map((r) => r.activity)
    .join(', ');
  return { ...row, successor: successors || '—' };
});

// ── AON Data ───────────────────────────────────────────────────────────────────
const aonData = [
  { node: 'A', es: 0, ef: 3, ls: 0, lf: 3, slack: 0, critical: true },
  { node: 'B', es: 3, ef: 5, ls: 3, lf: 5, slack: 0, critical: true },
  { node: 'C', es: 5, ef: 7, ls: 5, lf: 7, slack: 0, critical: true },
  { node: 'D', es: 5, ef: 8, ls: 5, lf: 8, slack: 0, critical: true },
  { node: 'E', es: 8, ef: 12, ls: 8, lf: 12, slack: 0, critical: true },
  { node: 'F', es: 12, ef: 15, ls: 12, lf: 15, slack: 0, critical: true },
  { node: 'G', es: 15, ef: 17, ls: 15, lf: 17, slack: 0, critical: true },
  { node: 'H', es: 8, ef: 11, ls: 9, lf: 12, slack: 1, critical: false },
  { node: 'I', es: 12, ef: 16, ls: 12, lf: 16, slack: 0, critical: true },
  { node: 'J', es: 17, ef: 19, ls: 17, lf: 19, slack: 0, critical: true },
  { node: 'K', es: 19, ef: 21, ls: 19, lf: 21, slack: 0, critical: true },
];

// ── Gantt Data ─────────────────────────────────────────────────────────────────
const ganttData = [
  { activity: 'A', label: 'Requirements Analysis', start: 0, duration: 3, critical: true },
  { activity: 'B', label: 'Architecture Design', start: 3, duration: 2, critical: true },
  { activity: 'C', label: 'DB Schema Design', start: 5, duration: 2, critical: true },
  { activity: 'D', label: 'RBAC & Auth', start: 5, duration: 3, critical: true },
  { activity: 'E', label: 'RFQ Backend', start: 8, duration: 4, critical: true },
  { activity: 'F', label: 'Quotation Backend', start: 12, duration: 3, critical: true },
  { activity: 'G', label: 'PO Generation', start: 15, duration: 2, critical: true },
  { activity: 'H', label: 'Frontend Auth & Layout', start: 8, duration: 3, critical: false },
  { activity: 'I', label: 'Frontend RFQ Dashboard', start: 12, duration: 4, critical: true },
  { activity: 'J', label: 'Integration Testing', start: 17, duration: 2, critical: true },
  { activity: 'K', label: 'Documentation & Deploy', start: 19, duration: 2, critical: true },
];

const TOTAL_DAYS = 21;

const PredecessorTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {['Activity', 'Description', 'Predecessor(s)', 'Duration'].map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {predecessorData.map((row) => (
          <tr key={row.activity} className="border-b border-border/50 last:border-0 table-row-hover">
            <td className="px-4 py-3 font-mono font-bold text-primary">{row.activity}</td>
            <td className="px-4 py-3 text-foreground">{row.description}</td>
            <td className="px-4 py-3 font-mono text-muted-foreground">{row.predecessor}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SuccessorTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {['Activity', 'Description', 'Successor(s)', 'Duration'].map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {successorData.map((row) => (
          <tr key={row.activity} className="border-b border-border/50 last:border-0 table-row-hover">
            <td className="px-4 py-3 font-mono font-bold text-primary">{row.activity}</td>
            <td className="px-4 py-3 text-foreground">{row.description}</td>
            <td className="px-4 py-3 font-mono text-muted-foreground">{row.successor}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AONTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {['Node', 'ES', 'EF', 'LS', 'LF', 'Slack', 'Critical'].map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {aonData.map((row) => (
          <tr key={row.node} className={`border-b border-border/50 last:border-0 table-row-hover ${row.critical ? 'bg-red-50/30' : ''}`}>
            <td className="px-4 py-3 font-mono font-bold text-primary">{row.node}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.es}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.ef}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.ls}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.lf}</td>
            <td className="px-4 py-3 font-mono text-muted-foreground">{row.slack}</td>
            <td className="px-4 py-3">
              {row.critical ? (
                <span className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-semibold">
                  Yes
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-full text-xs font-semibold">
                  No
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="px-4 py-3 border-t border-border bg-muted/30">
      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Key: </span>
        ES = Early Start · EF = Early Finish · LS = Late Start · LF = Late Finish · Slack = LF − EF
      </p>
    </div>
  </div>
);

// ── AON Network Diagram ────────────────────────────────────────────────────────
const AONDiagram = () => {
  // Node positions (x%, y%) in a 100×100 coordinate space
  const nodes: { id: string; x: number; y: number; critical: boolean }[] = [
    { id: 'A', x: 5,  y: 50, critical: true  },
    { id: 'B', x: 20, y: 50, critical: true  },
    { id: 'C', x: 38, y: 28, critical: true  },
    { id: 'D', x: 38, y: 72, critical: true  },
    { id: 'E', x: 57, y: 28, critical: true  },
    { id: 'F', x: 72, y: 28, critical: true  },
    { id: 'G', x: 87, y: 28, critical: true  },
    { id: 'H', x: 57, y: 72, critical: false },
    { id: 'I', x: 72, y: 50, critical: true  },
    { id: 'J', x: 87, y: 50, critical: true  },
    { id: 'K', x: 97, y: 50, critical: true  },
  ];

  const edges: { from: string; to: string; critical: boolean }[] = [
    { from: 'A', to: 'B', critical: true  },
    { from: 'B', to: 'C', critical: true  },
    { from: 'B', to: 'D', critical: true  },
    { from: 'C', to: 'E', critical: true  },
    { from: 'D', to: 'E', critical: true  },
    { from: 'D', to: 'H', critical: false },
    { from: 'E', to: 'F', critical: true  },
    { from: 'E', to: 'I', critical: true  },
    { from: 'F', to: 'G', critical: true  },
    { from: 'G', to: 'J', critical: true  },
    { from: 'H', to: 'I', critical: false },
    { from: 'I', to: 'J', critical: true  },
    { from: 'J', to: 'K', critical: true  },
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const getArrowPoints = (from: string, to: string) => {
    const s = nodeMap[from];
    const e = nodeMap[to];
    const r = 3.5; // node radius in %
    const dx = e.x - s.x;
    const dy = e.y - s.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    return {
      x1: s.x + ux * r,
      y1: s.y + uy * r,
      x2: e.x - ux * r,
      y2: e.y - uy * r,
    };
  };

  return (
    <div className="p-4">
      <p className="text-xs text-muted-foreground mb-4">
        In AON, <strong>nodes represent activities</strong> and arrows show dependencies. Red nodes/edges are on the critical path.
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <svg viewBox="0 0 100 100" className="w-full" style={{ height: '260px' }}>
            <defs>
              <marker id="arrow-critical" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
              </marker>
              <marker id="arrow-normal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map((edge) => {
              const pts = getArrowPoints(edge.from, edge.to);
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={pts.x1} y1={pts.y1}
                  x2={pts.x2} y2={pts.y2}
                  stroke={edge.critical ? '#ef4444' : '#94a3b8'}
                  strokeWidth={edge.critical ? 0.7 : 0.5}
                  markerEnd={edge.critical ? 'url(#arrow-critical)' : 'url(#arrow-normal)'}
                  strokeDasharray={edge.critical ? undefined : '1.5 1'}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const d = aonData.find((r) => r.node === node.id);
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x} cy={node.y} r={3.5}
                    fill={node.critical ? '#fef2f2' : '#f8fafc'}
                    stroke={node.critical ? '#ef4444' : '#94a3b8'}
                    strokeWidth={node.critical ? 0.8 : 0.5}
                  />
                  <text x={node.x} y={node.y + 0.5} textAnchor="middle" dominantBaseline="middle"
                    fontSize="2.8" fontWeight="bold" fill={node.critical ? '#dc2626' : '#64748b'}>
                    {node.id}
                  </text>
                  {/* ES/EF below node */}
                  <text x={node.x} y={node.y + 5.5} textAnchor="middle" fontSize="1.8" fill="#94a3b8">
                    {d?.es}–{d?.ef}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-muted-foreground border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-red-400" />
          <span>Critical path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-slate-300" style={{ borderTop: '1px dashed #94a3b8' }} />
          <span>Non-critical</span>
        </div>
        <span className="text-xs text-muted-foreground">Numbers below nodes = ES–EF</span>
      </div>
    </div>
  );
};

// ── AOE Data ───────────────────────────────────────────────────────────────────
const aoeEdges = [
  { edge: 'A', from: 1, to: 2, activity: 'Requirements Analysis',       duration: 3, critical: true  },
  { edge: 'B', from: 2, to: 3, activity: 'System Architecture Design',  duration: 2, critical: true  },
  { edge: 'C', from: 3, to: 4, activity: 'Database Schema Design',      duration: 2, critical: true  },
  { edge: 'D', from: 3, to: 5, activity: 'RBAC & Auth Implementation',  duration: 3, critical: true  },
  { edge: 'E', from: 4, to: 6, activity: 'RFQ Module Backend',          duration: 4, critical: true  },
  { edge: 'F', from: 5, to: 6, activity: 'RFQ Module Backend (merge)',  duration: 0, critical: false },
  { edge: 'G', from: 6, to: 7, activity: 'Quotation Module Backend',    duration: 3, critical: true  },
  { edge: 'H', from: 7, to: 8, activity: 'PO Generation Module',        duration: 2, critical: true  },
  { edge: 'I', from: 5, to: 9, activity: 'Frontend Auth & Layout',      duration: 3, critical: false },
  { edge: 'J', from: 6, to: 9, activity: 'Frontend RFQ Dashboard',      duration: 4, critical: true  },
  { edge: 'K', from: 8, to: 10, activity: 'Integration Testing (PO)',   duration: 2, critical: true  },
  { edge: 'L', from: 9, to: 10, activity: 'Integration Testing (UI)',   duration: 2, critical: true  },
  { edge: 'M', from: 10, to: 11, activity: 'Documentation & Deployment',duration: 2, critical: true  },
];

const aoeNodes = [
  { id: 1,  label: 'Start', et: 0,  lt: 0  },
  { id: 2,  label: 'N2',    et: 3,  lt: 3  },
  { id: 3,  label: 'N3',    et: 5,  lt: 5  },
  { id: 4,  label: 'N4',    et: 7,  lt: 7  },
  { id: 5,  label: 'N5',    et: 8,  lt: 8  },
  { id: 6,  label: 'N6',    et: 12, lt: 12 },
  { id: 7,  label: 'N7',    et: 15, lt: 15 },
  { id: 8,  label: 'N8',    et: 17, lt: 17 },
  { id: 9,  label: 'N9',    et: 16, lt: 17 },
  { id: 10, label: 'N10',   et: 19, lt: 19 },
  { id: 11, label: 'End',   et: 21, lt: 21 },
];

const AOETable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {['Edge', 'From', 'To', 'Activity', 'Duration', 'Critical'].map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {aoeEdges.map((row) => (
          <tr key={row.edge} className={`border-b border-border/50 last:border-0 table-row-hover ${row.critical ? 'bg-red-50/30' : ''}`}>
            <td className="px-4 py-3 font-mono font-bold text-primary">{row.edge}</td>
            <td className="px-4 py-3 font-mono text-muted-foreground">{row.from}</td>
            <td className="px-4 py-3 font-mono text-muted-foreground">{row.to}</td>
            <td className="px-4 py-3 text-foreground">{row.activity}</td>
            <td className="px-4 py-3 text-muted-foreground">{row.duration === 0 ? 'Dummy' : `${row.duration} days`}</td>
            <td className="px-4 py-3">
              {row.critical ? (
                <span className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-semibold">
                  Yes
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-full text-xs font-semibold">
                  No
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="px-4 py-3 border-t border-border bg-muted/30">
      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Key: </span>
        Edges = Activities · Nodes = Events · Dummy edge (F) has zero duration and shows logical dependency only.
      </p>
    </div>
  </div>
);

// ── AOE Network Diagram ────────────────────────────────────────────────────────
const AOEDiagram = () => {
  // Node positions (x%, y%) in SVG viewBox 0 0 110 80
  const nodePos: Record<number, { x: number; y: number }> = {
    1:  { x: 5,   y: 40 },
    2:  { x: 18,  y: 40 },
    3:  { x: 33,  y: 40 },
    4:  { x: 48,  y: 22 },
    5:  { x: 48,  y: 58 },
    6:  { x: 63,  y: 40 },
    7:  { x: 75,  y: 22 },
    8:  { x: 87,  y: 22 },
    9:  { x: 87,  y: 58 },
    10: { x: 97,  y: 40 },
    11: { x: 107, y: 40 },
  };

  const r = 4; // node radius

  const getEdgePts = (from: number, to: number) => {
    const s = nodePos[from];
    const e = nodePos[to];
    const dx = e.x - s.x;
    const dy = e.y - s.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    return { x1: s.x + ux * r, y1: s.y + uy * r, x2: e.x - ux * r, y2: e.y - uy * r, mx: (s.x + e.x) / 2, my: (s.y + e.y) / 2 };
  };

  return (
    <div className="p-4">
      <p className="text-xs text-muted-foreground mb-4">
        In AOE, <strong>edges represent activities</strong> and nodes represent events (milestones). Edge labels show activity letter and duration.
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <svg viewBox="0 0 112 80" className="w-full" style={{ height: '280px' }}>
            <defs>
              <marker id="aoe-arrow-crit" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L0,5 L5,2.5 z" fill="#ef4444" />
              </marker>
              <marker id="aoe-arrow-norm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L0,5 L5,2.5 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Edges */}
            {aoeEdges.map((edge) => {
              const pts = getEdgePts(edge.from, edge.to);
              const isDummy = edge.duration === 0;
              return (
                <g key={edge.edge}>
                  <line
                    x1={pts.x1} y1={pts.y1}
                    x2={pts.x2} y2={pts.y2}
                    stroke={edge.critical ? '#ef4444' : '#94a3b8'}
                    strokeWidth={edge.critical ? 0.7 : 0.5}
                    strokeDasharray={isDummy ? '1.5 1' : undefined}
                    markerEnd={edge.critical ? 'url(#aoe-arrow-crit)' : 'url(#aoe-arrow-norm)'}
                  />
                  {/* Edge label */}
                  <text
                    x={pts.mx}
                    y={pts.my - 1.5}
                    textAnchor="middle"
                    fontSize="2.2"
                    fontWeight="bold"
                    fill={edge.critical ? '#dc2626' : '#64748b'}
                  >
                    {edge.edge}{isDummy ? '' : `(${edge.duration}d)`}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {aoeNodes.map((node) => {
              const pos = nodePos[node.id];
              const isEndpoint = node.id === 1 || node.id === 11;
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x} cy={pos.y} r={r}
                    fill={isEndpoint ? '#eff6ff' : '#f8fafc'}
                    stroke={isEndpoint ? '#2563eb' : '#94a3b8'}
                    strokeWidth={isEndpoint ? 0.9 : 0.6}
                  />
                  <text x={pos.x} y={pos.y + 0.5} textAnchor="middle" dominantBaseline="middle"
                    fontSize="2.4" fontWeight="bold" fill={isEndpoint ? '#1d4ed8' : '#475569'}>
                    {node.id}
                  </text>
                  {/* ET below node */}
                  <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize="1.8" fill="#94a3b8">
                    ET:{node.et}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-muted-foreground border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-red-400" />
          <span>Critical path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-slate-300" style={{ borderTop: '1px dashed #94a3b8' }} />
          <span>Dummy / Non-critical</span>
        </div>
        <span className="text-xs text-muted-foreground">Numbers in nodes = Event ID · ET = Earliest Time</span>
      </div>
    </div>
  );
};

const GanttChart = () => (
  <div className="overflow-x-auto">
    <div className="min-w-[640px] p-4">
      {/* Day header */}
      <div className="flex mb-3">
        <div className="w-48 flex-shrink-0" />
        <div className="flex-1 flex">
          {Array.from({ length: TOTAL_DAYS + 1 }, (_, i) => (
            <div
              key={i}
              className="flex-1 text-center text-xs text-muted-foreground font-mono"
              style={{ minWidth: '28px' }}
            >
              {i % 3 === 0 ? i : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-1.5">
        {ganttData.map((row) => (
          <div key={row.activity} className="flex items-center gap-2">
            <div className="w-48 flex-shrink-0 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-primary w-4">{row.activity}</span>
              <span className="text-xs text-muted-foreground truncate">{row.label}</span>
            </div>
            <div className="flex-1 relative h-6">
              {/* Background grid */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: TOTAL_DAYS }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-border/30"
                    style={{ minWidth: '28px' }}
                  />
                ))}
              </div>
              {/* Bar */}
              <div
                className={`absolute top-0.5 bottom-0.5 rounded ${
                  row.critical ? 'bg-primary' : 'bg-primary/40'
                }`}
                style={{
                  left: `${(row.start / TOTAL_DAYS) * 100}%`,
                  width: `${(row.duration / TOTAL_DAYS) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-primary rounded" />
          Critical path
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-primary/40 rounded" />
          Non-critical
        </div>
        <span className="ml-auto font-semibold text-foreground">Total: {TOTAL_DAYS} days</span>
      </div>
    </div>
  </div>
);

const CriticalPath = () => {
  const path = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K'];
  
  return (
    <div className="p-4">
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        The critical path is the longest sequence of dependent activities that determines the
        minimum project duration. Any delay on a critical activity delays the entire project.
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {path.map((node, i) => {
          const activity = aonData.find((r) => r.node === node);
          const duration = activity ? activity.ef - activity.es + 1 : 0;

          return (
          <React.Fragment key={`${node}-${i}`}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-red-50 border-2 border-red-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-red-600">{node}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {duration}d
              </span>
            </div>
            {i < path.length - 1 && (
              <svg className="w-5 h-5 text-red-300 flex-shrink-0 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </React.Fragment>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="doc-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{TOTAL_DAYS}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Project Days</p>
        </div>
        <div className="doc-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{path.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Critical Activities</p>
        </div>
        <div className="doc-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">1</p>
          <p className="text-xs text-muted-foreground mt-1">Non-Critical (H)</p>
        </div>
      </div>
    </div>
  );
};

const seCards: SECard[] = [
  {
    id: 'predecessor',
    title: 'Predecessor Table',
    tag: 'Network Analysis',
    description: 'Lists each activity with its immediate predecessors and estimated duration.',
    content: <PredecessorTable />,
  },
  {
    id: 'successor',
    title: 'Successor Table',
    tag: 'Network Analysis',
    description: 'Derived from the predecessor table — shows what each activity enables.',
    content: <SuccessorTable />,
  },
  {
    id: 'aon',
    title: 'Activity on Node (AON)',
    tag: 'CPM',
    description: 'Nodes represent activities; arrows show dependencies. Includes ES/EF table and network diagram.',
    content: (
      <div>
        <AONTable />
        <div className="border-t border-border">
          <div className="px-4 pt-4 pb-1">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Network Diagram</p>
          </div>
          <AONDiagram />
        </div>
      </div>
    ),
  },
  {
    id: 'aoe',
    title: 'Activity on Edge (AOE)',
    tag: 'CPM',
    description: 'Edges represent activities; nodes represent events/milestones. Includes edge table and network diagram.',
    content: (
      <div>
        <AOETable />
        <div className="border-t border-border">
          <div className="px-4 pt-4 pb-1">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Network Diagram</p>
          </div>
          <AOEDiagram />
        </div>
      </div>
    ),
  },
  {
    id: 'gantt',
    title: 'Gantt Chart',
    tag: 'Scheduling',
    description: 'Visual timeline showing activity durations, sequence, and critical path overlay.',
    content: <GanttChart />,
  },
  {
    id: 'critical',
    title: 'Critical Path',
    tag: 'CPM',
    description: 'The longest path through the project network with zero float — determines minimum project duration.',
    content: <CriticalPath />,
  },
];

function ExpandableCard({ card, index, inView }: { card: SECard; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="doc-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/40 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">{card.title}</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold">
                {card.tag}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-7 h-7 bg-muted border border-border rounded-full flex items-center justify-center flex-shrink-0 ml-4"
        >
          <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border">{card.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SEDocumentation() {
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
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">07</span>
        <h2 className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
          Software Engineering Documentation
        </h2>
        <div className="mt-2 w-8 h-0.5 bg-primary rounded-full" />
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          Project planning and scheduling artifacts. Click any card to expand. More sections
          (PERT, WBS, Risk Analysis, SRS, Use Cases, Sequence Diagrams) can be appended without
          redesigning this layout.
        </p>
      </motion.div>

      {/* Modular expandable cards */}
      <div className="space-y-3">
        {seCards.map((card, i) => (
          <ExpandableCard key={card.id} card={card} index={i + 1} inView={inView} />
        ))}
      </div>

      {/* Placeholder slot for future sections */}
      <motion.div
        custom={seCards.length + 2}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mt-4 border border-dashed border-border rounded-2xl p-5 flex items-center gap-4"
      >
        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center border border-border flex-shrink-0">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            More sections coming soon
          </p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            PERT · WBS · Risk Analysis · Requirement Analysis · Testing · SRS · Use Cases · Sequence Diagrams
          </p>
        </div>
      </motion.div>
    </section>
  );
}