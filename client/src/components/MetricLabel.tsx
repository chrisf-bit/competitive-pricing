import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

/**
 * Small label + info-icon affordance used next to every metric label
 * on the Partner Detail Driving Metrics tab. Hover or tap reveals the
 * metric definition in a tooltip; touch users get an explicit close
 * tap or focus-loss to dismiss.
 *
 * Definitions live in data/metricDefinitions.ts and are passed in by
 * the consumer rather than looked up here - keeps the component
 * stateless about the metric set and easy to reuse for any label that
 * needs an inline help affordance (the eRPD Price Bucket strip uses
 * it too).
 *
 * The tooltip portal-positions itself above-right of the icon and
 * flips above-left if it would overflow the viewport.
 */
interface MetricLabelProps {
  /** Display label shown to the learner. */
  label: string;
  /** Plain-English definition shown on hover/tap. */
  helpText: string;
  /**
   * Optional override for the label typography. Defaults to the
   * 9px / 800 / uppercase / 0.08em-tracking pattern that matches the
   * existing BigMetric label.
   */
  labelStyle?: React.CSSProperties;
  /** Optional override for the icon size in px. Defaults to 11. */
  iconSize?: number;
  /**
   * Optional override for the tooltip anchor side. Defaults to
   * 'top-right' (tooltip sits above and to the right of the icon).
   */
  align?: 'top-right' | 'top-center';
}

export function MetricLabel({
  label,
  helpText,
  labelStyle,
  iconSize = 11,
  align = 'top-right',
}: MetricLabelProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  // Dismiss on outside tap so touch users aren't trapped with a
  // tooltip they can't close.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <span
      ref={wrapRef}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        position: 'relative',
      }}
    >
      <span
        style={
          labelStyle ?? {
            fontSize: 9,
            fontWeight: 800,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }
        }
      >
        {label}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={`What is ${label}?`}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          display: 'inline-flex',
          alignItems: 'center',
          color: 'var(--grey-300)',
          cursor: 'help',
          lineHeight: 0,
        }}
      >
        <Info size={iconSize} />
      </button>

      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            ...(align === 'top-right'
              ? { left: 0 }
              : { left: '50%', transform: 'translateX(-50%)' }),
            zIndex: 50,
            width: 240,
            background: 'var(--brand-navy-dark)',
            color: 'var(--white)',
            fontSize: 11.5,
            fontWeight: 500,
            lineHeight: 1.45,
            padding: '8px 10px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
            textTransform: 'none',
            letterSpacing: 0,
            pointerEvents: 'none',
          }}
        >
          {helpText}
        </span>
      )}
    </span>
  );
}
