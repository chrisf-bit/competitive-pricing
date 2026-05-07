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
      {/* Top label */}
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

      {/* Heading */}
      <div
        style={{
          textAlign: 'center',
          padding: '8px 32px 0',
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
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.55,
          }}
        >
          Click each step to walk through how Alex would diagnose a pricing problem on a partner account.
        </p>
      </div>

      {/* Phase pipeline - sits between intro and step explanation, clickable */}
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

      {/* Active phase explanation */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '36px 32px 0',
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
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.6,
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              {activePhase.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Narration + Continue/Next */}
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
              key={`n-${activePhase.id}`}
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
              {activePhase.narration}
            </motion.div>
          </AnimatePresence>
        </div>
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

  const showCheck = isVisited && !isActive;

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
