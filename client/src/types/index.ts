// ── Rate Right - Core Types ──

export type CommunicationStyle = 'red' | 'yellow' | 'green' | 'blue';

export type RelationshipStatus = 'warm' | 'neutral' | 'cool' | 'strained';

// ── Journey-level types (Levels 0 / 1 / 2) ──

/** The current level in the learning journey. Level 2 is post-MVP. */
export type Level = 0 | 1 | 2;

/**
 * Parity regime for a partner / market. Drives which conversation moves are legal.
 * Sourced from the Booking.com legal compliance guidance: Wide / Narrow / No-Parity,
 * plus a Cross-Regional bucket for large corporate hotels and chains that operate
 * under different rules.
 */
export type ParityRegime = 'wide' | 'narrow' | 'none' | 'cross-regional';

/**
 * The learner's chosen parity regime, captured at the start of clearance.
 * Drives which partners they see in the portfolio (filtered to that
 * regime's countries) and which conversation moves are legal.
 */
export interface LearnerMarket {
  parityRegime: ParityRegime;
}

/**
 * A character-build strength chosen by the learner. Final shape (option B+C from
 * design discussions) lands when SMEs deliver the spec; this is a flexible
 * placeholder that supports a name + description + optional icon key.
 */
export interface LearnerStrength {
  id: string;
  name: string;
  description: string;
  iconKey?: string;
}

/**
 * The learner's character archetype - derived from their chosen strengths.
 * Optional until the build is complete.
 */
export interface CharacterArchetype {
  id: string;
  name: string;
  flavourText: string;
}

/**
 * Persistent learner identity across levels. Built up through Level 0 and
 * carried forward into Levels 1+. Null until the learner completes the
 * relevant Level 0 steps.
 */
export interface LearnerProfile {
  market: LearnerMarket | null;
  strengths: LearnerStrength[];
  archetype: CharacterArchetype | null;
  /**
   * Selected avatar id from the character library. Visual identity only -
   * the gameplay/persona impact is carried by the archetype.
   */
  avatarId: string | null;
  /**
   * Player's first name. Pre-SCORM default is the literal placeholder
   * "Name_Var" so it's obvious in tests when the LMS-provided name is
   * not yet wired up. Once wrapped, SCORM cmi.core.student_name overrides this.
   */
  playerName: string;
  /** Levels the learner has cleared. */
  completedLevels: Level[];
  /** Aggregate XP across all activities. */
  xp: number;
}

// ── Level 0 progress tracking ──

export interface KnowledgeCheckResult {
  itemId: string;
  correct: boolean;
  attempts: number;
}

export interface Level0Progress {
  knowledgeCheckResults: KnowledgeCheckResult[];
  signalVsProofCompleted: boolean;
  emailAuditCompleted: boolean;
  inboxTriageCompleted: boolean;
  /** True once the learner has met the pass threshold and proceeded to Level 1. */
  cleared: boolean;
  /**
   * The parity regime the learner cleared under. Null before clearance
   * and set on the Clearance Summary continue when they pass. On a
   * return visit, if they switch to a different regime at Market
   * Select the app routes them through the Call Audit again (each
   * regime has its own phrase set and compliance rules) before
   * dropping them into the Round Select hub. Full clearance is not
   * re-required - only the regime-specific audit.
   */
  clearedForRegime: ParityRegime | null;
}

// ── Level 1 outcome-stage types ──

/**
 * A simplified cause family used in the Level 1 diagnose step. The full
 * 7-column Pricing Issue Tree replaces this post-MVP.
 */
export interface DiagnosisCauseFamily {
  id: string;
  label: string;
  description: string;
  /** Which partner-data signals make this cause plausible. */
  signalsHinting: string[];
}

export interface Level1Diagnosis {
  partnerId: string;
  chosenCauseFamilyId: string;
  /** Round in which this diagnosis was made. */
  round: number;
}

/** Result of the Escalate vs Continue decision step. */
export type EscalateDecision = 'escalate' | 'continue';

export interface Level1ActionPlan {
  partnerId: string;
  /** Action plan content shape lands when the SME template is shared. */
  payload: Record<string, unknown>;
}

export type TrendDirection = 'up' | 'flat' | 'down';

export type RPDLevel = 'competitive' | 'slightly-below' | 'below' | 'poor';

export type RateParityStatus = 'clean' | 'minor' | 'major';

/**
 * Discount product IDs. Reorganised in R2 into three categories
 * (Public Pricing, Genius Pricing, Foundations & Payments) per the
 * Partner Metrics PDF page 1. The legacy `genius`, `last-minute`,
 * and `early-booker` IDs survive in the union so the parked partner
 * seed data in data/partners.ts doesn't have to be rebuilt - those
 * partners are not in the active No-Parity rotation today.
 */
export type DiscountProductId =
  // Public Pricing
  | 'mobile-rate'
  | 'country-rate'
  | 'portfolio-deals'
  | 'campaigns'
  // Genius Pricing
  | 'genius-programme'
  | 'genius-15'
  | 'genius-20'
  | 'genius-dynamic'
  // Foundations & Payments
  | 'base-rate-plan'
  | 'family-rates'
  | 'payments'
  // Legacy IDs retained for parked-partner seed data
  | 'genius'
  | 'last-minute'
  | 'early-booker';

export type DiscountStatus = 'active' | 'inactive' | 'misconfigured';

/**
 * Three-column grouping shown on Partner Detail. Drives which column
 * the discount product renders into. Legacy / parked-partner records
 * without a category fall back to a single-list rendering.
 */
export type DiscountCategory =
  | 'public-pricing'
  | 'genius-pricing'
  | 'foundations-payments';

export interface DiscountProduct {
  id: DiscountProductId;
  label: string;
  status: DiscountStatus;
  /** R2 3-column grouping. Undefined for legacy/parked seed data. */
  category?: DiscountCategory;
}

/**
 * Secondary metric card on the Driving Metrics tab. One of six on
 * the Partner Detail screen per PDF page 1. `deltaPct` undefined
 * means the comparator is "data pending" (rendered as the dimmed
 * `(xx)` placeholder from the mockup); the primary value still
 * renders. Both value and deltaPct undefined => the card is hidden.
 */
export interface SecondaryMetricValue {
  value: number;
  deltaPct?: number;
  /**
   * Optional peer-group absolute value for the comparator line, used
   * by OPC metrics where the SME data gives both the partner's figure
   * AND the peer benchmark (e.g. Visibility Share 10.3% vs 17.9% peer).
   * When set, the card renders "{peerValue} peer" instead of the
   * parenthesised deltaPct - it's a side-by-side benchmark, not a
   * delta. Only Visibility Share carries it today; the other OPC
   * cards keep the value-only / deltaPct convention.
   */
  peerValue?: number;
}

/**
 * The six secondary metrics on Partner Detail. Every field is
 * optional so partners can be partially populated as SME data
 * arrives. Missing fields render as "Data pending" cards rather
 * than disappearing - the slot stays consistent across partners.
 */
export interface PartnerSecondaryMetrics {
  /** Last 30D ABRN, comparator is vs last year. */
  last30dAbrn?: SecondaryMetricValue;
  /** Last 30D Room Nights, comparator is vs peer. */
  last30dRoomNights?: SecondaryMetricValue;
  /** Last 30D ADR, comparator is vs peer. */
  last30dAdr?: SecondaryMetricValue;
  /** Last 30D Page Views, value is itself a %, comparator is vs peer.
   *  Field name kept as last90dPageViews for backwards compatibility
   *  with persisted state and existing partner data. */
  last90dPageViews?: SecondaryMetricValue;
  /** Last 30D Conversion, value is itself a %, comparator is vs peer.
   *  Field name kept as last90dConversion for backwards compatibility
   *  with persisted state and existing partner data. */
  last90dConversion?: SecondaryMetricValue;
  /** Next 3M Room Nights, comparator is vs peer. */
  next3mRoomNights?: SecondaryMetricValue;
}

/**
 * The seven On Platform Competitiveness (OPC) metrics shown on the
 * unlocked "On Platform Competitiveness" tab of Partner Detail. Same
 * value + optional-comparator shape as the secondary metrics, and every
 * field is optional so partners render "Data pending" cards until the
 * real per-partner numbers are wired in. The tab is only reachable in
 * the OPC-active window (Level 2 rounds 11-20, and every Cross-Regional
 * / KAM round); Level 1 rounds keep the tab locked.
 */
export interface PartnerOpcMetrics {
  /** Unsold Rooms - inventory gaps, comparator vs peer. */
  unsoldRooms?: SecondaryMetricValue;
  /** Sell Through Rate, value is a %, comparator vs peer. */
  sellThroughRate?: SecondaryMetricValue;
  /** Distribution of Search, value is a %, comparator vs peer. */
  distributionOfSearch?: SecondaryMetricValue;
  /** Visibility Share, value is a %, comparator vs peer. */
  visibilityShare?: SecondaryMetricValue;
  /** Click Through Rate, value is a %, comparator vs peer. */
  clickThroughRate?: SecondaryMetricValue;
  /** Conversion, value is a %, comparator vs peer. */
  conversion?: SecondaryMetricValue;
  /** Search Price, comparator vs peer. */
  searchPrice?: SecondaryMetricValue;
}

export interface PartnerMetrics {
  // ── New KPI structure (what the learner sees - sourced from the
  // KPI spec PFRs work with day-to-day) ──
  /** Experienced RPD percentage. Higher = less competitive. */
  erpd: number;
  /** Change vs prior period; negative = improving, positive = worsening. */
  erpdChange: number;
  /** Public RPD percentage - what non-logged-in travelers see. */
  rpdPublic: number;
  /** Loyal RPD percentage - what Genius members see. */
  rpdLoyal: number;
  /** Share of public traffic where the partner loses on price (0-100). */
  losePricePublic: number;
  /** Number of active pricing scenarios on this partner. */
  activeScenarios: number;
  /**
   * Optional list of active scenario names for the click-to-reveal
   * popover on the Active Scenarios KPI card (PDF page 1). When
   * present, the card becomes interactive; when absent (legacy
   * partners), the card stays as a static count.
   */
  activeScenarioNames?: string[];
  /** Top competitor for this partner. */
  competitor: 'brand' | 'expedia';
  /**
   * Six secondary metric cards shown below the eRPD Price Bucket
   * strip on the Driving Metrics tab (PDF page 1). Optional - cards
   * render in a "Data pending" state for missing fields rather than
   * disappearing, so the row stays consistent across partners.
   */
  secondaryMetrics?: PartnerSecondaryMetrics;
  /**
   * The seven On Platform Competitiveness metric cards shown on the
   * "On Platform Competitiveness" tab. Optional - cards render in a
   * "Data pending" state until the per-partner numbers are wired in.
   * Only surfaced when the tab is unlocked (Level 2 rounds 11-20 and
   * every Cross-Regional / KAM round).
   */
  opcMetrics?: PartnerOpcMetrics;
  /**
   * Days between today and the learner's last pricing conversation
   * with this partner. Stored as a relative offset (not a fixed
   * date) so the "time since last contact" stays constant across
   * replays - a learner returning in six months still sees the
   * same gap, not a 6-month-old date that gives away the calendar.
   * Surfaced in the right-hand profile panel under Notes (PDF
   * page 1); resolved to a YYYY-MM-DD string at render time via
   * `today - daysAgo`.
   */
  lastPricingContactDaysAgo?: number;
  /**
   * Pricing Coverage (Quarter to Date) as a percentage 0-100. Shown
   * in the right-hand profile panel under Last Pricing Contact (PDF
   * page 1).
   */
  pricingCoverageQTD?: number;
  /**
   * Partner Value (ABRN last year) - total actual booked room nights
   * for 2025. Scale/size indicator: how much value the partner
   * represents, independent of how well they're currently priced.
   * Rendered as a profile-meta field alongside Last Pricing Contact
   * and Pricing Coverage. Static partner-level attribute, not
   * per-round; the value is the partner's 2025 total regardless of
   * which round they appear in.
   */
  partnerValueAbrn?: number;

  // ── Legacy fields (drive conversation effects and scoring internally;
  // not surfaced on the new KPI cards). Will be retired post-MVP once
  // the conversation system is rewired onto the new KPIs. ──
  experiencedRPD: number;
  visibility: number;
  conversion: number;
  revenue: number;
  discountQuality: number;
  rateParity: RateParityStatus;
}

export interface MetricSnapshot {
  round: number;
  metrics: PartnerMetrics;
}

export interface PartnerPersona {
  id: string;
  name: string;
  propertyName: string;
  propertyType: string;
  roomCount: number;
  location: string;
  avatar: string;               // initials or icon identifier
  propertyImage: string;        // URL for property photo
  style: CommunicationStyle;
  styleSecondary: CommunicationStyle;
  description: string;          // brief flavor text
  commercialGoal: string;
  /**
   * Parity regime this partner operates under. Drives which conversation
   * options are legal (see ConversationOption.parityFilter). Optional for
   * backwards compatibility with the existing seed data.
   *
   * For Cross-Regional / KAM partners this is the partner's REAL market
   * regime (wide / narrow / none, per the KAM playbook), NOT the journey.
   * Cross-Regional membership is expressed by the `-cross-regional`
   * partner id and the cross-regional entries in portfolioByRound /
   * correctPartnerPerRound - a KAM round's three cards deliberately mix
   * regimes, so the journey can't be a single parityRegime value.
   */
  parityRegime?: ParityRegime;

  // ── Cross-Regional (KAM) identity pills ──
  // Set only on the `-cross-regional` KAM records. When present, Partner
  // Detail and the Portfolio card show the partner COMPANY (companyName)
  // instead of the hotel name, plus the four KAM pills under it. Standard
  // (single-property) records leave these undefined and render as before.
  /**
   * Partner company name shown for the game in the KAM journey ("Partner
   * Name for the Game", roster Column I) - e.g. Royal Crest Hotel ->
   * "Northumbrian Quays Hotel Management". Replaces propertyName in KAM
   * display. Presence of this field is the signal to render KAM chrome.
   */
  companyName?: string;
  /** KAM pill - the partner type (roster Column H): Hotel Management
   *  Company / Managed Chain / Ownership Group. */
  partnerType?: string;
  /** KAM pill - HQ location, where the point of contact sits (Column J). */
  hqLocation?: string;
  /** KAM pill - number of properties in the portfolio (Column K),
   *  replaces the room count for KAM partners. */
  numberOfProperties?: number;
}

export interface PartnerState {
  persona: PartnerPersona;
  metrics: PartnerMetrics;
  metricHistory: MetricSnapshot[];
  trust: number;                // 0-100, hidden
  relationship: RelationshipStatus;
  discounts: DiscountProduct[];
  conversationLog: ConversationRecord[];
  pendingActions: PendingAction[];
}

export interface PendingAction {
  description: string;
  roundCreated: number;
  roundResolves: number;
  effect: Partial<PartnerMetrics>;
  trustBonus: number;
  implemented: boolean;
}

export interface ConversationRecord {
  round: number;
  hookChoice: string;
  diagnosisChoice: string;
  pitchChoice: string;
  partnerReaction: string;
  trustChange: number;
  outcome: string;
}

// ── Conversation Tree Types ──

/**
 * Conversation phases mirror the back half of Alex's diagnostic flow
 * from the Issue Tree reveal: Hook (how you open), Diagnosis (what you
 * share about the data and likely cause), Pitch (what you recommend).
 * The earlier Trigger/Intent/Root Cause/Metric phases happen pre-call
 * on the portfolio + partner-detail screens, not inside the call.
 *
 * Objection handling was removed from the conversation in May 2026 -
 * the Issue Tree reveal still teaches learners to *anticipate*
 * objections, but we don't score the response to them until SME-
 * validated objection-handling content is available.
 */
export interface ConversationPhase {
  id: 'hook' | 'diagnosis' | 'pitch';
  label: string;
  partnerPrompt: string;       // what the partner says to set up choices
  options: ConversationOption[];
}

export interface ConversationOption {
  id: string;
  label: string;                // short label shown on button
  description: string;          // fuller text shown on hover/selection
  playerDialogue: string;       // what the player "says"
  styleMatch: Record<CommunicationStyle, number>; // -2 to +2 match score per style
  assertiveness: number;        // 1-3 (low, medium, high)
  compliance: 'safe' | 'borderline' | 'risky';
  /**
   * Which parity regimes this option is legal in. Undefined means available in
   * all regimes. The "no" regime is the most constrained: cross-channel topics
   * may also be gated by the `initiator` field below.
   */
  parityFilter?: ParityRegime[];
  /**
   * Who can introduce this option in conversation. Default is
   * 'learner-or-partner'. Cross-channel topics in No-Parity must be set to
   * 'partner-only' so the learner can only respond if the partner raises them.
   */
  initiator?: 'partner-only' | 'learner-or-partner';
}

export interface ConversationResponse {
  trustThreshold: 'low' | 'medium' | 'high'; // which trust band this fires in
  text: string;
  emotion: 'positive' | 'neutral' | 'cautious' | 'negative';
}

export interface ConversationNode {
  optionId: string;
  responses: ConversationResponse[];
  metricEffects: Partial<PartnerMetrics>;
  trustChange: number;
  nextPhasePrompt?: string;    // override partner prompt for next phase
}

export interface ConversationTree {
  partnerId: string;
  round: number;
  phases: ConversationPhaseData[];
}

export interface ConversationPhaseData {
  phase: ConversationPhase;
  nodes: ConversationNode[];
}

// ── Branching Conversation Types ──

/**
 * Trigger-type categories from the Pricing Issue Tree (column 1).
 * Used to classify the root of a diagnosis path.
 */
export type IssueTreeTrigger =
  | 'performance-outcome'
  | 'pricing-signal'
  | 'interaction'
  | 'program';

/**
 * Whether the partner's pricing pattern looks deliberate or accidental.
 * Drives which root-cause family applies.
 */
export type IssueTreeIntent = 'intentional' | 'unintentional';

/**
 * The SME-prescribed path through the Pricing Issue Tree for a given
 * branching scenario. Encodes "this is what the diagnostic should
 * land on if the learner reads the data correctly." Used by the
 * Issue Tree Helper to validate picks and by the grader to gate
 * scoring on the right diagnostic outcome.
 */
export interface IssueTreePath {
  /** Which trigger category surfaced this issue. */
  trigger: IssueTreeTrigger;
  /** Primary pricing issue id (e.g. 'brand-com-erpd-not-competitive'). */
  issueId: string;
  /** Intent reading. */
  intent: IssueTreeIntent;
  /** Root cause id within the issue+intent group. */
  rootCauseId: string;
  /** Metric insight id ("The diagnose" column). */
  metricInsightId: string;
  /** Hook id ("The hook" column). */
  hookId: string;
}

/**
 * A branching conversation is a sequence of exchanges. At each
 * exchange the partner sets up a prompt, the learner picks one of
 * three options, and the partner gives a tailored response to that
 * pick. The next exchange's prompt may be defaulted by the step or
 * overridden by the learner's prior `nextPrompt` selection.
 *
 * Different shape from the 3-phase Hook/Diagnosis/Pitch model.
 * `conversationShape: 'branching'` discriminates at the engine and
 * render-routing level. Both shapes coexist while older partners
 * remain on 3-phase trees.
 */
export interface BranchingConversationTree {
  conversationShape: 'branching';
  partnerId: string;
  round: number;
  /**
   * Optional AM line that opens the call before the first partner
   * prompt. Used when the SME script has a set AM opener (and the
   * partner's first turn is a response to it, not a free greeting).
   * Rendered once at the top of the conversation, set in stone -
   * the learner doesn't pick it. Scenarios that let the learner
   * choose their opener (e.g. Noble Falcon) leave this undefined
   * and surface the AM's opener as Step 1's optimal option.
   */
  openingAm?: string;
  /** Ordered list of exchanges in this scenario. Typically 4-6 steps. */
  steps: BranchingStep[];
  /**
   * The SME-prescribed path through the Pricing Issue Tree. The
   * Issue Tree Helper uses this to validate the learner's
   * pre-call diagnosis. Optional only until the SME provides it
   * for every scenario.
   */
  issueTreePath?: IssueTreePath;
}

export interface BranchingStep {
  /** Short id (e.g. 'open', 'probe-cost', 'reframe-revenue'). */
  id: string;
  /** Optional short label shown in the report card / coaching. */
  label?: string;
  /** Partner's opening line for this exchange. May be overridden by a
   * prior option's `nextPrompt`. */
  partnerPrompt: string;
  /** Three learner options at this exchange. */
  options: BranchingOption[];
}

/**
 * Persisted state for the Issue Tree Helper drawer, keyed in
 * `GameState.issueTreeHelperStates` by `${partnerId}-${round}`.
 *
 * The Helper is a step-by-step wizard the learner can close to peek
 * at the partner data and reopen without losing their place. Picks
 * accumulate on `path`; `stepIndex` resumes them at the step they
 * left off (or the summary if all six picks are made).
 */
export interface IssueTreeHelperState {
  path: {
    trigger?: IssueTreeTrigger;
    issueId?: string;
    intent?: IssueTreeIntent;
    rootCauseId?: string;
    metricInsightId?: string;
    hookId?: string;
  };
  stepIndex: number;
}

export interface BranchingOption {
  id: string;
  label: string;
  description: string;
  /** What the learner "says" if this option is picked. */
  playerDialogue: string;
  /** Partner's tailored response to this specific pick. Shown after
   * the learner clicks the option, before the next step's prompt. */
  partnerResponse: string;
  styleMatch: Record<CommunicationStyle, number>;
  assertiveness: number;
  compliance: 'safe' | 'borderline' | 'risky';
  /** Effect on hidden trust at this step. */
  trustChange: number;
  /** Optional - if set, the NEXT step's `partnerPrompt` is replaced
   * with this string. Lightweight way to branch the partner's tone
   * without authoring full alternate steps. */
  nextPrompt?: string;
  /** Optional - SME marks the option they consider the strongest
   * Issue Tree-aligned move at this step. Drives "stretch" scoring
   * once the branching grader is in. */
  optimal?: boolean;
}

// ── Game State ──

export type GameScreen =
  // ── Pre-journey ──
  | 'briefing'
  // ── Level 0 (clearance) ──
  | 'l0-market-select'
  | 'l0-character-build'
  | 'l0-gm-chat'
  | 'l0-dashboard-hotspot'
  | 'l0-email-audit'
  | 'l0-mini-scenarios'
  | 'l0-issue-tree-reveal'
  | 'l0-clearance-summary'
  | 'l0-cleared-celebration'
  // ── Round hub ──
  // Progress hub shown after clearance and between rounds. Two levels
  // of 10 tiles each: Level 1 = existing partner-portfolio content
  // (rounds 1-10, mostly locked pending SME content); Level 2 =
  // OPC / Advanced View content (rounds 11-20, all locked until R3).
  | 'round-select'
  // ── Level 1 (existing partner-portfolio sim, plus new outcome stage) ──
  | 'portfolio'
  | 'partner-detail'
  | 'conversation'
  | 'conversation-report'
  // Celebration between Level 1 and Level 2. Fires from advanceRound
  // when the learner clears every Level 1 round (1-10) with at least
  // one star. When Level 2 content exists beyond round 10 (it does),
  // Continue routes on into Level 2 via Round Select; if Level 2 isn't
  // built yet it stays terminal and Continue routes to the debrief.
  | 'level-1-complete'
  // Celebration at the end of Level 2. Fires from advanceRound when the
  // learner clears every Level 2 round (11-20) with at least one star.
  // Dormant until rounds 17-20 land (TOTAL_ROUNDS reaches 20); Continue
  // routes to the debrief / summary.
  | 'level-2-complete'
  // ── Wrap-up ──
  | 'debrief';

export interface MarketContext {
  demand: TrendDirection;
  competitorPricing: string;    // narrative text
  seasonalNote: string;
}

export interface RoundSummaryItem {
  partnerId: string;
  headline: string;
  detail: string;
  metricChange: TrendDirection;
}

/**
 * Outcome of the most recently completed conversation - written by the
 * engine when the last phase resolves and consumed by the
 * ConversationReportScreen. Mirrors the GradingResult shape from
 * engine/grading.ts but lives here so the type is part of the shared
 * domain rather than buried in the engine.
 */
export interface LastConversationGrade {
  partnerId: string;
  round: number;
  stars: 0 | 1 | 2 | 3;
  rightPartner: boolean;
  expectedPartnerId: string | null;
  allCompliant: boolean;
  diagnosisCorrect: boolean;
  pitchCorrect: boolean;
  noActiveMismatch: boolean;
  styleSum: number;
  failureReason:
    | 'wrong-partner'
    | 'wrong-diagnosis'
    | 'wrong-pitch'
    | 'unsafe-pick'
    | 'style-mismatch'
    | null;
}

export interface GameState {
  screen: GameScreen;
  /** The current level in the journey. Starts at 0, advances to 1 on clearance. */
  currentLevel: Level;
  /** The learner's persistent profile. Built up through Level 0. */
  learnerProfile: LearnerProfile;
  /** Level 0 progress tracking. Populated as the learner clears activities. */
  level0Progress: Level0Progress;
  /**
   * Active diagnosis for the partner currently being engaged in Level 1.
   * Cleared when the engagement ends.
   */
  currentDiagnosis: Level1Diagnosis | null;
  /**
   * If set, completing the next Level 0 activity navigates here instead of
   * the activity's default next screen. Used by the Clearance Summary
   * retry buttons - they set this to 'l0-clearance-summary' so the retry
   * returns the learner to the summary rather than rolling forward.
   */
  level0ReturnTo: GameScreen | null;
  /**
   * When non-null, the next Level 0 activity render only includes the
   * items listed here. Used by the Clearance Summary retry path so
   * learners only redo the questions they got wrong, not the full
   * activity from scratch. Cleared when the activity completes.
   */
  level0RetryItemIds: string[] | null;
  /** Whether the Portfolio tutorial has been auto-shown to the learner already. */
  tutorialShown: boolean;
  /**
   * Whether the Partner Detail tutorial has been auto-shown on
   * first-visit. Separate flag from `tutorialShown` because the two
   * tours cover different screens with different step sets, and a
   * learner who saw the Portfolio walkthrough still hasn't seen
   * Partner Detail until they've clicked into a partner. Both flags
   * clear on full restart via `onRestart`.
   */
  partnerDetailTutorialShown: boolean;
  /**
   * Issue Tree Helper progress per partner-round. The Helper drawer
   * is intentionally close-and-reopenable (learner pops out to check
   * data, comes back without losing picks). Keys are
   * `${partnerId}-${round}`. Reset on full restart and on practice-
   * round entry.
   */
  issueTreeHelperStates: Record<string, IssueTreeHelperState>;
  /**
   * True once the learner has opened the Issue Tree Helper at least
   * once in the current playthrough. Used to gate the Begin
   * Conversation button in Round 1 - the learner must open the
   * Helper before they can engage their first partner. After the
   * first open the gate lifts permanently for the session. Reset
   * on full restart; preserved across practice rounds (a returning
   * learner who has already cleared the sim doesn't need re-gating).
   */
  hasOpenedIssueTreeHelper: boolean;
  currentRound: number;         // 1..10
  actionsThisRound: string[];   // partner IDs engaged this round
  /**
   * Partner IDs the learner picked this round, had a 0-star outcome
   * on, and then retook. The action budget is restored (entry removed
   * from actionsThisRound) but the partner remains here so the
   * Portfolio + Partner Detail still mark them as 'Engaged this
   * round' - the learner sees they already tried that partner and
   * doesn't waste the retake re-picking the same wrong call. Cleared
   * on advanceRound and startPracticeRound.
   */
  previouslyEngagedThisRound: string[];
  /**
   * Durable, cross-round list of partner IDs the learner engaged with
   * during their main run. Appended when a conversation completes
   * (skipped for Practice Mode replays - those are separate attempts,
   * they shouldn't retroactively rewrite the main-run engagement
   * history). Filtered on retake so a 0-star wrong-pick that was
   * reverted doesn't count as an engagement. Consumed by the Debrief:
   * `calculateScore` restricts its highlights / improvements / style
   * insights to just these partners, and the Partner Outcomes grid
   * only renders them. Without this scope, the debrief judged the
   * learner across the whole 21-partner regime portfolio (18 of
   * which they correctly ignored) and read as "you neglected
   * everyone" even on a perfect 9/9 run.
   */
  engagedPartnerIds: string[];
  selectedPartnerId: string | null;
  partners: PartnerState[];
  marketContext: MarketContext;
  roundSummaries: RoundSummaryItem[][];
  /**
   * Best stars earned per round (1-indexed). 0 means attempted but failed,
   * 1 = pass (compliant), 2 = strong (style-matched), 3 = optimal
   * (matched the partner's actual root cause + pitch). Persisted across
   * sessions; a replay can only raise the value, never lower it.
   */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  /**
   * Grading result from the most recently completed conversation.
   * Populated when a conversation ends, consumed by the
   * conversation-report screen, cleared when the learner continues.
   */
  lastConversationGrade: LastConversationGrade | null;
  /**
   * True when the learner is replaying a single round from the Debrief
   * screen's Practice Mode (after completing the sim once). Affects the
   * post-conversation flow: instead of advancing the round, Continue
   * routes back to the Debrief so they can pick another round to chase
   * a higher star score.
   */
  isPracticeMode: boolean;
  conversationInProgress: {
    partnerId: string;
    /**
     * Shape of the conversation tree being played. Drives engine
     * dispatch and screen rendering. Defaults to 'three-phase' for
     * backward compatibility with existing data files; 'branching'
     * means the conversation uses BranchingConversationTree.
     */
    shape?: 'three-phase' | 'branching';
    /**
     * Index into the current shape's step/phase list. For 3-phase
     * trees this is 0..2 (hook/diagnosis/pitch). For branching trees
     * it's 0..(steps.length-1). Kept named `phaseIndex` to avoid a
     * disruptive rename across consumers.
     */
    phaseIndex: number;
    choices: string[];
    currentResponse: string | null;
    currentEmotion: 'positive' | 'neutral' | 'cautious' | 'negative' | null;
    styleMatchScore: number | null;
    /**
     * Snapshot of the partner's state at the moment the conversation
     * started. Used to revert metric/trust/log changes when the learner
     * retakes a failed round. Preserved when endConversation routes to
     * the report screen, cleared when the round ultimately advances.
     */
    partnerSnapshot: PartnerState;
  } | null;
  gameComplete: boolean;
}

// ── Scoring ──

export interface ScoreBreakdown {
  relationshipHealth: number;   // average trust
  overallGrade: 'A' | 'B' | 'C' | 'D';
  highlights: string[];
  improvements: string[];
  styleInsights: string[];
}
