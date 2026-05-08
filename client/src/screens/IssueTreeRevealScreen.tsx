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
        height: '100vh',
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
                marginBottom: 10,
              }}
            >
              {activePhase.label} - Step {activeIndex + 1} of {issueTreePhases.length}
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

