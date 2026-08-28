import {
  MapPin,
  Building2,
  ChevronRight,
  Globe,
} from 'lucide-react';
import type { PartnerState, MarketContext } from '../types';
import { RelationshipBadge } from '../components/MetricBadge';
import { useIdleNudge } from '../hooks/useIdleNudge';
import { resolvePropertyImage } from '../data/propertyImages';
import { getPersonaTipChip } from '../data/personaHints';
import { getPersonaById, type SuperPowerPersona } from '../data/characters';

interface PortfolioScreenProps {
  partners: PartnerState[];
  actionsThisRound: string[];
  marketContext: MarketContext;
  onSelectPartner: (id: string) => void;
  /** Learner's chosen super-power persona id, for the per-card tip chip. */
  personaId: string | null;
  /** Current round, to resolve the right persona hint per partner. */
  currentRound: number;
  /** Escape hatch if the round resolves to no partner cards (out-of-range
   *  round / desync) - guarantees the learner is never stuck on an empty
   *  portfolio. */
  onReturnToRoundSelect: () => void;
}

export function PortfolioScreen({
  partners,
  actionsThisRound,
  marketContext,
  onSelectPartner,
  personaId,
  currentRound,
  onReturnToRoundSelect,
}: PortfolioScreenProps) {
  const persona = getPersonaById(personaId);
  // If the learner idles on Portfolio, pulse the first partner card
  // to draw the eye back to the primary decision. Enabled unconditionally
  // here - anywhere the screen renders the nudge is desirable.
  useIdleNudge('partner-card', true);

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
          {marketContext.competitorPricing && (
            <span
              style={{
                display: 'block',
                marginTop: 4,
                fontWeight: 500,
                color: 'var(--grey-600)',
              }}
            >
              {marketContext.competitorPricing}
            </span>
          )}
        </span>
      </div>

      {/* Empty-state fallback: if the round somehow resolves to no cards
          (out-of-range round or a state desync), never leave the learner
          on a blank grid with no way forward. */}
      {partners.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 12,
            color: 'var(--grey-500)',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-navy)' }}>
            No partners to show for this round
          </div>
          <div style={{ fontSize: 13, maxWidth: 340, lineHeight: 1.5 }}>
            Something went out of step. Head back to Round Select and pick a
            round to continue.
          </div>
          <button
            onClick={onReturnToRoundSelect}
            style={{
              background: 'var(--brand-yellow)',
              color: 'var(--brand-navy)',
              border: 'none',
              padding: '11px 22px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(254,186,2,0.35)',
            }}
          >
            Return to Round Select
          </button>
        </div>
      ) : (
      /* Partner cards */
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'auto',
          alignContent: 'start',
          gap: 10,
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        {partners.map((partner, i) => {
          const engaged = actionsThisRound.includes(partner.persona.id);
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
                  {/* Left: property info (property name is the headline;
                      contact name appears on the Partner Detail screen
                      once the learner opens the property). */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 14, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {partner.persona.propertyName}
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
                      {partner.persona.companyName ?? partner.persona.propertyType}
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
                      {partner.persona.companyName
                        ? `${partner.persona.numberOfProperties} properties`
                        : `${partner.persona.roomCount} rooms`}
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
                      src={resolvePropertyImage(partner.persona.propertyImage)}
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
                  <RelationshipBadge status={partner.relationship} />
                </div>
              </div>

              {/* Super-power tip chip - the persona's one-line lens on
                  this partner. Shows an authored hint on the priority
                  partner and a generic "read the data" prompt on
                  decoys, so every card carries the cue. */}
              {(() => {
                if (!persona) return null;
                const hint = getPersonaTipChip(
                  partner.persona.id,
                  currentRound,
                  personaId,
                );
                if (!hint) return null;
                return <PersonaTipChip persona={persona} oneLiner={hint.oneLiner} />;
              })()}

              {/* Big RPD number */}
              <div
                data-tutorial={i === 0 ? 'rpd-section' : undefined}
                style={{
                  padding: '8px 16px',
                  background: 'var(--off-white)',
                  borderTop: '1px solid var(--grey-100)',
                  display: 'flex',
                  // Stretch cells so every label pins to the top and every
                  // value to the bottom (space-between below), giving one
                  // top line of titles and one baseline of values.
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'stretch', gap: 14 }}>
                  <div
                    data-tutorial={i === 0 ? 'rpd-number' : undefined}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
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

                  <div
                    data-tutorial={i === 0 ? 'partner-value' : undefined}
                    style={{ display: 'flex' }}
                  >
                    <MiniMetric
                      label="Partner Value"
                      valueText={
                        partner.metrics.partnerValueAbrn != null
                          ? partner.metrics.partnerValueAbrn.toLocaleString('en-US')
                          : '-'
                      }
                    />
                  </div>
                </div>

                {/* KPI mini-row - intentionally neutral; learners read and decide.
                    Cells stretch (alignItems stretch) and each MiniMetric pins its
                    label to the top and value to the bottom, so titles top-align and
                    values baseline-align even though "Scenarios" is a one-line label
                    and the others ("RPD Loyal", "Lose Price") wrap to two. */}
                <div data-tutorial={i === 0 ? 'mini-metrics' : undefined} style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
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
                  {partner.discounts.length} pricing products active
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
      )}

    </div>
  );
}

// Compact per-card persona lens: tinted icon badge + the persona's
// one-liner on this partner. Colour lives in the icon badge and the
// bold label, never a left-border rail.
function PersonaTipChip({
  persona,
  oneLiner,
}: {
  persona: SuperPowerPersona;
  oneLiner: string;
}) {
  const Icon = persona.icon;
  const accent = `var(--style-${persona.accent})`;
  return (
    <div
      style={{
        margin: '0 16px 8px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        padding: '6px 10px',
        background: 'var(--off-white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          background: `${accent}1a`,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <Icon size={12} strokeWidth={2.2} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--grey-700)', lineHeight: 1.4 }}>
        <span style={{ fontWeight: 800, color: accent }}>
          {persona.powerEffect.unlockedChip}:
        </span>{' '}
        {oneLiner}
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
    // Column with the label pinned to the top and the value to the
    // bottom. The parent rows stretch each cell to equal height, so
    // titles top-align and values baseline-align across the row even
    // when some labels wrap to two lines and others don't. No explicit
    // height - the flex stretch supplies a definite one for
    // space-between to distribute against.
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
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
