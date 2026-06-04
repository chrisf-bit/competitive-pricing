import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

/**
 * Small label + info-icon affordance used next to every metric label
 * on the Partner Detail Driving Metrics tab. Hover or tap reveals the
 * metric definition in a tooltip; touch users get an explicit close
 * tap or focus-loss to dismiss.
 *
 * The tooltip renders via React portal to document.body using
 * `position: fixed` coordinates computed from the icon's bounding
 * rect. That escapes every overflow-clip context (the left column of
 * Partner Detail uses `overflow: auto`, which would otherwise clip
 * the tooltip when it extends above the metric row), and the fixed
 * positioning sits above the Simulation Guide panel in z-order so
 * the tooltip is never visually occluded by it. The portal also
 * lets us clamp the tooltip inside the viewport - icons near the
 * left edge of the page (e.g. the leftmost metric in a row) push the
 * tooltip rightward instead of letting it spill into the Guide panel.
 *
 * Definitions live in data/metricDefinitions.ts and are passed in by
 * the consumer rather than looked up here - keeps the component
 * stateless about the metric set and easy to reuse for any label that
 * needs an inline help affordance (the eRPD Price Bucket strip uses
 * it too).
 */
interface MetricLabelProps {
  /** Display label shown to the learner. */
  label: string;
  /**
   * Tooltip body. Plain strings carry a generic metric definition (the
   * default styling - paragraph text, navy background). For tooltips
   * that surface live partner data rather than a definition (e.g. the
   * Scenarios tile listing the active scenarios), pass a ReactNode and
   * apply the data styling inside it - that's the signal to the
   * learner that the tooltip is showing the value, not explaining the
   * metric.
   */
  helpText: React.ReactNode;
  /**
   * Optional override for the label typography. Defaults to the
   * 9px / 800 / uppercase / 0.08em-tracking pattern that matches the
   * existing BigMetric label.
   */
  labelStyle?: React.CSSProperties;
  /** Optional override for the icon size in px. Defaults to 11. */
  iconSize?: number;
  /**
   * Anchor preference for the tooltip's horizontal alignment relative
   * to the icon. The portal positioning clamps to the viewport, so
   * this is a hint rather than a hard rule - leftmost / rightmost
   * icons will be flipped automatically.
   */
  align?: 'top-right' | 'top-center';
}

const TOOLTIP_WIDTH = 240;
// Distance between the icon and the tooltip's bottom edge.
const TOOLTIP_GAP = 6;
// Minimum padding the tooltip keeps from the viewport edges.
const VIEWPORT_PADDING = 8;

export function MetricLabel({
  label,
  helpText,
  labelStyle,
  iconSize = 11,
  align = 'top-right',
}: MetricLabelProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Compute the tooltip's viewport-fixed position from the icon's
  // bounding rect every time the tooltip opens, then re-clamp once
  // we've measured the rendered tooltip height. Using useLayoutEffect
  // means the user never sees a paint of the tooltip in the wrong
  // place.
  useLayoutEffect(() => {
    if (!open || !buttonRef.current) {
      setCoords(null);
      return;
    }
    const iconRect = buttonRef.current.getBoundingClientRect();
    // Default height guess until we measure the rendered tooltip.
    const measuredHeight = tooltipRef.current?.offsetHeight ?? 80;

    const iconCenterX = iconRect.left + iconRect.width / 2;
    const desiredLeft =
      align === 'top-center'
        ? iconCenterX - TOOLTIP_WIDTH / 2
        : iconRect.left; // 'top-right' anchors the tooltip's left edge to the icon's left

    const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING;
    const clampedLeft = Math.max(VIEWPORT_PADDING, Math.min(desiredLeft, maxLeft));

    const top = iconRect.top - measuredHeight - TOOLTIP_GAP;
    // If there isn't space above, drop below the icon instead.
    const clampedTop = top < VIEWPORT_PADDING ? iconRect.bottom + TOOLTIP_GAP : top;

    setCoords({ left: clampedLeft, top: clampedTop });
  }, [open, align]);

  // Re-clamp once the actual rendered tooltip height is known.
  useLayoutEffect(() => {
    if (!open || !coords || !tooltipRef.current || !buttonRef.current) return;
    const measuredHeight = tooltipRef.current.offsetHeight;
    const iconRect = buttonRef.current.getBoundingClientRect();
    const top = iconRect.top - measuredHeight - TOOLTIP_GAP;
    const clampedTop = top < VIEWPORT_PADDING ? iconRect.bottom + TOOLTIP_GAP : top;
    if (Math.abs(clampedTop - coords.top) > 0.5) {
      setCoords((c) => (c ? { ...c, top: clampedTop } : c));
    }
    // Re-clamping intentionally only re-runs when open/coords change.
    // Don't add tooltipRef as a dep - we already trigger via coords.
  }, [open, coords]);

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

  // Dismiss on scroll so the tooltip doesn't end up stranded over
  // unrelated content if the page moves under it.
  useEffect(() => {
    if (!open) return;
    function onScroll() {
      setOpen(false);
    }
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
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
        ref={buttonRef}
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

      {open &&
        coords &&
        createPortal(
          <span
            ref={tooltipRef}
            role="tooltip"
            style={{
              position: 'fixed',
              left: coords.left,
              top: coords.top,
              zIndex: 1000,
              width: TOOLTIP_WIDTH,
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
          </span>,
          document.body,
        )}
    </span>
  );
}
