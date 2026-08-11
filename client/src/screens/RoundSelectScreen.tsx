import { motion } from 'framer-motion';
import {
  Star,
  Lock,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
} from 'lucide-react';
import roundSelectBackdrop from '../assets/round-select-backdrop.webp';

/**
 * Rounds available to play today. Mirrors TOTAL_ROUNDS in the engine -
 * bump both together as SME-approved content lands. Everything past the
 * cap renders as a locked tile. Today: all of Level 1 (1-10) and all of
 * Level 2 OPC (11-20) are playable.
 */
const AVAILABLE_ROUNDS = Array.from({ length: 20 }, (_, i) => i + 1);

/**
 * Level 1 = partner-portfolio content (rounds 1-10). Level 2 = OPC
 * rounds (11-20): the same lead partners revisited through the
 * On-Platform Competitiveness lens. Tiles beyond AVAILABLE_ROUNDS
 * render locked; the unlocked Level 2 tiles carry the OPC styling.
 */
const LEVEL_1_ROUNDS = Array.from({ length: 10 }, (_, i) => i + 1);
const LEVEL_2_ROUNDS = Array.from({ length: 10 }, (_, i) => i + 11);

interface RoundSelectScreenProps {
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
  roundStars,
  onEnterRound,
}: RoundSelectScreenProps) {
  // "Current" is the first playable round the learner hasn't cleared
  // yet. Derived from roundStars rather than the engine's currentRound
  // because persistence restores roundStars but resets currentRound
  // to 1. Without this, a returning learner with every round cleared
  // would see Round 1 marked "Current" alongside Round 2/3 tagged
  // "Cleared" - impossible progression order. If every playable round
  // is already cleared, no tile is current; the retry pills on
  // completed tiles are the way forward.
  const activeRound =
    (AVAILABLE_ROUNDS as readonly number[]).find(
      (r) => (roundStars[r] ?? 0) < 1,
    ) ?? null;

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
          filter: 'brightness(0.65)',
        }}
      />
      {/* Soft radial vignette only - tiles carry their own weight now
          so no need for a middle-band scrim washing the backdrop out. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,15,40,0.15) 0%, rgba(0,15,40,0.05) 50%, rgba(0,15,40,0.55) 100%)',
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
            Round Select
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
            Each round you'll face a different pricing situation.
            Clear a round to unlock the next. Complete all ten to
            unlock the Level 2 series featuring OPC metrics.
          </p>
        </motion.div>

        <LevelBlock
          label="Level 1"
          subLabel="Partner-portfolio fundamentals"
          rounds={LEVEL_1_ROUNDS}
          activeRound={activeRound}
          roundStars={roundStars}
          isLevel2={false}
          onEnterRound={onEnterRound}
        />

        <LevelBlock
          label="Level 2"
          subLabel="On-Platform Competitiveness (OPC) metrics"
          rounds={LEVEL_2_ROUNDS}
          activeRound={activeRound}
          roundStars={roundStars}
          isLevel2
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
  activeRound,
  roundStars,
  isLevel2,
  onEnterRound,
}: {
  label: string;
  subLabel: string;
  rounds: number[];
  activeRound: number | null;
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  isLevel2: boolean;
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
            color: 'var(--brand-yellow)',
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
          const isCurrent = round === activeRound;
          const isPlayable =
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
              isLevel2={isLevel2}
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

  // Solid, opaque backgrounds on every tile - no translucency, so they
  // read cleanly on any part of the cityscape backdrop. Each state gets
  // a distinct hue that's obvious at a glance: bright brand-yellow for
  // the current round, deep green for cleared, mid navy for locked.
  const style: React.CSSProperties = isCurrent
    ? {
        ...base,
        background:
          'linear-gradient(160deg, #FEC526 0%, #F5A800 100%)',
        border: '2px solid #FFDB6E',
        boxShadow:
          '0 0 0 3px rgba(254,186,2,0.35), 0 10px 28px rgba(254,186,2,0.5)',
        color: 'var(--brand-navy-dark)',
      }
    : isCompleted
      ? {
          ...base,
          background:
            'linear-gradient(160deg, #0EAD3B 0%, #067A24 100%)',
          border: '2px solid #4BD671',
          boxShadow: '0 8px 22px rgba(0,90,25,0.55)',
          color: 'var(--white)',
        }
      : {
          ...base,
          background:
            'linear-gradient(160deg, #1F3A6E 0%, #14284D 100%)',
          border: '2px solid rgba(255,255,255,0.22)',
          boxShadow: '0 6px 18px rgba(0,10,30,0.55)',
          color: 'var(--white)',
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
            color: isCurrent
              ? 'rgba(0, 20, 55, 0.75)'
              : isCompleted
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(255,255,255,0.60)',
          }}
        >
          Round {round}
        </span>
        {isCurrent ? (
          <StatusPill tone="current" label="Current" />
        ) : isCompleted ? (
          <StatusPill tone="complete" label="Cleared" />
        ) : (
          <Lock
            size={12}
            color={
              isLevel2
                ? 'rgba(255,255,255,0.35)'
                : 'rgba(255,255,255,0.55)'
            }
          />
        )}
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[1, 2, 3].map((i) => {
          const earned = i <= stars;
          const emptyStroke = isCurrent
            ? 'rgba(0,20,55,0.5)'
            : isCompleted
              ? 'rgba(255,255,255,0.55)'
              : 'rgba(255,255,255,0.32)';
          const filledFill = isCurrent
            ? 'var(--brand-navy-dark)'
            : 'var(--brand-yellow)';
          const filledStroke = filledFill;
          return (
            <Star
              key={i}
              size={18}
              strokeWidth={1.6}
              fill={earned ? filledFill : 'transparent'}
              color={earned ? filledStroke : emptyStroke}
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
          fontWeight: 800,
          color: isCurrent
            ? 'var(--brand-navy-dark)'
            : isCompleted
              ? 'rgba(255,255,255,0.95)'
              : 'rgba(255,255,255,0.65)',
        }}
      >
        {isLocked ? null : isCurrent ? (
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
        ) : null}
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
  // Current pill sits on the bright brand-yellow tile, so dark navy
  // fill for contrast; Cleared pill sits on the bright green tile,
  // so white fill with a deep-green text color.
  const bg =
    tone === 'current'
      ? 'var(--brand-navy-dark)'
      : 'rgba(255,255,255,0.95)';
  const color =
    tone === 'current' ? 'var(--brand-yellow)' : '#046B1B';
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: 100,
        background: bg,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}
    >
      {label}
    </span>
  );
}
