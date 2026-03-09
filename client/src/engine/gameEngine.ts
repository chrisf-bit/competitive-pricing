import type {
  GameState,
  PartnerState,
  PartnerMetrics,
  RelationshipStatus,
  ConversationRecord,
  ScoreBreakdown,
  RPDLevel,
  TrendDirection,
} from '../types';
import { initialPartners } from '../data/partners';
import { marketContextByRound, generateRoundSummary } from '../data/market';
import { getConversationTree } from '../data/conversations';

// ── Constants ──
const ACTIONS_PER_ROUND = 3;
const TOTAL_ROUNDS = 3;
const NEGLECT_TRUST_PENALTY = -5;
const NEGLECT_METRIC_DECAY = -3;

// ── Create initial game state ──
export function createInitialState(): GameState {
  const partners = initialPartners.map((p) => ({
    ...p,
    metricHistory: [{ round: 0, metrics: { ...p.metrics } }],
  }));

  return {
    screen: 'briefing',
    currentRound: 1,
    actionsRemaining: ACTIONS_PER_ROUND,
    actionsThisRound: [],
    selectedPartnerId: null,
    partners,
    marketContext: marketContextByRound[1],
    roundSummaries: [],
    conversationInProgress: null,
    gameComplete: false,
  };
}

// ── Derived state helpers ──
export function getRPDLevel(rpd: number): RPDLevel {
  if (rpd >= 70) return 'competitive';
  if (rpd >= 55) return 'slightly-below';
  if (rpd >= 40) return 'below';
  return 'poor';
}

export function getTrend(current: number, previous: number): TrendDirection {
  const diff = current - previous;
  if (diff > 2) return 'up';
  if (diff < -2) return 'down';
  return 'flat';
}

export function getRelationshipFromTrust(trust: number): RelationshipStatus {
  if (trust >= 70) return 'warm';
  if (trust >= 50) return 'neutral';
  if (trust >= 30) return 'cool';
  return 'strained';
}

// ── Select a partner to engage with ──
export function selectPartner(state: GameState, partnerId: string): GameState {
  return {
    ...state,
    selectedPartnerId: partnerId,
    screen: 'partner-detail',
  };
}

// ── Start a conversation ──
export function startConversation(state: GameState, partnerId: string): GameState {
  const tree = getConversationTree(partnerId, state.currentRound);
  if (!tree) return state;

  return {
    ...state,
    screen: 'conversation',
    conversationInProgress: {
      partnerId,
      phaseIndex: 0,
      choices: [],
      currentResponse: null,
    },
  };
}

// ── Process a conversation choice ──
export function processConversationChoice(
  state: GameState,
  optionId: string,
): GameState {
  const conv = state.conversationInProgress;
  if (!conv) return state;

  const tree = getConversationTree(conv.partnerId, state.currentRound);
  if (!tree) return state;

  const phaseData = tree.phases[conv.phaseIndex];
  if (!phaseData) return state;

  const node = phaseData.nodes.find((n) => n.optionId === optionId);
  if (!node) return state;

  // Find the partner
  const partnerIndex = state.partners.findIndex(
    (p) => p.persona.id === conv.partnerId,
  );
  if (partnerIndex === -1) return state;

  const partner = state.partners[partnerIndex];

  // Determine trust band for response selection
  const trustBand = partner.trust >= 60 ? 'high' : partner.trust >= 40 ? 'medium' : 'low';
  const response =
    node.responses.find((r) => r.trustThreshold === trustBand) ??
    node.responses[0];

  // Calculate style match bonus
  const option = phaseData.phase.options.find((o) => o.id === optionId);
  const styleMatchScore = option
    ? option.styleMatch[partner.persona.style] ?? 0
    : 0;
  const trustDelta = node.trustChange + styleMatchScore;

  // Apply trust change
  const newTrust = clamp(partner.trust + trustDelta, 0, 100);

  // Apply metric effects
  const newMetrics = applyMetricEffects(partner.metrics, node.metricEffects);

  // Update partner
  const updatedPartner: PartnerState = {
    ...partner,
    trust: newTrust,
    relationship: getRelationshipFromTrust(newTrust),
    metrics: newMetrics,
  };

  const newPartners = [...state.partners];
  newPartners[partnerIndex] = updatedPartner;

  // Determine if conversation is complete
  const isLastPhase = conv.phaseIndex >= tree.phases.length - 1;
  const newChoices = [...conv.choices, optionId];

  if (isLastPhase) {
    // Record the conversation
    const record: ConversationRecord = {
      round: state.currentRound,
      openingChoice: newChoices[0] ?? '',
      recommendationChoice: newChoices[1] ?? '',
      objectionChoice: newChoices[2] ?? '',
      partnerReaction: response.emotion,
      trustChange: trustDelta,
      outcome: response.text,
    };

    updatedPartner.conversationLog.push(record);
    updatedPartner.lastContactedRound = state.currentRound;

    const newActionsThisRound = [...state.actionsThisRound, conv.partnerId];
    const newActionsRemaining = state.actionsRemaining - 1;

    return {
      ...state,
      partners: newPartners,
      actionsRemaining: newActionsRemaining,
      actionsThisRound: newActionsThisRound,
      conversationInProgress: {
        ...conv,
        phaseIndex: conv.phaseIndex,
        choices: newChoices,
        currentResponse: response.text,
      },
    };
  }

  // Move to next phase
  const nextPhasePrompt = node.nextPhasePrompt;
  const nextPhaseData = tree.phases[conv.phaseIndex + 1];

  return {
    ...state,
    partners: newPartners,
    conversationInProgress: {
      ...conv,
      phaseIndex: conv.phaseIndex + 1,
      choices: newChoices,
      currentResponse: response.text,
    },
  };
}

// ── End a conversation and return to portfolio ──
export function endConversation(state: GameState): GameState {
  const conv = state.conversationInProgress;
  if (!conv) return state;

  return {
    ...state,
    screen: 'portfolio',
    conversationInProgress: null,
    selectedPartnerId: null,
  };
}

// ── Advance to the next round ──
export function advanceRound(state: GameState): GameState {
  if (state.currentRound >= TOTAL_ROUNDS) {
    return {
      ...state,
      screen: 'debrief',
      gameComplete: true,
    };
  }

  const nextRound = state.currentRound + 1;

  // Apply neglect penalties and drift to unengaged partners
  const updatedPartners = state.partners.map((partner) => {
    const wasEngaged = state.actionsThisRound.includes(partner.persona.id);

    if (!wasEngaged) {
      const newTrust = clamp(partner.trust + NEGLECT_TRUST_PENALTY, 0, 100);
      const newMetrics = applyMetricEffects(partner.metrics, {
        experiencedRPD: NEGLECT_METRIC_DECAY,
        visibility: NEGLECT_METRIC_DECAY,
        conversion: Math.floor(NEGLECT_METRIC_DECAY / 2),
      });

      return {
        ...partner,
        trust: newTrust,
        relationship: getRelationshipFromTrust(newTrust),
        metrics: newMetrics,
        metricHistory: [
          ...partner.metricHistory,
          { round: state.currentRound, metrics: { ...newMetrics } },
        ],
      };
    }

    return {
      ...partner,
      metricHistory: [
        ...partner.metricHistory,
        { round: state.currentRound, metrics: { ...partner.metrics } },
      ],
    };
  });

  // Generate round summary
  const roundSummary = generateRoundSummary(
    state.currentRound,
    state.actionsThisRound,
    state.partners.map((p) => p.persona.id),
  );

  return {
    ...state,
    screen: 'round-transition',
    currentRound: nextRound,
    actionsRemaining: ACTIONS_PER_ROUND,
    actionsThisRound: [],
    selectedPartnerId: null,
    partners: updatedPartners,
    marketContext: marketContextByRound[nextRound] ?? state.marketContext,
    roundSummaries: [...state.roundSummaries, roundSummary],
    conversationInProgress: null,
  };
}

// ── Calculate final score ──
export function calculateScore(state: GameState): ScoreBreakdown {
  const initialPartnerData = initialPartners;
  let totalRPDImprovement = 0;
  let totalRevenueChange = 0;
  let totalTrust = 0;
  const highlights: string[] = [];
  const improvements: string[] = [];
  const styleInsights: string[] = [];

  for (const partner of state.partners) {
    const initial = initialPartnerData.find(
      (p) => p.persona.id === partner.persona.id,
    );
    if (!initial) continue;

    const rpdDelta = partner.metrics.experiencedRPD - initial.metrics.experiencedRPD;
    const revDelta = partner.metrics.revenue - initial.metrics.revenue;

    totalRPDImprovement += rpdDelta;
    totalRevenueChange += revDelta;
    totalTrust += partner.trust;

    // Generate insights
    if (rpdDelta > 15) {
      highlights.push(
        `${partner.persona.name}'s Experienced RPD improved significantly (+${rpdDelta} points)`,
      );
    } else if (rpdDelta < 0) {
      improvements.push(
        `${partner.persona.name}'s Experienced RPD declined. Consider prioritising them earlier.`,
      );
    }

    if (partner.trust >= 70) {
      highlights.push(
        `Strong relationship built with ${partner.persona.name}`,
      );
    } else if (partner.trust < 30) {
      improvements.push(
        `Relationship with ${partner.persona.name} needs repair. Consider adapting your communication approach.`,
      );
    }

    // Style insights
    const style = partner.persona.style;
    const styleNames: Record<string, string> = {
      red: 'Director',
      yellow: 'Socialiser',
      green: 'Nurturer',
      blue: 'Thinker',
    };

    if (partner.trust >= 60) {
      styleInsights.push(
        `${partner.persona.name} (${styleNames[style]} style) responded well to your approach. They value ${getStylePreference(style)}.`,
      );
    } else {
      styleInsights.push(
        `${partner.persona.name} (${styleNames[style]} style) may have preferred a different approach. ${styleNames[style]} partners typically respond best to ${getStylePreference(style)}.`,
      );
    }
  }

  const avgRPD = totalRPDImprovement / state.partners.length;
  const avgRevenue = totalRevenueChange / state.partners.length;
  const avgTrust = totalTrust / state.partners.length;

  const overallScore = avgRPD * 0.4 + avgRevenue * 0.3 + avgTrust * 0.3;

  let grade: 'A' | 'B' | 'C' | 'D';
  if (overallScore >= 25) grade = 'A';
  else if (overallScore >= 15) grade = 'B';
  else if (overallScore >= 5) grade = 'C';
  else grade = 'D';

  if (highlights.length === 0) {
    highlights.push('You engaged with partners and gained valuable experience.');
  }
  if (improvements.length === 0) {
    improvements.push('Consider exploring different communication approaches for even better results.');
  }

  return {
    portfolioRPD: Math.round(avgRPD),
    revenueImpact: Math.round(avgRevenue),
    relationshipHealth: Math.round(avgTrust),
    overallGrade: grade,
    highlights,
    improvements,
    styleInsights,
  };
}

// ── Helpers ──
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyMetricEffects(
  metrics: PartnerMetrics,
  effects: Partial<PartnerMetrics>,
): PartnerMetrics {
  return {
    experiencedRPD: clamp(
      metrics.experiencedRPD + (effects.experiencedRPD ?? 0),
      0,
      100,
    ),
    visibility: clamp(metrics.visibility + (effects.visibility ?? 0), 0, 100),
    conversion: clamp(metrics.conversion + (effects.conversion ?? 0), 0, 100),
    revenue: clamp(metrics.revenue + (effects.revenue ?? 0), 0, 100),
    discountQuality: clamp(
      metrics.discountQuality + (effects.discountQuality ?? 0),
      0,
      100,
    ),
    rateParity: metrics.rateParity,
  };
}

function getStylePreference(style: string): string {
  const prefs: Record<string, string> = {
    red: 'direct communication, clear ROI, and decisive action',
    yellow: 'enthusiasm, success stories, and collaborative energy',
    green: 'warmth, reassurance, gradual change, and feeling heard',
    blue: 'data, evidence, logical reasoning, and thorough analysis',
  };
  return prefs[style] ?? 'a tailored approach';
}
