import { Info, MapPin, Scale, ChevronRight } from 'lucide-react';

/**
 * One-time sim disclaimer, shown as a mandatory acknowledge gate on the
 * first Round Select entry after clearance (see GameState
 * `disclaimerAcknowledged`). It sits at the threshold into the actual
 * sim, once the learner has met eRPD / Brand.com / the key OTA in
 * clearance so the comparison-player note lands.
 *
 * Deliberately NOT dismissable by clicking the backdrop or an X - the
 * only way out is the acknowledge button, so we know the learner has
 * seen it. Styled to match the navy Round Select cityscape.
 */
export function DisclaimerModal({ onAcknowledge }: { onAcknowledge: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 10, 26, 0.66)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1100,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="A note on the simulation"
        style={{
          background: 'linear-gradient(160deg, #1c4a97 0%, #0f3676 100%)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 24px 70px rgba(0, 8, 24, 0.5)',
          maxWidth: 600,
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: '30px 32px 26px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'rgba(254,186,2,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Info size={19} style={{ color: 'var(--brand-yellow)' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: 20, color: 'var(--white)' }}>
            Before you begin - a note on the sim
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Point icon={<MapPin size={17} />}>
            The partner locations in this game are fictional.
          </Point>

          <Point icon={<Scale size={17} />}>
            Each round uses one predefined comparison player for eRPD and
            price metrics: either Brand.com (the partner's direct website)
            or the key OTA. This keeps each situation focused. In practice,
            and under your manager's guidance, you would follow your
            office-country eRPD objectives and use pricing dashboard
            insights to decide where to focus between Brand.com and the key
            OTA, weighing the potential eRPD impact, partner value, observed
            trends, and any applicable parity guardrails.
          </Point>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}>
          <button
            onClick={onAcknowledge}
            style={{
              background: 'var(--brand-yellow)',
              color: 'var(--brand-navy)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 15,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'var(--brand-yellow-light)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'var(--brand-yellow)')
            }
          >
            Got it - let's begin
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Point({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ color: 'var(--brand-yellow)', flexShrink: 0, marginTop: 2 }}>
        {icon}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14.5,
          color: 'rgba(255,255,255,0.90)',
          lineHeight: 1.6,
        }}
      >
        {children}
      </p>
    </div>
  );
}
