import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Building2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Tag,
  FileText,
  History,
  UserCircle,
  ChevronRight,
  ChevronDown,
  TreeDeciduous,
  TrendingUp,
  Lock,
  CalendarClock,
  Percent,
} from 'lucide-react';
import type {
  PartnerState,
  IssueTreeHelperState,
  PacePerformance,
  DiscountProduct,
  DiscountCategory,
  SecondaryMetricValue,
} from '../types';
import {
  RelationshipBadge,
  DiscountBadge,
} from '../components/MetricBadge';
import { getPersonaById, type SuperPowerPersona } from '../data/characters';
import { getPersonaHint } from '../data/personaHints';
import { IssueTreeHelper } from '../components/IssueTreeHelper';
import { MetricLabel } from '../components/MetricLabel';
import { PriceBucketStrip } from '../components/PriceBucketStrip';
import { metricDefinitions } from '../data/metricDefinitions';

interface PartnerDetailScreenProps {
  partner: PartnerState;
  currentRound: number;
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
  /**
   * True once the learner has opened the Issue Tree Helper at least
   * once. In Round 1 the Begin Conversation button is disabled until
   * this is true - a one-time mandatory walk-through.
   */
  hasOpenedIssueTreeHelper: boolean;
  /** Idempotent flag-setter called the first time the helper is opened. */
  onMarkIssueTreeHelperOpened: () => void;
  onStartConversation: (id: string) => void;
  onBack: () => void;
}

function SectionHeader({ icon, label, bg }: { icon: React.ReactNode; label: string; bg?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: bg ?? 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,53,128,0.2)',
        }}
      >
        {icon}
      </div>
      <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: '-0.01em' }}>{label}</h4>
    </div>
  );
}

export function PartnerDetailScreen({
  partner,
  currentRound,
  alreadyEngaged,
  personaId,
  expandedBlindSpots,
  onMarkBlindSpotExpanded,
  issueTreeHelperStates,
  onSetIssueTreeHelperState,
  hasOpenedIssueTreeHelper,
  onMarkIssueTreeHelperOpened,
  onStartConversation,
  onBack,
}: PartnerDetailScreenProps) {
  // Round 1 gates the Begin Conversation button until the learner
  // has opened the Issue Tree Helper at least once - a one-shot
  // mandatory walk-through. Rounds 2+ the helper stays optional.
  const issueTreeGateBlocks = currentRound === 1 && !hasOpenedIssueTreeHelper;
  // One engagement per round: if a partner has already been engaged
  // (this round) AND the Issue Tree gate is satisfied, the learner is
  // free to start the call. The old explicit action budget was
  // retired in 2026-06 - see engine/gameEngine.ts for the rationale.
  const canEngage = !alreadyEngaged && !issueTreeGateBlocks;

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

  // Tab state for the new R2 tabbed metrics block. Driving Metrics is
  // active in R2; Advanced View ships locked (page 1 "Coming Soon"
  // treatment) and unlocks in R3 with OPC / Quality Adoption content.
  const [activeTab, setActiveTab] = useState<'driving' | 'advanced'>('driving');

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '12px 16px',
        gap: 10,
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
          <RelationshipBadge status={partner.relationship} />
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 10,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
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

          {/* Tabbed metrics block (R2). Driving Metrics tab carries
              the existing KPI row plus the new eRPD Price Bucket strip
              and six secondary metric cards. Advanced View ships
              locked in R2 - content lands in R3 (OPC + Quality
              Adoption metrics). */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 14,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.3s ease 0.1s backwards',
            }}
          >
            <PartnerDetailTabBar
              active={activeTab}
              onSelect={setActiveTab}
            />

            {activeTab === 'driving' && (
              <DrivingMetricsTab partner={partner} />
            )}
            {activeTab === 'advanced' && <AdvancedViewLocked />}
          </div>

          {/* Year-on-Year (PACE) performance - only rendered for
              partners with a `pace` block on their metrics (e.g. John,
              the brand-first scenario). Neutral tones; learner reads
              the numbers and decides what they mean. Stays outside
              the tabbed block so it persists across tab switches and
              survives the R2 -> R3 transition unchanged. */}
          {partner.metrics.pace && (
            <PacePerformanceCard pace={partner.metrics.pace} />
          )}

          {/* Discount products - 3 column layout per Partner Metrics
              PDF page 1: Public Pricing | Genius Pricing |
              Foundations & Payments. Legacy/parked-partner records
              without a category fall back to a single flat list. */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 14,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.3s ease 0.2s backwards',
            }}
          >
            <SectionHeader
              icon={<Tag size={16} style={{ color: 'var(--white)' }} />}
              label="Discount Products"
            />
            <DiscountProductsGrid discounts={partner.discounts} />
            <p
              style={{
                marginTop: 10,
                fontSize: 10.5,
                color: 'var(--grey-400)',
                fontStyle: 'italic',
                lineHeight: 1.45,
              }}
            >
              Note: this is a non-exhaustive list. The products shown
              are commonly used to drive pricing performance and are
              part of this learning solution.
            </p>
          </div>

          {/* Conversation history */}
          {partner.conversationLog.length > 0 && (
            <div
              style={{
                background: 'var(--white)',
                border: '2px solid var(--grey-100)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
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
            gap: 10,
            overflow: 'auto',
          }}
        >
          {/* Partner profile */}
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--grey-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 14,
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

            {/* Last Pricing Contact + Pricing Coverage (QTD) - new in
                R2 per Partner Metrics PDF page 1. Rendered under Notes
                in the same Profile card so the right column stays a
                single block. Both fields are optional - cards hide
                gracefully when a partner doesn't carry them. */}
            <ProfileMetaFields
              lastPricingContact={partner.metrics.lastPricingContact}
              pricingCoverageQTD={partner.metrics.pricingCoverageQTD}
            />
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
                      One engagement per round
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
                  {alreadyEngaged
                    ? 'Already engaged this round'
                    : 'Open the Issue Tree Helper before you engage'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Issue Tree Helper - vertical tab on the right edge opens
          the drawer. Tab hides while the drawer is open so the user
          doesn't see two affordances at once. AnimatePresence runs
          the drawer's exit animation when helperOpen flips to false. */}
      <AnimatePresence>
        {!helperOpen && (
          <HelperLauncherTab
            key="launcher"
            hasProgress={helperState.path.trigger !== undefined}
            onOpen={() => {
              setHelperOpen(true);
              onMarkIssueTreeHelperOpened();
            }}
          />
        )}
        {helperOpen && (
          <IssueTreeHelper
            key="helper-drawer"
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
      </AnimatePresence>
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
        padding: '10px 14px',
        boxShadow: 'var(--shadow-md)',
        animation: 'fadeIn 0.3s ease 0.05s backwards',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '3px 9px',
          borderRadius: 999,
          background: accent,
          color: 'var(--white)',
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: '0.02em',
          marginBottom: 6,
        }}
      >
        <Icon size={11} />
        {persona.powerEffect.unlockedChip}
      </div>
      <p
        style={{
          fontSize: 12.5,
          color: 'var(--grey-700)',
          lineHeight: 1.5,
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
        padding: '10px 14px',
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
            gap: 5,
            padding: '3px 9px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.05)',
            color: accent,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: '0.02em',
            marginBottom: 6,
          }}
        >
          <Icon size={11} />
          {persona.powerEffect.mutedChip}
        </div>
      )}
      <p
        style={{
          fontSize: 12.5,
          color: isOpen ? 'var(--grey-700)' : 'var(--grey-500)',
          lineHeight: 1.5,
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
            marginTop: 6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'transparent',
            border: 'none',
            color: 'var(--brand-navy)',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Reveal blind spot
          <ChevronDown size={13} />
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
  helpText,
  onClick,
  popover,
}: {
  label: string;
  value: string;
  changeText?: string;
  highlight?: boolean;
  /** Optional definition shown via the inline (i) tooltip. */
  helpText?: string;
  /** Optional click handler - turns the whole card into a button. */
  onClick?: () => void;
  /** Optional popover element rendered relative to the card (e.g. the
   *  Active Scenarios list). When set, the card itself becomes
   *  position:relative so the popover can anchor to it. */
  popover?: React.ReactNode;
}) {
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'center',
        padding: '9px 6px',
        background: highlight
          ? 'linear-gradient(135deg, rgba(0,53,128,0.06) 0%, rgba(0,74,153,0.1) 100%)'
          : 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: highlight ? '1.5px solid rgba(0,53,128,0.15)' : '1.5px solid transparent',
        cursor: interactive ? 'pointer' : 'default',
        transition: interactive ? 'transform 0.12s ease, box-shadow 0.12s ease' : undefined,
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,53,128,0.12)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        {helpText ? (
          <MetricLabel label={label} helpText={helpText} align="top-center" />
        ) : (
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              color: 'var(--grey-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: highlight ? 22 : 18,
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
              fontSize: 10.5,
              fontWeight: 700,
              color: 'var(--grey-500)',
            }}
          >
            {changeText}
          </span>
        )}
      </div>
      {popover}
    </div>
  );
}

function PacePerformanceCard({ pace }: { pace: PacePerformance }) {
  // Schema reserved but no real data yet - hide the card so the
  // learner doesn't see a row of zeros. Once the SME provides
  // values, flip dataPending to false (or drop it) and the card
  // appears.
  if (pace.dataPending) return null;

  return (
    <div
      style={{
        background: 'var(--white)',
        border: '2px solid var(--grey-100)',
        borderRadius: 'var(--radius-lg)',
        padding: 14,
        boxShadow: 'var(--shadow-md)',
        animation: 'fadeIn 0.3s ease 0.15s backwards',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <SectionHeader
          icon={<TrendingUp size={16} style={{ color: 'var(--white)' }} />}
          label="Year-on-Year Performance"
        />
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {pace.period} (PACE)
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
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
        padding: '10px 10px',
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
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          color: 'var(--brand-navy)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 4,
        }}
      >
        {current}
      </div>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: 'var(--grey-500)',
          marginBottom: 2,
        }}
      >
        ly {lastYear}
      </div>
      <div
        style={{
          fontSize: 11,
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

// ─────────────────────────────────────────────────────────────────
// R2 additions: tab bar, Driving Metrics tab content, locked
// Advanced View placeholder, secondary-metric cards, 3-column
// discount grid, Active Scenarios popover, and the right-column
// Last Pricing Contact / Pricing Coverage fields.
// ─────────────────────────────────────────────────────────────────

function PartnerDetailTabBar({
  active,
  onSelect,
}: {
  active: 'driving' | 'advanced';
  onSelect: (tab: 'driving' | 'advanced') => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        borderBottom: '1.5px solid var(--grey-100)',
        marginBottom: 12,
        marginLeft: -4,
        marginRight: -4,
      }}
    >
      <TabPill
        label="Driving Metrics"
        isActive={active === 'driving'}
        onClick={() => onSelect('driving')}
      />
      <TabPill
        label="Advanced View"
        isActive={active === 'advanced'}
        // Locked in R2 - clicking is a no-op. The lock icon and "Coming
        // soon" pill carry the affordance.
        locked
        onClick={() => {
          /* no-op while locked - content lands in R3 */
        }}
      />
    </div>
  );
}

function TabPill({
  label,
  isActive,
  locked,
  onClick,
}: {
  label: string;
  isActive: boolean;
  locked?: boolean;
  onClick: () => void;
}) {
  const color = locked
    ? 'var(--grey-300)'
    : isActive
      ? 'var(--brand-navy)'
      : 'var(--grey-500)';
  return (
    <button
      onClick={onClick}
      disabled={locked}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '8px 14px',
        marginBottom: -1.5,
        borderBottom: isActive
          ? '2.5px solid var(--brand-navy)'
          : '2.5px solid transparent',
        color,
        fontSize: 12.5,
        fontWeight: 800,
        letterSpacing: '-0.01em',
        cursor: locked ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {label}
      {locked && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '1px 6px',
            borderRadius: 999,
            background: 'var(--grey-100)',
            color: 'var(--grey-400)',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <Lock size={9} />
          Coming soon
        </span>
      )}
    </button>
  );
}

function DrivingMetricsTab({ partner }: { partner: PartnerState }) {
  const m = partner.metrics;
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const scenarioNames = m.activeScenarioNames;
  const scenariosClickable = !!scenarioNames && scenarioNames.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Existing six-KPI row, kept verbatim but with inline help via
          MetricLabel and the Active Scenarios popover wired in. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
        }}
      >
        <BigMetric
          label={metricDefinitions.erpd.label}
          helpText={metricDefinitions.erpd.helpText}
          value={`${m.erpd.toFixed(1)}%`}
          changeText={`${m.erpdChange < 0 ? '↓' : '↑'}${Math.abs(m.erpdChange).toFixed(2)}`}
          highlight
        />
        <BigMetric
          label={metricDefinitions.rpdPublic.label}
          helpText={metricDefinitions.rpdPublic.helpText}
          value={`${m.rpdPublic.toFixed(1)}%`}
        />
        <BigMetric
          label={metricDefinitions.rpdLoyal.label}
          helpText={metricDefinitions.rpdLoyal.helpText}
          value={`${m.rpdLoyal.toFixed(1)}%`}
        />
        <BigMetric
          label={metricDefinitions.losePricePublic.label}
          helpText={metricDefinitions.losePricePublic.helpText}
          value={`${m.losePricePublic}%`}
        />
        <BigMetric
          label={metricDefinitions.activeScenarios.label}
          helpText={metricDefinitions.activeScenarios.helpText}
          value={`${m.activeScenarios}`}
          onClick={
            scenariosClickable ? () => setScenariosOpen((v) => !v) : undefined
          }
          popover={
            scenariosOpen && scenarioNames ? (
              <ScenariosPopover
                names={scenarioNames}
                onClose={() => setScenariosOpen(false)}
              />
            ) : undefined
          }
        />
        <BigMetric
          label={metricDefinitions.competitor.label}
          helpText={metricDefinitions.competitor.helpText}
          value={m.competitor === 'brand' ? 'Brand.com' : 'Expedia'}
        />
      </div>

      <PriceBucketStrip erpd={m.erpd} />

      {/* Six secondary metric cards per Partner Metrics PDF page 1.
          Cards with no SME-authored value render in a "Data pending"
          state rather than disappearing - keeps the row consistent
          across partners and makes it obvious where the SME still
          owes a number. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
        }}
      >
        <SecondaryMetricCard
          metricKey="last30dAbrn"
          value={m.secondaryMetrics?.last30dAbrn}
          comparator="vs last year"
          format="number"
        />
        <SecondaryMetricCard
          metricKey="last30dRoomNights"
          value={m.secondaryMetrics?.last30dRoomNights}
          comparator="vs peer"
          format="number"
        />
        <SecondaryMetricCard
          metricKey="last30dAdr"
          value={m.secondaryMetrics?.last30dAdr}
          comparator="vs peer"
          format="number"
        />
        <SecondaryMetricCard
          metricKey="last90dPageViews"
          value={m.secondaryMetrics?.last90dPageViews}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="last90dConversion"
          value={m.secondaryMetrics?.last90dConversion}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="next3mRoomNights"
          value={m.secondaryMetrics?.next3mRoomNights}
          comparator="vs peer"
          format="number"
        />
      </div>
    </div>
  );
}

function AdvancedViewLocked() {
  return (
    <div
      style={{
        padding: '36px 18px',
        textAlign: 'center',
        color: 'var(--grey-500)',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          margin: '0 auto 10px',
          borderRadius: 12,
          background: 'var(--grey-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lock size={18} style={{ color: 'var(--grey-400)' }} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--grey-600)', marginBottom: 4 }}>
        Advanced View - coming soon
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.5, maxWidth: 380, margin: '0 auto' }}>
        OPC Metrics and Quality Adoption metrics unlock in the next
        release. For now, stay on Driving Metrics for the data you
        need to diagnose this partner.
      </div>
    </div>
  );
}

/**
 * Single secondary-metric card. Renders the value and the
 * parenthesised comparator, with format-aware rendering: 'number'
 * keeps the value as a plain integer ("1500"), 'percent' suffixes
 * with % ("2%"). A missing comparator renders as the dimmed (xx)
 * placeholder from the PDF mockup. A missing value entirely renders
 * the card in a "Data pending" state.
 */
function SecondaryMetricCard({
  metricKey,
  value,
  comparator,
  format,
}: {
  metricKey: keyof typeof metricDefinitions;
  value: SecondaryMetricValue | undefined;
  comparator: 'vs last year' | 'vs peer';
  format: 'number' | 'percent';
}) {
  const def = metricDefinitions[metricKey];

  if (!value) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '8px 6px',
          background: 'var(--off-white)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px dashed var(--grey-200)',
          opacity: 0.7,
        }}
      >
        <SecondaryMetricLabel label={def.label} helpText={def.helpText} comparator={comparator} />
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--grey-400)',
            marginTop: 6,
            fontStyle: 'italic',
          }}
        >
          Data pending
        </div>
      </div>
    );
  }

  const primary =
    format === 'percent'
      ? `${value.value > 0 ? '+' : ''}${value.value}%`
      : `${value.value.toLocaleString('en-GB')}`;
  const delta =
    value.deltaPct === undefined
      ? '(xx)'
      : `(${value.deltaPct > 0 ? '+' : ''}${value.deltaPct}%)`;
  const deltaIsPending = value.deltaPct === undefined;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '8px 6px',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid transparent',
      }}
    >
      <SecondaryMetricLabel label={def.label} helpText={def.helpText} comparator={comparator} />
      <div
        style={{
          fontSize: 17,
          fontWeight: 900,
          color: 'var(--brand-navy)',
          lineHeight: 1.1,
          marginTop: 4,
          letterSpacing: '-0.02em',
        }}
      >
        {primary}
      </div>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: deltaIsPending ? 'var(--grey-300)' : 'var(--grey-500)',
          marginTop: 2,
        }}
      >
        {delta}
      </div>
    </div>
  );
}

function SecondaryMetricLabel({
  label,
  helpText,
  comparator,
}: {
  label: string;
  helpText: string;
  comparator: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <MetricLabel
        label={label}
        helpText={helpText}
        align="top-center"
        iconSize={10}
      />
      <span
        style={{
          fontSize: 8.5,
          fontWeight: 700,
          color: 'var(--grey-300)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        ({comparator})
      </span>
    </div>
  );
}

function ScenariosPopover({
  names,
  onClose,
}: {
  names: string[];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        onClose();
      }
    }
    // Run after the current click event finishes so the click that
    // opened the popover doesn't immediately close it again.
    const timer = window.setTimeout(() => {
      document.addEventListener('mousedown', onDocClick);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 6px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        background: 'var(--white)',
        border: '1.5px solid var(--grey-200)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 10px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        minWidth: 140,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 18,
          height: 18,
          borderRadius: 4,
          background: 'var(--brand-navy)',
          color: 'var(--white)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label="Close scenarios list"
      >
        <XCircle size={11} />
      </button>
      {names.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--grey-700)',
            textAlign: 'left',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: 'var(--brand-navy)',
              flexShrink: 0,
            }}
          />
          {name}
        </div>
      ))}
    </div>
  );
}

/**
 * Discount Products grouped into the 3-column R2 layout
 * (Public Pricing / Genius Pricing / Foundations & Payments).
 * Records without a `category` field fall back into a flat list
 * rendered below the categorised grid, so parked-partner seed data
 * still displays cleanly.
 */
function DiscountProductsGrid({ discounts }: { discounts: DiscountProduct[] }) {
  const categorised: Record<DiscountCategory, DiscountProduct[]> = {
    'public-pricing': [],
    'genius-pricing': [],
    'foundations-payments': [],
  };
  const uncategorised: DiscountProduct[] = [];
  for (const d of discounts) {
    if (d.category) {
      categorised[d.category].push(d);
    } else {
      uncategorised.push(d);
    }
  }

  const hasCategorised = Object.values(categorised).some((arr) => arr.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {hasCategorised && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          <DiscountColumn title="Public Pricing" items={categorised['public-pricing']} />
          <DiscountColumn title="Genius Pricing" items={categorised['genius-pricing']} />
          <DiscountColumn title="Foundations & Payments" items={categorised['foundations-payments']} />
        </div>
      )}

      {uncategorised.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {uncategorised.map((d) => (
            <DiscountRow key={d.id} item={d} />
          ))}
        </div>
      )}
    </div>
  );
}

function DiscountColumn({
  title,
  items,
}: {
  title: string;
  items: DiscountProduct[];
}) {
  if (items.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 800,
          color: 'var(--grey-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 4,
          paddingLeft: 2,
        }}
      >
        {title}
      </div>
      {items.map((item) => (
        <DiscountRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function DiscountRow({ item }: { item: DiscountProduct }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 10px',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 12,
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            background:
              item.status === 'active' ? 'var(--success-bg)' : 'var(--grey-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {item.status === 'active' && <CheckCircle2 size={10} style={{ color: 'var(--success)' }} />}
          {item.status === 'inactive' && <XCircle size={10} style={{ color: 'var(--grey-300)' }} />}
          {item.status === 'misconfigured' && <AlertCircle size={10} style={{ color: 'var(--grey-500)' }} />}
        </div>
        <span
          style={{
            fontWeight: 600,
            color: 'var(--grey-700)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.label}
        </span>
      </div>
      <DiscountBadge status={item.status} />
    </div>
  );
}

/**
 * Right-hand panel additions per Partner Metrics PDF page 1: shows
 * Last Pricing Contact (date) and Pricing Coverage (QTD) %. Renders
 * nothing when neither field is populated, so partners without the
 * metadata don't get an empty block.
 */
function ProfileMetaFields({
  lastPricingContact,
  pricingCoverageQTD,
}: {
  lastPricingContact?: string;
  pricingCoverageQTD?: number;
}) {
  if (lastPricingContact === undefined && pricingCoverageQTD === undefined) {
    return null;
  }
  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: '1.5px dashed var(--grey-100)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {lastPricingContact !== undefined && (
        <ProfileMetaRow
          icon={<CalendarClock size={14} style={{ color: 'var(--brand-navy)' }} />}
          metricKey="lastPricingContact"
          value={lastPricingContact}
        />
      )}
      {pricingCoverageQTD !== undefined && (
        <ProfileMetaRow
          icon={<Percent size={14} style={{ color: 'var(--brand-navy)' }} />}
          metricKey="pricingCoverageQTD"
          value={`${pricingCoverageQTD}%`}
        />
      )}
    </div>
  );
}

function ProfileMetaRow({
  icon,
  metricKey,
  value,
}: {
  icon: React.ReactNode;
  metricKey: 'lastPricingContact' | 'pricingCoverageQTD';
  value: string;
}) {
  const def = metricDefinitions[metricKey];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ marginTop: 2, flexShrink: 0 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <MetricLabel
          label={def.label}
          helpText={def.helpText}
          labelStyle={{
            fontSize: 10,
            fontWeight: 800,
            color: 'var(--brand-navy)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        />
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--grey-700)' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function HelperLauncherTab({
  hasProgress,
  onOpen,
}: {
  hasProgress: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open Issue Tree Helper"
      title="Issue Tree Helper"
      initial={{ opacity: 0, x: 12, y: '-50%' }}
      animate={{
        opacity: 1,
        x: 0,
        y: '-50%',
        boxShadow: [
          '-4px 6px 14px rgba(254,186,2,0.30)',
          '-4px 6px 26px rgba(254,186,2,0.60)',
          '-4px 6px 14px rgba(254,186,2,0.30)',
        ],
      }}
      exit={{ opacity: 0, x: 12, y: '-50%' }}
      transition={{
        opacity: { duration: 0.18, ease: 'easeOut' },
        x: { duration: 0.18, ease: 'easeOut' },
        boxShadow: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        background:
          'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
        color: 'var(--brand-navy-dark)',
        border: 'none',
        borderTopLeftRadius: 'var(--radius-md)',
        borderBottomLeftRadius: 'var(--radius-md)',
        padding: '18px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 95,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.paddingRight = '20px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.paddingRight = '16px';
      }}
    >
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <TreeDeciduous size={28} strokeWidth={2.2} />
        {hasProgress && (
          <span
            aria-label="In progress"
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--brand-navy-dark)',
              border: '2px solid var(--brand-yellow)',
            }}
          />
        )}
      </span>
    </motion.button>
  );
}
