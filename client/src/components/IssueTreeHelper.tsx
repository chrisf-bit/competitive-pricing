import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, GitBranch, Lightbulb, RotateCcw } from 'lucide-react';
import type { IssueTreeHelperState } from '../types';
import {
  triggers,
  issues,
  intents,
  rootCauses,
  metricInsights,
  hooks,
  getTrigger,
  getIssue,
  getIntent,
  getRootCause,
  getMetricInsight,
  getHook,
} from '../data/issueTree';

/**
 * Issue Tree Helper - a guided wizard that walks the learner through
 * the Pricing Issue Tree to land on a hook. Teach-mode in v1: no
 * scoring, no "you got it wrong." Just helps the learner think
 * before the call.
 *
 * Renders as a right-side drawer (not a modal) so the learner can
 * still see the partner data while picking their way through the
 * tree. The drawer state (open/closed) is owned by PartnerDetail;
 * picks (`helperState.path` + `helperState.stepIndex`) live in
 * `GameState.issueTreeHelperStates` keyed by partnerId-round, so
 * closing and reopening the drawer resumes the learner where they
 * left off rather than starting over.
 *
 * Six steps mirror the six diagnostic columns of the Issue Tree:
 *   1. Trigger type
 *   2. Primary pricing issue
 *   3. Intent
 *   4. Root cause
 *   5. Pricing metric insight (the diagnose)
 *   6. Pricing scenario (the hook)
 */

interface IssueTreeHelperProps {
  /** Partner being diagnosed. Shown in the header for context. */
  partnerName: string;
  /** Current helper progress (path + step) - controlled by the parent. */
  helperState: IssueTreeHelperState;
  /** Called on every pick / step navigation so the parent can persist. */
  onUpdate: (next: IssueTreeHelperState) => void;
  onClose: () => void;
}

const STEP_COUNT = 6;

export function IssueTreeHelper({
  partnerName,
  helperState,
  onUpdate,
  onClose,
}: IssueTreeHelperProps) {
  const { path, stepIndex } = helperState;

  const filteredIssues = issues.filter((i) =>
    path.trigger ? i.validTriggers.includes(path.trigger) : true,
  );
  const filteredRootCauses = rootCauses.filter(
    (rc) =>
      (path.issueId ? rc.validIssues.includes(path.issueId) : true) &&
      (path.intent ? rc.validIntents.includes(path.intent) : true),
  );
  const filteredMetrics = metricInsights.filter((m) =>
    path.rootCauseId ? m.validRootCauses.includes(path.rootCauseId) : true,
  );
  const filteredHooks = hooks.filter((h) =>
    path.metricInsightId ? h.validMetrics.includes(path.metricInsightId) : true,
  );

  const isComplete = stepIndex >= STEP_COUNT;
  const canBack = stepIndex > 0;
  const canForward =
    (stepIndex === 0 && !!path.trigger) ||
    (stepIndex === 1 && !!path.issueId) ||
    (stepIndex === 2 && !!path.intent) ||
    (stepIndex === 3 && !!path.rootCauseId) ||
    (stepIndex === 4 && !!path.metricInsightId) ||
    (stepIndex === 5 && !!path.hookId);

  function back() {
    if (canBack) onUpdate({ path, stepIndex: stepIndex - 1 });
  }
  function forward() {
    if (canForward) onUpdate({ path, stepIndex: stepIndex + 1 });
  }
  function reset() {
    onUpdate({ path: {}, stepIndex: 0 });
  }
  function setPathField<K extends keyof IssueTreeHelperState['path']>(
    field: K,
    value: IssueTreeHelperState['path'][K],
  ) {
    onUpdate({
      path: { ...path, [field]: value },
      stepIndex,
    });
  }

  return (
    <motion.div
      // Right-side floating drawer. Sized like a chatbot window
      // (not full-height) so it leaves most of the Partner Detail
      // content visible while the learner walks through the
      // diagnosis. Anchored vertically centred on the right edge.
      // Framer-motion handles entrance + exit; combining x slide
      // with the y centring requires both transforms to live in the
      // same animation (a plain CSS keyframe would clobber the y).
      initial={{ opacity: 0, x: 28, y: '-50%' }}
      animate={{ opacity: 1, x: 0, y: '-50%' }}
      exit={{ opacity: 0, x: 28, y: '-50%' }}
      transition={{ duration: 0.24, ease: [0.32, 0.72, 0.32, 1] }}
      style={{
        position: 'fixed',
        top: '50%',
        right: 16,
        width: 'min(400px, 92vw)',
        height: 'min(640px, calc(100vh - 64px))',
        background: 'var(--white)',
        boxShadow: '-12px 16px 40px rgba(0,15,40,0.22)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-lg)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 18px',
          background:
            'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(254,186,2,0.18)',
              color: 'var(--brand-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <GitBranch size={16} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              Issue Tree Helper
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Diagnosis for {partnerName}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          title="Close (your picks are saved)"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: 8,
            padding: 8,
            color: 'var(--white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Step progress bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '10px 18px',
          background: 'var(--off-white)',
          borderBottom: '1px solid var(--grey-100)',
        }}
      >
        {Array.from({ length: STEP_COUNT }).map((_, i) => {
          const isActive = i === stepIndex && !isComplete;
          const isDone = i < stepIndex || isComplete;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: isActive
                  ? 'var(--brand-navy)'
                  : isDone
                    ? 'var(--brand-blue)'
                    : 'var(--grey-200)',
                transition: 'background 0.2s ease',
              }}
            />
          );
        })}
      </div>

      {/* Step body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 18,
        }}
      >
        {!isComplete && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--brand-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 4,
              }}
            >
              Step {stepIndex + 1} of {STEP_COUNT}
            </div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--brand-navy)',
                margin: 0,
                marginBottom: 14,
                lineHeight: 1.3,
              }}
            >
              {stepIndex === 0 && 'What kind of trigger surfaced this issue?'}
              {stepIndex === 1 && 'What pricing issue does the data point to?'}
              {stepIndex === 2 && 'Does this look intentional or unintentional?'}
              {stepIndex === 3 && 'Which root cause best fits the pattern?'}
              {stepIndex === 4 && 'What does the metric pattern look like?'}
              {stepIndex === 5 && 'Which hook angle fits this diagnosis?'}
            </h3>

            {stepIndex === 0 &&
              triggers.map((t) => (
                <OptionCard
                  key={t.id}
                  label={t.label}
                  description={t.description}
                  selected={path.trigger === t.id}
                  onClick={() => setPathField('trigger', t.id)}
                />
              ))}

            {stepIndex === 1 &&
              filteredIssues.map((i) => (
                <OptionCard
                  key={i.id}
                  label={i.label}
                  description={i.description}
                  selected={path.issueId === i.id}
                  onClick={() => setPathField('issueId', i.id)}
                />
              ))}

            {stepIndex === 2 &&
              intents.map((i) => (
                <OptionCard
                  key={i.id}
                  label={i.label}
                  description={i.description}
                  selected={path.intent === i.id}
                  onClick={() => setPathField('intent', i.id)}
                />
              ))}

            {stepIndex === 3 &&
              filteredRootCauses.map((rc) => (
                <OptionCard
                  key={rc.id}
                  label={rc.label}
                  description={rc.description}
                  selected={path.rootCauseId === rc.id}
                  onClick={() => setPathField('rootCauseId', rc.id)}
                />
              ))}

            {stepIndex === 4 &&
              filteredMetrics.map((m) => (
                <OptionCard
                  key={m.id}
                  label={m.label}
                  description={m.description}
                  selected={path.metricInsightId === m.id}
                  onClick={() => setPathField('metricInsightId', m.id)}
                />
              ))}

            {stepIndex === 5 &&
              filteredHooks.map((h) => (
                <OptionCard
                  key={h.id}
                  label={h.label}
                  description={h.description}
                  selected={path.hookId === h.id}
                  onClick={() => setPathField('hookId', h.id)}
                />
              ))}
          </>
        )}

        {isComplete && <PathSummary path={path} />}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--grey-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          background: 'var(--off-white)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={back}
            disabled={!canBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: canBack ? 'var(--brand-navy)' : 'var(--grey-300)',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: canBack ? 'pointer' : 'not-allowed',
              padding: '6px 8px',
            }}
          >
            <ChevronLeft size={13} />
            Back
          </button>
          {(Object.keys(path).length > 0 || isComplete) && (
            <button
              onClick={reset}
              title="Start the diagnosis over"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--grey-500)',
                fontSize: 12.5,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                padding: '6px 8px',
              }}
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
        {!isComplete ? (
          <button
            onClick={forward}
            disabled={!canForward}
            style={{
              background: canForward
                ? 'var(--brand-yellow)'
                : 'var(--grey-200)',
              color: canForward ? 'var(--brand-navy)' : 'var(--grey-400)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 16px',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: canForward ? 'pointer' : 'not-allowed',
            }}
          >
            {stepIndex === STEP_COUNT - 1 ? 'See summary' : 'Next'}
            <ChevronRight size={13} />
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{
              background: 'var(--brand-yellow)',
              color: 'var(--brand-navy)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 16px',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Take it to the call
          </button>
        )}
      </div>
    </motion.div>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '11px 13px',
        background: selected ? 'rgba(254,186,2,0.10)' : 'var(--white)',
        border: selected
          ? '2px solid var(--brand-yellow)'
          : '2px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        marginBottom: 8,
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.borderColor = 'var(--brand-blue)';
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.borderColor = 'var(--grey-100)';
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--brand-navy)',
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--grey-500)', lineHeight: 1.4 }}>
        {description}
      </div>
    </button>
  );
}

function PathSummary({ path }: { path: IssueTreeHelperState['path'] }) {
  const trigger = path.trigger ? getTrigger(path.trigger) : undefined;
  const issue = path.issueId ? getIssue(path.issueId) : undefined;
  const intent = path.intent ? getIntent(path.intent) : undefined;
  const rootCause = path.rootCauseId ? getRootCause(path.rootCauseId) : undefined;
  const metric = path.metricInsightId ? getMetricInsight(path.metricInsightId) : undefined;
  const hook = path.hookId ? getHook(path.hookId) : undefined;

  return (
    <>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: 'var(--brand-yellow)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 4,
        }}
      >
        Your diagnosis
      </div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: 'var(--brand-navy)',
          margin: 0,
          marginBottom: 14,
          lineHeight: 1.3,
        }}
      >
        Here's the path you walked through
      </h3>

      <PathRow label="Trigger" value={trigger?.label} />
      <PathRow label="Pricing issue" value={issue?.label} />
      <PathRow label="Intent" value={intent?.label} />
      <PathRow label="Root cause" value={rootCause?.label} />
      <PathRow label="Metric pattern" value={metric?.label} />

      {hook && (
        <div
          style={{
            marginTop: 14,
            padding: '12px 14px',
            background:
              'linear-gradient(135deg, rgba(254,186,2,0.08) 0%, rgba(254,186,2,0.16) 100%)',
            border: '2px solid var(--brand-yellow)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 6,
            }}
          >
            <Lightbulb size={14} style={{ color: 'var(--brand-yellow)' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--brand-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
              }}
            >
              Suggested hook
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: 'var(--brand-navy)',
              marginBottom: 4,
            }}
          >
            {hook.label}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: 'var(--grey-600)',
              lineHeight: 1.5,
            }}
          >
            {hook.description}
          </div>
        </div>
      )}
    </>
  );
}

function PathRow({ label, value }: { label: string; value?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
        padding: '7px 0',
        borderBottom: '1px solid var(--grey-100)',
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--grey-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          minWidth: 100,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 12.5,
          color: 'var(--grey-700)',
          fontWeight: 600,
          textAlign: 'right',
        }}
      >
        {value ?? '-'}
      </span>
    </div>
  );
}
