import { motion } from 'framer-motion';
import {
  Star,
  Lock,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import roundSelectBackdrop from '../assets/round-select-backdrop.webp';

/**
 * Rounds available to play today. Bump these as SME-approved
 * content lands. The rest render as locked "Coming Soon" tiles.
 */
const AVAILABLE_ROUNDS = [1, 2, 3] as const;

/**
 * Level 1 = existing partner-portfolio content (rounds 1-10).
 * Level 2 = OPC / Advanced View content that unlocks in R3
 * (rounds 11-20). All Level 2 tiles ship locked with a
 * "Coming Soon" tag alongside their round number.
 */
const LEVEL_1_ROUNDS = Array.from({ length: 10 }, (_, i) => i + 1);
const LEVEL_2_ROUNDS = Array.from({ length: 10 }, (_, i) => i + 11);

interface RoundSelectScreenProps {
  currentRound: number;
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  onEnterRound: (round: number) => void;
}

/**
 * Progress hub between rounds. Two rows of ten tiles each. The
 * current round is the only unlocked tile; completed rounds render
 * with their earned star count and a retry pill if the learner
 * could still improve; everything above the current round (plus all
 * of Level 2) is locked.
 */
export function RoundSelectScreen({
  currentRound,
  roundStars,
  onEnterRound,
}: RoundSelectScreenProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--brand-navy-dark)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Backdrop */}
      <motion.img
        src={roundSelectBackdrop}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.55)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,15,40,0.28) 0%, rgba(0,15,40,0.15) 45%, rgba(0,15,40,0.70) 100%)',
        }}
      />

      {/* Content column */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '0 auto',
          padding: '48px 32px 56px',
          maxWidth: 1120,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--brand-yellow)',
              marginBottom: 8,
            }}
          >
            Rate Right - Journey
          </div>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: 'var(--white)',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Pick your round
          </h1>
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 14,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.5,
            }}
          >
            Each round teaches a different pricing situation. Clear a
            round to unlock the next. Complete all ten to unlock the
            Level 2 series featuring OPC metrics.
          </p>
        </motion.div>

        <LevelBlock
          label="Level 1"
          subLabel="Partner-portfolio fundamentals"
          rounds={LEVEL_1_ROUNDS}
          currentRound={currentRound}
          roundStars={roundStars}
          isLevel2Locked={false}
          onEnterRound={onEnterRound}
        />

        <LevelBlock
          label="Level 2"
          subLabel="On-Platform Competitiveness (OPC) metrics"
          rounds={LEVEL_2_ROUNDS}
          currentRound={currentRound}
          roundStars={roundStars}
          isLevel2Locked
          onEnterRound={onEnterRound}
        />
      </div>
    </div>
  );
}

function LevelBlock({
  label,
  subLabel,
  rounds,
  currentRound,
  roundStars,
  isLevel2Locked,
  onEnterRound,
}: {
  label: string;
  subLabel: string;
  rounds: number[];
  currentRound: number;
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  isLevel2Locked: boolean;
  onEnterRound: (round: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      {/* Level header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 4px',
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isLevel2Locked ? 'rgba(255,255,255,0.4)' : 'var(--brand-yellow)',
          }}
        >
          {label}
        </div>
        <div
          style={{
            height: 1,
            flex: 1,
            background: 'rgba(255,255,255,0.14)',
          }}
        />
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {subLabel}
        </div>
      </div>

      {/* Tile grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
        }}
      >
        {rounds.map((round) => {
          const stars = roundStars[round] ?? 0;
          const isCompleted = stars >= 1;
          const isCurrent = round === currentRound && !isLevel2Locked;
          const isPlayable =
            !isLevel2Locked &&
            (AVAILABLE_ROUNDS as readonly number[]).includes(round) &&
            (isCurrent || isCompleted);
          const isLocked = !isPlayable;
          return (
            <RoundTile
              key={round}
              round={round}
              stars={stars}
              isCurrent={isCurrent}
              isCompleted={isCompleted}
              isLocked={isLocked}
              isLevel2={isLevel2Locked}
              onEnter={() => onEnterRound(round)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function RoundTile({
  round,
  stars,
  isCurrent,
  isCompleted,
  isLocked,
  isLevel2,
  onEnter,
}: {
  round: number;
  stars: 0 | 1 | 2 | 3;
  isCurrent: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  isLevel2: boolean;
  onEnter: () => void;
}) {
  const canRetry = isCompleted && stars < 3;

  const base = {
    padding: '14px 12px 12px',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    cursor: isLocked ? 'not-allowed' : 'pointer',
    transition: 'all 0.18s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const style: React.CSSProperties = isCurrent
    ? {
        ...base,
        background:
          'linear-gradient(160deg, rgba(254,186,2,0.18) 0%, rgba(254,186,2,0.06) 100%)',
        border: '1.5px solid var(--brand-yellow)',
        boxShadow: '0 8px 24px rgba(254,186,2,0.25)',
      }
    : isCompleted
      ? {
          ...base,
          background:
            'linear-gradient(160deg, rgba(0,138,14,0.18) 0%, rgba(0,138,14,0.05) 100%)',
          border: '1.5px solid rgba(0,138,14,0.55)',
        }
      : {
          ...base,
          background: 'rgba(0, 15, 40, 0.55)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          opacity: 0.72,
        };

  return (
    <button
      onClick={isLocked ? undefined : onEnter}
      disabled={isLocked}
      style={style}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Top row: round number + status pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Round {round}
        </span>
        {isCurrent ? (
          <StatusPill tone="current" label="Current" />
        ) : isCompleted ? (
          <StatusPill tone="complete" label="Cleared" />
        ) : (
          <Lock size={12} color="rgba(255,255,255,0.4)" />
        )}
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[1, 2, 3].map((i) => {
          const earned = i <= stars;
          return (
            <Star
              key={i}
              size={18}
              strokeWidth={1.6}
              fill={earned ? 'var(--brand-yellow)' : 'transparent'}
              color={earned ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.32)'}
            />
          );
        })}
      </div>

      {/* Bottom row: CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 11,
          fontWeight: 700,
          color: isCurrent
            ? 'var(--brand-yellow)'
            : isCompleted
              ? 'rgba(62, 226, 122, 0.95)'
              : 'rgba(255,255,255,0.4)',
        }}
      >
        {isLevel2 ? (
          <>
            <Sparkles size={11} />
            Coming soon
          </>
        ) : isCurrent ? (
          <>
            <Play size={11} fill="currentColor" />
            Start round
            <ChevronRight size={11} style={{ marginLeft: 'auto' }} />
          </>
        ) : isCompleted && canRetry ? (
          <>
            <RotateCcw size={11} />
            Retry for 3 stars
          </>
        ) : isCompleted ? (
          <>
            <Check size={11} />
            Full stars earned
          </>
        ) : (
          <>
            <Lock size={11} />
            Coming soon
          </>
        )}
      </div>
    </button>
  );
}

function StatusPill({
  tone,
  label,
}: {
  tone: 'current' | 'complete';
  label: string;
}) {
  const bg =
    tone === 'current' ? 'rgba(254,186,2,0.22)' : 'rgba(0,138,14,0.22)';
  const color =
    tone === 'current' ? 'var(--brand-yellow)' : 'rgb(62, 226, 122)';
  const border =
    tone === 'current'
      ? '1px solid rgba(254,186,2,0.45)'
      : '1px solid rgba(0,138,14,0.55)';
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 800,
        padding: '2px 7px',
        borderRadius: 100,
        background: bg,
        color,
        border,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}
    >
      {label}
    </span>
  );
}
