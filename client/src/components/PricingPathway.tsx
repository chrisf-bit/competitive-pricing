import { motion } from 'framer-motion';
import type { PathwayPhase } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway - a winding-road visualisation of the seven-step
 * framework, grouped into three phases (Prioritize, Diagnose, Act).
 * Mirrors the SME's Content Chart Canvas (page 3) inside the sim.
 *
 * Pure SVG on a fixed viewBox so it scales cleanly to any container
 * width without the road and the nodes drifting out of alignment
 * (the fragility of laying HTML cards over a separately-scaled SVG).
 * Node labels and phase labels are SVG <text>; the numbers live in
 * the circles.
 *
 * Two variants:
 *   - `full`  - the clearance reveal navigator. Node labels shown,
 *               phase headers, clickable.
 *   - `mini`  - a compact header strip (e.g. the drawer). Phase
 *               labels only, no per-node labels, not usually clickable.
 *
 * Reused by IssueTreeRevealScreen (full) and IssueTreeHelper (mini)
 * so the same road the learner meets in clearance is the tool they
 * open on a live partner - the correlation anchor called for in the
 * design brief.
 */

export interface PathwayNode {
  id: string;
  /** 1-7 label shown in the circle. */
  stepNumber: number;
  /** Short name shown beneath the node (full variant only). */
  shortName: string;
  phase: PathwayPhase;
}

interface PricingPathwayProps {
  nodes: PathwayNode[];
  /** 0-based index of the active node. */
  activeIndex: number;
  /** Whether node i has been visited (drives blue vs grey). */
  isVisited?: (i: number) => boolean;
  /** Road fills yellow up to this 0-based node index. */
  fillIndex?: number;
  /** Click handler - omit to make the road non-interactive. */
  onSelect?: (i: number) => void;
  variant?: 'full' | 'mini';
}

const PHASE_ORDER: PathwayPhase[] = ['Prioritize', 'Diagnose', 'Act'];

const CONFIG = {
  full: {
    W: 1000,
    H: 272,
    padX: 62,
    yc: 142,
    amp: 50,
    r: 22,
    road: 16,
    numFont: 18,
    labelFont: 15,
    phaseFont: 15,
    showLabels: true,
    showPhases: true,
  },
  mini: {
    W: 680,
    H: 104,
    padX: 40,
    yc: 58,
    amp: 22,
    r: 13,
    road: 9,
    numFont: 12,
    labelFont: 0,
    phaseFont: 19,
    showLabels: false,
    showPhases: true,
  },
} as const;

export function PricingPathway({
  nodes,
  activeIndex,
  isVisited,
  fillIndex,
  onSelect,
  variant = 'full',
}: PricingPathwayProps) {
  const c = CONFIG[variant];
  const n = nodes.length;
  const spacing = n > 1 ? (c.W - c.padX * 2) / (n - 1) : 0;

  // Node centres: even indices sit low, odd indices sit high, giving
  // the alternating "winding road" read.
  const pts = nodes.map((_, i) => ({
    x: c.padX + i * spacing,
    y: c.yc + (i % 2 === 0 ? c.amp : -c.amp),
  }));

  // Smooth cubic road through every node (horizontal-tangent S-curves).
  const roadPath = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const dx = (p.x - prev.x) / 2;
      return `C ${prev.x + dx} ${prev.y} ${p.x - dx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(' ');

  const fill = fillIndex ?? activeIndex;
  const fillFraction = n > 1 ? Math.max(0, Math.min(1, fill / (n - 1))) : 0;

  // Phase groupings and their divider x positions.
  const phaseGroups = PHASE_ORDER.map((phase) => {
    const idxs = nodes
      .map((node, i) => (node.phase === phase ? i : -1))
      .filter((i) => i >= 0);
    return { phase, idxs };
  }).filter((g) => g.idxs.length > 0);

  return (
    <svg
      viewBox={`0 0 ${c.W} ${c.H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', overflow: 'visible' }}
      role="img"
      aria-label="The Pricing Pathway: seven steps across Prioritize, Diagnose and Act"
    >
      {/* Phase labels */}
      {c.showPhases &&
        phaseGroups.map((g, gi) => {
          const cx =
            g.idxs.reduce((sum, i) => sum + pts[i].x, 0) / g.idxs.length;
          return (
            <text
              key={`ph-${gi}`}
              x={cx}
              y={c.showLabels ? 26 : 15}
              textAnchor="middle"
              fontSize={c.phaseFont}
              fontWeight={800}
              letterSpacing="0.03em"
              fill="var(--brand-yellow)"
              style={{ textTransform: 'uppercase' }}
            >
              {`Phase ${gi + 1} · ${g.phase}`}
            </text>
          );
        })}

      {/* Base road (grey) */}
      <path
        d={roadPath}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={c.road}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Progress road (yellow), fills up to fillFraction */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="var(--brand-yellow)"
        strokeWidth={c.road}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        initial={false}
        animate={{ strokeDashoffset: 1 - fillFraction }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Nodes */}
      {nodes.map((node, i) => {
        const p = pts[i];
        const active = i === activeIndex;
        const visited = isVisited ? isVisited(i) : i <= fill;

        let circleFill = 'var(--brand-navy)';
        let stroke = 'rgba(255,255,255,0.22)';
        let numColor = 'rgba(255,255,255,0.55)';
        if (active) {
          circleFill = 'var(--brand-yellow)';
          stroke = 'var(--brand-yellow)';
          numColor = 'var(--brand-navy-dark)';
        } else if (visited) {
          circleFill = 'var(--brand-blue)';
          stroke = 'var(--brand-blue)';
          numColor = 'var(--white)';
        }

        return (
          <g
            key={node.id}
            onClick={onSelect ? () => onSelect(i) : undefined}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
            role={onSelect ? 'button' : undefined}
            aria-label={onSelect ? `${node.shortName}, step ${node.stepNumber}` : undefined}
          >
            {/* Pulsing ring on the active node */}
            {active && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={c.r}
                fill="none"
                stroke="var(--brand-yellow)"
                strokeWidth={2}
                initial={{ opacity: 0.55, scale: 1 }}
                animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={c.r}
              fill={circleFill}
              stroke={stroke}
              strokeWidth={2.5}
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={c.numFont}
              fontWeight={800}
              fill={numColor}
            >
              {node.stepNumber}
            </text>
            {/* Node label */}
            {c.showLabels && (
              <text
                x={p.x}
                y={p.y + c.r + 20}
                textAnchor="middle"
                fontSize={c.labelFont}
                fontWeight={active ? 800 : 600}
                fill={
                  active
                    ? 'var(--white)'
                    : visited
                      ? 'rgba(255,255,255,0.78)'
                      : 'rgba(255,255,255,0.45)'
                }
              >
                {node.shortName}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
