import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Building2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Tag,
  FileText,
  History,
  UserCircle,
  ChevronRight,
  ChevronDown,
  GitBranch,
  TrendingUp,
} from 'lucide-react';
import type {
  PartnerState,
  IssueTreeHelperState,
  PacePerformance,
} from '../types';
import { getRPDLevel } from '../engine/gameEngine';
import {
  RPDBadge,
  RelationshipBadge,
  DiscountBadge,
} from '../components/MetricBadge';
import { getPersonaById, type SuperPowerPersona } from '../data/characters';
import { getPersonaHint } from '../data/personaHints';
import { IssueTreeHelper } from '../components/IssueTreeHelper';

interface PartnerDetailScreenProps {
  partner: PartnerState;
  currentRound: number;
  actionsRemaining: number;
  alreadyEngaged: boolean;
  /** The learner's selected super-power persona id, or null if none picked. */
  personaId: string | null;
  /** Set of `${partnerId}-${round}` keys whose blind-spot card has been opened. */
  expandedBlindSpots: string[];
  /** Called when the learner expands the blind-spot card. */
  onMarkBlindSpotExpanded: (partnerId: string, round: number) => void;
  /**
   * Saved Issue Tree Helper state per partner-round. Lets the learner
   * close the drawer to peek at metrics and reopen without losing
   * their picks.
   */
  issueTreeHelperStates: Record<string, IssueTreeHelperState>;
  onSetIssueTreeHelperState: (
    partnerId: string,
    round: number,
    state: IssueTreeHelperState,
  ) => void;
  onStartConversation: (id: string) => void;
  onBack: () => void;
}

function SectionHeader({ icon, label, bg }: { icon: React.ReactNode; label: string; bg?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: bg ?? 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
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
  currentRound,
  actionsRemaining,
  alreadyEngaged,
  personaId,
  expandedBlindSpots,
  onMarkBlindSpotExpanded,
  issueTreeHelperStates,
  onSetIssueTreeHelperState,
  onStartConversation,
  onBack,
}: PartnerDetailScreenProps) {
  const canEngage = !alreadyEngaged && actionsRemaining > 0;

  // Resolve the learner's persona + the partner-round hint pair, if any.
  const persona = getPersonaById(personaId);
  const hint = getPersonaHint(partner.persona.id, currentRound, personaId);
  const blindSpotKey = `${partner.persona.id}-${currentRound}`;
  const blindSpotAlreadySeen = expandedBlindSpots.includes(blindSpotKey);
  // Local expand state for the current view. Once expanded, content stays
  // visible until the learner navigates away; on next visit
  // expandedBlindSpots already contains the key and the card is hidden.
  const [blindSpotOpen, setBlindSpotOpen] = useState(false);
  const showBlindSpotCard = !!hint && !blindSpotAlreadySeen;

  function handleExpandBlindSpot() {
    setBlindSpotOpen(true);
    onMarkBlindSpotExpanded(partner.persona.id, currentRound);
  }

  // Issue Tree Helper - opens the guided diagnostic wizard for this
  // partner. Teach-mode only; no scoring or impact on grading. Drawer
  // open/closed state is local; the learner's picks are persisted in
  // GameState so closing and reopening resumes them.
  const [helperOpen, setHelperOpen] = useState(false);
  const helperKey = `${partner.persona.id}-${currentRound}`;
  const helperState = issueTreeHelperStates[helperKey] ?? {
    path: {},
    stepIndex: 0,
  };

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
          {/* Persona insight + blind-spot cards. Only render when the
              learner picked a persona AND a hint exists for this
              partner-round. */}
          {persona && hint && (
            <PersonaInsightCard
              persona={persona}
              copy={hint.unlocked}
            />
          )}
          {persona && hint && showBlindSpotCard && (
            <PersonaBlindSpotCard
              persona={persona}
              teaser={hint.mutedTeaser}
              full={hint.mutedFull}
              isOpen={blindSpotOpen}
              onExpand={handleExpandBlindSpot}
            />
          )}

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
                label="eRPD"
                value={`${partner.metrics.erpd.toFixed(1)}%`}
                changeText={`${partner.metrics.erpdChange < 0 ? '↓' : '↑'}${Math.abs(partner.metrics.erpdChange).toFixed(2)}`}
                highlight
              />
              <BigMetric
                label="RPD Public"
                value={`${partner.metrics.rpdPublic.toFixed(1)}%`}
              />
              <BigMetric
                label="RPD Loyal"
                value={`${partner.metrics.rpdLoyal.toFixed(1)}%`}
              />
              <BigMetric
                label="Lose Price"
                value={`${partner.metrics.losePricePublic}%`}
              />
            </div>

            <div
              style={{
                marginTop: 14,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12,
              }}
            >
              <BigMetric
                label="Active Scenarios"
                value={`${partner.metrics.activeScenarios}`}
              />
              <BigMetric
                label="Top Competitor"
                value={partner.metrics.competitor === 'brand' ? 'Brand.com' : 'Expedia'}
              />
            </div>
          </div>

          {/* Year-on-Year (PACE) performance - only rendered for
              partners with a `pace` block on their metrics (e.g. John,
              the brand-first scenario). Neutral tones; learner reads
              the numbers and decides what they mean. */}
          {partner.metrics.pace && (
            <PacePerformanceCard pace={partner.metrics.pace} />
          )}

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
                    border: '1.5px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background:
                          d.status === 'active' ? 'var(--success-bg)' : 'var(--grey-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {d.status === 'active' && <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />}
                      {d.status === 'inactive' && <XCircle size={14} style={{ color: 'var(--grey-300)' }} />}
                      {d.status === 'misconfigured' && <AlertCircle size={14} style={{ color: 'var(--grey-500)' }} />}
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
              bg={`var(--style-${partner.persona.style})`}
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

      {/* Issue Tree Helper - vertical tab on the right edge opens
          the drawer. Tab hides while the drawer is open so the user
          doesn't see two affordances at once. */}
      {!helperOpen && (
        <HelperLauncherTab
          hasProgress={helperState.path.trigger !== undefined}
          onOpen={() => setHelperOpen(true)}
        />
      )}
      {helperOpen && (
        <IssueTreeHelper
          partnerName={partner.persona.name}
          helperState={helperState}
          onUpdate={(next) =>
            onSetIssueTreeHelperState(
              partner.persona.id,
              currentRound,
              next,
            )
          }
          onClose={() => setHelperOpen(false)}
        />
      )}
    </div>
  );
}

function PersonaInsightCard({
  persona,
  copy,
}: {
  persona: SuperPowerPersona;
  copy: string;
}) {
  const Icon = persona.icon;
  const accent = `var(--style-${persona.accent})`;
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '2px solid var(--grey-100)',
        borderLeft: `4px solid ${accent}`,
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        boxShadow: 'var(--shadow-md)',
        animation: 'fadeIn 0.3s ease 0.05s backwards',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          borderRadius: 999,
          background: accent,
          color: 'var(--white)',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.02em',
          marginBottom: 10,
        }}
      >
        <Icon size={12} />
        {persona.powerEffect.unlockedChip}
      </div>
      <p
        style={{
          fontSize: 13.5,
          color: 'var(--grey-700)',
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {copy}
      </p>
    </div>
  );
}

function PersonaBlindSpotCard({
  persona,
  teaser,
  full,
  isOpen,
  onExpand,
}: {
  persona: SuperPowerPersona;
  teaser: string;
  full: string;
  isOpen: boolean;
  onExpand: () => void;
}) {
  const Icon = persona.icon;
  const accent = `var(--style-${persona.accent})`;
  return (
    <div
      style={{
        background: isOpen ? 'var(--white)' : 'var(--off-white)',
        border: `1.5px dashed ${isOpen ? 'var(--grey-200)' : 'var(--grey-300)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
        animation: 'fadeIn 0.3s ease 0.08s backwards',
        opacity: isOpen ? 1 : 0.78,
        transition: 'opacity 0.2s ease, background 0.2s ease',
      }}
    >
      {!isOpen && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.05)',
            color: accent,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.02em',
            marginBottom: 10,
          }}
        >
          <Icon size={12} />
          {persona.powerEffect.mutedChip}
        </div>
      )}
      <p
        style={{
          fontSize: 13,
          color: isOpen ? 'var(--grey-700)' : 'var(--grey-500)',
          lineHeight: 1.55,
          margin: 0,
          fontStyle: isOpen ? 'normal' : 'italic',
        }}
      >
        {isOpen ? full : teaser}
      </p>
      {!isOpen && (
        <button
          onClick={onExpand}
          style={{
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'transparent',
            border: 'none',
            color: 'var(--brand-navy)',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Reveal blind spot
          <ChevronDown size={14} />
        </button>
      )}
    </div>
  );
}

function BigMetric({
  label,
  value,
  changeText,
  highlight,
}: {
  label: string;
  value: string;
  changeText?: string;
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
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: highlight ? 28 : 22,
            fontWeight: 900,
            color: 'var(--brand-navy)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </span>
        {changeText && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--grey-500)',
            }}
          >
            {changeText}
          </span>
        )}
      </div>
    </div>
  );
}

function PacePerformanceCard({ pace }: { pace: PacePerformance }) {
  return (
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
      <div style={{ marginBottom: 14 }}>
        <SectionHeader
          icon={<TrendingUp size={16} style={{ color: 'var(--white)' }} />}
          label="Year-on-Year Performance"
        />
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginTop: -6,
            marginLeft: 42,
          }}
        >
          {pace.period} (PACE)
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        <PaceRow
          label="Net roomnights"
          current={formatNumber(pace.roomnights.current)}
          lastYear={formatNumber(pace.roomnights.lastYear)}
          change={pace.roomnights.relativeChange}
        />
        <PaceRow
          label={`Net revenue (${pace.revenue.currency})`}
          current={formatNumber(pace.revenue.current)}
          lastYear={formatNumber(pace.revenue.lastYear)}
          change={pace.revenue.relativeChange}
        />
        <PaceRow
          label={`Net ADR (${pace.adr.currency})`}
          current={formatNumber(pace.adr.current)}
          lastYear={formatNumber(pace.adr.lastYear)}
          change={pace.adr.relativeChange}
        />
      </div>
    </div>
  );
}

function PaceRow({
  label,
  current,
  lastYear,
  change,
}: {
  label: string;
  current: string;
  lastYear: string;
  change: number;
}) {
  const arrow = change < 0 ? '↓' : '↑';
  const sign = change < 0 ? '' : '+';
  return (
    <div
      style={{
        padding: '14px 12px',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid transparent',
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: 'var(--grey-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: 'var(--brand-navy)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 6,
        }}
      >
        {current}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--grey-500)',
          marginBottom: 4,
        }}
      >
        ly {lastYear}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--grey-600)',
        }}
      >
        {arrow}
        {sign}
        {change.toFixed(2)}%
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-GB');
}

function HelperLauncherTab({
  hasProgress,
  onOpen,
}: {
  hasProgress: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open Issue Tree Helper"
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        background:
          'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
        color: 'var(--white)',
        border: 'none',
        borderTopLeftRadius: 'var(--radius-md)',
        borderBottomLeftRadius: 'var(--radius-md)',
        padding: '14px 8px 14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        boxShadow: '-4px 6px 16px rgba(0,15,40,0.22)',
        zIndex: 95,
        animation: 'fadeIn 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.paddingRight = '12px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.paddingRight = '8px';
      }}
    >
      <GitBranch size={16} style={{ color: 'var(--brand-yellow)' }} />
      <span
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        Issue Tree Helper
      </span>
      {hasProgress && (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--brand-yellow)',
            boxShadow: '0 0 0 2px rgba(254,186,2,0.25)',
          }}
          aria-label="In progress"
        />
      )}
    </button>
  );
}
