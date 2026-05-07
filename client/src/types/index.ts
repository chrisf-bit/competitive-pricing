// ── Rate Right - Core Types ──

export type CommunicationStyle = 'red' | 'yellow' | 'green' | 'blue';

export type RelationshipStatus = 'warm' | 'neutral' | 'cool' | 'strained';

// ── Journey-level types (Levels 0 / 1 / 2) ──

/** The current level in the learning journey. Level 2 is post-MVP. */
export type Level = 0 | 1 | 2;

/**
 * Parity regime for a partner / market. Drives which conversation moves are legal.
 * Sourced from the Booking.com legal compliance guidance: Wide / Narrow / No-Parity.
 */
export type ParityRegime = 'wide' | 'narrow' | 'none';

/**
 * The learner's chosen "where I work" context, captured at the start of Level 0.
 * The exact mechanic (region picker vs parity picker) is TBD with stakeholders;
 * this shape supports either by carrying both fields, with parityRegime as
 * the load-bearing field downstream.
 */
export interface LearnerMarket {
  /** Optional region name if the picker presents regions (e.g. "EMEA - Wide Parity"). */
  regionId?: string;
  regionLabel?: string;
  /** The parity regime that applies to the learner's portfolio. Always populated. */
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
  experiencedRPD: number;       // 0–100 index
  visibility: number;           // 0–100
  conversion: number;           // 0–100
  revenue: number;              // indexed 0–100
  discountQuality: number;      // 0–100 (hidden from player)
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
  openingChoice: string;
  recommendationChoice: string;
  objectionChoice: string;
  partnerReaction: string;
  trustChange: number;
  outcome: string;
}

// ── Conversation Tree Types ──

export interface ConversationPhase {
  id: 'opening' | 'recommendation' | 'objection';
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
  // ── Level 1 (existing partner-portfolio sim, plus new outcome stage) ──
  | 'portfolio'
  | 'partner-detail'
  | 'l1-diagnose'
  | 'l1-action-plan'
  | 'l1-escalate'
  | 'conversation'
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
  /** Whether the partner-sim tutorial has been auto-shown to the learner already. */
  tutorialShown: boolean;
  currentRound: number;         // 1, 2, 3
  actionsRemaining: number;     // starts at 2 per round
  actionsThisRound: string[];   // partner IDs engaged this round
  selectedPartnerId: string | null;
  partners: PartnerState[];
  marketContext: MarketContext;
  roundSummaries: RoundSummaryItem[][];
  conversationInProgress: {
    partnerId: string;
    phaseIndex: number;
    choices: string[];
    currentResponse: string | null;
    currentEmotion: 'positive' | 'neutral' | 'cautious' | 'negative' | null;
    styleMatchScore: number | null;
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
