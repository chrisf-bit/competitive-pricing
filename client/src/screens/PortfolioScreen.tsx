import {
  MapPin,
  Building2,
  ChevronRight,
  Globe,
  ArrowRight,
  Zap,
  Check,
} from 'lucide-react';
import type { PartnerState, MarketContext } from '../types';
import { getRPDLevel } from '../engine/gameEngine';
import { RPDBadge, RelationshipBadge } from '../components/MetricBadge';

interface PortfolioScreenProps {
  partners: PartnerState[];
  currentRound: number;
  actionsRemaining: number;
  actionsThisRound: string[];
  marketContext: MarketContext;
  /** Stars earned per round so far; used to gate round advance. */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  marketUpdateAcknowledged: boolean;
  onSelectPartner: (id: string) => void;
  onAdvanceRound: () => void;
  onAcknowledgeMarketUpdate: () => void;
}

export function PortfolioScreen({
  partners,
  currentRound,
  actionsRemaining,
  actionsThisRound,
  marketContext,
  roundStars,
  marketUpdateAcknowledged,
  onSelectPartner,
  onAdvanceRound,
  onAcknowledgeMarketUpdate,
}: PortfolioScreenProps) {
  // Advance only unlocks once the learner has used their action AND
  // earned at least 1 star this round. The 1-star floor lives in the
  // engine's grading layer; this is the matching UI gate.
  const earnedStarsThisRound = roundStars[currentRound] ?? 0;
  const canAdvance = actionsRemaining === 0 && earnedStarsThisRound >= 1;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '16px 20px',
        gap: 12,
      }}
    >
      {/* Market context bar - stands out as a distinct call-out band */}
      <div
        data-tutorial="market-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 18px',
          background:
            'linear-gradient(135deg, rgba(254, 186, 2, 0.96) 0%, rgba(255, 210, 77, 0.96) 100%)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13.5,
          color: 'var(--brand-navy)',
          animation: 'fadeIn 0.3s ease',
          boxShadow: '0 6px 22px rgba(254, 186, 2, 0.30)',
          border: '1.5px solid rgba(254, 186, 2, 0.7)',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'var(--brand-navy)',
            color: 'var(--brand-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          }}
        >
          <Globe size={17} strokeWidth={2.4} />
        </div>
        <span style={{ flex: 1, fontWeight: 600, lineHeight: 1.4 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--brand-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'block',
              opacity: 0.7,
              marginBottom: 1,
            }}
          >
            Market Update
          </span>
          {marketContext.seasonalNote}
        </span>
        {marketUpdateAcknowledged ? (
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--brand-navy)',
              background: 'rgba(0, 53, 128, 0.10)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-pill)',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(0, 53, 128, 0.15)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Check size={11} strokeWidth={3} />
            Acknowledged
          </span>
        ) : (
          <button
            onClick={onAcknowledgeMarketUpdate}
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--brand-navy)',
              background: 'var(--white)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              whiteSpace: 'nowrap',
              border: '1.5px solid var(--brand-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--brand-navy)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--white)';
              e.currentTarget.style.color = 'var(--brand-navy)';
            }}
          >
            Acknowledge
          </button>
        )}
      </div>

      {/* Partner cards */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 10,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {partners.map((partner, i) => {
          const engaged = actionsThisRound.includes(partner.persona.id);
          const rpdLevel = getRPDLevel(partner.metrics.experiencedRPD);
          return (
            <div
              key={partner.persona.id}
              data-tutorial={i === 0 ? 'partner-card' : undefined}
              onClick={() => onSelectPartner(partner.persona.id)}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                animation: `fadeIn 0.4s ease ${i * 0.08}s backwards`,
                opacity: engaged ? 0.65 : 1,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!engaged) {
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {engaged && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'var(--success)',
                  }}
                />
              )}

              {/* Partner header */}
              <div style={{ padding: '14px 14px 10px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  {/* Left: host info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 14, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {partner.persona.name}
                      </h3>
                      {engaged ? (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: 'var(--success)',
                            background: 'var(--success-bg)',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-pill)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            flexShrink: 0,
                          }}
                        >
                          Done
                        </span>
                      ) : null}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--grey-400)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        marginBottom: 4,
                      }}
                    >
                      <Building2 size={10} />
                      {partner.persona.propertyName}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        color: 'var(--grey-400)',
                      }}
                    >
                      <MapPin size={10} />
                      {partner.persona.location}
                      <span style={{ margin: '0 1px', color: 'var(--grey-200)' }}>|</span>
                      {partner.persona.roomCount} rooms
                    </div>
                  </div>

                  {/* Right: property thumbnail */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      overflow: 'hidden',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <img
                      src={partner.persona.propertyImage}
                      alt={partner.persona.propertyName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>

                <div data-tutorial={i === 0 ? 'status-badges' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RPDBadge level={rpdLevel} />
                  <RelationshipBadge status={partner.relationship} />
                </div>
              </div>

              {/* Big RPD number */}
              <div
                data-tutorial={i === 0 ? 'rpd-section' : undefined}
                style={{
                  padding: '8px 16px',
                  background: 'var(--off-white)',
                  borderTop: '1px solid var(--grey-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div data-tutorial={i === 0 ? 'rpd-number' : undefined}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: 'var(--grey-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 2,
                    }}
                  >
                    Experienced RPD
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: 'var(--brand-navy)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {partner.metrics.erpd.toFixed(1)}%
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--grey-500)',
                      }}
                    >
                      {partner.metrics.erpdChange < 0 ? '↓' : '↑'}
                      {Math.abs(partner.metrics.erpdChange).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* KPI mini-row - intentionally neutral; learners read and decide */}
                <div data-tutorial={i === 0 ? 'mini-metrics' : undefined} style={{ display: 'flex', gap: 14 }}>
                  <MiniMetric
                    label="RPD Pub"
                    valueText={`${partner.metrics.rpdPublic.toFixed(1)}%`}
                  />
                  <MiniMetric
                    label="RPD Loyal"
                    valueText={`${partner.metrics.rpdLoyal.toFixed(1)}%`}
                  />
                  <MiniMetric
                    label="Lose Price"
                    valueText={`${partner.metrics.losePricePublic}%`}
                  />
                  <MiniMetric
                    label="Scenarios"
                    valueText={`${partner.metrics.activeScenarios}`}
                  />
                </div>
              </div>

              {/* Discounts */}
              <div
                data-tutorial={i === 0 ? 'discount-row' : undefined}
                style={{
                  padding: '8px 16px',
                  borderTop: '1px solid var(--grey-100)',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 11,
                  color: 'var(--grey-400)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {partner.discounts.filter((d) => d.status === 'active').length}/
                  {partner.discounts.length} discounts
                </div>
              </div>

              {/* CTA footer */}
              <div
                style={{
                  padding: '8px 16px',
                  background: engaged
                    ? 'var(--success-bg)'
                    : 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: engaged ? 'var(--success)' : 'var(--white)',
                }}
              >
                {engaged ? (
                  'Engaged this round'
                ) : (
                  <>
                    Review partner
                    <ChevronRight size={15} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom action bar */}
      <div
        data-tutorial="action-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: 'var(--white)',
          border: '1px solid var(--grey-100)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          animation: 'fadeIn 0.3s ease 0.25s backwards',
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--grey-500)', display: 'flex', alignItems: 'center', gap: 8 }}>
          {actionsRemaining > 0 ? (
            <>
              <Zap size={15} style={{ color: 'var(--brand-yellow)' }} />
              <span>
                Choose a partner to engage.{' '}
                <strong style={{ color: 'var(--brand-navy)', fontSize: 15 }}>
                  {actionsRemaining}
                </strong>{' '}
                action{actionsRemaining !== 1 ? 's' : ''} remaining this round.
              </span>
            </>
          ) : earnedStarsThisRound >= 1 ? (
            <span style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={15} />
              Round cleared. Ready to advance.
            </span>
          ) : (
            <span style={{ color: 'var(--error, #b3261e)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={15} />
              Round not cleared. Retake to advance.
            </span>
          )}
        </div>

        <button
          onClick={onAdvanceRound}
          disabled={!canAdvance}
          style={{
            background: canAdvance
              ? 'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)'
              : 'var(--grey-200)',
            color: canAdvance ? 'var(--brand-navy-dark)' : 'var(--grey-400)',
            padding: '11px 28px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 14,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: canAdvance ? 'pointer' : 'not-allowed',
            opacity: canAdvance ? 1 : 0.5,
            boxShadow: canAdvance ? '0 2px 10px rgba(254,186,2,0.3)' : 'none',
            animation: canAdvance ? 'pulseGlow 2s ease infinite' : 'none',
            letterSpacing: '0.01em',
          }}
        >
          {currentRound >= 10 ? 'View Results' : 'Advance Round'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  valueText,
  severity = 'normal',
}: {
  label: string;
  valueText: string;
  severity?: 'normal' | 'warning' | 'danger';
}) {
  const valueColor =
    severity === 'danger'
      ? 'var(--danger)'
      : severity === 'warning'
        ? 'var(--warning)'
        : 'var(--grey-700)';
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: 'var(--grey-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: valueColor }}>
          {valueText}
        </span>
      </div>
    </div>
  );
}
