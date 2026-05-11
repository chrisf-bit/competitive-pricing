import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X, Mail, ShieldCheck, ShieldAlert, FileText } from 'lucide-react';
import { emailAudit, type EmailPhrase } from '../data/emailAudit';
import type { KnowledgeCheckResult } from '../types';
import { LaptopFrame } from '../components/DeviceFrame';

interface EmailAuditScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
  /**
   * When set, restricts the activity to only the listed itemIds. Used
   * by the Clearance Summary retry path so a learner only redoes the
   * phrases they got wrong.
   */
  retryItemIds?: string[] | null;
}

type PhraseJudgement = {
  phraseId: string;
  pickedSafe: boolean;
  isCorrect: boolean;
};

export function EmailAuditScreen({ onComplete, retryItemIds }: EmailAuditScreenProps) {
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const [judgements, setJudgements] = useState<Record<string, PhraseJudgement>>({});

  // On retry, narrow the phrase list to just the ones the learner got
  // wrong last time. retryItemIds use the 'email-audit-{phraseId}'
  // form so we strip the prefix to match phrase ids.
  const phrases = useMemo(() => {
    if (!retryItemIds || retryItemIds.length === 0) return emailAudit.phrases;
    const failedPhraseIds = new Set(
      retryItemIds.map((id) => id.replace(/^email-audit-/, '')),
    );
    return emailAudit.phrases.filter((p) => failedPhraseIds.has(p.id));
  }, [retryItemIds]);

  const totalPhrases = phrases.length;
  const reviewedCount = Object.keys(judgements).length;
  const correctCount = Object.values(judgements).filter((j) => j.isCorrect).length;
  const allReviewed = reviewedCount === totalPhrases;

  const activePhrase = useMemo(
    () => phrases.find((p) => p.id === activePhraseId) ?? null,
    [activePhraseId, phrases],
  );

  const activeJudgement = activePhrase ? judgements[activePhrase.id] ?? null : null;

  function handlePick(phraseId: string, pickedSafe: boolean) {
    const phrase = phrases.find((p) => p.id === phraseId);
    if (!phrase) return;
    const isCorrect = pickedSafe === phrase.isSafe;
    setJudgements((prev) => ({
      ...prev,
      [phraseId]: { phraseId, pickedSafe, isCorrect },
    }));
  }

  function handleContinue() {
    const results: KnowledgeCheckResult[] = Object.values(judgements).map((j) => ({
      itemId: `email-audit-${j.phraseId}`,
      correct: j.isCorrect,
      attempts: 1,
    }));
    onComplete(results);
  }

  return (
    <LaptopFrame>
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
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 22px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'rgba(254, 186, 2, 0.14)',
            color: 'var(--brand-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FileText size={16} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.25 }}>
            {emailAudit.setupHeadline}
          </div>
          <div
            style={{
              fontSize: 11.5,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.35,
              marginTop: 2,
            }}
          >
            Click each highlighted phrase to judge whether it's safe to send.
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            flexShrink: 0,
          }}
        >
          Email Audit
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.07)',
            padding: '4px 10px',
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          {reviewedCount} / {totalPhrases} reviewed
        </div>
      </div>

      {/* Two columns */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(340px, 2fr)',
          overflow: 'hidden',
        }}
      >
        {/* Left: email card */}
        <div
          style={{
            overflow: 'hidden',
            padding: '14px 14px 14px 22px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <EmailCard
            activePhraseId={activePhraseId}
            judgements={judgements}
            onPickPhrase={setActivePhraseId}
            phrases={phrases}
          />
        </div>

        {/* Right: review panel */}
        <div
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <ReviewPanel
            activePhrase={activePhrase}
            activeJudgement={activeJudgement}
            allReviewed={allReviewed}
            onPick={handlePick}
            onMoveOn={() => setActivePhraseId(null)}
          />

          {/* Footer with Continue */}
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              {allReviewed
                ? `${correctCount} of ${totalPhrases} correct`
                : `Review all ${totalPhrases} phrases to continue`}
            </div>
            <button
              onClick={handleContinue}
              disabled={!allReviewed}
              style={{
                background: allReviewed ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
                color: allReviewed ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
                padding: '11px 22px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: allReviewed ? 'none' : '1.5px solid rgba(255,255,255,0.10)',
                cursor: allReviewed ? 'pointer' : 'not-allowed',
                boxShadow: allReviewed ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (allReviewed) e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                if (allReviewed) e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              Continue
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </LaptopFrame>
  );
}

// ───────────────────────── Email card ─────────────────────────

function EmailCard({
  activePhraseId,
  judgements,
  onPickPhrase,
  phrases,
}: {
  activePhraseId: string | null;
  judgements: Record<string, PhraseJudgement>;
  onPickPhrase: (id: string) => void;
  phrases: EmailPhrase[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        background: 'var(--white)',
        color: 'var(--grey-700)',
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        maxWidth: 720,
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Email header */}
      <div
        style={{
          padding: '12px 20px 10px',
          borderBottom: '1px solid var(--grey-100)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 8,
          }}
        >
          <Mail size={12} />
          Draft - not yet sent
        </div>
        <table
          style={{
            width: '100%',
            fontSize: 12,
            color: 'var(--grey-600)',
            borderCollapse: 'collapse',
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: 56, paddingBottom: 2, color: 'var(--grey-400)' }}>From</td>
              <td style={{ paddingBottom: 2 }}>
                {emailAudit.email.fromName}{' '}
                <span style={{ color: 'var(--grey-400)' }}>
                  ({emailAudit.email.fromRole})
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 2, color: 'var(--grey-400)' }}>To</td>
              <td style={{ paddingBottom: 2 }}>{emailAudit.email.toName}</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--grey-400)' }}>Subject</td>
              <td style={{ fontWeight: 600, color: 'var(--brand-navy)' }}>
                {emailAudit.email.subject}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Email body */}
      <div
        style={{
          padding: '14px 20px 18px',
          fontSize: 12.5,
          lineHeight: 1.5,
          color: 'var(--grey-700)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {emailAudit.email.body.map((token, i) => {
          if (typeof token === 'string') {
            return <span key={i}>{token}</span>;
          }
          const phrase = phrases.find((p) => p.id === token.phraseId);
          // If the phrase isn't in the active set (eg. retry mode
          // filtered it out), render the original text inline as
          // plain text so the email still reads naturally.
          if (!phrase) {
            const orig = emailAudit.phrases.find((p) => p.id === token.phraseId);
            return orig ? <span key={i}>{orig.text}</span> : null;
          }
          const j = judgements[phrase.id];
          const active = activePhraseId === phrase.id;
          return (
            <PhraseToken
              key={i}
              text={phrase.text}
              active={active}
              judgement={j}
              onClick={() => onPickPhrase(phrase.id)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function PhraseToken({
  text,
  active,
  judgement,
  onClick,
}: {
  text: string;
  active: boolean;
  judgement?: PhraseJudgement;
  onClick: () => void;
}) {
  // Visual state: untouched, active, correct, incorrect
  let background = 'rgba(254, 186, 2, 0.18)';
  let borderColor = 'rgba(254, 186, 2, 0.55)';
  let textColor = 'var(--grey-700)';
  if (active) {
    background = 'rgba(254, 186, 2, 0.32)';
    borderColor = 'var(--brand-yellow)';
  }
  if (judgement?.isCorrect) {
    background = 'rgba(0, 138, 14, 0.14)';
    borderColor = 'var(--success)';
    textColor = 'var(--grey-700)';
  } else if (judgement && !judgement.isCorrect) {
    background = 'rgba(204, 0, 0, 0.10)';
    borderColor = 'var(--danger)';
    textColor = 'var(--grey-700)';
  }

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline',
        padding: '1px 4px',
        margin: 0,
        borderRadius: 4,
        background,
        borderBottom: `2px solid ${borderColor}`,
        color: textColor,
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease',
        fontWeight: judgement ? 500 : 400,
        position: 'relative',
      }}
    >
      {text}
      {judgement && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 6,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: judgement.isCorrect ? 'var(--success)' : 'var(--danger)',
            color: 'var(--white)',
            verticalAlign: 'middle',
          }}
        >
          {judgement.isCorrect ? (
            <Check size={11} strokeWidth={3.5} />
          ) : (
            <X size={11} strokeWidth={3.5} />
          )}
        </span>
      )}
    </span>
  );
}

// ───────────────────────── Review panel ─────────────────────────

function ReviewPanel({
  activePhrase,
  activeJudgement,
  allReviewed,
  onPick,
  onMoveOn,
}: {
  activePhrase: EmailPhrase | null;
  activeJudgement: PhraseJudgement | null;
  allReviewed: boolean;
  onPick: (phraseId: string, pickedSafe: boolean) => void;
  onMoveOn: () => void;
}) {
  if (!activePhrase) {
    return (
      <div
        style={{
          flex: 1,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 16,
          }}
        >
          <Mail size={24} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
          Pick a phrase to review
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 8, maxWidth: 280 }}>
          Click any of the highlighted phrases in the email to judge whether it's safe to send.
        </div>
      </div>
    );
  }

  const hasAnswered = activeJudgement !== null;
  const phrase = activePhrase;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Selected phrase */}
      <div
        style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: 10,
          }}
        >
          Selected phrase
        </div>
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: 'var(--white)',
            background: 'rgba(254, 186, 2, 0.12)',
            padding: '11px 14px',
            borderRadius: 8,
            border: '1px solid rgba(254, 186, 2, 0.30)',
            fontStyle: 'italic',
          }}
        >
          "{phrase.text}"
        </div>
      </div>

      {/* Question OR feedback */}
      <div
        style={{
          flex: 1,
          padding: '20px 24px',
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          {!hasAnswered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--white)',
                  marginBottom: 14,
                }}
              >
                Is this safe to send?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <JudgementButton
                  variant="safe"
                  label="Safe to send"
                  onClick={() => onPick(phrase.id, true)}
                />
                <JudgementButton
                  variant="unsafe"
                  label="Unsafe - rewrite"
                  onClick={() => onPick(phrase.id, false)}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: activeJudgement!.isCorrect ? 'var(--success)' : 'var(--danger)',
                    color: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {activeJudgement!.isCorrect ? (
                    <Check size={16} strokeWidth={3.5} />
                  ) : (
                    <X size={16} strokeWidth={3.5} />
                  )}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--white)',
                  }}
                >
                  {activeJudgement!.isCorrect ? 'Correct call' : 'Not quite'}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: 14,
                }}
              >
                {activeJudgement!.isCorrect
                  ? phrase.rationale.correct
                  : phrase.rationale.incorrect}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  fontStyle: 'italic',
                  marginBottom: 18,
                }}
              >
                Source: {phrase.source}
              </div>
              {allReviewed ? (
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'rgba(255,255,255,0.65)',
                    fontStyle: 'italic',
                  }}
                >
                  All phrases reviewed. Hit Continue to wrap up.
                </div>
              ) : (
                <button
                  onClick={onMoveOn}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: 'var(--white)',
                    padding: '9px 16px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  }}
                >
                  Pick another phrase
                  <ChevronRight size={14} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function JudgementButton({
  variant,
  label,
  onClick,
}: {
  variant: 'safe' | 'unsafe';
  label: string;
  onClick: () => void;
}) {
  const isSafe = variant === 'safe';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.05)',
        color: 'var(--white)',
        border: '1.5px solid rgba(255,255,255,0.10)',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isSafe
          ? 'rgba(0, 138, 14, 0.14)'
          : 'rgba(204, 0, 0, 0.12)';
        e.currentTarget.style.borderColor = isSafe ? 'var(--success)' : 'var(--danger)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: isSafe ? 'rgba(0, 138, 14, 0.18)' : 'rgba(204, 0, 0, 0.16)',
          color: isSafe ? 'var(--success)' : 'var(--danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isSafe ? <ShieldCheck size={15} /> : <ShieldAlert size={15} />}
      </div>
      {label}
    </button>
  );
}
