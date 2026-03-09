import {
  ArrowLeft,
  MapPin,
  Building2,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Tag,
  FileText,
  History,
  UserCircle,
  ChevronRight,
} from 'lucide-react';
import type { PartnerState } from '../types';
import { getRPDLevel, getTrend } from '../engine/gameEngine';
import {
  RPDBadge,
  RelationshipBadge,
  TrendIcon,
  DiscountBadge,
} from '../components/MetricBadge';

interface PartnerDetailScreenProps {
  partner: PartnerState;
  currentRound: number;
  actionsRemaining: number;
  alreadyEngaged: boolean;
  onStartConversation: (id: string) => void;
  onBack: () => void;
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,53,128,0.2)',
        }}
      >
        {icon}
      </div>
      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em' }}>{label}</h4>
    </div>
  );
}

export function PartnerDetailScreen({
  partner,
  currentRound: _currentRound,
  actionsRemaining,
  alreadyEngaged,
  onStartConversation,
  onBack,
}: PartnerDetailScreenProps) {
  const prevMetrics =
    partner.metricHistory.length > 0
      ? partner.metricHistory[partner.metricHistory.length - 1].metrics
      : partner.metrics;

  const canEngage = !alreadyEngaged && actionsRemaining > 0;

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
      {/* Back nav + Partner header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={onBack}
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--grey-600)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                overflow: 'hidden',
                flexShrink: 0,
                border: `3px solid var(--style-${partner.persona.style})`,
                boxShadow: '0 3px 12px rgba(0,53,128,0.3)',
              }}
            >
              <img
                src={partner.persona.propertyImage}
                alt={partner.persona.propertyName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
                {partner.persona.name}
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: 'var(--grey-400)',
                  fontWeight: 500,
                }}
              >
                <Building2 size={12} />
                {partner.persona.propertyName}
                <span style={{ color: 'var(--grey-200)' }}>|</span>
                <MapPin size={12} />
                {partner.persona.location}
                <span style={{ color: 'var(--grey-200)' }}>|</span>
                {partner.persona.roomCount} rooms
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RPDBadge level={getRPDLevel(partner.metrics.experiencedRPD)} />
          <RelationshipBadge status={partner.relationship} />
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 14,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            overflow: 'auto',
          }}
        >
          {/* Metrics card */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 18,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.3s ease 0.1s backwards',
            }}
          >
            <SectionHeader
              icon={<BarChart3 size={16} style={{ color: 'var(--white)' }} />}
              label="Performance Metrics"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
              }}
            >
              <BigMetric
                label="Exp. RPD"
                value={partner.metrics.experiencedRPD}
                trend={getTrend(partner.metrics.experiencedRPD, prevMetrics.experiencedRPD)}
                highlight
              />
              <BigMetric
                label="Visibility"
                value={partner.metrics.visibility}
                trend={getTrend(partner.metrics.visibility, prevMetrics.visibility)}
              />
              <BigMetric
                label="Conversion"
                value={partner.metrics.conversion}
                trend={getTrend(partner.metrics.conversion, prevMetrics.conversion)}
              />
              <BigMetric
                label="Revenue"
                value={partner.metrics.revenue}
                trend={getTrend(partner.metrics.revenue, prevMetrics.revenue)}
              />
            </div>

            {partner.metrics.rateParity !== 'clean' && (
              <div
                style={{
                  marginTop: 14,
                  padding: '10px 14px',
                  background:
                    partner.metrics.rateParity === 'major' ? 'var(--danger-bg)' : 'var(--warning-bg)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color:
                    partner.metrics.rateParity === 'major' ? 'var(--danger)' : 'var(--warning)',
                  border: `1.5px solid ${partner.metrics.rateParity === 'major' ? 'var(--danger)' : 'var(--warning)'}`,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: partner.metrics.rateParity === 'major' ? 'rgba(204,0,0,0.12)' : 'rgba(232,150,12,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={14} />
                </div>
                {partner.metrics.rateParity === 'major'
                  ? 'Significant rate parity issues across channels'
                  : 'Minor rate parity discrepancies detected'}
              </div>
            )}
          </div>

          {/* Discount products */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 18,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.3s ease 0.2s backwards',
            }}
          >
            <SectionHeader
              icon={<Tag size={16} style={{ color: 'var(--white)' }} />}
              label="Discount Products"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {partner.discounts.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'var(--off-white)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    border: d.status === 'misconfigured'
                      ? '1.5px solid var(--danger)'
                      : '1.5px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background:
                          d.status === 'active'
                            ? 'var(--success-bg)'
                            : d.status === 'misconfigured'
                              ? 'var(--danger-bg)'
                              : 'var(--grey-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {d.status === 'active' && <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />}
                      {d.status === 'inactive' && <XCircle size={14} style={{ color: 'var(--grey-300)' }} />}
                      {d.status === 'misconfigured' && <AlertCircle size={14} style={{ color: 'var(--danger)' }} />}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--grey-700)' }}>{d.label}</span>
                  </div>
                  <DiscountBadge status={d.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Conversation history */}
          {partner.conversationLog.length > 0 && (
            <div
              style={{
                background: 'var(--white)',
                border: '2px solid var(--grey-100)',
                borderRadius: 'var(--radius-lg)',
                padding: 18,
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeIn 0.3s ease 0.3s backwards',
              }}
            >
              <SectionHeader
                icon={<History size={16} style={{ color: 'var(--white)' }} />}
                label="Conversation History"
              />
              {partner.conversationLog.map((log, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 14px',
                    background: 'var(--off-white)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: i < partner.conversationLog.length - 1 ? 8 : 0,
                    fontSize: 13,
                    lineHeight: 1.5,
                    borderLeft: '3px solid var(--brand-blue)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--brand-navy)', marginBottom: 3, fontSize: 12 }}>
                    Round {log.round}
                  </div>
                  <div style={{ color: 'var(--grey-600)', fontStyle: 'italic' }}>
                    "{log.outcome}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            overflow: 'auto',
          }}
        >
          {/* Partner profile */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 18,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.3s ease 0.15s backwards',
            }}
          >
            <SectionHeader
              icon={<UserCircle size={16} style={{ color: 'var(--white)' }} />}
              label="Profile"
            />
            <p style={{ fontSize: 13, color: 'var(--grey-600)', lineHeight: 1.55, marginBottom: 14 }}>
              {partner.persona.description}
            </p>

            <div
              style={{
                padding: '10px 14px',
                background: 'linear-gradient(135deg, rgba(0,53,128,0.05) 0%, rgba(0,74,153,0.08) 100%)',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid rgba(0,53,128,0.12)',
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Commercial Goal
              </div>
              <p style={{ fontSize: 13, color: 'var(--grey-700)', margin: 0, fontWeight: 600 }}>
                {partner.persona.commercialGoal}
              </p>
            </div>

            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--grey-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Notes
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {partner.persona.profileNotes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    color: 'var(--grey-600)',
                    lineHeight: 1.4,
                    padding: '5px 10px',
                    background: 'var(--off-white)',
                    borderRadius: 4,
                    borderLeft: '2px solid var(--grey-200)',
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>

          {/* Action card */}
          <div
            style={{
              background: canEngage
                ? 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)'
                : 'var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              boxShadow: canEngage ? '0 4px 20px rgba(0,53,128,0.3)' : 'var(--shadow-sm)',
              animation: 'fadeIn 0.3s ease 0.25s backwards',
            }}
          >
            {canEngage ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: 'rgba(254,186,2,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MessageSquare size={18} style={{ color: 'var(--brand-yellow)' }} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--white)', margin: 0, fontSize: 15, fontWeight: 800 }}>
                      Ready to engage
                    </h4>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      Uses 1 of {actionsRemaining} actions
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onStartConversation(partner.persona.id)}
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
                    color: 'var(--brand-navy-dark)',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 14,
                    fontWeight: 800,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    boxShadow: '0 3px 14px rgba(254,186,2,0.35)',
                    animation: 'pulseGlow 2s ease infinite',
                  }}
                >
                  <MessageSquare size={15} />
                  Begin Conversation
                  <ChevronRight size={15} />
                </button>
              </>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '12px 0',
                  color: 'var(--grey-500)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--grey-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <FileText size={20} style={{ color: 'var(--grey-400)' }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  {alreadyEngaged ? 'Already engaged this round' : 'No actions remaining'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BigMetric({
  label,
  value,
  trend,
  highlight,
}: {
  label: string;
  value: number;
  trend: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '14px 8px',
        background: highlight
          ? 'linear-gradient(135deg, rgba(0,53,128,0.06) 0%, rgba(0,74,153,0.1) 100%)'
          : 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: highlight ? '1.5px solid rgba(0,53,128,0.15)' : '1.5px solid transparent',
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: 'var(--grey-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: highlight ? 32 : 26,
            fontWeight: 900,
            color: 'var(--brand-navy)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </span>
        <TrendIcon direction={trend as 'up' | 'down' | 'flat'} size={highlight ? 16 : 13} />
      </div>
    </div>
  );
}
