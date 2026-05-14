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

export type DiscountProductId =
  | 'genius'
  | 'mobile-rate'
  | 'country-rate'
  | 'last-minute'
  | 'early-booker';

export type DiscountStatus = 'active' | 'inactive' | 'misconfigured';

export interface DiscountProduct {
  id: DiscountProductId;
  label: string;
  status: DiscountStatus;
}

export interface PartnerMetrics {
  // ── New KPI structure (what the learner sees - sourced from the
  // KPI spec PFRs work with day-to-day) ──
  /** Experienced RPD percentage. Higher = less competitive. */
  erpd: number;
  /** Change vs prior period; negative = improving, positive = worsening. */
  erpdChange: number;
  /** Public RPD percentage - what non-logged-in travellers see. */
  rpdPublic: number;
  /** Loyal RPD percentage - what Genius members see. */
  rpdLoyal: number;
  /** Share of public traffic where the partner loses on price (0-100). */
  losePricePublic: number;
  /** Number of active pricing scenarios on this partner. */
  activeScenarios: number;
  /** Top competitor for this partner. */
  competitor: 'brand' | 'expedia';

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
  description: string;          // brief flavour text
  commercialGoal: string;
  profileNotes: string[];       // behavioural cues (no style labels)
  /**
   * Parity regime this partner operates under. Drives which conversation
   * options are legal (see ConversationOption.parityFilter). Optional for
   * backwards compatibility with the existing seed data.
   */
  parityRegime?: ParityRegime;
}

export interface PartnerState {
  persona: PartnerPersona;
  metrics: PartnerMetrics;
  metricHistory: MetricSnapshot[];
  trust: number;                // 0–100, hidden
  relationship: RelationshipStatus;
  discounts: DiscountProduct[];
  lastContactedRound: number | null;
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
  assertiveness: number;        // 1–3 (low, medium, high)
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
  | 'programme';

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
  | 'l0-inbox-triage'
  | 'l0-signal-vs-proof'
  | 'l0-issue-tree-reveal'
  | 'l0-clearance-summary'
  | 'l0-cleared-celebration'
  // ── Level 1 (existing partner-portfolio sim, plus new outcome stage) ──
  | 'portfolio'
  | 'partner-detail'
  | 'l1-diagnose'
  | 'l1-action-plan'
  | 'l1-escalate'
  | 'conversation'
  | 'conversation-report'
  | 'l1-outcome'
  | 'round-transition'
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
  /** Whether the partner-sim tutorial has been auto-shown to the learner already. */
  tutorialShown: boolean;
  /**
   * Whether the learner has clicked the Acknowledge button on the
   * Portfolio's market update banner this round. Resets on round
   * advance and on practice-round entry. Drives the strikethrough on
   * the Simulation Guide's 'Check the market update' step.
   */
  marketUpdateAcknowledged: boolean;
  /**
   * Set of `${partnerId}-${round}` keys for which the learner has
   * expanded the persona blind-spot card on Partner Detail. Once a key
   * lands here, the card stays hidden on subsequent visits to that
   * partner-round (per the "hide when seen once" rule). Reset on full
   * restart and on practice-round entry so a clean attempt gets the
   * hint surfaced again.
   */
  expandedBlindSpots: string[];
  currentRound: number;         // 1, 2, 3
  actionsRemaining: number;     // starts at 2 per round
  actionsThisRound: string[];   // partner IDs engaged this round
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
  portfolioRPD: number;         // average RPD improvement
  revenueImpact: number;        // average revenue change
  relationshipHealth: number;   // average trust
  overallGrade: 'A' | 'B' | 'C' | 'D';
  highlights: string[];
  improvements: string[];
  styleInsights: string[];
}
