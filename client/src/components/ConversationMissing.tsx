import { ArrowLeft, PhoneOff } from 'lucide-react';

/**
 * Fallback shown if a conversation screen is reached but no scenario tree
 * resolves for the partner+round (a content/roster desync, an out-of-range
 * round, or a DevNav jump). Previously both conversation screens did
 * `if (!tree) return null`, which rendered a completely blank, inescapable
 * page - the Back button lived inside the null-ed JSX. This guarantees the
 * learner always has a way back to the portfolio.
 */
export function ConversationMissing({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--off-white)',
        padding: 24,
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--grey-200)',
          borderRadius: 'var(--radius-md)',
          padding: '28px 32px',
          maxWidth: 420,
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(6,18,42,0.10)',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--off-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
          }}
        >
          <PhoneOff size={22} style={{ color: 'var(--grey-500)' }} />
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: 'var(--brand-navy)' }}>
          This call isn't available
        </h3>
        <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--grey-500)', lineHeight: 1.5 }}>
          There's no conversation set up for this partner in this round. Head
          back to the portfolio and pick the partner who needs you most.
        </p>
        <button
          onClick={onBack}
          style={{
            background: 'var(--brand-yellow)',
            color: 'var(--brand-navy)',
            border: 'none',
            padding: '11px 22px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 14,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(254,186,2,0.35)',
          }}
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </button>
      </div>
    </div>
  );
}
