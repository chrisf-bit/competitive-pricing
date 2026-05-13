import { BarChart3, Users, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react';

interface BriefingScreenProps {
  onStart: () => void;
  /** True if the learner has already completed clearance in this session. */
  hasCleared: boolean;
}

export function BriefingScreen({ onStart, hasCleared }: BriefingScreenProps) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%' }}>
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 32,
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <BarChart3 size={32} style={{ color: 'var(--brand-yellow)' }} />
            <span style={{ fontSize: 28, fontWeight: 700 }}>
              Rate Right
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  background: 'var(--brand-yellow)',
                  borderRadius: '50%',
                  marginLeft: 2,
                  verticalAlign: 'super',
                }}
              />
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
              marginBottom: 16,
              animation: 'fadeIn 0.5s ease 0.1s backwards',
            }}
          >
            Competitive Pricing Simulation
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 36,
              maxWidth: 600,
              fontSize: 16,
              color: 'rgba(255,255,255,0.92)',
              lineHeight: 1.6,
              animation: 'fadeIn 0.5s ease 0.2s backwards',
            }}
          >
            <p style={{ margin: 0 }}>
              We're looking for the best of the best!
            </p>
            <p style={{ margin: 0 }}>
              A portfolio of partner accounts is under pressure on Booking.com. Their
              visibility on Booking.com is slipping. Their prices are less competitive than
              they could be. Travellers are choosing other options. Much of it is fixable,
              if you know what to look for, what to ask, and how to help the partner find
              the right next step for their performance on Booking.com.
            </p>
            <p style={{ margin: 0 }}>
              You'll take ownership of a portfolio of partner accounts that need your
              judgement. In each round, one partner will need your attention most. Read the
              signals. Decide what matters. Adjust your Action Plans. Choose your partner
              actions. Have the conversation. Pay attention to how each partner responds,
              not every situation is the same, and not every partner sees the issue in the
              same way.
            </p>
            <p style={{ margin: 0, color: 'var(--white)', fontWeight: 600 }}>
              First, you need to earn your clearance. Show that you understand why price
              competitiveness matters, know how to work within the guardrails, and make
              sound decisions, then we'll hand you the mission.
            </p>
          </div>

          {/* Info cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              marginBottom: 40,
              animation: 'fadeIn 0.5s ease 0.3s backwards',
            }}
          >
            <InfoCard
              icon={<Users size={20} />}
              title="A portfolio"
              text="Real partner accounts, each with different pricing problems and ways of communicating"
            />
            <InfoCard
              icon={<TrendingUp size={20} />}
              title="10 rounds"
              text="Decisions compound over time - each round shifts what your partners need from you"
            />
            <InfoCard
              icon={<MessageSquare size={20} />}
              title="One conversation per round"
              text="Spot the partner who needs you most, then pick the right approach"
            />
          </div>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              animation: 'fadeIn 0.5s ease 0.4s backwards',
            }}
          >
            <button
              onClick={onStart}
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy)',
                padding: '14px 36px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 16,
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
              {hasCleared ? 'Open your portfolio' : 'Get clearance for mission'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px 40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Business Simulation Demo</span>
        <span>Estimated duration: 25 minutes</span>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 18px',
      }}
    >
      <div
        style={{
          color: 'var(--brand-yellow)',
          marginBottom: 8,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', lineHeight: 1.4 }}>
        {text}
      </div>
    </div>
  );
}
