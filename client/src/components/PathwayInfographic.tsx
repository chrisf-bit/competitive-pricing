import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import pricingPathway from '../assets/pricing-pathway.webp';
import { pathwayNodes } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway infographic - the SME's winding-road slide
 * reproduced in the sim, as a click-to-reveal. The road, icon circles
 * and node markers are baked into the WebP (`pricing-pathway.webp`, the
 * SME's stripped-down export with the background removed to transparency
 * so it sits directly on the navy reveal screen); clicking a numbered
 * marker reveals that step's question, sub-label and goal beside it.
 * Only one step shows at a time, so the texts never overlap.
 *
 * Layout technique: a fixed DESIGN_W x DESIGN_H stage is uniformly
 * `transform: scale()`d to the container width via a ResizeObserver.
 * Markers, highlight and revealed text all live in that one coordinate
 * space, so nothing can drift out of alignment with the art, and it
 * works without container-query units. DESIGN_W stays 1891 (the old
 * art's width) purely so the text/layout constants below don't need
 * re-tuning; DESIGN_H just tracks the new art's 1291x729 aspect. The
 * marker CENTRE values are fractions, so they're resolution-independent.
 *
 * Controlled: the parent owns `activeStep` + `visited` so it can gate
 * Continue on all seven being opened.
 */

const DESIGN_W = 1891;
const DESIGN_H = 1068; // 1891 / (1291/729) - matches pricing-pathway.webp aspect

// Icon-circle centres (fractions of the image) + radius (design px),
// auto-detected from the transparent WebP. The stripped art uses uniform
// ~82px icon circles (r ~60 in this 1891-wide design space), so the
// highlight ring, hotspot and check badge track each icon exactly.
const CENTRE: Record<number, { x: number; y: number; r: number }> = {
  1: { x: 0.0554, y: 0.465, r: 60 },
  2: { x: 0.1538, y: 0.8999, r: 60 },
  3: { x: 0.3389, y: 0.2606, r: 60 },
  4: { x: 0.4771, y: 0.8642, r: 60 },
  5: { x: 0.6402, y: 0.192, r: 60 },
  6: { x: 0.6379, y: 0.7092, r: 60 },
  7: { x: 0.8497, y: 0.4081, r: 60 },
};

type Layout =
  // `vAlign` decides how revealed text sits relative to its marker:
  //  - 'center': centred on the marker
  //  - 'top':    block top roughly level with the top of the circle
  //  - 'above':  pinned above the marker (low markers whose text would
  //              otherwise run off the bottom of the image).
  | { mode: 'right'; w: number; vAlign: 'center' | 'above' | 'top' }
  | { mode: 'abs'; x: number; y: number; w: number };

// Where each step's text appears when revealed (its clear zone).
const LAYOUT: Record<number, Layout> = {
  1: { mode: 'right', w: 0.185, vAlign: 'top' },
  2: { mode: 'right', w: 0.25, vAlign: 'above' },
  3: { mode: 'right', w: 0.24, vAlign: 'top' },
  4: { mode: 'right', w: 0.19, vAlign: 'top' },
  5: { mode: 'right', w: 0.22, vAlign: 'center' },
  6: { mode: 'right', w: 0.25, vAlign: 'center' },
  7: { mode: 'abs', x: 0.836, y: 0.52, w: 0.155 },
};

const GAP = 20; // gap from icon edge to right-hand text

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

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        height: scale ? DESIGN_H * scale : undefined,
        position: 'relative',
        overflow: 'hidden',
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
          src={pricingPathway}
          alt="The Pricing Pathway: seven steps across Prioritize, Diagnose and Act"
          width={DESIGN_W}
          height={DESIGN_H}
          style={{ display: 'block' }}
        />

        {/* Marker hotspots, highlight rings, visited checks */}
        {pathwayNodes.map((n) => {
          const c = CENTRE[n.stepNumber];
          const cx = c.x * DESIGN_W;
          const cy = c.y * DESIGN_H;
          const r = c.r;
          const isActive = activeStep === n.stepNumber;
          const isVisited = visited.has(n.stepNumber);

          return (
            <div key={n.id}>
              {/* Visited check badge */}
              {isVisited && !isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: cx + r - 20,
                    top: cy - r - 8,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--success)',
                    border: '4px solid var(--brand-navy-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <Check size={20} strokeWidth={4} color="#fff" />
                </div>
              )}

              {/* Clickable hotspot over the icon circle */}
              <button
                onClick={() => onSelect(n.stepNumber)}
                aria-label={`Reveal step ${n.stepNumber}: ${n.title}`}
                style={{
                  position: 'absolute',
                  left: cx - r - 6,
                  top: cy - r - 6,
                  width: (r + 6) * 2,
                  height: (r + 6) * 2,
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

        {/* Revealed text for the active step */}
        {pathwayNodes
          .filter((n) => n.stepNumber === activeStep)
          .map((n) => {
            const layout = LAYOUT[n.stepNumber];
            const c = CENTRE[n.stepNumber];
            const cy = c.y * DESIGN_H;
            const boxW = layout.w * DESIGN_W;

            let left: number;
            let top: number;
            let translate: string;
            if (layout.mode === 'abs') {
              left = layout.x * DESIGN_W;
              top = layout.y * DESIGN_H;
              translate = 'translateY(-50%)';
            } else {
              left = c.x * DESIGN_W + c.r + GAP;
              if (layout.vAlign === 'above') {
                // Pin the block's bottom just above the marker.
                top = cy - c.r - 14;
                translate = 'translateY(-100%)';
              } else if (layout.vAlign === 'top') {
                // Block top roughly level with the top of the circle.
                top = cy - c.r;
                translate = 'none';
              } else {
                top = cy;
                translate = 'translateY(-50%)';
              }
            }

            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width: boxW,
                  transform: translate,
                  pointerEvents: 'none',
                }}
              >
                {/* Soft scrim so text stays readable over the road */}
                <div
                  style={{
                    background: 'rgba(4,12,32,0.78)',
                    borderRadius: 14,
                    padding: '13px 17px',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: '29px',
                    }}
                  >
                    {n.title}
                  </div>
                  <div
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: 'var(--brand-yellow)',
                      lineHeight: '26px',
                      marginTop: 3,
                    }}
                  >
                    ({n.subLabel})
                  </div>
                  <div
                    style={{
                      fontSize: 21,
                      color: 'rgba(214,222,234,0.96)',
                      lineHeight: '27px',
                      marginTop: 7,
                    }}
                  >
                    {n.goal}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
