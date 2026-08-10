import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import pathwayRoad from '../assets/pricing-pathway-v12.webp';
import { pathwayNodes } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway infographic (v1.2 SME art) - the winding-road
 * slide reproduced in the sim as a click-to-reveal. The road, phase
 * pills, numbered rings and icon callouts are baked into the WebP
 * (`pricing-pathway-v12.webp`, a transparent 3:1 export); the seven
 * icon callouts are clickable and reveal that step's question, sub-label
 * and goal in the panel beneath the road.
 *
 * Two things differ from the earlier baked-road version:
 *  - The art is a wide 3:1 band, so revealed text sits in a fixed panel
 *    BELOW the road (a floating card beside each marker would collide on
 *    the tighter layout).
 *  - The art is transparent but carries dark phase pills that would
 *    vanish on the navy screen, so it sits on a white "stage" card - the
 *    light surface its design assumes.
 *
 * Marker centres (fractions of the art) are auto-detected from the WebP
 * via connected-component centroids; radius is the detected circle
 * radius. Steps map left-to-right along the road.
 *
 * Controlled: the parent owns `activeStep` + `visited` so it can gate
 * Continue on all seven being opened.
 */

const DESIGN_W = 2560;
const DESIGN_H = 853;

// Icon-callout centres (fractions of the art) + radius (design px),
// auto-detected from the WebP (connected-component centroids). Steps
// are ordered left-to-right along the road.
const CENTRE: Record<number, { x: number; y: number; r: number }> = {
  1: { x: 0.224, y: 0.421, r: 49 },
  2: { x: 0.301, y: 0.849, r: 49 },
  3: { x: 0.416, y: 0.225, r: 49 },
  4: { x: 0.492, y: 0.847, r: 49 },
  5: { x: 0.588, y: 0.286, r: 49 },
  6: { x: 0.628, y: 0.755, r: 49 },
  7: { x: 0.724, y: 0.478, r: 49 },
};

interface PathwayInfographicProps {
  activeStep: number | null;
  visited: Set<number>;
  onSelect: (step: number) => void;
}

export function PathwayInfographic({
  activeStep,
  visited,
  onSelect,
}: PathwayInfographicProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / DESIGN_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeNode = pathwayNodes.find((n) => n.stepNumber === activeStep) ?? null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* White stage - the light surface the art's dark phase pills
          assume, framed as a slide on the navy screen. */}
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          height: scale ? DESIGN_H * scale : undefined,
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
          borderRadius: 18,
          boxShadow: '0 10px 30px rgba(0,10,30,0.35)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale || 0.0001})`,
            transformOrigin: 'top left',
          }}
        >
          <img
            src={pathwayRoad}
            alt="The Pricing Pathway: seven steps across Prioritize, Diagnose and Act"
            width={DESIGN_W}
            height={DESIGN_H}
            style={{ display: 'block' }}
          />

          {/* Marker hotspots, active highlight ring, visited checks */}
          {pathwayNodes.map((n) => {
            const c = CENTRE[n.stepNumber];
            if (!c) return null;
            const cx = c.x * DESIGN_W;
            const cy = c.y * DESIGN_H;
            const r = c.r;
            const isActive = activeStep === n.stepNumber;
            const isVisited = visited.has(n.stepNumber);

            return (
              <div key={n.id}>
                {/* Active highlight ring around the baked circle */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: cx - r - 7,
                      top: cy - r - 7,
                      width: (r + 7) * 2,
                      height: (r + 7) * 2,
                      borderRadius: '50%',
                      border: '4px solid var(--brand-yellow)',
                      boxShadow: '0 0 0 4px rgba(254,186,2,0.28)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Visited check badge */}
                {isVisited && !isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: cx + r - 22,
                      top: cy - r - 10,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'var(--success)',
                      border: '4px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    <Check size={18} strokeWidth={4} color="#fff" />
                  </div>
                )}

                {/* Clickable hotspot over the icon circle */}
                <button
                  onClick={() => onSelect(n.stepNumber)}
                  aria-label={`Reveal step ${n.stepNumber}: ${n.title}`}
                  style={{
                    position: 'absolute',
                    left: cx - r - 8,
                    top: cy - r - 8,
                    width: (r + 8) * 2,
                    height: (r + 8) * 2,
                    borderRadius: '50%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Revealed text for the active step, in a fixed panel below the
          road (stable regardless of the wide 3:1 layout). */}
      <div
        style={{
          minHeight: 96,
          background: 'rgba(4,12,32,0.78)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {activeNode ? (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: 'var(--brand-navy)',
                  background: 'var(--brand-yellow)',
                  borderRadius: 6,
                  padding: '2px 8px',
                }}
              >
                Step {activeNode.stepNumber}
              </span>
              <span style={{ fontSize: 19, fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>
                {activeNode.title}
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand-yellow)' }}>
                ({activeNode.subLabel})
              </span>
            </div>
            <div style={{ fontSize: 15.5, color: 'rgba(214,222,234,0.96)', lineHeight: 1.5, marginTop: 6 }}>
              {activeNode.goal}
            </div>
          </motion.div>
        ) : (
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
            Select a marker on the road to reveal its step.
          </div>
        )}
      </div>
    </div>
  );
}
