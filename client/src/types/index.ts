// ── Rate Right - Core Types ──

export type CommunicationStyle = 'red' | 'yellow' | 'green' | 'blue';

export type RelationshipStatus = 'warm' | 'neutral' | 'cool' | 'strained';

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
  | 'briefing'
  | 'portfolio'
  | 'partner-detail'
  | 'conversation'
  | 'round-transition'
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
