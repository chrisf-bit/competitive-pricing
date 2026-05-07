import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X, Mail, ShieldCheck, ShieldAlert, FileText } from 'lucide-react';
import { emailAudit, type EmailPhrase } from '../data/emailAudit';
import type { KnowledgeCheckResult } from '../types';

interface EmailAuditScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
}

type PhraseJudgement = {
  phraseId: string;
  pickedSafe: boolean;
  isCorrect: boolean;
};

export function EmailAuditScreen({ onComplete }: EmailAuditScreenProps) {
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const [judgements, setJudgements] = useState<Record<string, PhraseJudgement>>({});

  const totalPhrases = emailAudit.phrases.length;
  const reviewedCount = Object.keys(judgements).length;
  const correctCount = Object.values(judgements).filter((j) => j.isCorrect).length;
  const allReviewed = reviewedCount === totalPhrases;

  const activePhrase = useMemo(
    () => emailAudit.phrases.find((p) => p.id === activePhraseId) ?? null,
    [activePhraseId],
  );

  const activeJudgement = activePhrase ? judgements[activePhrase.id] : null;

  function handlePick(phraseId: string, pickedSafe: boolean) {
    const phrase = emailAudit.phrases.find((p) => p.id === phraseId);
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
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'rgba(254, 186, 2, 0.14)',
            color: 'var(--brand-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FileText size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{emailAudit.setupHeadline}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {emailAudit.setupBody}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
          }}
        >
          Level 0 - Email Audit
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.07)',
            padding: '6px 12px',
            borderRadius: 100,
          }}
        >
          {reviewedCount} / {totalPhrases} reviewed
        </div>
      </div>

      {/* Two columns */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(360px, 2fr)',
          overflow: 'hidden',
        }}
      >
        {/* Left: email card */}
        <div
          style={{
            overflowY: 'auto',
            padding: '32px 32px 32px 40px',
          }}
        >
          <EmailCard
            activePhraseId={activePhraseId}
            judgements={judgements}
            onPickPhrase={setActivePhraseId}
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
  );
}

// ───────────────────────── Email card ─────────────────────────

function EmailCard({
  activePhraseId,
  judgements,
  onPickPhrase,
}: {
  activePhraseId: string | null;
  judgements: Record<string, PhraseJudgement>;
  onPickPhrase: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        background: 'var(--white)',
        color: 'var(--grey-700)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        maxWidth: 760,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Email header */}
      <div
        style={{
          padding: '20px 28px 16px',
          borderBottom: '1px solid var(--grey-100)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 12,
          }}
        >
          <Mail size={14} />
          Draft - not yet sent
        </div>
        <table
          style={{
            width: '100%',
            fontSize: 13,
            color: 'var(--grey-600)',
            borderCollapse: 'collapse',
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: 70, paddingBottom: 4, color: 'var(--grey-400)' }}>From</td>
              <td style={{ paddingBottom: 4 }}>
                {emailAudit.email.fromName}{' '}
                <span style={{ color: 'var(--grey-400)' }}>
                  ({emailAudit.email.fromRole})
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 4, color: 'var(--grey-400)' }}>To</td>
              <td style={{ paddingBottom: 4 }}>{emailAudit.email.toName}</td>
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
          padding: '24px 28px 30px',
          fontSize: 14,
          lineHeight: 1.65,
          color: 'var(--grey-700)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {emailAudit.email.body.map((token, i) => {
          if (typeof token === 'string') {
            return <span key={i}>{token}</span>;
          }
          const phrase = emailAudit.phrases.find((p) => p.id === token.phraseId);
          if (!phrase) return null;
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
        padding: '2px 6px',
        margin: '0 1px',
        borderRadius: 5,
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
  onPick,
  onMoveOn,
}: {
  activePhrase: EmailPhrase | null;
  activeJudgement: PhraseJudgement | null;
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
