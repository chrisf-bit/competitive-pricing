import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Pause, Play, RotateCcw, FastForward } from 'lucide-react';
import {
  issueTreePhases,
  PHASE_DURATION_MS,
  type IssueTreePhase,
} from '../data/issueTreeReveal';

interface IssueTreeRevealScreenProps {
  onComplete: () => void;
}

export function IssueTreeRevealScreen({ onComplete }: IssueTreeRevealScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);

  // Auto-advance the phases
  useEffect(() => {
    if (paused || done) return;
    const t = setTimeout(() => {
      if (activeIndex < issueTreePhases.length - 1) {
        setActiveIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    }, PHASE_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeIndex, paused, done]);

  function handleSkip() {
    setActiveIndex(issueTreePhases.length - 1);
    setDone(true);
  }

  function handleReplay() {
    setActiveIndex(0);
    setDone(false);
    setPaused(false);
  }

  const activePhase = issueTreePhases[activeIndex];

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(ellipse at top, rgba(0, 74, 153, 0.4) 0%, var(--brand-navy-dark) 60%)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
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
          Level 0 - How we diagnose
        </div>
        <div style={{ flex: 1 }} />
        {!done && (
          <>
            <ControlButton
              onClick={() => setPaused((p) => !p)}
              label={paused ? 'Play' : 'Pause'}
              icon={paused ? <Play size={13} /> : <Pause size={13} />}
            />
            <ControlButton
              onClick={handleSkip}
              label="Skip"
              icon={<FastForward size={13} />}
            />
          </>
        )}
        {done && (
          <ControlButton onClick={handleReplay} label="Replay" icon={<RotateCcw size={13} />} />
        )}
      </div>

      {/* Heading */}
      <div
        style={{
          textAlign: 'center',
          padding: '8px 32px 18px',
          flexShrink: 0,
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
          The shape of a pricing diagnosis
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.55,
          }}
        >
          Every partner conversation follows the same arc. Watch how Alex would walk one through.
        </p>
      </div>

      {/* Phase pipeline */}
      <div
        style={{
          padding: '16px 24px',
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
          }}
        >
          {issueTreePhases.map((phase, i) => (
            <PhaseChip
              key={phase.id}
              phase={phase}
              index={i}
              total={issueTreePhases.length}
              state={
                i < activeIndex || (done && i <= activeIndex)
                  ? 'past'
                  : i === activeIndex
                    ? 'active'
                    : 'upcoming'
              }
            />
          ))}
        </div>
      </div>

      {/* Active phase content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {activePhase && (
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                maxWidth: 720,
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
                  marginBottom: 10,
                }}
              >
                {activePhase.label} - Step {activeIndex + 1} of {issueTreePhases.length}
              </div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--white)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: 16,
                }}
              >
                {activePhase.headline}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.65,
                  maxWidth: 560,
                  margin: '0 auto',
                }}
              >
                {activePhase.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narration + Continue */}
      <div
        style={{
          padding: '20px 28px 24px',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.22)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <Avatar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 4,
            }}
          >
            Alex
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`n-${activePhase?.id ?? 'none'}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.5,
              }}
            >
              {done
                ? "That's the arc. Trigger to objection, every time. You'll walk it yourself in a moment."
                : activePhase?.narration}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={onComplete}
          disabled={!done}
          style={{
            background: done ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
            color: done ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
            padding: '12px 26px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 15,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: done ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
            cursor: done ? 'pointer' : 'not-allowed',
            boxShadow: done ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
            transition: 'background 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (done) e.currentTarget.style.background = 'var(--brand-yellow-light)';
          }}
          onMouseLeave={(e) => {
            if (done) e.currentTarget.style.background = 'var(--brand-yellow)';
          }}
        >
          Continue
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Phase chip ─────────────────────────

type PhaseChipState = 'past' | 'active' | 'upcoming';

function PhaseChip({
  phase,
  index,
  total,
  state,
}: {
  phase: IssueTreePhase;
  index: number;
  total: number;
  state: PhaseChipState;
}) {
  const Icon = phase.icon;

  let background = 'rgba(255,255,255,0.04)';
  let borderColor = 'rgba(255,255,255,0.10)';
  let iconColor = 'rgba(255,255,255,0.45)';
  let labelColor = 'rgba(255,255,255,0.55)';
  let scale = 1;

  if (state === 'active') {
    background = 'rgba(254, 186, 2, 0.14)';
    borderColor = 'var(--brand-yellow)';
    iconColor = 'var(--brand-yellow)';
    labelColor = 'var(--white)';
    scale = 1.04;
  } else if (state === 'past') {
    background = 'rgba(0, 159, 227, 0.10)';
    borderColor = 'rgba(0, 159, 227, 0.45)';
    iconColor = 'var(--brand-blue)';
    labelColor = 'rgba(255,255,255,0.78)';
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <motion.div
        animate={{ scale }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
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
          transition: 'background 0.3s ease, border-color 0.3s ease',
          boxShadow:
            state === 'active' ? '0 6px 18px rgba(254, 186, 2, 0.18)' : 'none',
        }}
      >
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
      </motion.div>
      {index < total - 1 && (
        <div
          style={{
            width: 18,
            height: 1.5,
            background:
              state === 'past'
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

// ───────────────────────── Bits ─────────────────────────

function Avatar() {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'var(--brand-yellow)',
        color: 'var(--brand-navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 16,
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}
    >
      A
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.85)',
        padding: '7px 12px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 600,
        border: '1px solid rgba(255,255,255,0.10)',
        cursor: 'pointer',
        transition: 'background 0.12s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
    >
      {icon}
      {label}
    </button>
  );
}
