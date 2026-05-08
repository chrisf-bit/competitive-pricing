import { BarChart3, Zap, HelpCircle } from 'lucide-react';
import type { GameScreen } from '../types';

interface HeaderProps {
  currentRound: number;
  actionsRemaining: number;
  screen: GameScreen;
  /** Optional callback to re-open the partner-sim tutorial. */
  onTutorial?: () => void;
}

const TOTAL_ROUNDS = 10;

export function Header({ currentRound, actionsRemaining, screen, onTutorial }: HeaderProps) {
  const showActions = screen === 'portfolio' || screen === 'partner-detail';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        height: 64,
        minHeight: 64,
        background: 'linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)',
        color: 'var(--white)',
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,20,60,0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'var(--brand-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(254,186,2,0.3)',
          }}
        >
          <BarChart3 size={20} style={{ color: 'var(--brand-navy-dark)' }} />
        </div>
        <div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', display: 'block', lineHeight: 1.1 }}>
            Rate Right
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Pricing Simulation
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13 }}>
        <div data-tutorial="round-tracker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1).map((r) => (
              <div
                key={r}
                style={{
                  width: r === currentRound ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    r < currentRound
                      ? 'var(--success)'
                      : r === currentRound
                        ? 'var(--brand-yellow)'
                        : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <span
            style={{
              color: 'var(--brand-yellow)',
              fontWeight: 700,
              fontSize: 12,
              background: 'rgba(254,186,2,0.1)',
              padding: '2px 10px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            Round {currentRound} of {TOTAL_ROUNDS}
          </span>
        </div>

        {showActions && (
          <div
            data-tutorial="actions-counter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: actionsRemaining > 0 ? 'rgba(254,186,2,0.12)' : 'rgba(204,0,0,0.15)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-pill)',
              border: actionsRemaining > 0
                ? '1px solid rgba(254,186,2,0.2)'
                : '1px solid rgba(204,0,0,0.2)',
            }}
          >
            <Zap size={13} style={{ color: actionsRemaining > 0 ? 'var(--brand-yellow)' : 'var(--danger)' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Actions:</span>
            <strong
              style={{
                color: actionsRemaining > 0 ? 'var(--brand-yellow)' : '#ff6666',
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              {actionsRemaining}
            </strong>
          </div>
        )}

        {onTutorial && (
          <button
            onClick={onTutorial}
            aria-label="How to play"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.12s ease, color 0.12s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            <HelpCircle size={16} />
          </button>
        )}
      </div>
    </header>
  );
}
