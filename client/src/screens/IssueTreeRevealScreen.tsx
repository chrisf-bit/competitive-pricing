import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import {
  issueTreePhases,
  type IssueTreePhase,
} from '../data/issueTreeReveal';

interface IssueTreeRevealScreenProps {
  onComplete: () => void;
}

export function IssueTreeRevealScreen({ onComplete }: IssueTreeRevealScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  function handleChipClick(index: number) {
    setActiveIndex(index);
    setVisited((prev) => new Set([...prev, index]));
  }

  function handleNext() {
    if (activeIndex < issueTreePhases.length - 1) {
      handleChipClick(activeIndex + 1);
    }
  }

  const activePhase: IssueTreePhase = issueTreePhases[activeIndex];
  const allVisited = visited.size === issueTreePhases.length;
  const isLast = activeIndex === issueTreePhases.length - 1;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Top zone: pushes heading to bottom of zone, putting pipeline at vertical centre */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <div
          style={{
            padding: '20px 28px 6px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--brand-yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            How we diagnose
          </div>
        </div>

        {/* Heading - pinned to bottom of top zone via marginTop:auto */}
        <div
          style={{
            textAlign: 'center',
            padding: '0 32px 18px',
            flexShrink: 0,
            marginTop: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              marginBottom: 6,
            }}
          >
            Diagnosing pricing issues
          </h1>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            Click each step to walk through how Alex would diagnose a pricing problem on a partner account.
          </p>
        </div>
      </div>

      {/* Phase pipeline - sits at vertical centre (between top and bottom zones), clickable */}
      <div
        style={{
          padding: '20px 24px 8px',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            minWidth: 'fit-content',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          {issueTreePhases.map((phase, i) => (
            <PhaseChip
              key={phase.id}
              phase={phase}
              index={i}
              total={issueTreePhases.length}
              isActive={i === activeIndex}
              isVisited={visited.has(i)}
              onClick={() => handleChipClick(i)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: allVisited ? 'var(--success)' : 'rgba(255,255,255,0.5)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {allVisited && <Check size={12} strokeWidth={3} />}
          {visited.size} of {issueTreePhases.length} steps viewed
          {!allVisited && ' - walk through all steps to continue'}
        </div>
      </div>

      {/* Bottom zone: explanation at top, bottom bar pushed to bottom */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '28px 32px 0',
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              maxWidth: 680,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--brand-yellow)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: 14,
              }}
            >
              {activePhase.label} - Step {activeIndex + 1} of {issueTreePhases.length}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <PhaseVisual phaseId={activePhase.id} />
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--white)',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                marginBottom: 12,
              }}
            >
              {activePhase.headline}
            </h2>
            <p
              style={{
                fontSize: 14.5,
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              {activePhase.body} {activePhase.narration}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue/Next button bar */}
      <div
        style={{
          padding: '16px 28px 22px',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.22)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {!isLast ? (
          <button
            onClick={handleNext}
            style={primaryButton(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--brand-yellow-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--brand-yellow)';
            }}
          >
            Next step
            <ChevronRight size={17} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            disabled={!allVisited}
            style={primaryButton(allVisited)}
            onMouseEnter={(e) => {
              if (allVisited) e.currentTarget.style.background = 'var(--brand-yellow-light)';
            }}
            onMouseLeave={(e) => {
              if (allVisited) e.currentTarget.style.background = 'var(--brand-yellow)';
            }}
          >
            Continue
            <ChevronRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

// ───────────────────────── Phase chip (clickable) ─────────────────────────

function PhaseChip({
  phase,
  index,
  total,
  isActive,
  isVisited,
  onClick,
}: {
  phase: IssueTreePhase;
  index: number;
  total: number;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
}) {
  const Icon = phase.icon;

  let background = 'rgba(255,255,255,0.04)';
  let borderColor = 'rgba(255,255,255,0.10)';
  let iconColor = 'rgba(255,255,255,0.45)';
  let labelColor = 'rgba(255,255,255,0.55)';

  if (isActive) {
    background = 'rgba(254, 186, 2, 0.14)';
    borderColor = 'var(--brand-yellow)';
    iconColor = 'var(--brand-yellow)';
    labelColor = 'var(--white)';
  } else if (isVisited) {
    background = 'rgba(0, 159, 227, 0.10)';
    borderColor = 'rgba(0, 159, 227, 0.45)';
    iconColor = 'var(--brand-blue)';
    labelColor = 'rgba(255,255,255,0.78)';
  }

  const showCheck = isVisited;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: isActive ? 1.04 : 1.06 }}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: isActive ? 1.04 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: 116,
          height: 96,
          background,
          border: `1.5px solid ${borderColor}`,
          borderRadius: 12,
          padding: '10px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
          transition: 'background 0.25s ease, border-color 0.25s ease',
          boxShadow: isActive ? '0 6px 18px rgba(254, 186, 2, 0.18)' : 'none',
        }}
      >
        {showCheck && (
          <div
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--success)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--brand-navy-dark)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
            }}
          >
            <Check size={11} strokeWidth={3.5} />
          </div>
        )}
        <Icon size={20} style={{ color: iconColor }} />
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: labelColor,
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          {phase.shortName}
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.1em',
          }}
        >
          {index + 1} / {total}
        </div>
      </motion.button>
      {index < total - 1 && (
        <div
          style={{
            width: 18,
            height: 1.5,
            background: isVisited
              ? 'rgba(0, 159, 227, 0.45)'
              : 'rgba(255,255,255,0.12)',
            transition: 'background 0.3s ease',
            margin: '0 -1px',
          }}
        />
      )}
    </div>
  );
}

// ───────────────────────── Phase visuals ─────────────────────────

/**
 * Small contextual visual for each step. Grounds the abstract concept
 * (eRPD trend, misconfig, RPD gap, hook, pitch, objection) in something
 * the learner can see, not just read about.
 */
function PhaseVisual({ phaseId }: { phaseId: string }) {
  switch (phaseId) {
    case 'trigger':
      return <TriggerVisual />;
    case 'intent':
      return <IntentVisual />;
    case 'root-cause':
      return <RootCauseVisual />;
    case 'metric':
      return <MetricVisual />;
    case 'hook':
      return <HookVisual />;
    case 'pitch':
      return <PitchVisual />;
    case 'objection':
      return <ObjectionVisual />;
    default:
      return null;
  }
}

const VISUAL_WIDTH = 320;
const VISUAL_BG = 'rgba(255,255,255,0.04)';
const VISUAL_BORDER = '1px solid rgba(255,255,255,0.10)';

function VisualCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        width: VISUAL_WIDTH,
        background: VISUAL_BG,
        border: VISUAL_BORDER,
        borderRadius: 12,
        padding: 14,
        textAlign: 'left',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function TriggerVisual() {
  // Sparkline showing eRPD trending up (worsening) over 4 weeks
  const points = [4.5, 5.8, 6.6, 7.7];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min;
  const w = 280;
  const h = 64;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  const lastX = w;
  const lastY = h - ((points[points.length - 1] - min) / range) * h;

  return (
    <VisualCard label="eRPD - last 4 weeks">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--white)' }}>
          {points[points.length - 1].toFixed(1)}%
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--danger)' }}>
          ↑ {(points[points.length - 1] - points[0]).toFixed(2)} vs start
        </span>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path d={path} fill="none" stroke="var(--brand-yellow)" strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={lastX} cy={lastY} r={4} fill="var(--brand-yellow)" />
      </svg>
    </VisualCard>
  );
}

function IntentVisual() {
  return (
    <VisualCard label="Mandate axis">
      <div style={{ display: 'flex', gap: 8 }}>
        <Pill label="Intentional" active={false} />
        <Pill label="Unintentional" active={true} />
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 10,
          fontStyle: 'italic',
        }}
      >
        Looks technical, not strategic.
      </div>
    </VisualCard>
  );
}

function Pill({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        padding: '8px 10px',
        textAlign: 'center',
        background: active ? 'rgba(254, 186, 2, 0.16)' : 'rgba(255,255,255,0.05)',
        border: active ? '1.5px solid var(--brand-yellow)' : '1.5px solid rgba(255,255,255,0.10)',
        borderRadius: 8,
        fontSize: 11.5,
        fontWeight: 700,
        color: active ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.55)',
      }}
    >
      {label}
    </div>
  );
}

function RootCauseVisual() {
  const products = [
    { label: 'Genius Programme', state: 'misconfig' as const },
    { label: 'Mobile Rate', state: 'active' as const },
    { label: 'Country Rate', state: 'inactive' as const },
  ];
  return (
    <VisualCard label="Discount products">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {products.map((p) => (
          <div
            key={p.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: 6,
              background:
                p.state === 'misconfig'
                  ? 'rgba(254, 186, 2, 0.10)'
                  : 'rgba(255,255,255,0.04)',
              border:
                p.state === 'misconfig'
                  ? '1px solid rgba(254, 186, 2, 0.45)'
                  : '1px solid transparent',
              fontSize: 12,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <span>{p.label}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color:
                  p.state === 'active'
                    ? 'var(--success)'
                    : p.state === 'misconfig'
                      ? 'var(--brand-yellow)'
                      : 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {p.state === 'misconfig' ? 'Look here' : p.state === 'active' ? 'Active' : 'Off'}
            </span>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

function MetricVisual() {
  const rows = [
    { label: 'Public RPD', value: 18.5, color: 'var(--brand-yellow)' },
    { label: 'Loyal RPD', value: 4.2, color: 'var(--brand-blue)' },
  ];
  const max = 25;
  return (
    <VisualCard label="RPD breakdown">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.78)',
                marginBottom: 4,
              }}
            >
              <span>{r.label}</span>
              <span style={{ color: 'var(--white)' }}>{r.value.toFixed(1)}%</span>
            </div>
            <div
              style={{
                height: 8,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 100,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(r.value / max) * 100}%`,
                  height: '100%',
                  background: r.color,
                  borderRadius: 100,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

function HookVisual() {
  return (
    <VisualCard label="Opening line">
      <div
        style={{
          padding: '10px 13px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 12,
          borderTopLeftRadius: 4,
          fontSize: 12.5,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.45,
          fontStyle: 'italic',
        }}
      >
        "Hi Maria - quick one on what we've been seeing on visibility this month..."
      </div>
    </VisualCard>
  );
}

function PitchVisual() {
  return (
    <VisualCard label="Recommended action">
      <div
        style={{
          padding: '10px 13px',
          background: 'rgba(254, 186, 2, 0.10)',
          border: '1px solid rgba(254, 186, 2, 0.30)',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--brand-yellow)',
        }}
      >
        Genius audit + reset
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.55)',
          marginTop: 8,
          lineHeight: 1.45,
        }}
      >
        Low-effort fix. Restores public visibility without changing the base rate.
      </div>
    </VisualCard>
  );
}

function ObjectionVisual() {
  return (
    <VisualCard label="Likely pushback">
      <div
        style={{
          padding: '10px 13px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 12,
          borderTopRightRadius: 4,
          fontSize: 12.5,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.45,
          fontStyle: 'italic',
        }}
      >
        "We already discount enough."
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.45)',
          marginTop: 6,
          textAlign: 'right',
        }}
      >
        - Maria
      </div>
    </VisualCard>
  );
}

// ───────────────────────── Helpers ─────────────────────────

function primaryButton(active: boolean): React.CSSProperties {
  return {
    background: active ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
    color: active ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
    padding: '12px 26px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 15,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: active ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
    cursor: active ? 'pointer' : 'not-allowed',
    boxShadow: active ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
    transition: 'background 0.15s ease',
    flexShrink: 0,
  };
}

