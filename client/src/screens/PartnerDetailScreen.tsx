import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Tag,
  FileText,
  History,
  UserCircle,
  ChevronRight,
  CalendarClock,
  Percent,
  Info,
} from 'lucide-react';
import type {
  PartnerState,
  IssueTreeHelperState,
  DiscountProduct,
  DiscountCategory,
  SecondaryMetricValue,
} from '../types';
import {
  RelationshipBadge,
  DiscountBadge,
} from '../components/MetricBadge';
import { getPersonaById, type SuperPowerPersona } from '../data/characters';
import { getPersonaTipChip } from '../data/personaHints';
import { IssueTreeHelper } from '../components/IssueTreeHelper';
import { PathwayGlyph } from '../components/PathwayGlyph';
import { getBranchingScenario } from '../data/branchingScenarios';
import { getConversationTree } from '../data/conversations';
import { MetricLabel } from '../components/MetricLabel';
import { PriceBucketStrip } from '../components/PriceBucketStrip';
import { metricDefinitions } from '../data/metricDefinitions';
import { resolvePropertyImage } from '../data/propertyImages';
import { useIdleNudge } from '../hooks/useIdleNudge';

/** Learner-facing label for a partner's real parity regime (KAM pill). */
const REGIME_LABEL: Record<string, string> = {
  wide: 'Wide Parity',
  narrow: 'Narrow Parity',
  none: 'No Parity',
  'cross-regional': 'Cross Regional',
};

interface PartnerDetailScreenProps {
  partner: PartnerState;
  currentRound: number;
  alreadyEngaged: boolean;
  /** The learner's selected super-power persona id, or null if none picked. */
  personaId: string | null;
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
  // A conversation must actually exist for this partner-round, otherwise
  // startConversation is a silent no-op and Begin Conversation would look
  // like a dead button. Every reachable card (priority + decoys) has a
  // registered scenario today; this guard keeps the CTA honest if a
  // roster/round edit ever leaves a card without one.
  const hasConversation =
    !!getBranchingScenario(partner.persona.id, currentRound) ||
    !!getConversationTree(partner.persona.id, currentRound);
  // One engagement per round: if a partner has already been engaged
  // (this round) AND the Issue Tree gate is satisfied, the learner is
  // free to start the call. The old explicit action budget was
  // retired in 2026-06 - see engine/gameEngine.ts for the rationale.
  const canEngage = !alreadyEngaged && !issueTreeGateBlocks && hasConversation;

  // Resolve the learner's persona + the partner-round hint pair, if any.
  const persona = getPersonaById(personaId);
  const hint = getPersonaTipChip(partner.persona.id, currentRound, personaId);

  // Issue Tree Helper - opens the guided diagnostic wizard for this
  // partner. Teach-mode only; no scoring or impact on grading. Drawer
  // open/closed state is local; the learner's picks are persisted in
  // GameState so closing and reopening resumes them.
  const [helperOpen, setHelperOpen] = useState(false);

  // Which edge the Pathway drawer + launcher tab dock to. The drawer is
  // an overlay, so on screens where the docked side sits over content the
  // learner needs, they flip it to the clear side. Persisted to
  // localStorage (a plain UI preference, not game state) so the choice
  // sticks across visits. Not a network call - localStorage is allowed.
  const [dockSide, setDockSide] = useState<'left' | 'right'>(() => {
    try {
      return localStorage.getItem('rateRight:pathwayDock') === 'left'
        ? 'left'
        : 'right';
    } catch {
      return 'right';
    }
  });
  const toggleDock = () =>
    setDockSide((s) => {
      const next = s === 'right' ? 'left' : 'right';
      try {
        localStorage.setItem('rateRight:pathwayDock', next);
      } catch {
        /* ignore - private mode / quota */
      }
      return next;
    });

  // Idle-nudge target picks the primary next action for the learner's
  // current gate state: Round 1 with an unopened Helper needs the
  // yellow tree tab; everything else (Helper opened, or R2+) is
  // waiting on Begin Conversation. Disabled while the Helper drawer is
  // open - the drawer covers the entire right column including Begin
  // Conversation, so a pulse behind it would be invisible, and the
  // learner isn't stuck on the CTA anyway (they're mid-diagnostic).
  // The nudge resumes when they close the drawer.
  useIdleNudge(
    issueTreeGateBlocks ? 'partner-detail-tree-tab' : 'partner-detail-action',
    !helperOpen,
  );
  const helperKey = `${partner.persona.id}-${currentRound}`;
  const helperState = issueTreeHelperStates[helperKey] ?? {
    path: {},
    stepIndex: 0,
  };

  // Tab state for the tabbed metrics block. Driving Metrics is always
  // available. The "On Platform Competitiveness" (OPC) tab is only
  // unlocked in the OPC-active window: Level 2 rounds (11-20) for the
  // standard journey, and every round of the Cross-Regional / KAM
  // journey (OPC metrics run in all ten of their rounds). Level 1
  // rounds keep the tab locked with the "Coming soon" pill.
  // OPC unlocks from round 11 in every journey (standard Level 2 and KAM
  // Level 2 both run rounds 11-20). KAM Level 1 (rounds 1-10) stays locked
  // - the old `parityRegime === 'cross-regional'` clause wrongly unlocked
  // it there, so it's dropped.
  const opcUnlocked = currentRound >= 11;
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

          <div data-tutorial="partner-detail-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                src={resolvePropertyImage(partner.persona.propertyImage)}
                alt={partner.persona.propertyName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
                {partner.persona.propertyName}
              </h2>
              {partner.persona.companyName && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--grey-500)',
                    marginTop: 1,
                  }}
                >
                  {partner.persona.companyName}
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: 'var(--grey-400)',
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                <UserCircle size={12} />
                {partner.persona.name}
                <span style={{ color: 'var(--grey-200)' }}>|</span>
                <MapPin size={12} />
                {partner.persona.location}
                {!partner.persona.companyName && (
                  <>
                    <span style={{ color: 'var(--grey-200)' }}>|</span>
                    {partner.persona.roomCount} rooms
                  </>
                )}
              </div>
              {partner.persona.companyName && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                    marginTop: 6,
                  }}
                >
                  {[
                    partner.persona.parityRegime
                      ? REGIME_LABEL[partner.persona.parityRegime]
                      : null,
                    `${partner.persona.numberOfProperties} properties`,
                    partner.persona.hqLocation ? `HQ: ${partner.persona.hqLocation}` : null,
                    partner.persona.partnerType,
                  ]
                    .filter(Boolean)
                    .map((pill) => (
                      <span
                        key={pill as string}
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: 'var(--brand-navy)',
                          background: 'var(--off-white)',
                          border: '1px solid var(--grey-200)',
                          borderRadius: 20,
                          padding: '2px 9px',
                        }}
                      >
                        {pill}
                      </span>
                    ))}
                </div>
              )}
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
              partner-round. The two cards lay out side-by-side to
              save vertical space - once the blind-spot has been seen
              (and so doesn't render any more), the insight card
              stretches to fill the row. */}
          {persona && hint && (
            <PersonaLensChip persona={persona} oneLiner={hint.oneLiner} />
          )}

          {/* Tabbed metrics block (R2). Driving Metrics tab carries
              the existing KPI row plus the new eRPD Price Bucket strip
              and six secondary metric cards. Advanced View ships
              locked in R2 - content lands in R3 (OPC + Quality
              Adoption metrics). */}
          <div
            data-tutorial="partner-detail-tabs"
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
              opcUnlocked={opcUnlocked}
            />

            {activeTab === 'driving' && (
              <DrivingMetricsTab partner={partner} />
            )}
            {/* The OPC tab is only selectable when unlocked (the locked
                tab is disabled), so reaching 'advanced' implies
                opcUnlocked. */}
            {activeTab === 'advanced' && <OpcMetricsTab partner={partner} />}
          </div>

          {/* Discount products - 3 column layout per Partner Metrics
              PDF page 1: Public Pricing | Genius Pricing |
              Foundations & Payments. Legacy/parked-partner records
              without a category fall back to a single flat list. */}
          <div
            data-tutorial="partner-detail-discounts"
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
              label="Products"
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
              Note: the products shown are a selection of the commonly
              used products to drive pricing performance and are part of
              this learning solution.
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
            data-tutorial="partner-detail-profile"
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

            {/* Last Pricing Contact + Pricing Coverage (QTD) - new in
                R2 per Partner Metrics PDF page 1. Rendered inside the
                Profile card so the right column stays a single block.
                Both fields are optional - cards hide gracefully when a
                partner doesn't carry them. */}
            <ProfileMetaFields
              lastPricingContactDaysAgo={partner.metrics.lastPricingContactDaysAgo}
              pricingCoverageQTD={partner.metrics.pricingCoverageQTD}
            />
          </div>

          {/* Action card */}
          <div
            data-tutorial="partner-detail-action"
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
                    padding: '18px 28px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 17,
                    fontWeight: 800,
                    letterSpacing: '0.01em',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxShadow: '0 6px 22px rgba(254,186,2,0.42)',
                    animation: 'pulseGlow 2s ease infinite',
                  }}
                >
                  <MessageSquare size={20} />
                  Begin Conversation
                  <ChevronRight size={20} />
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
                    : !hasConversation
                      ? 'No call set up for this partner this round'
                      : 'Open The Pricing Pathway before you engage'}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--grey-400)', marginTop: 4, lineHeight: 1.45 }}>
                  {alreadyEngaged
                    ? 'The round advances from the call report. Use Back (top left) to review the other partners.'
                    : !hasConversation
                      ? 'Use Back (top left) and pick the partner who needs you most.'
                      : 'Tap the yellow tab on the right to open it.'}
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
            side={dockSide}
            onOpen={() => {
              setHelperOpen(true);
              onMarkIssueTreeHelperOpened();
            }}
          />
        )}
        {helperOpen && (
          <IssueTreeHelper
            // Key includes the dock side so flipping edges runs a clean
            // slide-out / slide-in via AnimatePresence rather than an
            // instant re-anchor. Picks are held in GameState, so the
            // remount loses nothing.
            key={`helper-drawer-${dockSide}`}
            side={dockSide}
            onToggleDock={toggleDock}
            partnerName={partner.persona.name}
            partnerFirstName={partner.persona.name.split(' ')[0]}
            suggestedPath={
              getBranchingScenario(partner.persona.id, currentRound)
                ?.issueTreePath
            }
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

/**
 * A single compact chip that acts as the learner's persona lens on
 * the partner. Replaced the insight + blind-spot cards in 2026-07 -
 * user testing said the two-card block was too much copy for what
 * amounted to one pre-call cue. The chip stays visible on every
 * visit; the one-line copy is the entire hint.
 */
function PersonaLensChip({
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
        background: 'var(--white)',
        // Full coloured border in the persona accent (green/yellow/red/
        // blue per persona) - a full box border, not a left-rail handle.
        border: `1.5px solid ${accent}`,
        borderRadius: 'var(--radius-md)',
        padding: '9px 12px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        animation: 'fadeIn 0.3s ease 0.05s backwards',
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: `${accent}1a`,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={14} strokeWidth={2.2} />
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: 'var(--grey-700)',
          lineHeight: 1.45,
        }}
      >
        <span style={{ fontWeight: 800, color: accent }}>
          {persona.powerEffect.unlockedChip}:
        </span>{' '}
        {oneLiner}
      </div>
    </div>
  );
}

function BigMetric({
  label,
  value,
  changeText,
  highlight,
  helpText,
}: {
  label: string;
  value: string;
  changeText?: string;
  highlight?: boolean;
  /**
   * Optional tooltip body for the inline (i) icon. Plain strings get
   * the default definition styling; pass a ReactNode for tooltips
   * that surface live data (e.g. the active scenarios list).
   */
  helpText?: React.ReactNode;
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '9px 6px',
        background: highlight
          ? 'linear-gradient(135deg, rgba(0,53,128,0.06) 0%, rgba(0,74,153,0.1) 100%)'
          : 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: highlight ? '1.5px solid rgba(0,53,128,0.15)' : '1.5px solid transparent',
        // Flex column + bottom-anchored value so the numbers line up
        // across the row even when some labels wrap to two lines and
        // others don't. Grid stretches every card to the row height.
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
          marginTop: 'auto',
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
    </div>
  );
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
  opcUnlocked,
}: {
  active: 'driving' | 'advanced';
  onSelect: (tab: 'driving' | 'advanced') => void;
  opcUnlocked: boolean;
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
        label="On Platform Competitiveness"
        isActive={active === 'advanced'}
        // Unlocked in the OPC-active window (Level 2 rounds + every KAM
        // round); locked otherwise, where the lock icon and "Coming
        // soon" pill carry the affordance and clicking is a no-op.
        locked={!opcUnlocked}
        onClick={() => onSelect('advanced')}
      />
      {/* Info (i) beside the OPC tab explaining when it unlocks. Sits
          OUTSIDE the TabPill button: a disabled button swallows hover
          events, so an in-button tooltip wouldn't fire while the tab is
          locked - which is exactly when the learner needs the reason. */}
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <MetricLabel
          label=""
          helpText="These metrics unlock in Level 2 (rounds 11-20)."
          align="top-center"
          iconSize={13}
        />
      </span>
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
      {/* Locked tabs (OPC on Level 1) render greyed + unclickable via
          the grey color + not-allowed cursor + disabled attr above.
          No "Coming soon" pill - the tab is a live feature that unlocks
          in later rounds, not a future release. */}
      {label}
    </button>
  );
}

function DrivingMetricsTab({ partner }: { partner: PartnerState }) {
  const m = partner.metrics;
  // Scenarios tooltip surfaces live partner data, not a definition
  // (the metric name is common knowledge for the audience). Style
  // is intentionally different from the other tiles' tooltips - a
  // small yellow header + bullet list reads as "this is the value"
  // rather than "this is what the metric means".
  const scenarioNames = m.activeScenarioNames;
  const scenariosHelp =
    scenarioNames && scenarioNames.length > 0 ? (
      <ScenariosTooltipBody names={scenarioNames} />
    ) : (
      'No active scenarios on this partner.'
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Discoverability hint for the MetricLabel info-icon affordance.
          Surfaces the (i) icon as an interactive element rather than
          decoration - testers won't necessarily hover on instinct. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: 'var(--grey-400)',
          fontStyle: 'italic',
          lineHeight: 1.45,
          marginTop: -4,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          Hover any{' '}
          <Info size={12} style={{ color: 'var(--grey-400)', flexShrink: 0 }} />
          {' '}for the metric definition.
        </span>
      </div>

      {/* Existing six-KPI row, kept verbatim but with inline help via
          MetricLabel on every tile. No tiles are clickable - hover
          the (i) icon to reveal the metric definition (and, for
          Scenarios, the list of currently-active ones). */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
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
          label={metricDefinitions.partnerValueAbrn.label}
          helpText={metricDefinitions.partnerValueAbrn.helpText}
          value={
            m.partnerValueAbrn !== undefined
              ? m.partnerValueAbrn.toLocaleString('en-US')
              : '-'
          }
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
          helpText={scenariosHelp}
          value={`${m.activeScenarios}`}
        />
        <BigMetric
          label={metricDefinitions.competitor.label}
          helpText={metricDefinitions.competitor.helpText}
          value={m.competitor === 'brand' ? 'Brand.com' : 'Key OTA'}
        />
      </div>

      <div data-tutorial="partner-detail-bucket-strip">
        <PriceBucketStrip erpd={m.erpd} />
      </div>

      {/* Six secondary metric cards per Partner Metrics PDF page 1.
          Cards with no SME-authored value render in a "Data pending"
          state rather than disappearing - keeps the row consistent
          across partners and makes it obvious where the SME still
          owes a number. */}
      <div
        data-tutorial="partner-detail-secondary"
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
          format="number"
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

/**
 * On Platform Competitiveness tab - the seven OPC metric cards.
 * Structurally identical to the Driving Metrics secondary-card row and
 * reuses SecondaryMetricCard, so cards render in a "Data pending" state
 * until per-partner OPC numbers are wired onto PartnerMetrics.opcMetrics.
 * Only rendered when the tab is unlocked (Level 2 rounds + every KAM
 * round) - the lock gate lives in PartnerDetailTabBar / the caller.
 */
function OpcMetricsTab({ partner }: { partner: PartnerState }) {
  const opc = partner.metrics.opcMetrics;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: 'var(--grey-400)',
          fontStyle: 'italic',
          lineHeight: 1.45,
          marginTop: -4,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          On-platform competitiveness metrics. Hover any{' '}
          <Info size={12} style={{ color: 'var(--grey-400)', flexShrink: 0 }} />
          {' '}for the definition.
        </span>
      </div>

      {/* Seven OPC cards. All comparators are vs peer. Cards with no
          authored value render "Data pending" so the grid stays
          consistent and it's obvious where numbers are still owed. */}
      <div
        data-tutorial="partner-detail-opc"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        <SecondaryMetricCard
          metricKey="unsoldRooms"
          value={opc?.unsoldRooms}
          comparator="vs peer"
          format="number"
        />
        <SecondaryMetricCard
          metricKey="sellThroughRate"
          value={opc?.sellThroughRate}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="distributionOfSearch"
          value={opc?.distributionOfSearch}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="visibilityShare"
          value={opc?.visibilityShare}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="clickThroughRate"
          value={opc?.clickThroughRate}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="conversion"
          value={opc?.conversion}
          comparator="vs peer"
          format="percent"
        />
        <SecondaryMetricCard
          metricKey="searchPrice"
          value={opc?.searchPrice}
          comparator="vs peer"
          format="number"
        />
      </div>
    </div>
  );
}

/**
 * Tooltip body for the Scenarios tile. Styled deliberately differently
 * from the prose-style tooltips used elsewhere (small brand-yellow
 * header + bullet list) so a learner can tell at a glance this is
 * live data, not a definition of what "Scenarios" means.
 */
function ScenariosTooltipBody({ names }: { names: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 800,
          color: 'var(--brand-yellow)',
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
        }}
      >
        Current scenarios
      </div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {names.map((name) => (
          <li
            key={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: 'var(--brand-yellow)',
                flexShrink: 0,
              }}
            />
            {name}
          </li>
        ))}
      </ul>
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
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <SecondaryMetricLabel label={def.label} helpText={def.helpText} comparator={comparator} />
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--grey-400)',
            marginTop: 'auto',
            fontStyle: 'italic',
          }}
        >
          Data pending
        </div>
      </div>
    );
  }

  // When a peer benchmark is supplied, the value is an absolute figure
  // shown side-by-side with the peer (no leading '+' and no delta paren);
  // otherwise it stays the signed-delta / value-only convention.
  const hasPeer = value.peerValue !== undefined;
  const primary =
    format === 'percent'
      ? `${!hasPeer && value.value > 0 ? '+' : ''}${value.value}%`
      : `${value.value.toLocaleString('en-GB')}`;
  const delta = hasPeer
    ? `${value.peerValue}${format === 'percent' ? '%' : ''} peer`
    : value.deltaPct === undefined
      ? '(xx)'
      : `(${value.deltaPct > 0 ? '+' : ''}${value.deltaPct}%)`;
  const deltaIsPending = !hasPeer && value.deltaPct === undefined;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '8px 6px',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid transparent',
        // Bottom-anchor the value so numbers align across the row
        // regardless of how many lines each label wraps to.
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <SecondaryMetricLabel label={def.label} helpText={def.helpText} comparator={comparator} />
      <div
        style={{
          fontSize: 17,
          fontWeight: 900,
          color: 'var(--brand-navy)',
          lineHeight: 1.1,
          marginTop: 'auto',
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

/**
 * Discount Products grouped into the 3-column R2 layout
 * (Public Pricing / Genius Pricing / Foundations & Payments).
 * Records without a `category` field fall back into a flat list
 * rendered below the categorized grid, so parked-partner seed data
 * still displays cleanly.
 */
function DiscountProductsGrid({ discounts }: { discounts: DiscountProduct[] }) {
  const categorized: Record<DiscountCategory, DiscountProduct[]> = {
    'public-pricing': [],
    'genius-pricing': [],
    'foundations-payments': [],
  };
  const uncategorised: DiscountProduct[] = [];
  for (const d of discounts) {
    if (d.category) {
      categorized[d.category].push(d);
    } else {
      uncategorised.push(d);
    }
  }

  const hasCategorised = Object.values(categorized).some((arr) => arr.length > 0);

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
          <DiscountColumn title="Public Pricing" items={categorized['public-pricing']} />
          <DiscountColumn title="Genius Pricing" items={categorized['genius-pricing']} />
          <DiscountColumn title="Foundations & Payments" items={categorized['foundations-payments']} />
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
 *
 * lastPricingContactDaysAgo is stored as a relative offset and
 * resolved here against the current date. That keeps the "time
 * since last contact" gap constant across replays - a learner
 * returning in six months sees the same recency, not a stale date.
 */
function ProfileMetaFields({
  lastPricingContactDaysAgo,
  pricingCoverageQTD,
}: {
  lastPricingContactDaysAgo?: number;
  pricingCoverageQTD?: number;
}) {
  if (
    lastPricingContactDaysAgo === undefined &&
    pricingCoverageQTD === undefined
  ) {
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
      {lastPricingContactDaysAgo !== undefined && (
        <ProfileMetaRow
          icon={<CalendarClock size={14} style={{ color: 'var(--brand-navy)' }} />}
          metricKey="lastPricingContact"
          value={`${lastPricingContactDaysAgo} days ago`}
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
  onOpen,
  side,
}: {
  onOpen: () => void;
  side: 'left' | 'right';
}) {
  const isLeft = side === 'left';
  // Slide the tab in from whichever edge it docks to, and mirror the
  // glow shadow's horizontal offset so it always reads as sitting on
  // that edge. Rounded corners face inward (toward the screen centre).
  const offX = isLeft ? -12 : 12;
  const shadowX = isLeft ? '6px' : '-6px';
  const hoverPad = isLeft ? 'paddingLeft' : 'paddingRight';
  return (
    <motion.button
      data-tutorial="partner-detail-tree-tab"
      onClick={onOpen}
      aria-label="Open The Pricing Pathway"
      title="The Pricing Pathway"
      initial={{ opacity: 0, x: offX, y: '-50%' }}
      animate={{
        opacity: 1,
        x: 0,
        y: '-50%',
        boxShadow: [
          `${shadowX} 8px 18px rgba(254,186,2,0.40)`,
          `${shadowX} 8px 34px rgba(254,186,2,0.75)`,
          `${shadowX} 8px 18px rgba(254,186,2,0.40)`,
        ],
      }}
      exit={{ opacity: 0, x: offX, y: '-50%' }}
      transition={{
        opacity: { duration: 0.18, ease: 'easeOut' },
        x: { duration: 0.18, ease: 'easeOut' },
        boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        position: 'fixed',
        top: '50%',
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        background:
          'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
        color: 'var(--brand-navy-dark)',
        border: 'none',
        borderTopLeftRadius: isLeft ? 0 : 'var(--radius-lg)',
        borderBottomLeftRadius: isLeft ? 0 : 'var(--radius-lg)',
        borderTopRightRadius: isLeft ? 'var(--radius-lg)' : 0,
        borderBottomRightRadius: isLeft ? 'var(--radius-lg)' : 0,
        padding: '24px 20px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        cursor: 'pointer',
        zIndex: 95,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style[hoverPad] = '26px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style[hoverPad] = '20px';
      }}
    >
      <PathwayGlyph size={38} color="var(--brand-navy-dark)" strokeWidth={2.6} />
      {/* Framework name stacked as three lines. */}
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 900,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          lineHeight: 1.15,
          textAlign: 'center',
        }}
      >
        The<br />
        Pricing<br />
        Pathway
      </span>
    </motion.button>
  );
}
