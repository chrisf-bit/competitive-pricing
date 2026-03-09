import { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  Eye,
  Tag,
  Users,
  Zap,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  Activity,
  Target,
  Clock,
  BookOpen,
  Globe,
} from 'lucide-react';

interface TutorialOverlayProps {
  onClose: () => void;
  onStartGame: () => void;
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

const STEPS: TutorialStep[] = [
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
    title: 'Round Progress',
    description:
      'The simulation runs over 3 rounds (Weeks 1, 3, and 6). Completed rounds turn green, the current round is highlighted yellow.',
    icon: <Clock size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
  },
  {
    target: 'actions-counter',
    title: 'Action Budget',
    description:
      'You get 3 actions per round. Each conversation uses 1 action. You can only engage 3 of your 6 partners — the rest will be neglected.',
    icon: <Zap size={18} style={{ color: 'var(--brand-yellow)' }} />,
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
          Neglected partners lose trust and their metrics drift downward each round.
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
      'Each card represents an accommodation partner in your portfolio. Click a card to view their full profile and start a conversation.',
    icon: <Users size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'right',
    detail: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { color: 'var(--danger)', label: 'Poor RPD' },
            { color: '#e67e22', label: 'Below market' },
            { color: 'var(--success)', label: 'Engaged' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 10,
                color: 'rgba(255,255,255,0.55)',
                padding: '3px 8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          Border colours indicate urgency level.
        </span>
      </div>
    ),
  },
  {
    target: 'status-badges',
    title: 'Status Badges',
    description:
      'Quick indicators showing RPD health and relationship status at a glance. These help you prioritise who needs attention.',
    icon: <Activity size={18} style={{ color: 'var(--success)' }} />,
    position: 'bottom',
    detail: (
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {[
          { label: 'Competitive', color: 'var(--success)' },
          { label: 'Below Market', color: '#e67e22' },
          { label: 'Poor', color: 'var(--danger)' },
          { label: 'Warm', color: 'var(--success)' },
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
      'The headline metric. RPD (Rank-Price-Distance) measures how competitively priced this partner is vs. comparable properties. Higher is better.',
    icon: <BarChart3 size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'bottom',
    detail: (
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {[
          { range: '70+', label: 'Competitive', color: 'var(--success)' },
          { range: '55-69', label: 'Slightly below', color: 'var(--warning)' },
          { range: '40-54', label: 'Below market', color: '#e67e22' },
          { range: '<40', label: 'Poor', color: 'var(--danger)' },
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
    ),
  },
  {
    target: 'mini-metrics',
    title: 'Supporting Metrics',
    description:
      'VIS (Visibility) = search result appearances. CVR (Conversion) = booking rate. REV (Revenue) = income index. All are driven by pricing competitiveness.',
    icon: <Eye size={18} style={{ color: 'var(--brand-blue-light)' }} />,
    position: 'left',
  },
  {
    target: 'discount-row',
    title: 'Discount Products',
    description:
      'Shows how many of the 5 available discount products are active. Misconfigured discounts need fixing. Activating the right discounts improves RPD.',
    icon: <Tag size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'top',
    detail: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'rgba(204,0,0,0.08)',
          border: '1px solid rgba(204,0,0,0.2)',
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <AlertTriangle size={14} style={{ color: 'var(--danger)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          Watch for the red alert icon — it means a discount is misconfigured and needs attention.
        </span>
      </div>
    ),
  },
  {
    target: 'action-bar',
    title: 'Action Bar',
    description:
      'Shows remaining actions and lets you advance to the next round once all actions are used. The advance button activates when you\'ve engaged 3 partners.',
    icon: <Target size={18} style={{ color: 'var(--brand-yellow)' }} />,
    position: 'top',
  },
];

export function TutorialOverlay({ onClose, onStartGame }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const measureTarget = useCallback(() => {
    const el = document.querySelector(`[data-tutorial="${current.target}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      setTargetRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    } else {
      setTargetRect(null);
    }
  }, [current.target]);

  useEffect(() => {
    // Small delay to let portfolio render on first mount
    const timer = setTimeout(measureTarget, 80);
    window.addEventListener('resize', measureTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureTarget);
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
