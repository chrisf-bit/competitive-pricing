import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import pathwayRoad from '../assets/pathway-road.webp';
import { pathwayNodes } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway infographic - the SME's winding-road slide
 * reproduced in the sim, as a click-to-reveal. The road, phase
 * columns, headings, node markers and title are baked into the WebP
 * (`pathway-road.webp`, the SME export with its white frame trimmed);
 * clicking a numbered marker reveals that step's question, sub-label
 * and goal beside it. Only one step shows at a time, so the texts
 * never overlap.
 *
 * Layout technique: a fixed DESIGN_W x DESIGN_H stage (the WebP's own
 * pixel size) is uniformly `transform: scale()`d to the container
 * width via a ResizeObserver. Markers, highlight and revealed text all
 * live in that one coordinate space, so nothing can drift out of
 * alignment with the art, and it works without container-query units.
 *
 * Controlled: the parent owns `activeStep` + `visited` so it can gate
 * Continue on all seven being opened.
 */

const DESIGN_W = 1891;
const DESIGN_H = 1063;
const ICON_R = 53; // icon-circle radius in design px

// Icon-circle centres as fractions of the image (auto-detected).
const CENTRE: Record<number, { x: number; y: number }> = {
  1: { x: 0.056, y: 0.462 },
  2: { x: 0.154, y: 0.896 },
  3: { x: 0.338, y: 0.258 },
  4: { x: 0.476, y: 0.860 },
  5: { x: 0.638, y: 0.188 },
  6: { x: 0.635, y: 0.704 },
  7: { x: 0.847, y: 0.406 },
};

type Layout =
  // `vAlign` decides whether revealed text sits centred on the marker
  // or is pinned above it (for low markers whose text would otherwise
  // run off the bottom of the image).
  | { mode: 'right'; w: number; vAlign: 'center' | 'above' }
  | { mode: 'abs'; x: number; y: number; w: number };

// Where each step's text appears when revealed (its clear zone).
const LAYOUT: Record<number, Layout> = {
  1: { mode: 'right', w: 0.185, vAlign: 'center' },
  2: { mode: 'right', w: 0.25, vAlign: 'above' },
  3: { mode: 'right', w: 0.185, vAlign: 'center' },
  4: { mode: 'right', w: 0.19, vAlign: 'above' },
  5: { mode: 'right', w: 0.175, vAlign: 'center' },
  6: { mode: 'right', w: 0.25, vAlign: 'center' },
  7: { mode: 'abs', x: 0.836, y: 0.52, w: 0.155 },
};

const RIGHT_OFFSET = ICON_R + 20; // icon radius + gap

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

  // Guide the eye to the next unopened marker.
  const firstUnvisited = pathwayNodes
    .map((n) => n.stepNumber)
    .find((s) => !visited.has(s));

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
          src={pathwayRoad}
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
          const isActive = activeStep === n.stepNumber;
          const isVisited = visited.has(n.stepNumber);
          const isHint = !isActive && firstUnvisited === n.stepNumber;

          return (
            <div key={n.id}>
              {/* Highlight ring (active) / hint pulse (next unopened) */}
              {(isActive || isHint) && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: cx - ICON_R - 5,
                    top: cy - ICON_R - 5,
                    width: (ICON_R + 5) * 2,
                    height: (ICON_R + 5) * 2,
                    borderRadius: '50%',
                    border: '5px solid var(--brand-yellow)',
                    pointerEvents: 'none',
                    boxShadow: '0 0 22px rgba(254,186,2,0.6)',
                  }}
                  animate={
                    isActive
                      ? { opacity: 1, scale: 1 }
                      : { opacity: [0.9, 0.35, 0.9], scale: [1, 1.08, 1] }
                  }
                  transition={
                    isActive
                      ? { duration: 0.2 }
                      : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                  }
                />
              )}

              {/* Visited check badge */}
              {isVisited && !isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: cx + ICON_R - 20,
                    top: cy - ICON_R - 8,
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
                  left: cx - ICON_R - 6,
                  top: cy - ICON_R - 6,
                  width: (ICON_R + 6) * 2,
                  height: (ICON_R + 6) * 2,
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
              left = c.x * DESIGN_W + RIGHT_OFFSET;
              if (layout.vAlign === 'above') {
                // Pin the block's bottom just above the marker.
                top = cy - ICON_R - 14;
                translate = 'translateY(-100%)';
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
