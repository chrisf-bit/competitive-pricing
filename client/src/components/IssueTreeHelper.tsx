import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Target, ArrowLeftRight } from 'lucide-react';
import type { IssueTreeHelperState } from '../types';
import type {
  PricingPathwayContent,
  PathwayStepContent,
  PathwaySummaryContent,
} from '../data/pricingPathwayContent';
import { PricingPathway } from './PricingPathway';
import { PathwayGlyph } from './PathwayGlyph';
import { pathwayNodes } from '../data/issueTreeReveal';

/**
 * The Pricing Pathway drawer.
 *
 * As of the 2026-09 "Game vs Pathway Update", this is a "Tell"-format
 * read-through, not a learner-to-click wizard. It walks the six
 * Pathway steps (Trigger, Primary pricing gaps, Intent and root
 * causes, Evidence, Plan, Conversation angle) and simply tells the
 * learner the answer (Royal Crest R1/R11 - partner-specific, ends with
 * a summary) or general guidance (every other partner-round - no
 * summary). Content comes from `data/pricingPathwayContent.ts`.
 *
 * Renders as a right-side floating drawer (not a modal) so the learner
 * can still read the partner data while going through the steps. The
 * step index lives in `GameState.issueTreeHelperStates` keyed by
 * partnerId-round, so closing and reopening resumes where they left
 * off. (The legacy `path` object on that state is unused now that
 * there are no picks - kept on the type for persistence compatibility.)
 */

interface IssueTreeHelperProps {
  /** Partner being diagnosed. Shown in the header for context. */
  partnerName: string;
  /** Resolved "Tell" content for this partner-round. */
  content: PricingPathwayContent;
  /** Current progress (only `stepIndex` is used) - controlled by parent. */
  helperState: IssueTreeHelperState;
  /** Called on every step navigation so the parent can persist. */
  onUpdate: (next: IssueTreeHelperState) => void;
  onClose: () => void;
  /** Which edge the drawer docks to. */
  side: 'left' | 'right';
  /** Flip the drawer to the other edge. */
  onToggleDock: () => void;
}

/**
 * Map each of the six read-through steps onto the seven-node Pricing
 * Pathway road (Trigger, Primary Check, Diagnose, Evidence, Plan, Hook,
 * Pitch). The six steps land on nodes 0-5; the Pitch (node 6) is
 * delivered live on the call, so it never fills here.
 */
const STEP_TO_NODE = [0, 1, 2, 3, 4, 5];

export function IssueTreeHelper({
  partnerName,
  content,
  helperState,
  onUpdate,
  onClose,
  side,
  onToggleDock,
}: IssueTreeHelperProps) {
  const { steps, summary } = content;
  // Total panels = the six steps plus (for the detailed variant) a
  // final summary panel.
  const panelCount = steps.length + (summary ? 1 : 0);
  const stepIndex = Math.min(Math.max(helperState.stepIndex, 0), panelCount - 1);
  const isSummary = !!summary && stepIndex === steps.length;
  const step: PathwayStepContent | undefined = isSummary
    ? undefined
    : steps[stepIndex];

  const isLeft = side === 'left';
  const offX = isLeft ? -28 : 28;
  const shadowX = isLeft ? '12px' : '-12px';

  const activeNode = isSummary ? 5 : (STEP_TO_NODE[stepIndex] ?? 0);
  const canBack = stepIndex > 0;
  const isLastPanel = stepIndex >= panelCount - 1;
  // On the detailed variant, the last *step* leads into the summary.
  const nextLeadsToSummary = !!summary && stepIndex === steps.length - 1;

  function back() {
    if (canBack) onUpdate({ path: helperState.path, stepIndex: stepIndex - 1 });
  }
  function forward() {
    if (!isLastPanel)
      onUpdate({ path: helperState.path, stepIndex: stepIndex + 1 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: offX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: offX }}
      transition={{ duration: 0.24, ease: [0.32, 0.72, 0.32, 1] }}
      style={{
        position: 'fixed',
        top: 80,
        left: isLeft ? 16 : undefined,
        right: isLeft ? undefined : 16,
        width: 'min(520px, 94vw)',
        // The "Tell" copy is much longer than the old option cards, so
        // the drawer is capped to the viewport and the step body scrolls
        // internally rather than the whole panel growing off-screen.
        maxHeight: 'calc(100vh - 96px)',
        background: 'var(--white)',
        boxShadow: `${shadowX} 16px 40px rgba(0,15,40,0.22)`,
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
          padding: '12px 16px',
          background:
            'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          flexShrink: 0,
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
            <PathwayGlyph size={17} color="var(--brand-yellow)" strokeWidth={2.4} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              The Pricing Pathway
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
              Working out the angle for {partnerName}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <button
            onClick={onToggleDock}
            title={`Move to the ${isLeft ? 'right' : 'left'} side`}
            aria-label={`Move The Pricing Pathway to the ${isLeft ? 'right' : 'left'} side`}
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
            <ArrowLeftRight size={15} />
          </button>
          <button
            onClick={onClose}
            title="Close (you can reopen any time)"
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
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Mini Pricing Pathway - the same winding road taught in
          clearance, tracking where the learner is on the read-through. */}
      <div
        style={{
          background: 'var(--brand-navy-dark)',
          padding: '6px 14px',
          borderBottom: '1px solid var(--grey-100)',
          flexShrink: 0,
        }}
      >
        <div style={{ height: 52 }}>
          <PricingPathway
            nodes={pathwayNodes}
            activeIndex={activeNode}
            fillIndex={activeNode}
            variant="mini"
          />
        </div>
      </div>

      {/* Step body - scrolls internally; the panel stays within the
          viewport height. */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 18px',
        }}
      >
        {step && <StepBody step={step} totalSteps={steps.length} />}
        {isSummary && summary && <PathSummary summary={summary} />}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--grey-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          background: 'var(--off-white)',
          flexShrink: 0,
        }}
      >
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
        {!isLastPanel ? (
          <button
            onClick={forward}
            style={{
              background: 'var(--brand-yellow)',
              color: 'var(--brand-navy)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 16px',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
            }}
          >
            {nextLeadsToSummary ? 'See summary' : 'Next'}
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

const PHASE_LABEL: Record<PathwayStepContent['phase'], string> = {
  Prioritise: 'Phase 1 - Prioritise',
  Diagnose: 'Phase 2 - Diagnose',
  Act: 'Phase 3 - Act',
};

function StepBody({
  step,
  totalSteps,
}: {
  step: PathwayStepContent;
  totalSteps: number;
}) {
  return (
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
        Step {step.stepNumber} of {totalSteps} · {PHASE_LABEL[step.phase]}
      </div>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: 'var(--brand-navy)',
          margin: 0,
          marginBottom: 10,
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h3>

      {step.intro && (
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--grey-600)',
            lineHeight: 1.55,
            margin: '0 0 10px',
          }}
        >
          {step.intro}
        </p>
      )}

      <p
        style={{
          fontSize: 14,
          color: 'var(--grey-800)',
          lineHeight: 1.6,
          margin: 0,
          fontWeight: 600,
        }}
      >
        {step.body}
      </p>

      {step.note && (
        <div
          style={{
            marginTop: 12,
            padding: '10px 12px',
            background: 'var(--off-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--grey-100)',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--grey-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Note
          </span>
          <p
            style={{
              fontSize: 12.5,
              color: 'var(--grey-600)',
              lineHeight: 1.55,
              margin: '4px 0 0',
            }}
          >
            {step.note}
          </p>
        </div>
      )}
    </>
  );
}

function PathSummary({ summary }: { summary: PathwaySummaryContent }) {
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
          fontSize: 17,
          fontWeight: 800,
          color: 'var(--brand-navy)',
          margin: 0,
          marginBottom: 14,
          lineHeight: 1.3,
        }}
      >
        Here's the path you walked through
      </h3>

      {summary.rows.map((row) => (
        <PathRow key={row.label} label={row.label} value={row.value} />
      ))}

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
          <Target size={14} style={{ color: 'var(--brand-yellow)' }} />
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
            fontSize: 13.5,
            color: 'var(--grey-700)',
            lineHeight: 1.55,
          }}
        >
          {summary.hook}
        </div>
      </div>
    </>
  );
}

function PathRow({ label, value }: { label: string; value: string }) {
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
          minWidth: 120,
          flexShrink: 0,
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
          lineHeight: 1.5,
        }}
      >
        {value}
      </span>
    </div>
  );
}
