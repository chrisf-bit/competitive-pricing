import { Clock, TrendingUp, TrendingDown, Minus, Globe, ChevronRight } from 'lucide-react';
import type { PartnerState, RoundSummaryItem, MarketContext } from '../types';

interface RoundTransitionScreenProps {
  currentRound: number;
  previousRound: number;
  summaries: RoundSummaryItem[];
  partners: PartnerState[];
  marketContext: MarketContext;
  onContinue: () => void;
}

const roundWeeks: Record<number, string> = {
  1: 'Week 1',
  2: 'Week 3',
  3: 'Week 6',
};

export function RoundTransitionScreen({
  currentRound,
  previousRound,
  summaries,
  partners,
  marketContext,
  onContinue,
}: RoundTransitionScreenProps) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 40px',
        gap: 28,
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Time skip indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          animation: 'fadeIn 0.4s ease',
        }}
      >
        <Clock size={24} style={{ color: 'var(--brand-blue)' }} />
        <div>
          <div style={{ fontSize: 13, color: 'var(--grey-400)', fontWeight: 500 }}>
            Time has passed...
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-navy)' }}>
            {roundWeeks[previousRound]} → {roundWeeks[currentRound]}
          </div>
        </div>
      </div>

      {/* Partner summaries */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'fadeIn 0.4s ease 0.15s backwards',
        }}
      >
        <h4 style={{ fontSize: 14, color: 'var(--grey-400)', fontWeight: 600 }}>
          What happened since your last review
        </h4>
        {summaries.map((summary, i) => {
          const partner = partners.find(
            (p) => p.persona.id === summary.partnerId,
          );
          if (!partner) return null;

          const TIcon =
            summary.metricChange === 'up'
              ? TrendingUp
              : summary.metricChange === 'down'
                ? TrendingDown
                : Minus;
          const tColor =
            summary.metricChange === 'up'
              ? 'var(--success)'
              : summary.metricChange === 'down'
                ? 'var(--danger)'
                : 'var(--grey-400)';

          return (
            <div
              key={summary.partnerId}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--grey-100)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                animation: `fadeIn 0.3s ease ${0.2 + i * 0.1}s backwards`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--brand-navy)',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {partner.persona.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--brand-navy)',
                    marginBottom: 2,
                  }}
                >
                  {partner.persona.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--grey-500)',
                    lineHeight: 1.4,
                  }}
                >
                  {summary.detail}
                </div>
              </div>
              <TIcon size={18} style={{ color: tColor, flexShrink: 0 }} />
            </div>
          );
        })}
      </div>

      {/* Market update */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          background: 'var(--white)',
          border: '1px solid var(--grey-100)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          color: 'var(--grey-500)',
          animation: 'fadeIn 0.4s ease 0.5s backwards',
        }}
      >
        <Globe size={16} style={{ color: 'var(--brand-blue)', flexShrink: 0 }} />
        <span>
          <strong style={{ color: 'var(--grey-700)' }}>Market Update:</strong>{' '}
          {marketContext.competitorPricing}
        </span>
      </div>

      {/* Continue button */}
      <button
        onClick={onContinue}
        style={{
          background: 'var(--brand-yellow)',
          color: 'var(--brand-navy)',
          padding: '12px 32px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 15,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          animation: 'fadeIn 0.4s ease 0.6s backwards',
        }}
      >
        Review Portfolio
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
