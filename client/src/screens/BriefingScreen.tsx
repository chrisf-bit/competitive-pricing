import { BarChart3, Users, MessageSquare, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';

interface BriefingScreenProps {
  onStart: () => void;
  onTutorial: () => void;
}

export function BriefingScreen({ onStart, onTutorial }: BriefingScreenProps) {
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
            Partner Pricing Competitiveness Simulation
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 600,
              animation: 'fadeIn 0.5s ease 0.2s backwards',
            }}
          >
            You are an Account Manager at Booking.com. Your portfolio of six accommodation
            partners is underperforming on Experienced RPD. Over the next six weeks, you must
            diagnose pricing problems, choose the right strategy, and adapt your conversations
            to each partner — all while balancing competitiveness, revenue, and trust. Pay
            attention to how each partner responds. Not everyone communicates the same way.
          </p>

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
              title="6 Partners"
              text="Each with different pricing challenges — and different ways of communicating"
            />
            <InfoCard
              icon={<TrendingUp size={20} />}
              title="3 Rounds"
              text="Your decisions have consequences that compound over time"
            />
            <InfoCard
              icon={<MessageSquare size={20} />}
              title="3 Actions / Round"
              text="You can't help everyone — prioritise wisely"
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
              Open your portfolio
              <ChevronRight size={18} />
            </button>
            <button
              onClick={onTutorial}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--white)',
                padding: '14px 28px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 15,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              <BookOpen size={17} />
              How to Play
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
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
        {text}
      </div>
    </div>
  );
}
