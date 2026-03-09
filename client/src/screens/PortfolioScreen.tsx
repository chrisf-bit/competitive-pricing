import {
  MapPin,
  Building2,
  ChevronRight,
  AlertCircle,
  Globe,
  ArrowRight,
  Zap,
} from 'lucide-react';
import type { PartnerState, MarketContext } from '../types';
import { getRPDLevel, getTrend } from '../engine/gameEngine';
import { RPDBadge, RelationshipBadge, TrendIcon } from '../components/MetricBadge';

interface PortfolioScreenProps {
  partners: PartnerState[];
  currentRound: number;
  actionsRemaining: number;
  actionsThisRound: string[];
  marketContext: MarketContext;
  onSelectPartner: (id: string) => void;
  onAdvanceRound: () => void;
}

export function PortfolioScreen({
  partners,
  currentRound,
  actionsRemaining,
  actionsThisRound,
  marketContext,
  onSelectPartner,
  onAdvanceRound,
}: PortfolioScreenProps) {
  const canAdvance = actionsRemaining === 0;

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
      {/* Market context bar */}
      <div
        data-tutorial="market-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.85)',
          animation: 'fadeIn 0.3s ease',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Globe size={16} style={{ color: 'var(--brand-yellow)', flexShrink: 0 }} />
        <span style={{ flex: 1 }}>
          <strong style={{ color: 'var(--white)' }}>Market Update:</strong>{' '}
          {marketContext.seasonalNote}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.1)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          Demand <TrendIcon direction={marketContext.demand} size={14} />
        </div>
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
          const prevMetrics =
            partner.metricHistory.length > 0
              ? partner.metricHistory[partner.metricHistory.length - 1].metrics
              : partner.metrics;
          const rpdLevel = getRPDLevel(partner.metrics.experiencedRPD);
          const borderColor =
            engaged
              ? 'var(--success)'
              : rpdLevel === 'poor'
                ? 'var(--danger)'
                : rpdLevel === 'below'
                  ? '#e67e22'
                  : 'transparent';

          return (
            <div
              key={partner.persona.id}
              data-tutorial={i === 0 ? 'partner-card' : undefined}
              onClick={() => onSelectPartner(partner.persona.id)}
              style={{
                background: 'var(--white)',
                border: `2px solid ${borderColor}`,
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
              {/* Status ribbon */}
              {!engaged && rpdLevel === 'poor' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: -28,
                    background: 'var(--danger)',
                    color: 'var(--white)',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '3px 32px',
                    transform: 'rotate(35deg)',
                    zIndex: 1,
                  }}
                >
                  Urgent
                </div>
              )}

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
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: 'var(--brand-navy)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {partner.metrics.experiencedRPD}
                    </span>
                    <TrendIcon
                      direction={getTrend(
                        partner.metrics.experiencedRPD,
                        prevMetrics.experiencedRPD,
                      )}
                      size={18}
                    />
                  </div>
                </div>

                {/* Mini metrics */}
                <div data-tutorial={i === 0 ? 'mini-metrics' : undefined} style={{ display: 'flex', gap: 12 }}>
                  <MiniMetric
                    label="VIS"
                    value={partner.metrics.visibility}
                    trend={getTrend(partner.metrics.visibility, prevMetrics.visibility)}
                  />
                  <MiniMetric
                    label="CVR"
                    value={partner.metrics.conversion}
                    trend={getTrend(partner.metrics.conversion, prevMetrics.conversion)}
                  />
                  <MiniMetric
                    label="REV"
                    value={partner.metrics.revenue}
                    trend={getTrend(partner.metrics.revenue, prevMetrics.revenue)}
                  />
                </div>
              </div>

              {/* Discounts + last contact */}
              <div
                data-tutorial={i === 0 ? 'discount-row' : undefined}
                style={{
                  padding: '8px 16px',
                  borderTop: '1px solid var(--grey-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: 'var(--grey-400)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {partner.discounts.filter((d) => d.status === 'active').length}/
                  {partner.discounts.length} discounts
                  {partner.discounts.some((d) => d.status === 'misconfigured') && (
                    <AlertCircle size={12} style={{ color: 'var(--danger)' }} />
                  )}
                </div>
                <span>
                  {partner.lastContactedRound
                    ? `Contacted R${partner.lastContactedRound}`
                    : 'No contact yet'}
                </span>
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
          ) : (
            <span style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={15} />
              All actions used. Ready to advance.
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
          {currentRound >= 3 ? 'View Results' : 'Advance Round'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  trend,
}: {
  label: string;
  value: number;
  trend: string;
}) {
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
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--grey-700)' }}>
          {value}
        </span>
        <TrendIcon direction={trend as 'up' | 'down' | 'flat'} size={11} />
      </div>
    </div>
  );
}
