import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Check } from 'lucide-react';
import type { GameState, ParityRegime } from '../types';

/**
 * Learner feedback affordance - a persistent floating button so a
 * learner can leave a comment about the screen they are ON, not just
 * at the end of the run.
 *
 * The point of the widget is that it captures WHERE the learner was
 * automatically (screen, round, partner, market) so the feedback is
 * self-tagged - the learner never has to describe their location.
 *
 * Delivery is deliberately NOT wired yet. In the live LMS package this
 * submit handler will dispatch through the same environment-detection
 * pattern as util/persistence.ts:
 *   1. xAPI statement if an LRS is present (the rich path), else
 *   2. SCORM cmi.comments via the pipwerks wrapper, else
 *   3. this local buffer (dev / preview).
 * Today it only does step 3 so the interaction can be demoed in the
 * Render preview. See CLAUDE.md "learner feedback" for the rationale.
 */

const SCREEN_LABELS: Record<string, string> = {
  briefing: 'Briefing',
  'l0-market-select': 'Market Select',
  'l0-character-build': 'Character Build',
  'l0-gm-chat': 'Day one with Alex',
  'l0-email-audit': 'Call Audit',
  'l0-dashboard-hotspot': 'Data & Insights',
  'l0-mini-scenarios': 'Warm Up',
  'l0-issue-tree-reveal': 'Pricing Pathway',
  'l0-clearance-summary': 'Clearance Summary',
  'l0-cleared-celebration': 'Cleared',
  'round-select': 'Round Select',
  portfolio: 'Portfolio',
  'partner-detail': 'Partner Detail',
  conversation: 'Conversation',
  'conversation-report': 'Conversation Report',
  'level-1-complete': 'Level 1 Complete',
  'level-2-complete': 'Level 2 Complete',
  debrief: 'Debrief',
};

const REGIME_LABELS: Record<ParityRegime, string> = {
  wide: 'Wide Parity',
  narrow: 'Narrow Parity',
  none: 'No Parity',
  'cross-regional': 'Cross-Regional',
};

/** Screens where the round number is meaningful context. */
const ROUND_SCREENS = new Set([
  'portfolio',
  'partner-detail',
  'conversation',
  'conversation-report',
]);

export interface FeedbackContext {
  screen: GameState['screen'];
  currentRound: number;
  partnerName: string | null;
  regime: ParityRegime | null;
  playerName: string | null;
}

interface FeedbackButtonProps {
  context: FeedbackContext;
}

interface FeedbackEntry extends FeedbackContext {
  comment: string;
  submittedAt: string;
}

const BUFFER_KEY = 'rateRight:feedback:preview';

function persistLocally(entry: FeedbackEntry) {
  try {
    const raw = window.localStorage.getItem(BUFFER_KEY);
    const buffer: FeedbackEntry[] = raw ? JSON.parse(raw) : [];
    buffer.push(entry);
    window.localStorage.setItem(BUFFER_KEY, JSON.stringify(buffer));
  } catch {
    // localStorage unavailable (private mode etc.) - non-fatal for a preview.
  }
  // Visible in the console so the captured payload can be inspected while
  // the real xAPI / cmi.comments dispatch is still to come.
  console.info('[feedback captured]', entry);
}

export function FeedbackButton({ context }: FeedbackButtonProps) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const screenLabel = SCREEN_LABELS[context.screen] ?? context.screen;
  const showRound = ROUND_SCREENS.has(context.screen);

  const contextChips: string[] = [screenLabel];
  if (showRound) contextChips.push(`Round ${context.currentRound}`);
  if (context.partnerName) contextChips.push(context.partnerName);
  if (context.regime) contextChips.push(REGIME_LABELS[context.regime]);

  function reset() {
    setComment('');
    setSubmitted(false);
  }

  function close() {
    setOpen(false);
    // Small delay so the panel's exit animation isn't interrupted by the
    // form resetting under it.
    window.setTimeout(reset, 200);
  }

  function submit() {
    persistLocally({
      ...context,
      comment: comment.trim(),
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    window.setTimeout(close, 1400);
  }

  const canSubmit = comment.trim().length > 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 18,
        left: 18,
        zIndex: 998,
        fontFamily: 'var(--font)',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 56,
              left: 0,
              width: 320,
              background: 'rgba(20, 30, 50, 0.97)',
              color: 'var(--white)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: 16,
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  padding: '18px 8px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={20} strokeWidth={3} color="#fff" />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Thanks for the feedback</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)' }}>
                  Sent with the screen you were on.
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 10,
                  }}
                >
                  <MessageSquare size={14} style={{ color: 'var(--brand-yellow)' }} />
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--brand-yellow)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      flex: 1,
                    }}
                  >
                    Share feedback
                  </div>
                  <button
                    onClick={close}
                    style={{
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.5)',
                      border: 'none',
                      padding: 2,
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                    aria-label="Close feedback"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Auto-captured context - what makes the feedback useful. */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                    marginBottom: 14,
                  }}
                >
                  {contextChips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.82)',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 999,
                        padding: '3px 9px',
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 8,
                  }}
                >
                  What's your feedback on this screen?
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Anything you'd change, or that tripped you up?"
                  rows={3}
                  style={{
                    width: '100%',
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--white)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 10,
                    padding: '9px 11px',
                    fontSize: 13,
                    fontFamily: 'var(--font)',
                    lineHeight: 1.45,
                    boxSizing: 'border-box',
                    marginBottom: 12,
                  }}
                />

                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  style={{
                    width: '100%',
                    background: canSubmit ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
                    color: canSubmit ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s ease',
                  }}
                >
                  Send feedback
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => (open ? close() : setOpen(true))}
        style={{
          height: 44,
          borderRadius: 14,
          background: open ? 'var(--brand-yellow)' : 'rgba(20, 30, 50, 0.95)',
          color: open ? 'var(--brand-navy)' : 'var(--brand-yellow)',
          border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 15px',
          cursor: 'pointer',
          fontSize: 13.5,
          fontWeight: 700,
          fontFamily: 'var(--font)',
          boxShadow: open
            ? '0 8px 24px rgba(254, 186, 2, 0.4)'
            : '0 6px 18px rgba(0,0,0,0.4)',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
        aria-label="Share feedback"
      >
        <MessageSquare size={17} strokeWidth={2.2} />
        Feedback
      </button>
    </div>
  );
}
