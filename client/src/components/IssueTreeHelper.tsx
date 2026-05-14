import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, GitBranch, Lightbulb } from 'lucide-react';
import type { IssueTreeTrigger, IssueTreeIntent } from '../types';
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
 * Six steps mirror the six diagnostic columns of the Issue Tree:
 *   1. Trigger type
 *   2. Primary pricing issue
 *   3. Intent
 *   4. Root cause
 *   5. Pricing metric insight (the diagnose)
 *   6. Pricing scenario (the hook)
 *
 * At the end the learner sees their chosen path and the suggested
 * pitch angle. They can go back to revise any step.
 */

interface IssueTreeHelperProps {
  /** Partner being diagnosed. Shown in the header for context. */
  partnerName: string;
  onClose: () => void;
}

interface HelperPath {
  trigger?: IssueTreeTrigger;
  issueId?: string;
  intent?: IssueTreeIntent;
  rootCauseId?: string;
  metricInsightId?: string;
  hookId?: string;
}

export function IssueTreeHelper({ partnerName, onClose }: IssueTreeHelperProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [path, setPath] = useState<HelperPath>({});

  const stepCount = 6;

  // Filter option lists down based on the path so far.
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

  const isComplete = stepIndex >= stepCount;
  const canBack = stepIndex > 0;
  const canForward =
    (stepIndex === 0 && !!path.trigger) ||
    (stepIndex === 1 && !!path.issueId) ||
    (stepIndex === 2 && !!path.intent) ||
    (stepIndex === 3 && !!path.rootCauseId) ||
    (stepIndex === 4 && !!path.metricInsightId) ||
    (stepIndex === 5 && !!path.hookId);

  function back() {
    if (canBack) setStepIndex(stepIndex - 1);
  }
  function forward() {
    if (canForward) setStepIndex(stepIndex + 1);
  }
  function reset() {
    setPath({});
    setStepIndex(0);
  }

  return (
    <div
      // Modal backdrop
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,15,40,0.55)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        // Drawer body
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: 0,
          width: 'min(640px, 92vw)',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,15,40,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background:
              'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              }}
            >
              <GitBranch size={16} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>
                Issue Tree Helper
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                Walk through the diagnosis for {partnerName}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
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
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Step progress */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '12px 20px',
            background: 'var(--off-white)',
            borderBottom: '1px solid var(--grey-100)',
          }}
        >
          {Array.from({ length: stepCount }).map((_, i) => {
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
                      ? 'var(--success)'
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
            padding: 20,
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
                Step {stepIndex + 1} of {stepCount}
              </div>
              <h3
                style={{
                  fontSize: 18,
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
                    onClick={() => setPath({ ...path, trigger: t.id })}
                  />
                ))}

              {stepIndex === 1 &&
                filteredIssues.map((i) => (
                  <OptionCard
                    key={i.id}
                    label={i.label}
                    description={i.description}
                    selected={path.issueId === i.id}
                    onClick={() => setPath({ ...path, issueId: i.id })}
                  />
                ))}

              {stepIndex === 2 &&
                intents.map((i) => (
                  <OptionCard
                    key={i.id}
                    label={i.label}
                    description={i.description}
                    selected={path.intent === i.id}
                    onClick={() => setPath({ ...path, intent: i.id })}
                  />
                ))}

              {stepIndex === 3 &&
                filteredRootCauses.map((rc) => (
                  <OptionCard
                    key={rc.id}
                    label={rc.label}
                    description={rc.description}
                    selected={path.rootCauseId === rc.id}
                    onClick={() => setPath({ ...path, rootCauseId: rc.id })}
                  />
                ))}

              {stepIndex === 4 &&
                filteredMetrics.map((m) => (
                  <OptionCard
                    key={m.id}
                    label={m.label}
                    description={m.description}
                    selected={path.metricInsightId === m.id}
                    onClick={() =>
                      setPath({ ...path, metricInsightId: m.id })
                    }
                  />
                ))}

              {stepIndex === 5 &&
                filteredHooks.map((h) => (
                  <OptionCard
                    key={h.id}
                    label={h.label}
                    description={h.description}
                    selected={path.hookId === h.id}
                    onClick={() => setPath({ ...path, hookId: h.id })}
                  />
                ))}
            </>
          )}

          {isComplete && <PathSummary path={path} />}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--grey-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: 'var(--off-white)',
          }}
        >
          <button
            onClick={back}
            disabled={!canBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: canBack ? 'var(--brand-navy)' : 'var(--grey-300)',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: canBack ? 'pointer' : 'not-allowed',
              padding: '6px 10px',
            }}
          >
            <ChevronLeft size={14} />
            Back
          </button>
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
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: canForward ? 'pointer' : 'not-allowed',
              }}
            >
              {stepIndex === stepCount - 1 ? 'See summary' : 'Next'}
              <ChevronRight size={14} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={reset}
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--grey-200)',
                  color: 'var(--grey-600)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 16px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Start over
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'var(--brand-yellow)',
                  color: 'var(--brand-navy)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Take it to the call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
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
        padding: '12px 14px',
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
          fontSize: 13.5,
          fontWeight: 700,
          color: 'var(--brand-navy)',
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--grey-500)', lineHeight: 1.45 }}>
        {description}
      </div>
    </button>
  );
}

function PathSummary({ path }: { path: HelperPath }) {
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
          fontSize: 18,
          fontWeight: 800,
          color: 'var(--brand-navy)',
          margin: 0,
          marginBottom: 16,
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
            padding: '14px 16px',
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
              fontSize: 13,
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
        gap: 12,
        padding: '8px 0',
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
          minWidth: 110,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
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
