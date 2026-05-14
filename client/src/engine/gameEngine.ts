import type {
  GameState,
  PartnerState,
  PartnerMetrics,
  RelationshipStatus,
  ConversationRecord,
  ScoreBreakdown,
  RPDLevel,
  TrendDirection,
  LastConversationGrade,
} from '../types';
import { initialPartners } from '../data/partners';
import { marketContextByRound, generateRoundSummary } from '../data/market';
import { getConversationTree } from '../data/conversations';
import { getBranchingScenario } from '../data/branchingScenarios';
import { getPartnerBaseline } from '../data/partnerStateByRound';
import { gradeRound, gradeBranchingRound } from './grading';

/**
 * Apply the per-round scripted baseline to a single partner. The
 * baseline overwrites the headline KPI fields the learner reads on
 * the portfolio so the "spot the worst partner" mechanic actually
 * works round to round - without this, conversation outcomes only
 * nudge a couple of legacy fields and the same partner stays worst
 * forever.
 *
 * Returns the partner unchanged if no baseline is defined for this
 * round (which is the case for rounds 4-10 today).
 */
function applyRoundBaseline(
  partner: PartnerState,
  round: number,
): PartnerState {
  const baseline = getPartnerBaseline(partner.persona.id, round);
  if (!baseline) return partner;
  return {
    ...partner,
    metrics: { ...baseline.metrics },
  };
}

// ── Constants ──
// One engagement per round - the learner must spot which partner needs them.
const ACTIONS_PER_ROUND = 1;
const TOTAL_ROUNDS = 10;
const NEGLECT_TRUST_PENALTY = -5;
const NEGLECT_METRIC_DECAY = -3;

// ── Create initial game state ──
/**
 * Build a fresh game state. Optional overrides let a returning learner
 * carry forward their persistent profile, clearance status, and
 * previously-earned round stars without restoring the in-flight
 * partner / conversation state (which always resets per play).
 */
export function createInitialState(overrides?: {
  learnerProfile?: GameState['learnerProfile'];
  level0Cleared?: boolean;
  roundStars?: GameState['roundStars'];
}): GameState {
  const partners = initialPartners.map((p) => {
    // Apply the Round 1 baseline so the partner data the learner sees
    // on first portfolio render matches the scripted narrative arc.
    // For partners without a baseline (currently anyone outside No-
    // Parity), this just passes the partner through unchanged.
    const withBaseline = applyRoundBaseline(p, 1);
    return {
      ...withBaseline,
      metricHistory: [{ round: 0, metrics: { ...withBaseline.metrics } }],
    };
  });

  return {
    screen: 'briefing',
    currentLevel: 0,
    learnerProfile: overrides?.learnerProfile ?? {
      market: null,
      strengths: [],
      archetype: null,
      avatarId: null,
      playerName: 'Name_Var',
      completedLevels: [],
      xp: 0,
    },
    level0Progress: {
      knowledgeCheckResults: [],
      signalVsProofCompleted: false,
      emailAuditCompleted: false,
      inboxTriageCompleted: false,
      cleared: overrides?.level0Cleared ?? false,
    },
    currentDiagnosis: null,
    level0ReturnTo: null,
    level0RetryItemIds: null,
    tutorialShown: false,
    marketUpdateAcknowledged: false,
    expandedBlindSpots: [],
    currentRound: 1,
    actionsRemaining: ACTIONS_PER_ROUND,
    actionsThisRound: [],
    selectedPartnerId: null,
    partners,
    marketContext: marketContextByRound[1],
    roundSummaries: [],
    roundStars: overrides?.roundStars ?? {},
    lastConversationGrade: null,
    isPracticeMode: false,
    conversationInProgress: null,
    gameComplete: false,
  };
}

/**
 * Drop into Practice Mode on a specific round. Used by the Debrief
 * screen's round-grid replay. Partners are reset to their baseline
 * state for the round so the practice attempt is a clean run, not a
 * continuation of the learner's previous playthrough.
 */
export function startPracticeRound(state: GameState, round: number): GameState {
  const partners = initialPartners.map((p) => {
    const withBaseline = applyRoundBaseline(p, round);
    return {
      ...withBaseline,
      metrics: { ...withBaseline.metrics },
      metricHistory: [{ round: 0, metrics: { ...withBaseline.metrics } }],
      discounts: p.discounts.map((d) => ({ ...d })),
      conversationLog: [],
      pendingActions: [],
    };
  });

  return {
    ...state,
    screen: 'portfolio',
    currentRound: round,
    actionsRemaining: ACTIONS_PER_ROUND,
    actionsThisRound: [],
    selectedPartnerId: null,
    partners,
    marketContext: marketContextByRound[round] ?? marketContextByRound[1],
    marketUpdateAcknowledged: false,
    expandedBlindSpots: [],
    conversationInProgress: null,
    lastConversationGrade: null,
    isPracticeMode: true,
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
  // Branching scenarios take precedence over the legacy 3-phase trees,
  // so partners that have been migrated (or new partners authored in
  // the new shape) use the branching engine. Falls back to the 3-phase
  // lookup for partners still on the old shape.
  const branching = getBranchingScenario(partnerId, state.currentRound);
  const tree = branching ?? getConversationTree(partnerId, state.currentRound);
  if (!tree) return state;

  const partner = state.partners.find((p) => p.persona.id === partnerId);
  if (!partner) return state;

  // Deep-clone the partner so a retake can restore the pre-conversation
  // metric / trust / log state cleanly.
  const partnerSnapshot: PartnerState = {
    ...partner,
    metrics: { ...partner.metrics },
    metricHistory: partner.metricHistory.map((h) => ({
      ...h,
      metrics: { ...h.metrics },
    })),
    discounts: partner.discounts.map((d) => ({ ...d })),
    conversationLog: partner.conversationLog.map((r) => ({ ...r })),
    pendingActions: partner.pendingActions.map((p) => ({ ...p })),
  };

  return {
    ...state,
    screen: 'conversation',
    conversationInProgress: {
      partnerId,
      shape: branching ? 'branching' : 'three-phase',
      phaseIndex: 0,
      choices: [],
      currentResponse: null,
      currentEmotion: null,
      styleMatchScore: null,
      partnerSnapshot,
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

  // Dispatch on the conversation shape captured at startConversation.
  if (conv.shape === 'branching') {
    return processBranchingChoice(state, optionId);
  }

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
      hookChoice: newChoices[0] ?? '',
      diagnosisChoice: newChoices[1] ?? '',
      pitchChoice: newChoices[2] ?? '',
      partnerReaction: response.emotion,
      trustChange: trustDelta,
      outcome: response.text,
    };

    updatedPartner.conversationLog.push(record);
    updatedPartner.lastContactedRound = state.currentRound;

    const newActionsThisRound = [...state.actionsThisRound, conv.partnerId];
    const newActionsRemaining = state.actionsRemaining - 1;

    // Grade the round - 0/1/2/3 stars - and route to the report screen
    // so the learner sees their result before the round transition.
    // Stars never go down: a replay can only improve the stored score.
    const regime = state.learnerProfile.market?.parityRegime ?? null;
    let grade: LastConversationGrade | null = null;
    let newRoundStars = state.roundStars;
    if (regime) {
      const result = gradeRound({
        tree,
        choices: newChoices,
        selectedPartnerId: conv.partnerId,
        regime,
        partnerPrimaryStyle: partner.persona.style,
      });
      grade = {
        partnerId: conv.partnerId,
        round: state.currentRound,
        ...result,
      };
      const previousBest = state.roundStars[state.currentRound] ?? 0;
      if (result.stars > previousBest) {
        newRoundStars = {
          ...state.roundStars,
          [state.currentRound]: result.stars,
        };
      }
    }

    // Stay on the conversation screen so the learner can read the
    // final partner response. The conversation-complete UI button there
    // calls onEndConversation, which routes to the report screen via
    // endConversation below.
    return {
      ...state,
      partners: newPartners,
      actionsRemaining: newActionsRemaining,
      actionsThisRound: newActionsThisRound,
      roundStars: newRoundStars,
      lastConversationGrade: grade,
      conversationInProgress: {
        ...conv,
        phaseIndex: conv.phaseIndex,
        choices: newChoices,
        currentResponse: response.text,
        currentEmotion: response.emotion,
        styleMatchScore,
      },
    };
  }

  // Move to next phase
  return {
    ...state,
    partners: newPartners,
    conversationInProgress: {
      ...conv,
      phaseIndex: conv.phaseIndex + 1,
      choices: newChoices,
      currentResponse: response.text,
      currentEmotion: response.emotion,
      styleMatchScore,
    },
  };
}

// ── Process a branching conversation choice ──
// Branching scenarios drive a step-by-step exchange model. Each step
// has its own partner prompt + three learner options; each option
// carries its own partner response, style scores, compliance tag, and
// trust change. The next step's prompt may be overridden by the
// picked option's `nextPrompt`. At the last step we route to the
// grader and into the conversation report, mirroring the 3-phase
// end-of-pitch path.
function processBranchingChoice(
  state: GameState,
  optionId: string,
): GameState {
  const conv = state.conversationInProgress;
  if (!conv) return state;

  const tree = getBranchingScenario(conv.partnerId, state.currentRound);
  if (!tree) return state;

  const step = tree.steps[conv.phaseIndex];
  if (!step) return state;

  const option = step.options.find((o) => o.id === optionId);
  if (!option) return state;

  const partnerIndex = state.partners.findIndex(
    (p) => p.persona.id === conv.partnerId,
  );
  if (partnerIndex === -1) return state;

  const partner = state.partners[partnerIndex];

  // Style match on partner's primary communication style. Same shape
  // as the 3-phase grader so the scoring scaffolding is consistent.
  const styleMatchScore = option.styleMatch[partner.persona.style] ?? 0;
  const trustDelta = option.trustChange + styleMatchScore;
  const newTrust = clamp(partner.trust + trustDelta, 0, 100);

  const updatedPartner: PartnerState = {
    ...partner,
    trust: newTrust,
    relationship: getRelationshipFromTrust(newTrust),
  };

  const newPartners = [...state.partners];
  newPartners[partnerIndex] = updatedPartner;

  const isLastStep = conv.phaseIndex >= tree.steps.length - 1;
  const newChoices = [...conv.choices, optionId];

  if (isLastStep) {
    // Record the conversation in a compact form. The legacy
    // ConversationRecord shape is hook/diagnosis/pitch-shaped, so we
    // collapse the first/last picks into those slots and stash the
    // joined choice ids as outcome text for future reference. A
    // proper branching-aware log shape can land alongside the grader
    // rework once multiple branching scenarios exist.
    const record: ConversationRecord = {
      round: state.currentRound,
      hookChoice: newChoices[0] ?? '',
      diagnosisChoice: newChoices[Math.floor(newChoices.length / 2)] ?? '',
      pitchChoice: newChoices[newChoices.length - 1] ?? '',
      partnerReaction: 'neutral',
      trustChange: trustDelta,
      outcome: option.partnerResponse,
    };

    updatedPartner.conversationLog.push(record);
    updatedPartner.lastContactedRound = state.currentRound;

    const newActionsThisRound = [...state.actionsThisRound, conv.partnerId];
    const newActionsRemaining = state.actionsRemaining - 1;

    // Grade with the branching-aware grader. Minimal pass for v1:
    // floor = safe picks + no active style mismatch; 2 stars at
    // styleSum >= 5; 3 stars at styleSum >= 6. No "optimal diag /
    // pitch" gate since branching has no fixed phase semantics yet.
    const regime = state.learnerProfile.market?.parityRegime ?? null;
    let grade: LastConversationGrade | null = null;
    let newRoundStars = state.roundStars;
    if (regime) {
      const result = gradeBranchingRound({
        tree,
        choices: newChoices,
        selectedPartnerId: conv.partnerId,
        regime,
        partnerPrimaryStyle: partner.persona.style,
      });
      grade = {
        partnerId: conv.partnerId,
        round: state.currentRound,
        ...result,
      };
      const previousBest = state.roundStars[state.currentRound] ?? 0;
      if (result.stars > previousBest) {
        newRoundStars = {
          ...state.roundStars,
          [state.currentRound]: result.stars,
        };
      }
    }

    return {
      ...state,
      partners: newPartners,
      actionsRemaining: newActionsRemaining,
      actionsThisRound: newActionsThisRound,
      roundStars: newRoundStars,
      lastConversationGrade: grade,
      conversationInProgress: {
        ...conv,
        phaseIndex: conv.phaseIndex,
        choices: newChoices,
        currentResponse: option.partnerResponse,
        currentEmotion: 'neutral',
        styleMatchScore,
      },
    };
  }

  return {
    ...state,
    partners: newPartners,
    conversationInProgress: {
      ...conv,
      phaseIndex: conv.phaseIndex + 1,
      choices: newChoices,
      currentResponse: option.partnerResponse,
      currentEmotion: 'neutral',
      styleMatchScore,
    },
  };
}

// ── End a conversation ──
// If a grade was computed (the conversation actually finished), route to
// the conversation-report screen so the learner sees their 0-3 star
// outcome. If there's no grade (the learner backed out mid-conversation
// via the dev nav or hit the abandon path), drop them back to the
// portfolio as before.
export function endConversation(state: GameState): GameState {
  const conv = state.conversationInProgress;
  if (!conv) return state;

  const hasGrade = state.lastConversationGrade !== null;

  return {
    ...state,
    screen: hasGrade ? 'conversation-report' : 'portfolio',
    conversationInProgress: hasGrade ? state.conversationInProgress : null,
    selectedPartnerId: hasGrade ? state.selectedPartnerId : null,
  };
}

// ── Reset the round so the learner can retake it ──
// Called after a 0-star conversation report. Restores the engaged
// partner to the state captured at startConversation, returns the
// learner's action budget for the round, and clears the failed grade.
// The learner lands back on the portfolio able to engage any partner
// (typically the one they should have picked) afresh.
export function resetRoundForRetake(state: GameState): GameState {
  const conv = state.conversationInProgress;
  if (!conv) {
    return {
      ...state,
      screen: 'portfolio',
      lastConversationGrade: null,
      selectedPartnerId: null,
    };
  }

  const snapshot = conv.partnerSnapshot;
  const newPartners = state.partners.map((p) =>
    p.persona.id === conv.partnerId ? snapshot : p,
  );

  return {
    ...state,
    screen: 'portfolio',
    partners: newPartners,
    actionsRemaining: ACTIONS_PER_ROUND,
    actionsThisRound: state.actionsThisRound.filter(
      (id) => id !== conv.partnerId,
    ),
    selectedPartnerId: null,
    conversationInProgress: null,
    lastConversationGrade: null,
  };
}

// ── Advance to the next round ──
// Gated: requires that the learner earned at least 1 star this round.
// If they didn't, this is a no-op (the report screen's Retake path is
// the only way out of a 0-star round). The gate is also enforced by
// the UI (Continue button only renders on >= 1 star), but the engine
// guard means programmatic advance attempts can't bypass it.
export function advanceRound(state: GameState): GameState {
  // Gate: a round only counts as cleared once the learner has earned
  // at least 1 star on it. A 0-star attempt or no attempt at all
  // blocks the advance.
  const starsThisRound = state.roundStars[state.currentRound] ?? 0;
  if (starsThisRound < 1) {
    return state;
  }

  if (state.currentRound >= TOTAL_ROUNDS) {
    return {
      ...state,
      screen: 'debrief',
      gameComplete: true,
    };
  }

  const nextRound = state.currentRound + 1;

  // First, do the engine-level updates from this round's play:
  // neglect drift for unengaged partners, history snapshot for the
  // engaged one.
  const partnersWithRoundEffects = state.partners.map((partner) => {
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

  // Then apply the scripted baseline for the next round. The baseline
  // overrides the headline KPI fields so the portfolio data evolves
  // along the authored arc (Stavros recovers, Marina's gap escalates,
  // Carlos's misconfig compounds). Partners without a baseline for
  // this round (e.g. rounds 4-10 today) pass through unchanged.
  const updatedPartners = partnersWithRoundEffects.map((p) =>
    applyRoundBaseline(p, nextRound),
  );

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
    marketUpdateAcknowledged: false,
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
    // New KPIs - pass through unchanged for now; conversation effects
    // still operate on the legacy fields. Will be rewired post-MVP.
    erpd: metrics.erpd,
    erpdChange: metrics.erpdChange,
    rpdPublic: metrics.rpdPublic,
    rpdLoyal: metrics.rpdLoyal,
    losePricePublic: metrics.losePricePublic,
    activeScenarios: metrics.activeScenarios,
    competitor: metrics.competitor,
    // Legacy fields - effects still land here
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
