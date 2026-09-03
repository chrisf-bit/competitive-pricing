import { HelpCircle, X, Star } from 'lucide-react';

/**
 * "How your score works" lightbox - a plain-English explanation of the
 * 0-3 star round grading and the overall grade rollup, shown to learners
 * on the Round Select hub (before they start) and the Debrief (after).
 *
 * Two themes so it sits right on each surface:
 * - `light` (default): clean white panel for the light Debrief screen.
 * - `navy`: a lighter brand-navy panel for the dark Round Select
 *   cityscape - on-palette, distinct from the near-black over-correction.
 *
 * Content only. The real grading logic lives in engine/grading.ts
 * (gradeBranchingRound) - keep this copy in step with it if the floor
 * criteria or star thresholds change, but it deliberately stays
 * simplified (no exact style-average numbers) for a learner audience.
 */
export function ScoringModal({
  onClose,
  variant = 'light',
}: {
  onClose: () => void;
  variant?: 'light' | 'navy';
}) {
  const t = variant === 'navy' ? navyTheme : lightTheme;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: t.overlay,
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="How your score is calculated"
        style={{
          background: t.card,
          border: t.cardBorder,
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 24px 70px rgba(0, 8, 24, 0.5)',
          maxWidth: 560,
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: '28px 30px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: t.closeBg,
            border: 'none',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: t.closeIcon,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: t.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <HelpCircle size={19} style={{ color: t.iconColor }} />
          </div>
          <h2 style={{ margin: 0, fontSize: 20, color: t.heading }}>
            How your score works
          </h2>
        </div>

        <p style={{ fontSize: 14, color: t.body, lineHeight: 1.6, marginTop: 0 }}>
          Each round is scored out of{' '}
          <strong style={{ color: t.strong }}>3 stars</strong>. To earn any stars at
          all, a round has to clear a few basics first:
        </p>

        <ul
          style={{
            fontSize: 14,
            color: t.body,
            lineHeight: 1.6,
            paddingLeft: 20,
            margin: '0 0 16px',
          }}
        >
          <li>You called the <strong style={{ color: t.strong }}>right partner</strong> - the one who needed you most that round.</li>
          <li>You <strong style={{ color: t.strong }}>diagnosed</strong> the real issue.</li>
          <li>You closed with the <strong style={{ color: t.strong }}>strongest pitch</strong>.</li>
          <li>You stayed <strong style={{ color: t.strong }}>compliant</strong> the whole way.</li>
          <li>Your approach <strong style={{ color: t.strong }}>fit the partner's personality</strong> (no badly mismatched choices).</li>
        </ul>

        <p style={{ fontSize: 14, color: t.body, lineHeight: 1.6, margin: '0 0 16px' }}>
          Miss any one of those and the round scores{' '}
          <strong style={{ color: t.strong }}>zero</strong> - but you can always
          retake it. Once you clear that bar, your star count reflects{' '}
          <strong style={{ color: t.strong }}>how closely you matched each partner's
          communication style</strong>:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          <StarRow n={3} label="Consistently well matched to the partner" emptyColor={t.starEmpty} labelColor={t.body} />
          <StarRow n={2} label="Mostly well matched" emptyColor={t.starEmpty} labelColor={t.body} />
          <StarRow n={1} label="Cleared the basics, but the style was uneven" emptyColor={t.starEmpty} labelColor={t.body} />
        </div>

        <div
          style={{
            background: t.gradeBg,
            border: t.gradeBorder,
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: t.gradeLabel, marginBottom: 5 }}>
            Your overall grade
          </div>
          <p style={{ fontSize: 13.5, color: t.body, lineHeight: 1.55, margin: 0 }}>
            We add up every round's stars and compare them with the best you could
            have scored. Retakes and practice only ever raise a round's stars, never
            lower them - so your grade always reflects your best work.
          </p>
        </div>
      </div>
    </div>
  );
}

const lightTheme = {
  overlay: 'rgba(6, 18, 42, 0.55)',
  card: 'var(--white)',
  cardBorder: '1px solid var(--grey-100)',
  closeBg: 'var(--grey-100)',
  closeIcon: 'var(--grey-600)',
  iconBg: '#fff5d6',
  iconColor: 'var(--brand-navy)',
  heading: 'var(--brand-navy)',
  body: 'var(--grey-700)',
  strong: 'var(--brand-navy)',
  starEmpty: 'var(--grey-200)',
  gradeBg: 'var(--off-white)',
  gradeBorder: '1px solid var(--grey-100)',
  gradeLabel: 'var(--brand-navy)',
} as const;

// Lighter brand-navy so it reads as an on-palette card on the Round
// Select cityscape - not the near-black that felt too dark.
const navyTheme = {
  overlay: 'rgba(3, 10, 26, 0.58)',
  card: 'linear-gradient(160deg, #1c4a97 0%, #0f3676 100%)',
  cardBorder: '1px solid rgba(255,255,255,0.22)',
  closeBg: 'rgba(255,255,255,0.16)',
  closeIcon: 'rgba(255,255,255,0.88)',
  iconBg: 'rgba(254,186,2,0.22)',
  iconColor: 'var(--brand-yellow)',
  heading: 'var(--white)',
  body: 'rgba(255,255,255,0.86)',
  strong: 'var(--white)',
  starEmpty: 'rgba(255,255,255,0.30)',
  gradeBg: 'rgba(255,255,255,0.10)',
  gradeBorder: '1px solid rgba(255,255,255,0.18)',
  gradeLabel: 'var(--brand-yellow)',
} as const;

function StarRow({
  n,
  label,
  emptyColor,
  labelColor,
}: {
  n: number;
  label: string;
  emptyColor: string;
  labelColor: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'flex', gap: 2, flexShrink: 0, width: 54 }}>
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={15}
            fill={i <= n ? 'var(--brand-yellow)' : 'transparent'}
            color={i <= n ? 'var(--brand-yellow)' : emptyColor}
          />
        ))}
      </div>
      <span style={{ fontSize: 13.5, color: labelColor, lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}
