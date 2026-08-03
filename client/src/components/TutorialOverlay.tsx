import { useState, useLayoutEffect, useCallback } from 'react';
import {
  BarChart3,
  Eye,
  Tag,
  Users,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  Activity,
  Target,
  Clock,
  BookOpen,
  Globe,
  Route,
  UserCircle,
  Layers,
  Gauge,
  PlayCircle,
} from 'lucide-react';

interface TutorialOverlayProps {
  onClose: () => void;
  onStartGame: () => void;
  /** Which step set to render. 'portfolio' walks the Portfolio
   *  screen; 'partner-detail' walks the Partner Detail screen.
   *  Defaults to 'portfolio'. */
  mode?: 'portfolio' | 'partner-detail';
}

interface TutorialStep {
  target: string; // data-tutorial selector value
  title: string;
  description: string;
  icon: React.ReactNode;
  detail?: React.ReactNode;
  position: 'right' | 'left' | 'bottom' | 'top';
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function IconBox({
  children,
  bg,
  size = 36,
}: {
  children: React.ReactNode;
  bg: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 3,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

const PORTFOLIO_STEPS: TutorialStep[] = [
  {
    target: 'guide-panel',
    title: 'Simulation Guide',
    description:
      'This panel updates as you move through the simulation. It shows your current objective, the steps you need to take, and contextual tips.',
    icon: <BookOpen size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'right',
  },
  {
    target: 'round-tracker',
    title: 'Rounds and actions',
    description:
      "Each round you pick one partner to engage - the rest wait. Neglected partners lose trust and their metrics drift, so pick the one who needs you most.",
    icon: <Clock size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
    detail: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'rgba(254,186,2,0.08)',
          border: '1px solid rgba(254,186,2,0.2)',
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <AlertTriangle size={14} style={{ color: 'var(--brand-yellow)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          Completed rounds turn green; the current round is highlighted yellow.
        </span>
      </div>
    ),
  },
  {
    target: 'market-bar',
    title: 'Market Update',
    description:
      'Market conditions change each round. Demand trends and seasonal factors affect all partners. Check this before deciding who to prioritise.',
    icon: <Globe size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'bottom',
  },
  {
    target: 'partner-card',
    title: 'Partner Cards',
    description:
      "Each card shows the property name, headline KPIs, and the relationship status. Read the numbers - there's no severity colour-coding on the metrics, so you have to spot the priority yourself. Click a card to open the partner.",
    icon: <Users size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'right',
  },
  {
    target: 'status-badges',
    title: 'Relationship Status',
    description:
      'The pill on each partner card shows where you stand with that partner: Warm, Neutral, Cool, or Strained. Strained or Cool partners need a softer opening before any hard conversation.',
    icon: <Activity size={18} style={{ color: 'var(--success)' }} />,
    position: 'bottom',
    detail: (
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {[
          { label: 'Warm', color: 'var(--success)' },
          { label: 'Neutral', color: 'rgba(255,255,255,0.55)' },
          { label: 'Cool', color: 'var(--warning)' },
          { label: 'Strained', color: 'var(--danger)' },
        ].map((badge) => (
          <span
            key={badge.label}
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 100,
              background: `${badge.color}15`,
              color: badge.color,
              border: `1px solid ${badge.color}40`,
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    target: 'rpd-number',
    title: 'Experienced RPD',
    description:
      "The headline metric. eRPD measures how competitively priced a partner is on Booking.com vs Brand.com or a Key OTA - lower is better. The seven price-bucket strip on Partner Detail anchors the number visually.",
    icon: <BarChart3 size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
    detail: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { range: 'B1', label: '≤ -3% · most competitive', color: 'var(--success)' },
            { range: 'B4', label: '3% to 6% · drifting', color: 'var(--warning)' },
            { range: 'B7', label: '> 12% · least competitive', color: 'var(--danger)' },
          ].map((tier) => (
            <div
              key={tier.range}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 10,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 2, background: tier.color }} />
              <span style={{ fontWeight: 700, color: tier.color }}>{tier.range}</span>
              <span>{tier.label}</span>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          Seven buckets in total - lower eRPD = more competitive.
        </span>
      </div>
    ),
  },
  {
    target: 'mini-metrics',
    title: 'Supporting KPIs',
    description:
      'RPD Public is the gap on what non-logged-in travellers see; RPD Loyal covers Genius members. "Lose Price" is the share of public traffic where the partner is losing on price. "Scenarios" is the count of active pricing scenarios on the account.',
    icon: <Eye size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'left',
  },
  {
    target: 'discount-row',
    title: 'Discount Products',
    description:
      'Each card sums up how many of the partner\'s pricing products are currently active. A low count against a high denominator means unused levers. Open the partner to see the full three-column view - Public Pricing, Genius Pricing, and Foundations & Payments - and judge which specific tools are on or off.',
    icon: <Tag size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
  },
  {
    target: 'issue-tree-helper',
    title: 'The Pricing Pathway',
    description:
      "When you open a partner you'll see a yellow winding-road tab pinned to the right edge. Tap it to open The Pricing Pathway, which walks the route with you - trigger, primary check, diagnose, evidence, plan, hook - so you arrive at the call with a clear plan. Your picks save per partner, so you can close it to peek at the metrics and pick up where you left off.",
    icon: <Route size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'top',
  },
];

// ─── Partner Detail walkthrough ───
// Targets the data-tutorial markers added to PartnerDetailScreen.tsx
// in R2. Surfaced via the Header Help icon when the learner is on
// the Partner Detail screen (App.tsx picks the right step set based
// on state.screen).

const PARTNER_DETAIL_STEPS: TutorialStep[] = [
  {
    target: 'partner-detail-header',
    title: 'Partner header',
    description:
      "The property name is the headline; the contact, location, and room count sit on the subline. The communication-style chip and the Relationship Status pill on the right tell you the partner's style and how warm the relationship is.",
    icon: <UserCircle size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'bottom',
  },
  {
    target: 'partner-detail-tabs',
    title: 'Metrics tabs',
    description:
      "Driving Metrics shows the headline KPIs, the eRPD Price Bucket strip, and the secondary metric tiles. On Platform Competitiveness holds the on-platform competitiveness metrics and unlocks in the later rounds.",
    icon: <Layers size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
  },
  {
    target: 'partner-detail-bucket-strip',
    title: 'eRPD Price Bucket',
    description:
      "Seven segments from B1 (most competitive, eRPD ≤ -3%) to B7 (least competitive, eRPD > 12%). The bucket the partner sits in pins their eRPD visually next to the threshold band.",
    icon: <Gauge size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
    detail: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'rgba(254,186,2,0.08)',
          border: '1px solid rgba(254,186,2,0.2)',
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <AlertTriangle size={14} style={{ color: 'var(--brand-yellow)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          Hover any segment for its threshold definition.
        </span>
      </div>
    ),
  },
  {
    target: 'partner-detail-secondary',
    title: 'Secondary metrics',
    description:
      "Six tiles showing recency and pace context: Last 30D ABRN vs last year; Room Nights, ADR, Page Views, Conversion vs peer; Next 3M Room Nights forward pace. Hover any (i) icon for the metric definition.",
    icon: <BarChart3 size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'top',
  },
  {
    target: 'partner-detail-discounts',
    title: 'Discount Products',
    description:
      'Eleven products in three columns: Public Pricing, Genius Pricing, Foundations & Payments. Each row reads active or inactive. The shape of what is on vs off tells you which levers the partner is using.',
    icon: <Tag size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'top',
  },
  {
    target: 'partner-detail-profile',
    title: 'Profile + commercial context',
    description:
      "Partner description, commercial goal, free-text notes, and below them Last Pricing Contact and Pricing Coverage (QTD). The Pricing Coverage % tells you how much you have tracked pricing competitiveness steering actions holistically, including topics, products, and scenarios for that partner so far.",
    icon: <BookOpen size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'left',
  },
  {
    target: 'partner-detail-tree-tab',
    title: 'The Pricing Pathway',
    description:
      "Yellow winding-road tab pinned to the right edge - tap to open The Pricing Pathway drawer. Walks you along the route - Trigger, Primary Check, Diagnose, Evidence, Plan, and Hook - so you arrive at the call with a clear diagnosis. Picks save per partner, so you can close it any time.",
    icon: <Route size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'left',
  },
  {
    target: 'partner-detail-action',
    title: 'Begin Conversation',
    description:
      "The action card on the bottom right. Click Begin Conversation when you're ready to engage the partner. In Round 1 you'll need to open The Pricing Pathway at least once first - that gate teaches the diagnostic habit.",
    icon: <PlayCircle size={18} style={{ color: 'var(--success)' }} />,
    position: 'left',
  },
];

export function TutorialOverlay({ onClose, onStartGame, mode = 'portfolio' }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  const STEPS = mode === 'partner-detail' ? PARTNER_DETAIL_STEPS : PORTFOLIO_STEPS;
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const measureTarget = useCallback(() => {
    const el = document.querySelector(`[data-tutorial="${current.target}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setTargetRect({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
        return true;
      }
    }
    return false;
  }, [current.target]);

  useLayoutEffect(() => {
    // Try measuring immediately after layout; if the target isn't laid
    // out yet (mid-animation, just-mounted card, etc.) retry on rAF
    // for up to ~30 frames before giving up. Without the retry the
    // tooltip lands in screen-centre and never recovers.
    let raf: number | null = null;
    let frames = 0;
    const tick = () => {
      if (measureTarget()) return;
      if (frames++ < 30) {
        raf = requestAnimationFrame(tick);
      } else {
        setTargetRect(null);
      }
    };
    tick();
    window.addEventListener('resize', tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener('resize', tick);
    };
  }, [measureTarget]);

  // Compute tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const PAD = 16;
    const TOOLTIP_W = 360;

    switch (current.position) {
      case 'right':
        return {
          position: 'fixed',
          top: Math.max(PAD, Math.min(targetRect.top, window.innerHeight - 400)),
          left: targetRect.left + targetRect.width + PAD,
          width: TOOLTIP_W,
        };
      case 'left':
        return {
          position: 'fixed',
          top: Math.max(PAD, targetRect.top),
          left: Math.max(PAD, targetRect.left - TOOLTIP_W - PAD),
          width: TOOLTIP_W,
        };
      case 'bottom':
        return {
          position: 'fixed',
          top: targetRect.top + targetRect.height + PAD,
          left: Math.max(PAD, Math.min(targetRect.left, window.innerWidth - TOOLTIP_W - PAD)),
          width: TOOLTIP_W,
        };
      case 'top':
        return {
          position: 'fixed',
          top: Math.max(PAD, targetRect.top - PAD - 200),
          left: Math.max(PAD, Math.min(targetRect.left, window.innerWidth - TOOLTIP_W - PAD)),
          width: TOOLTIP_W,
        };
      default:
        return { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
      }}
    >
      {/* Spotlight overlay using box-shadow on the highlight window */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            borderRadius: 12,
            boxShadow: '0 0 0 9999px rgba(0, 15, 40, 0.82)',
            zIndex: 1001,
            pointerEvents: 'none',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '2px solid var(--brand-yellow)',
          }}
        />
      )}

      {/* Click barrier */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1002,
        }}
      />

      {/* Tooltip card */}
      <div
        key={step}
        style={{
          ...getTooltipStyle(),
          zIndex: 1003,
          background: 'linear-gradient(180deg, var(--brand-navy-dark) 0%, #001030 100%)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          padding: '20px 22px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.3s ease',
          color: 'var(--white)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <IconBox bg="rgba(254,186,2,0.15)" size={36}>
              {current.icon}
            </IconBox>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{current.title}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                {step + 1} of {STEPS.length}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: 5,
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
          {current.description}
        </p>

        {/* Optional detail content */}
        {current.detail}

        {/* Step dots */}
        <div style={{ display: 'flex', gap: 3, margin: '16px 0 14px', justifyContent: 'center' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i < step
                    ? 'var(--success)'
                    : i === step
                      ? 'var(--brand-yellow)'
                      : 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: step === 0 ? 'transparent' : 'rgba(255,255,255,0.06)',
              border: step === 0 ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 7,
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 700,
              color: step === 0 ? 'transparent' : 'rgba(255,255,255,0.6)',
              cursor: step === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <ChevronLeft size={13} />
            Back
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: '6px 10px',
            }}
          >
            Skip
          </button>

          <button
            onClick={isLast ? onStartGame : () => setStep((s) => s + 1)}
            style={{
              background: isLast
                ? 'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)'
                : 'rgba(255,255,255,0.08)',
              border: isLast ? 'none' : '1px solid rgba(255,255,255,0.15)',
              borderRadius: 7,
              padding: isLast ? '8px 22px' : '7px 16px',
              fontSize: 12,
              fontWeight: 800,
              color: isLast ? 'var(--brand-navy-dark)' : 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: isLast ? '0 3px 14px rgba(254,186,2,0.35)' : 'none',
            }}
          >
            {isLast ? (
              <>
                Start Playing
                <Target size={13} />
              </>
            ) : (
              <>
                Next
                <ChevronRight size={13} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
