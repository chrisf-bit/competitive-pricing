import { MetricLabel } from './MetricLabel';
import { getPriceBucket, type PriceBucket } from '../engine/gameEngine';
import { metricDefinitions } from '../data/metricDefinitions';

/**
 * Seven-segment continuous gradient strip showing where a partner
 * sits on the Booking.com eRPD price-bucket spectrum (1 = most
 * competitive, 7 = least competitive).
 *
 * Visual style follows Partner Metrics PDF page 1: clean strip with
 * a marker callout reading "Bucket N - eRPD X%" above the partner's
 * segment. Thresholds are not legend-rendered next to the strip
 * (that's the page-23 explainer style); the learner reaches them
 * via the info-icon tooltip on the strip's label.
 *
 * Tooltip per segment: each bucket carries the threshold it
 * represents, so a learner unfamiliar with the bucketing can hover
 * any segment to see "Bucket 4: eRPD 3% to 6%".
 *
 * Internal-only data - this strip lives on the LPS-side dashboard.
 * The bucket name must NOT appear in partner-facing copy; see the
 * "Don't reference eRPD price buckets in partner-facing copy" rule
 * in CLAUDE.md.
 */
interface PriceBucketStripProps {
  /** Partner's current eRPD as a percentage (e.g. 9.5 for 9.5%). */
  erpd: number;
}

interface BucketSpec {
  bucket: PriceBucket;
  /** Threshold copy shown on hover. */
  thresholdLabel: string;
  /** Solid colour for this segment of the strip. */
  color: string;
}

// Solid per-segment palette. We render them as discrete blocks rather
// than a single CSS gradient so each segment can carry its own hover
// tooltip with the threshold. The visual still reads as a smooth
// green->red ramp because the colours are evenly stepped.
// Threshold labels use ≤ / > exactly per the SME PDF page 23
// "Details" column - boundary values land in the lower bucket
// (e.g. exactly 3.0 lands in Bucket 3, not Bucket 4). The
// engine's getPriceBucket() in gameEngine.ts implements the
// matching maths.
const BUCKETS: BucketSpec[] = [
  { bucket: 1, thresholdLabel: 'eRPD ≤ -3%', color: '#1f8a3a' },
  { bucket: 2, thresholdLabel: '-3% < eRPD ≤ 0%', color: '#56b66f' },
  { bucket: 3, thresholdLabel: '0% < eRPD ≤ 3%', color: '#c7d04a' },
  { bucket: 4, thresholdLabel: '3% < eRPD ≤ 6%', color: '#f0c64a' },
  { bucket: 5, thresholdLabel: '6% < eRPD ≤ 9%', color: '#ec8a48' },
  { bucket: 6, thresholdLabel: '9% < eRPD ≤ 12%', color: '#d8504a' },
  { bucket: 7, thresholdLabel: 'eRPD > 12%', color: '#a02828' },
];

export function PriceBucketStrip({ erpd }: PriceBucketStripProps) {
  const bucket = getPriceBucket(erpd);
  const erpdLabel = `${erpd > 0 ? '+' : ''}${erpd.toFixed(1)}%`;
  const def = metricDefinitions.priceBucket;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '4px 2px 0',
      }}
    >
      <MetricLabel label={def.label} helpText={def.helpText} />

      <div style={{ position: 'relative', paddingTop: 26 }}>
        {/* Marker callout - sits above the segment for this partner */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            // Center the callout horizontally over the partner's segment.
            // Each segment occupies 1/7 of the strip width.
            left: `${((bucket - 0.5) / BUCKETS.length) * 100}%`,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              padding: '2px 8px',
              borderRadius: 999,
              background: 'var(--brand-navy)',
              color: 'var(--white)',
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            }}
          >
            Bucket {bucket} · eRPD {erpdLabel}
          </div>
          {/* Tiny tick pointing at the segment below */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid var(--brand-navy)',
            }}
          />
        </div>

        {/* The strip itself - 7 segments with hover tooltips */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BUCKETS.length}, 1fr)`,
            gap: 1,
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid var(--grey-100)',
          }}
        >
          {BUCKETS.map((spec) => (
            <Segment
              key={spec.bucket}
              spec={spec}
              isCurrent={spec.bucket === bucket}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Segment({
  spec,
  isCurrent,
}: {
  spec: BucketSpec;
  isCurrent: boolean;
}) {
  return (
    <div
      title={`Bucket ${spec.bucket}: ${spec.thresholdLabel}`}
      style={{
        height: 14,
        background: spec.color,
        opacity: isCurrent ? 1 : 0.78,
        // Subtle inset shadow on the current segment so it reads
        // "this is the one" even without the marker.
        boxShadow: isCurrent ? 'inset 0 0 0 2px rgba(255,255,255,0.55)' : 'none',
        cursor: 'help',
      }}
    />
  );
}
