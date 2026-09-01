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
// Marker circle diameter in design px. The marker webps are now cropped
// tight to the circle (centred), so this is the actual circle size; the
// drop-shadow is added in CSS so it can't push the circle off its centre.
const MARKER_DIA = 82;

// Steps 3 and 5 are nudged down from the detected road centres so the
// top markers clear the phase pills (the pills are baked into the road
// art, so this is the code-side way to open that gap).
const CENTRE: Record<number, { x: number; y: number }> = {
  1: { x: 0.224, y: 0.421 },
  2: { x: 0.301, y: 0.849 },
  3: { x: 0.416, y: 0.262 },
  4: { x: 0.492, y: 0.847 },
  5: { x: 0.588, y: 0.320 },
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
  const activeC = activeNode ? CENTRE[activeNode.stepNumber] : null;
  const containerW = DESIGN_W * scale;
  const roadH = DESIGN_H * scale;
  const CARD_W = 300;

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Road stage - transparent, full-width, on the navy screen.
          zIndex 2 keeps the (transparent) road + its numbered marker
          icons ABOVE the floating step card, so a card that reaches
          toward a neighbouring marker never hides its icon - the card
          fills the transparent negative space around the pins. */}
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          height: scale ? DESIGN_H * scale : undefined,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
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
                    style={{
                      display: 'block',
                      // Flat markers (no depth shadow). Active step gets a
                      // yellow glow that follows the circle shape via
                      // drop-shadow, so it's always perfectly centred.
                      filter: isActive
                        ? 'drop-shadow(0 0 4px #FEBA02) drop-shadow(0 0 9px #FEBA02)'
                        : 'none',
                    }}
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

      {/* Revealed step copy - a floating card anchored to the SIDE of the
          active marker (never above or below it, so it can't sit on the
          numbered icon). It opens toward the screen centre so it always
          stays in view, and is vertically centred on the marker. The road
          stage's zIndex keeps every numbered pin painted over the card, so
          a card that reaches a neighbouring marker never hides that pin
          either. pointerEvents:none so it never blocks a marker click. */}
      {activeNode && activeC && scale > 0 && (() => {
        const mx = activeC.x * containerW;
        const my = activeC.y * roadH;
        const half = (MARKER_DIA / 2) * scale;
        const gap = 14;
        // Open toward the screen centre (right for left-half markers, left
        // for right-half ones) so the card can't run off the edge.
        const openRight = mx < containerW / 2;
        const left = openRight ? mx + half + gap : mx - half - gap - CARD_W;
        const centerY = Math.max(46, Math.min(my, roadH - 46));
        return (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left,
              width: CARD_W,
              top: centerY,
              transform: 'translateY(-50%)',
              background: 'rgba(4,12,32,0.94)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              padding: '11px 14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {/* Tick pointing sideways at the marker */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                ...(openRight
                  ? { left: -6, borderRight: '6px solid rgba(4,12,32,0.94)' }
                  : { right: -6, borderLeft: '6px solid rgba(4,12,32,0.94)' }),
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: 'var(--brand-navy)',
                  background: 'var(--brand-yellow)',
                  borderRadius: 6,
                  padding: '1px 8px',
                }}
              >
                Step {activeNode.stepNumber}
              </span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                {activeNode.title}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-yellow)' }}>
                ({activeNode.subLabel})
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(214,222,234,0.96)', lineHeight: 1.45, marginTop: 5 }}>
              {activeNode.goal}
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
