import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
  Award,
  AlertCircle,
} from 'lucide-react';
import type { GameState, KnowledgeCheckResult } from '../types';
import { gmScript } from '../data/gameMasterScript';
import { emailAudit } from '../data/emailAudit';

interface ClearanceSummaryScreenProps {
  results: KnowledgeCheckResult[];
  /** Called when the learner clicks Continue. `cleared` reflects whether they actually passed the threshold (vs continuing anyway). */
  onContinue: (cleared: boolean) => void;
  onRetry: (
    activityScreen: GameState['screen'],
    itemMatcher: (itemId: string) => boolean,
  ) => void;
}

const PASS_THRESHOLD = 0.8;

interface ActivityDef {
  id: 'gm-chat' | 'email-audit' | 'issue-tree';
  label: string;
  description: string;
  screen: GameState['screen'];
  /** Whether items match (used for filtering results and clearing on retry). */
  itemMatcher: (itemId: string) => boolean;
  /** Total expected items for this activity (for "X / Y" display). */
  totalItems: number;
  /** True if this activity has no scoring - completion only. */
  completionOnly?: boolean;
}

const activities: ActivityDef[] = [
  {
    id: 'gm-chat',
    label: 'Day one with Alex',
    description: 'Pricing basics: eRPD and on-platform vs cross-channel',
    screen: 'l0-gm-chat',
    itemMatcher: (id) => /^[AB]\d$/.test(id),
    totalItems: 5,
  },
  {
    id: 'email-audit',
    label: 'Email Audit',
    description: 'Safe vs unsafe pricing phrases in a colleague\'s draft',
    screen: 'l0-email-audit',
    itemMatcher: (id) => id.startsWith('email-audit-'),
    totalItems: 5,
  },
  {
    id: 'issue-tree',
    label: 'How we diagnose',
    description: 'Walked the seven phases of a pricing diagnosis',
    screen: 'l0-issue-tree-reveal',
    itemMatcher: () => false,
    totalItems: 0,
    completionOnly: true,
  },
];

interface ActivityScore {
  activity: ActivityDef;
  attempted: number;
  correct: number;
  missedResults: KnowledgeCheckResult[];
  pct: number;
  passing: boolean;
}

function scoreActivity(
  activity: ActivityDef,
  results: KnowledgeCheckResult[],
): ActivityScore {
  if (activity.completionOnly) {
    return {
      activity,
      attempted: 1,
      correct: 1,
      missedResults: [],
      pct: 1,
      passing: true,
    };
  }
  const own = results.filter((r) => activity.itemMatcher(r.itemId));
  const correct = own.filter((r) => r.correct).length;
  const missed = own.filter((r) => !r.correct);
  const total = activity.totalItems;
  const pct = total === 0 ? 0 : correct / total;
  return {
    activity,
    attempted: own.length,
    correct,
    missedResults: missed,
    pct,
    passing: pct >= PASS_THRESHOLD,
  };
}

interface MissedItemDetail {
  itemId: string;
  prompt: string;
  correctText: string;
  rationale: string;
  source?: string;
}

function getMissedItemDetail(itemId: string): MissedItemDetail | null {
  // GM Chat questions
  for (const beat of gmScript) {
    if (beat.type === 'question' && beat.question.itemId === itemId) {
      const correct = beat.question.options.find((o) => o.isCorrect);
      return {
        itemId,
        prompt: beat.question.prompt,
        correctText: correct?.text ?? '',
        rationale: beat.question.followUp.incorrect,
      };
    }
  }
  // Email Audit phrases
  if (itemId.startsWith('email-audit-')) {
    const phraseId = itemId.replace('email-audit-', '');
    const phrase = emailAudit.phrases.find((p) => p.id === phraseId);
    if (phrase) {
      return {
        itemId,
        prompt: `"${phrase.text}"`,
        correctText: phrase.isSafe ? 'Safe to send' : 'Unsafe - rewrite',
        rationale: phrase.rationale.incorrect,
        source: phrase.source,
      };
    }
  }
  return null;
}

export function ClearanceSummaryScreen({
  results,
  onContinue,
  onRetry,
}: ClearanceSummaryScreenProps) {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const activityScores = activities.map((a) => scoreActivity(a, results));
  const scorable = activityScores.filter((a) => !a.activity.completionOnly);
  const totalAttempted = scorable.reduce((sum, a) => sum + a.attempted, 0);
  const totalCorrect = scorable.reduce((sum, a) => sum + a.correct, 0);
  const overallPct = totalAttempted === 0 ? 0 : totalCorrect / totalAttempted;
  const cleared = overallPct >= PASS_THRESHOLD && scorable.every((a) => a.attempted >= a.activity.totalItems);

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
      {/* Top label */}
      <div style={{ padding: '20px 28px 6px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
          }}
        >
          Clearance summary
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Status banner */}
          <StatusBanner
            cleared={cleared}
            overallPct={overallPct}
            totalCorrect={totalCorrect}
            totalAttempted={totalAttempted}
          />

          {/* Activity cards */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activityScores.map((score) => (
              <ActivityCard
                key={score.activity.id}
                score={score}
                expanded={expandedActivity === score.activity.id}
                onToggleExpand={() =>
                  setExpandedActivity((cur) =>
                    cur === score.activity.id ? null : score.activity.id,
                  )
                }
                onRetry={() => onRetry(score.activity.screen, score.activity.itemMatcher)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Continue bar */}
      <div
        style={{
          flexShrink: 0,
          padding: '18px 28px 22px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
        }}
      >
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', maxWidth: 480 }}>
          {cleared
            ? "You're cleared. Time to put it into practice with real partners."
            : 'You need 80% or higher to clear. Use the Retry buttons above to revisit the items you missed.'}
        </div>
        <button
          onClick={() => onContinue(cleared)}
          disabled={!cleared}
          style={{
            background: cleared ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.06)',
            color: cleared ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
            padding: '12px 26px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 15,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: cleared ? 'none' : '1.5px solid rgba(255,255,255,0.10)',
            cursor: cleared ? 'pointer' : 'not-allowed',
            boxShadow: cleared ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
            transition: 'background 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (cleared) e.currentTarget.style.background = 'var(--brand-yellow-light)';
          }}
          onMouseLeave={(e) => {
            if (cleared) e.currentTarget.style.background = 'var(--brand-yellow)';
          }}
        >
          {cleared ? 'Continue to the partner sim' : 'Locked - retry to clear'}
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Sub-components ─────────────────────────

function StatusBanner({
  cleared,
  overallPct,
  totalCorrect,
  totalAttempted,
}: {
  cleared: boolean;
  overallPct: number;
  totalCorrect: number;
  totalAttempted: number;
}) {
  const accent = cleared ? 'var(--success)' : 'var(--warning)';
  const accentBg = cleared ? 'rgba(0, 138, 14, 0.12)' : 'rgba(232, 150, 12, 0.12)';
  const Icon = cleared ? Award : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        padding: '24px 26px',
        background: accentBg,
        border: `1.5px solid ${accent}`,
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: accent,
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={28} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.01em',
            marginBottom: 4,
          }}
        >
          {cleared ? "You're cleared" : 'Not yet cleared'}
        </div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
          {totalAttempted > 0
            ? `${totalCorrect} of ${totalAttempted} questions correct overall (${Math.round(overallPct * 100)}%). ${
                cleared
                  ? 'Above the 80% threshold.'
                  : `Below the 80% threshold - revisit the activities flagged below if you want.`
              }`
            : "You haven't attempted any of the activities yet."}
        </div>
      </div>
    </motion.div>
  );
}

function ActivityCard({
  score,
  expanded,
  onToggleExpand,
  onRetry,
}: {
  score: ActivityScore;
  expanded: boolean;
  onToggleExpand: () => void;
  onRetry: () => void;
}) {
  const { activity, attempted, correct, missedResults, pct, passing } = score;

  let statusColor = 'var(--grey-400)';
  let statusLabel = 'Not started';
  if (activity.completionOnly && attempted > 0) {
    statusColor = 'var(--brand-blue)';
    statusLabel = 'Walked through';
  } else if (attempted === 0) {
    statusColor = 'rgba(255,255,255,0.4)';
    statusLabel = 'Not started';
  } else if (passing) {
    statusColor = 'var(--success)';
    statusLabel = `${correct} / ${activity.totalItems} - passing`;
  } else {
    statusColor = 'var(--warning)';
    statusLabel = `${correct} / ${activity.totalItems} - revisit`;
  }

  const canRetry = !activity.completionOnly && (!passing || attempted < activity.totalItems);
  const hasMisses = missedResults.length > 0;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* Status dot + percentage ring */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: `2px solid ${statusColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: statusColor,
            flexShrink: 0,
          }}
        >
          {activity.completionOnly && attempted > 0 ? (
            <Check size={20} strokeWidth={3} />
          ) : passing && attempted > 0 ? (
            <Check size={20} strokeWidth={3} />
          ) : attempted === 0 ? (
            <span style={{ fontSize: 14, fontWeight: 700 }}>-</span>
          ) : (
            <span style={{ fontSize: 13, fontWeight: 800 }}>{Math.round(pct * 100)}%</span>
          )}
        </div>

        {/* Title + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 2 }}>
            {activity.label}
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)' }}>
            {activity.description}
          </div>
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: statusColor,
            padding: '5px 11px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 100,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          {statusLabel}
        </div>

        {hasMisses && (
          <button
            onClick={onToggleExpand}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '6px 9px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}
            aria-label="Show missed items"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {missedResults.length} missed
          </button>
        )}

        {canRetry && (
          <button
            onClick={onRetry}
            style={{
              background: 'rgba(254, 186, 2, 0.14)',
              color: 'var(--brand-yellow)',
              border: '1px solid rgba(254, 186, 2, 0.45)',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(254, 186, 2, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(254, 186, 2, 0.14)';
            }}
          >
            <RotateCcw size={12} />
            Retry
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasMisses && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 18px 18px' }}>
              {missedResults.map((r, i) => {
                const detail = getMissedItemDetail(r.itemId);
                if (!detail) return null;
                return (
                  <div
                    key={r.itemId}
                    style={{
                      padding: '12px 14px',
                      background: 'rgba(232, 150, 12, 0.06)',
                      border: '1px solid rgba(232, 150, 12, 0.2)',
                      borderRadius: 8,
                      marginBottom: i < missedResults.length - 1 ? 8 : 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--white)',
                        marginBottom: 6,
                        lineHeight: 1.45,
                      }}
                    >
                      {detail.prompt}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--success)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      Right answer: {detail.correctText}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: 'rgba(255,255,255,0.78)',
                        lineHeight: 1.5,
                      }}
                    >
                      {detail.rationale}
                    </div>
                    {detail.source && (
                      <div
                        style={{
                          fontSize: 10.5,
                          color: 'rgba(255,255,255,0.4)',
                          fontStyle: 'italic',
                          marginTop: 6,
                        }}
                      >
                        Source: {detail.source}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
