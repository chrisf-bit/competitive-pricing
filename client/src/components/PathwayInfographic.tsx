import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import pathwayRoad from '../assets/pricing-pathway-road.webp';
import m1 from '../assets/pathway-marker-1.webp';
import m2 from '../assets/pathway-marker-2.webp';
import m3 from '../assets/pathway-marker-3.webp';
import m4 from '../assets/pathway-marker-4.webp';
import m5 from '../assets/pathway-marker-5.webp';
import m6 from '../assets/pathway-marker-6.webp';
import m7 from '../assets/pathway-marker-7.webp';
import { pathwayNodes } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway infographic (v1.4 art) - click-to-reveal.
 *
 * Built from a CLEAN transparent road export (`pricing-pathway-road.webp`,
 * road + phase pills, no markers) plus the seven marker/icon circles as
 * separate transparent images, placed and made interactive here. The art
 * bleeds full-width and transparent so it reads as part of the navy
 * screen; the pills carry white outlines so they stand out on navy.
 *
 * Marker centres are auto-detected fractions of the road art (steps map
 * left-to-right). Because v1.4's road is a wide, dense 3:1 band, the
 * revealed step text sits in a fixed panel beneath the road rather than
 * beside each marker - the middle markers have no clean space next to
 * them for a floating card.
 *
 * Controlled: the parent owns `activeStep` + `visited` so it can gate
 * Continue on all seven being opened.
 */

const DESIGN_W = 2560;
const DESIGN_H = 853;
const MARKER_DIA = 100; // ~0.039 of the road width, matching the art

const CENTRE: Record<number, { x: number; y: number }> = {
  1: { x: 0.224, y: 0.421 },
  2: { x: 0.301, y: 0.849 },
  3: { x: 0.416, y: 0.225 },
  4: { x: 0.492, y: 0.847 },
  5: { x: 0.588, y: 0.286 },
  6: { x: 0.628, y: 0.755 },
  7: { x: 0.724, y: 0.478 },
};

const MARKER_IMG: Record<number, string> = { 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7 };

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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Road stage - transparent, full-width, on the navy screen. */}
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

          {/* Marker circles - separate images, placed + made clickable. */}
          {pathwayNodes.map((n) => {
            const c = CENTRE[n.stepNumber];
            if (!c) return null;
            const cx = c.x * DESIGN_W;
            const cy = c.y * DESIGN_H;
            const half = MARKER_DIA / 2;
            const isActive = activeStep === n.stepNumber;
            const isVisited = visited.has(n.stepNumber);

            return (
              <div key={n.id}>
                {/* Active glow ring behind the marker */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: cx - half - 8,
                      top: cy - half - 8,
                      width: MARKER_DIA + 16,
                      height: MARKER_DIA + 16,
                      borderRadius: '50%',
                      border: '4px solid var(--brand-yellow)',
                      boxShadow: '0 0 0 5px rgba(254,186,2,0.28)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                <button
                  onClick={() => onSelect(n.stepNumber)}
                  aria-label={`Reveal step ${n.stepNumber}: ${n.title}`}
                  style={{
                    position: 'absolute',
                    left: cx - half,
                    top: cy - half,
                    width: MARKER_DIA,
                    height: MARKER_DIA,
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    transition: 'transform 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={MARKER_IMG[n.stepNumber]}
                    alt=""
                    width={MARKER_DIA}
                    height={MARKER_DIA}
                    style={{ display: 'block' }}
                  />
                </button>

                {/* Visited check badge */}
                {isVisited && !isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: cx + half - 26,
                      top: cy - half - 6,
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'var(--success)',
                      border: '3px solid var(--brand-navy-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    <Check size={17} strokeWidth={4} color="#fff" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Revealed step text - fixed panel beneath the road. */}
      <div
        style={{
          minHeight: 92,
          background: 'rgba(4,12,32,0.72)',
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
