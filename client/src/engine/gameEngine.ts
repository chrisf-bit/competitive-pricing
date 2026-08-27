import type {
  GameState,
  PartnerState,
  PartnerMetrics,
  ParityRegime,
  RelationshipStatus,
  ConversationRecord,
  ScoreBreakdown,
  RPDLevel,
  TrendDirection,
  LastConversationGrade,
  RoundAttemptStats,
} from '../types';
import type { GradingResult } from './grading';
import { initialPartners } from '../data/partners';
import { getMarketContext, generateRoundSummary } from '../data/market';
import { getConversationTree } from '../data/conversations';
import { getBranchingScenario } from '../data/branchingScenarios';
import { getPartnerBaseline } from '../data/partnerStateByRound';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';
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
  // Merge rather than replace so partner-level "static" metrics that
  // don't change per round (e.g. the PACE block) survive baseline
  // application. Baseline fields override partner fields where both
  // are set; partner-only fields persist.
  return {
    ...partner,
    metrics: { ...partner.metrics, ...baseline.metrics },
  };
}

// ── Constants ──
// One engagement per round - the learner must spot which partner needs
// them. Tracked implicitly via `actionsThisRound` (the list of partner
// IDs engaged this round): when the list is non-empty, the round is
// effectively spent. The earlier explicit `actionsRemaining` counter
// was removed in 2026-06 - it was always 1 or 0 with no intermediate
// values, so a count rendered no real information and added a
// redundant Actions pill to the Header.
// Capped at the contiguous max of SME-approved priority content.
// Level 1 (R1 Royal Crest ... R10 Noble Falcon) and Level 2 (OPC rounds
// R11-R20 - the ten lead partners revisited through the On-Platform
// Competitiveness lens) are both complete. Completing round 10 routes
// to the Level 1 Complete celebration and continues into Level 2;
// completing round 20 (with all of 11-20 cleared) routes to the Level 2
// Complete celebration.
// Typed as `number` (not the literal) so the level-boundary
// comparisons below don't trip TS's "no overlap between literals" check.
export const TOTAL_ROUNDS: number = 20;
// The last round of each level. The Level 1 -> Level 2 boundary fires
// the Level 1 Complete celebration mid-journey (not terminal) whenever
// Level 2 content exists beyond it.
const LEVEL_1_LAST_ROUND = 10;
const LEVEL_2_LAST_ROUND = 20;
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
  /**
   * Which regime the learner cleared under, if any. Persisted so a
   * regime change on return can route them through the Call Audit
   * for the new regime without redoing the whole clearance.
   */
  level0ClearedForRegime?: ParityRegime | null;
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
      clearedForRegime: overrides?.level0ClearedForRegime ?? null,
    },
    currentDiagnosis: null,
    level0ReturnTo: null,
    level0RetryItemIds: null,
    tutorialShown: false,
    partnerDetailTutorialShown: false,
    issueTreeHelperStates: {},
    hasOpenedIssueTreeHelper: false,
    currentRound: 1,
    actionsThisRound: [],
    previouslyEngagedThisRound: [],
    engagedPartnerIds: [],
    selectedPartnerId: null,
    partners,
    marketContext: getMarketContext(
      overrides?.learnerProfile?.market?.parityRegime ?? null,
      1,
    ),
    roundSummaries: [],
    roundStars: overrides?.roundStars ?? {},
    lastConversationGrade: null,
    roundAttempts: {},
    isPracticeMode: false,
    conversationInProgress: null,
    gameComplete: false,
  };
}

/**
 * Reset the sim for a fresh playthrough while preserving the durable
 * bits the learner has earned. Called from the Debrief 'Play Again'
 * button. Distinct from `onRestart` (full nuke, used by Splash 'Reset
 * progress' and DevNav 'Reset') because a learner who's completed
 * clearance should not have to redo it just to replay the rounds -
 * that was the "retook clearance despite completing it earlier" bug.
 *
 * Preserves:
 *   - learnerProfile (regime, avatar, persona, name)
 *   - level0Progress.cleared (so Briefing still shows 'Open your
 *     portfolio' and Character Build routes past the activities)
 *   - tutorialShown / partnerDetailTutorialShown (they've seen them)
 *
 * Resets everything else: partners revert to R1 baseline, round back
 * to 1, roundStars wiped, all conversation / helper / engagement
 * bookkeeping cleared. The learner lands on the Round Select hub
 * with a fresh sheet.
 */
export function resetForPlayAgain(state: GameState): GameState {
  const partners = initialPartners.map((p) => {
    const withBaseline = applyRoundBaseline(p, 1);
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
    screen: 'round-select',
    currentRound: 1,
    actionsThisRound: [],
    previouslyEngagedThisRound: [],
    engagedPartnerIds: [],
    selectedPartnerId: null,
    partners,
    marketContext: getMarketContext(
      state.learnerProfile.market?.parityRegime ?? null,
      1,
    ),
    roundSummaries: [],
    // Play Again preserves the learner's best round stars (and attempt
    // counts) - a replay can only raise a score, never wipe it. Only a
    // true reset (Splash "Reset progress" / DevNav) clears the star
    // history via onRestart.
    issueTreeHelperStates: {},
    hasOpenedIssueTreeHelper: false,
    conversationInProgress: null,
    lastConversationGrade: null,
    isPracticeMode: false,
    gameComplete: false,
    // Clear any in-flight Level 0 retry bookkeeping too - a Play
    // Again should land the learner on a fully clean slate outside
    // of their identity + clearance.
    level0ReturnTo: null,
    level0RetryItemIds: null,
    level0Progress: {
      ...state.level0Progress,
      knowledgeCheckResults: [],
    },
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
    actionsThisRound: [],
    previouslyEngagedThisRound: [],
    selectedPartnerId: null,
    partners,
    marketContext: getMarketContext(
      state.learnerProfile.market?.parityRegime ?? null,
      round,
    ),
    issueTreeHelperStates: {},
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

/**
 * Maps an eRPD percentage to one of the seven Booking.com price
 * buckets used by LPS for internal portfolio prioritization. Lower
 * bucket = more competitive partner; higher bucket = partner is
 * more expensive than Key OTA / Brand.com and worth a call.
 *
 * Thresholds verbatim from the Partner Metrics PDF page 23
 * "Details" column - boundary values land in the lower bucket:
 *   B1: eRPD ≤ -3%             (most competitive)
 *   B2: -3% < eRPD ≤ 0%
 *   B3: 0%  < eRPD ≤ 3%
 *   B4: 3%  < eRPD ≤ 6%
 *   B5: 6%  < eRPD ≤ 9%
 *   B6: 9%  < eRPD ≤ 12%
 *   B7: eRPD > 12%             (least competitive)
 *
 * The boundary rule means exactly 3.0 lands in Bucket 3 (not 4),
 * exactly 12.0 lands in Bucket 6 (not 7), exactly -3.0 lands in
 * Bucket 1 (not 2), etc.
 *
 * Internal-only data. Per the compliance rules, the bucket must
 * never appear in partner-facing copy - it's a prioritization
 * signal for the LPS, not a target to communicate to the partner.
 */
export type PriceBucket = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function getPriceBucket(erpd: number): PriceBucket {
  if (erpd <= -3) return 1;
  if (erpd <= 0) return 2;
  if (erpd <= 3) return 3;
  if (erpd <= 6) return 4;
  if (erpd <= 9) return 5;
  if (erpd <= 12) return 6;
  return 7;
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

    const newActionsThisRound = [...state.actionsThisRound, conv.partnerId];
    // Only persist the engagement to the durable list during the main
    // run. Practice Mode replays are separate attempts and shouldn't
    // rewrite the main-run engagement history the Debrief reads.
    const newEngagedPartnerIds =
      !state.isPracticeMode && !state.engagedPartnerIds.includes(conv.partnerId)
        ? [...state.engagedPartnerIds, conv.partnerId]
        : state.engagedPartnerIds;

    // Grade the round - 0/1/2/3 stars - and route to the report screen
    // so the learner sees their result before the round transition.
    // Stars never go down: a replay can only improve the stored score.
    // Default to 'none' (never null) so a completed call always grades -
    // see the matching note on the branching path below.
    const regime = state.learnerProfile.market?.parityRegime ?? 'none';
    let newRoundStars = state.roundStars;
    const result = gradeRound({
      tree,
      choices: newChoices,
      selectedPartnerId: conv.partnerId,
      regime,
      partnerPrimaryStyle: partner.persona.style,
    });
    const grade: LastConversationGrade = {
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

    // Record the attempt for the Debrief's diagnosis/pitch/focus
    // readout. Main-run only (practice replays shouldn't rewrite the
    // development history) and right-partner only (see recordRoundAttempt).
    // Legacy 3-phase trees carry no issueTreePath, so issueId is null.
    const newRoundAttempts = state.isPracticeMode
      ? state.roundAttempts
      : recordRoundAttempt(
          state.roundAttempts,
          state.currentRound,
          conv.partnerId,
          null,
          result,
        );

    // Stay on the conversation screen so the learner can read the
    // final partner response. The conversation-complete UI button there
    // calls onEndConversation, which routes to the report screen via
    // endConversation below.
    return {
      ...state,
      partners: newPartners,
      actionsThisRound: newActionsThisRound,
      engagedPartnerIds: newEngagedPartnerIds,
      roundStars: newRoundStars,
      roundAttempts: newRoundAttempts,
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

    const newActionsThisRound = [...state.actionsThisRound, conv.partnerId];
    // See processConversationChoice above for the reasoning - main-run
    // only, skip Practice Mode, dedupe.
    const newEngagedPartnerIds =
      !state.isPracticeMode && !state.engagedPartnerIds.includes(conv.partnerId)
        ? [...state.engagedPartnerIds, conv.partnerId]
        : state.engagedPartnerIds;

    // Grade with the branching-aware grader. Minimal pass for v1:
    // floor = safe picks + no active style mismatch; 2 stars at
    // styleSum >= 5; 3 stars at styleSum >= 6. No "optimal diag /
    // pitch" gate since branching has no fixed phase semantics yet.
    // Default to 'none' (never null) so a completed call ALWAYS grades and
    // yields a report + retake path. A null regime (only reachable via a
    // DevNav jump that skips Market Select) previously left grade null,
    // routed to portfolio with the partner marked engaged, and advanceRound
    // no-op'd on <1 star - a soft-lock. 'none' matches the portfolio's own
    // no-market fallback, so the engaged partner id lines up.
    const regime = state.learnerProfile.market?.parityRegime ?? 'none';
    let newRoundStars = state.roundStars;
    const result = gradeBranchingRound({
      tree,
      choices: newChoices,
      selectedPartnerId: conv.partnerId,
      regime,
      partnerPrimaryStyle: partner.persona.style,
    });
    const grade: LastConversationGrade = {
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

    // Record the attempt for the Debrief's diagnosis/pitch/focus
    // readout. Main-run + right-partner only (see recordRoundAttempt).
    // Branching trees carry the issue slug on their issueTreePath.
    const newRoundAttempts = state.isPracticeMode
      ? state.roundAttempts
      : recordRoundAttempt(
          state.roundAttempts,
          state.currentRound,
          conv.partnerId,
          tree.issueTreePath?.issueId ?? null,
          result,
        );

    return {
      ...state,
      partners: newPartners,
      actionsThisRound: newActionsThisRound,
      engagedPartnerIds: newEngagedPartnerIds,
      roundStars: newRoundStars,
      roundAttempts: newRoundAttempts,
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

  // Only flag the retake partner as "already tried this round" when
  // they were the WRONG pick for the round. If the learner picked
  // the CORRECT partner but bombed the responses, they should be
  // able to retake with the same (correct) partner - marking the
  // partner as previously engaged disables their Begin Conversation
  // button (via alreadyEngaged in App.tsx), which would leave the
  // learner stuck on retake with no valid partner to call.
  const regime = state.learnerProfile.market?.parityRegime ?? null;
  const correctPartnerId = regime
    ? getCorrectPartnerForRound(regime, state.currentRound)
    : null;
  const wasWrongPartner =
    correctPartnerId !== null && conv.partnerId !== correctPartnerId;

  return {
    ...state,
    screen: 'portfolio',
    partners: newPartners,
    actionsThisRound: state.actionsThisRound.filter(
      (id) => id !== conv.partnerId,
    ),
    // Retake undoes the engagement from the durable list too: the
    // partner's state is snapshot-reverted (above), so from the
    // debrief's perspective the wrong pick "didn't happen". Without
    // this filter, a 0-star wrong-pick would still surface in the
    // Debrief's Partner Outcomes + insights as an engaged partner.
    engagedPartnerIds: state.engagedPartnerIds.filter(
      (id) => id !== conv.partnerId,
    ),
    // Keep the WRONG-pick partner flagged as "engaged this round" on
    // the Portfolio + Partner Detail so the learner sees they've
    // already tried that partner and doesn't waste the retake
    // re-picking the same wrong call. Right partner + bad responses
    // = the flag is skipped so the learner can retake with the same
    // correct partner without Begin Conversation being disabled.
    previouslyEngagedThisRound: wasWrongPartner
      ? state.previouslyEngagedThisRound.includes(conv.partnerId)
        ? state.previouslyEngagedThisRound
        : [...state.previouslyEngagedThisRound, conv.partnerId]
      : state.previouslyEngagedThisRound,
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

  const allCleared = (from: number, to: number): boolean =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i).every(
      (r) => (state.roundStars[r] ?? 0) >= 1,
    );

  if (state.currentRound >= TOTAL_ROUNDS) {
    // Terminal: the learner just finished the last authored round.
    // Route to a level-completion celebration when a whole level was
    // cleared here, otherwise straight to the debrief.
    //   - At the Level 2 boundary (round 20, once 17-20 land) with all
    //     of 11-20 cleared -> the Level 2 Complete celebration.
    //   - Legacy path: if no Level 2 content exists yet
    //     (TOTAL_ROUNDS === 10) and all of Level 1 is cleared -> the
    //     Level 1 Complete celebration (terminal in that case).
    //   - Everything else -> debrief.
    let screen: GameState['screen'] = 'debrief';
    if (TOTAL_ROUNDS >= LEVEL_2_LAST_ROUND && allCleared(11, LEVEL_2_LAST_ROUND)) {
      screen = 'level-2-complete';
    } else if (
      TOTAL_ROUNDS === LEVEL_1_LAST_ROUND &&
      allCleared(1, LEVEL_1_LAST_ROUND)
    ) {
      screen = 'level-1-complete';
    }
    return {
      ...state,
      screen,
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

  // Level 1 -> Level 2 boundary: finishing round 10 (with all of
  // Level 1 cleared, and Level 2 content authored beyond it) fires the
  // Level 1 Complete celebration as a mid-journey milestone. It is NOT
  // terminal - state still advances to round 11 and the celebration's
  // CTA continues on to Round Select with Level 2 unlocked.
  const crossingIntoLevel2 =
    state.currentRound === LEVEL_1_LAST_ROUND &&
    TOTAL_ROUNDS > LEVEL_1_LAST_ROUND &&
    allCleared(1, LEVEL_1_LAST_ROUND);

  return {
    ...state,
    // Routes to the round-select hub (or the Level 1 Complete
    // celebration at the Level 1 -> Level 2 boundary). Learner picks
    // the next round's tile to enter its portfolio. The between-round
    // screen retired in 2026-06 was a passive summary - this one has a
    // job (show star progress, unlock the next tile, offer retries) so
    // the extra click earns its keep.
    screen: crossingIntoLevel2 ? 'level-1-complete' : 'round-select',
    currentRound: nextRound,
    actionsThisRound: [],
    previouslyEngagedThisRound: [],
    selectedPartnerId: null,
    partners: updatedPartners,
    marketContext: getMarketContext(
      state.learnerProfile.market?.parityRegime ?? null,
      nextRound,
    ),
    roundSummaries: [...state.roundSummaries, roundSummary],
    conversationInProgress: null,
  };
}

// ── Enter a round from the round-select hub ──
// Routes into the portfolio for the tapped round. `currentRound`
// is set (in case it's out-of-sync from a retry tap on an earlier
// completed round) but no neglect drift or baseline shifting fires
// - advanceRound owns those state updates. This is a plain screen
// jump into an existing round's play state.
export function enterRound(state: GameState, round: number): GameState {
  return {
    ...state,
    screen: 'portfolio',
    currentRound: round,
    selectedPartnerId: null,
  };
}

// ── Calculate final score ──
export function calculateScore(state: GameState): ScoreBreakdown {
  const initialPartnerData = initialPartners;
  let totalTrust = 0;
  const highlights: string[] = [];
  const improvements: string[] = [];
  const styleInsights: string[] = [];

  // Restrict insights + portfolio-level averages to the partners the
  // learner actually engaged with. Judging them across the whole
  // regime portfolio (21 partners today) produced nonsense on a
  // perfect run: 18 correctly-ignored partners showed up as "RPD
  // declined, consider prioritizing them earlier" and every one of
  // them added a style-preference paragraph. Now the debrief only
  // speaks to the calls the learner made.
  const engagedPartners = state.partners.filter((p) =>
    state.engagedPartnerIds.includes(p.persona.id),
  );

  for (const partner of engagedPartners) {
    const initial = initialPartnerData.find(
      (p) => p.persona.id === partner.persona.id,
    );
    if (!initial) continue;

    // rpdDelta drives the highlight / improvement insight text below.
    // (The old portfolioRPD / revenueImpact score tiles were dropped -
    // they read from these legacy fields that the branching engine barely
    // moves, so they were cosmetic. Stars are the authoritative score.)
    const rpdDelta = partner.metrics.experiencedRPD - initial.metrics.experiencedRPD;

    totalTrust += partner.trust;

    // Generate insights
    if (rpdDelta > 15) {
      highlights.push(
        `${partner.persona.name}'s Experienced RPD improved significantly (+${rpdDelta} points)`,
      );
    } else if (rpdDelta < 0) {
      improvements.push(
        `${partner.persona.name}'s Experienced RPD declined. Consider prioritizing them earlier.`,
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

  const engagedCount = engagedPartners.length;
  const avgTrust = engagedCount > 0 ? totalTrust / engagedCount : 0;

  // Grade reads from per-round stars rather than the legacy metric
  // deltas above. The new branching conversations only nudge a few
  // legacy fields by a couple of points, so even a perfect 3-stars-
  // per-round playthrough wouldn't clear the legacy thresholds and a
  // perfect run would inexplicably land at C / Developing. Stars are
  // the authoritative per-round score and roll up cleanly here:
  // TOTAL_ROUNDS * 3 stars max (60 for the full 20-round journey); the
  // percentage maps to A/B/C/D. Note the denominator is the full
  // TOTAL_ROUNDS, so a partial-run debrief (practice / DevNav) would read
  // deflated - fine for the normal end-of-journey path.
  let totalStars = 0;
  for (const round of Object.keys(state.roundStars)) {
    totalStars += state.roundStars[Number(round)] ?? 0;
  }
  const maxStars = TOTAL_ROUNDS * 3;
  const starsPct = maxStars > 0 ? totalStars / maxStars : 0;

  let grade: 'A' | 'B' | 'C' | 'D';
  if (starsPct >= 0.89) grade = 'A';
  else if (starsPct >= 0.67) grade = 'B';
  else if (starsPct >= 0.33) grade = 'C';
  else grade = 'D';

  if (highlights.length === 0) {
    highlights.push('You engaged with partners and gained valuable experience.');
  }
  if (improvements.length === 0) {
    improvements.push('Consider exploring different communication approaches for even better results.');
  }

  return {
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

/**
 * Fold one graded attempt into the per-round attempt stats. Records
 * only right-partner attempts (diagnosis/pitch correctness against a
 * decoy's tree is noise) and never lowers a first-correct attempt
 * number once set. Callers gate on `!isPracticeMode` so only main-run
 * attempts count toward the development readout.
 */
function recordRoundAttempt(
  roundAttempts: Record<number, RoundAttemptStats>,
  round: number,
  partnerId: string,
  issueId: string | null,
  result: GradingResult,
): Record<number, RoundAttemptStats> {
  if (!result.rightPartner) return roundAttempts;
  const prev = roundAttempts[round];
  const attemptNo = (prev?.totalAttempts ?? 0) + 1;
  return {
    ...roundAttempts,
    [round]: {
      partnerId,
      issueId: prev?.issueId ?? issueId,
      totalAttempts: attemptNo,
      diagnosisFirstCorrectAttempt:
        prev?.diagnosisFirstCorrectAttempt ??
        (result.diagnosisCorrect ? attemptNo : null),
      pitchFirstCorrectAttempt:
        prev?.pitchFirstCorrectAttempt ??
        (result.pitchCorrect ? attemptNo : null),
    },
  };
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
