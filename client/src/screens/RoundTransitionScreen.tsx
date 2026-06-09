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
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 32px',
        gap: 18,
        maxWidth: 1120,
        margin: '0 auto',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header strip: time skip on the left, market update on the
          right. Side-by-side so the screen reads landscape and we
          buy back vertical room for the summaries + continue CTA. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 16,
          animation: 'fadeIn 0.4s ease',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flex: '0 0 auto',
            paddingRight: 16,
          }}
        >
          <Clock size={24} style={{ color: 'var(--brand-blue)' }} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--grey-400)', fontWeight: 500 }}>
              Time has passed...
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--brand-navy)' }}>
              Round {previousRound} -&gt; Round {currentRound}
            </div>
          </div>
        </div>

        {/* Market update banner stretches to fill the remaining row */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            background: 'var(--white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            color: 'var(--grey-500)',
          }}
        >
          <Globe size={16} style={{ color: 'var(--brand-blue)', flexShrink: 0 }} />
          <span>
            <strong style={{ color: 'var(--grey-700)' }}>Market Update:</strong>{' '}
            {marketContext.competitorPricing}
          </span>
        </div>
      </div>

      {/* Partner summaries - wraps as a 3-column grid that auto-flows
          on smaller widths. Inner scroll keeps the continue button
          parked at the bottom of the viewport. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          animation: 'fadeIn 0.4s ease 0.15s backwards',
        }}
      >
        <h4
          style={{
            fontSize: 13,
            color: 'var(--grey-400)',
            fontWeight: 600,
            margin: 0,
            flexShrink: 0,
          }}
        >
          What happened since your last review
        </h4>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 10,
            alignContent: 'start',
          }}
        >
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
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  animation: `fadeIn 0.3s ease ${0.2 + i * 0.1}s backwards`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `var(--style-${partner.persona.style})`,
                      color: 'var(--white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {partner.persona.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: 'var(--brand-navy)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {partner.persona.propertyName}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--grey-400)',
                      }}
                    >
                      {partner.persona.name}
                    </div>
                  </div>
                  <TIcon size={18} style={{ color: tColor, flexShrink: 0 }} />
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--grey-500)',
                    lineHeight: 1.45,
                  }}
                >
                  {summary.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue CTA - parked at the bottom of the viewport, right
          aligned. Always visible regardless of how many summaries
          render above it. */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0,
          animation: 'fadeIn 0.4s ease 0.6s backwards',
        }}
      >
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
            border: 'none',
            boxShadow: '0 6px 18px rgba(254,186,2,0.28)',
          }}
        >
          Review Portfolio
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
