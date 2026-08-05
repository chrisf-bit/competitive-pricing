import { useState } from 'react';
import { ChevronRight, MousePointerClick } from 'lucide-react';
import { PathwayInfographic } from '../components/PathwayInfographic';
import { pathwayNodes } from '../data/issueTreeReveal';

interface IssueTreeRevealScreenProps {
  onComplete: () => void;
}

const TOTAL = pathwayNodes.length;

/**
 * The Pricing Pathway reveal (clearance). The SME's winding-road
 * infographic as a click-to-reveal: the learner selects each of the
 * seven markers to surface its question, sub-label and goal. Continue
 * unlocks once all seven have been opened. Framing ("a guide, not a
 * rigid checklist") lives in the ClearanceShell title/subtitle above.
 */
export function IssueTreeRevealScreen({ onComplete }: IssueTreeRevealScreenProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  function handleSelect(step: number) {
    setActiveStep(step);
    setVisited((prev) => new Set([...prev, step]));
  }

  const allOpened = visited.size >= TOTAL;

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
      {/* Prompt - directly under the intro paragraph */}
      <div
        style={{
          flexShrink: 0,
          padding: '6px 20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <MousePointerClick
          size={17}
          style={{ color: allOpened ? 'var(--success)' : 'var(--brand-yellow)', flexShrink: 0 }}
        />
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>
          {allOpened
            ? "All seven steps opened - you're set. Hit Continue."
            : 'Select each marker on the road to reveal its step'}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: allOpened ? 'var(--success)' : 'var(--brand-yellow)',
          }}
        >
          {visited.size}/{TOTAL}
        </span>
      </div>

      {/* Infographic - left-aligned and flush to the screen's left edge
          (no left padding) so the road's start bleeds off the left edge
          and reads as part of the UI. maxWidth keeps the height in
          bounds so the reveal doesn't need to scroll. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '8px 20px 0 0',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1120 }}>
          <PathwayInfographic
            activeStep={activeStep}
            visited={visited}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* Continue */}
      <div
        style={{
          padding: '14px 28px 20px',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.22)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={onComplete}
          disabled={!allOpened}
          style={{
            background: allOpened ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
            color: allOpened ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
            padding: '12px 26px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 15,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: allOpened ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
            cursor: allOpened ? 'pointer' : 'not-allowed',
            boxShadow: allOpened ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
            transition: 'background 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (allOpened) e.currentTarget.style.background = 'var(--brand-yellow-light)';
          }}
          onMouseLeave={(e) => {
            if (allOpened) e.currentTarget.style.background = 'var(--brand-yellow)';
          }}
        >
          Continue
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
