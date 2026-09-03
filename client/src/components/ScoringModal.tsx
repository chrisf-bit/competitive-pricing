import { HelpCircle, X, Star } from 'lucide-react';

/**
 * "How your score works" lightbox - a plain-English explanation of the
 * 0-3 star round grading and the overall grade rollup, shown to learners
 * on the Round Select hub (before they start) and the Debrief (after).
 *
 * Content only. The real grading logic lives in engine/grading.ts
 * (gradeBranchingRound) - keep this copy in step with it if the floor
 * criteria or star thresholds change, but it deliberately stays
 * simplified (no exact style-average numbers) for a learner audience.
 */
export function ScoringModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6, 18, 42, 0.55)',
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
          background: 'var(--white)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 60px rgba(6, 18, 42, 0.4)',
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
            background: 'var(--grey-100)',
            border: 'none',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--grey-600)',
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
              background: '#fff5d6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <HelpCircle size={19} style={{ color: 'var(--brand-navy)' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: 20, color: 'var(--brand-navy)' }}>
            How your score works
          </h2>
        </div>

        <p style={{ fontSize: 14, color: 'var(--grey-700)', lineHeight: 1.6, marginTop: 0 }}>
          Each round is scored out of{' '}
          <strong style={{ color: 'var(--brand-navy)' }}>3 stars</strong>. To earn
          any stars at all, a round has to clear a few basics first:
        </p>

        <ul
          style={{
            fontSize: 14,
            color: 'var(--grey-700)',
            lineHeight: 1.6,
            paddingLeft: 20,
            margin: '0 0 16px',
          }}
        >
          <li>You called the <strong>right partner</strong> - the one who needed you most that round.</li>
          <li>You <strong>diagnosed</strong> the real issue.</li>
          <li>You closed with the <strong>strongest pitch</strong>.</li>
          <li>You stayed <strong>compliant</strong> the whole way.</li>
          <li>Your approach <strong>fit the partner's personality</strong> (no badly mismatched choices).</li>
        </ul>

        <p style={{ fontSize: 14, color: 'var(--grey-700)', lineHeight: 1.6, margin: '0 0 16px' }}>
          Miss any one of those and the round scores{' '}
          <strong style={{ color: 'var(--brand-navy)' }}>zero</strong> - but you can
          always retake it. Once you clear that bar, your star count reflects{' '}
          <strong style={{ color: 'var(--brand-navy)' }}>how closely you matched each
          partner's communication style</strong>:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          <StarRow n={3} label="Consistently well matched to the partner" />
          <StarRow n={2} label="Mostly well matched" />
          <StarRow n={1} label="Cleared the basics, but the style was uneven" />
        </div>

        <div
          style={{
            background: 'var(--off-white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-navy)', marginBottom: 5 }}>
            Your overall grade
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--grey-700)', lineHeight: 1.55, margin: 0 }}>
            We add up every round's stars and compare them with the best you could
            have scored. Retakes and practice only ever raise a round's stars, never
            lower them - so your grade always reflects your best work.
          </p>
        </div>
      </div>
    </div>
  );
}

function StarRow({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'flex', gap: 2, flexShrink: 0, width: 54 }}>
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={15}
            fill={i <= n ? 'var(--brand-yellow)' : 'transparent'}
            color={i <= n ? 'var(--brand-yellow)' : 'var(--grey-200)'}
          />
        ))}
      </div>
      <span style={{ fontSize: 13.5, color: 'var(--grey-700)', lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}
