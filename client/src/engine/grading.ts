import type {
  ConversationTree,
  ConversationNode,
  ConversationOption,
  CommunicationStyle,
  ParityRegime,
  BranchingConversationTree,
} from '../types';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';

/**
 * 0-3 star grading for a completed conversation round.
 *
 * Floor (required for ≥ 1 star, otherwise 0 stars):
 * 1. Right partner picked for this round (the worst-off in the regime).
 * 2. Optimal Diagnosis option chosen.
 * 3. Optimal Pitch option chosen.
 * 4. Every pick compliance is 'safe' (no risky/borderline).
 * 5. No active style mismatch (no single pick scoring <= -2 against the
 *    partner's primary communication style).
 *
 * Above the floor:
 * - 2 stars: style sum across Hook + Diagnosis + Pitch ≥ +5 on partner's
 *   primary style.
 * - 3 stars: style sum ≥ +6.
 *
 * "Optimal" Diagnosis/Pitch are derived from the node data: the option
 * with the highest trustChange, with metricEffects sum as tiebreaker.
 * That keeps the SME-authored conversation content as the single source
 * of truth - no separate "right answer" map to maintain.
 */

export interface GradingInput {
  /** Conversation tree the learner played through. */
  tree: ConversationTree;
  /** Option IDs chosen by the learner, one per phase, in order. */
  choices: string[];
  /** The partner the learner actually engaged this round. */
  selectedPartnerId: string;
  /** The learner's market parity regime - used to look up the right partner for this round. */
  regime: ParityRegime;
  /** The selected partner's primary communication style - used for style scoring. */
  partnerPrimaryStyle: CommunicationStyle;
}

export type GradingFailureReason =
  | 'wrong-partner'
  | 'wrong-diagnosis'
  | 'wrong-pitch'
  | 'unsafe-pick'
  | 'style-mismatch';

export interface GradingResult {
  stars: 0 | 1 | 2 | 3;
  /** True if the learner picked the partner this round was designed around. */
  rightPartner: boolean;
  /** If false, this is the partner they should have engaged this round. */
  expectedPartnerId: string | null;
  /** True if every pick was compliance 'safe'. */
  allCompliant: boolean;
  /** True if the optimal Diagnosis option (derived from trustChange) was chosen. */
  diagnosisCorrect: boolean;
  /** True if the optimal Pitch option was chosen. */
  pitchCorrect: boolean;
  /** True if no individual pick scored <= -2 on partner's primary style. */
  noActiveMismatch: boolean;
  /** Sum of partner-primary-style scores across all three phase picks. */
  styleSum: number;
  /** Which floor criterion failed, or null when the floor was met. */
  failureReason: GradingFailureReason | null;
}

/**
 * Identify the "optimal" option for a phase by ranking the phase's
 * nodes: highest trustChange wins, with metricEffects sum as tiebreak.
 */
function optimalOptionIdForPhase(nodes: ConversationNode[]): string | null {
  if (nodes.length === 0) return null;
  const ranked = [...nodes].sort((a, b) => {
    if (b.trustChange !== a.trustChange) {
      return b.trustChange - a.trustChange;
    }
    const aMetric = sumMetricEffects(a);
    const bMetric = sumMetricEffects(b);
    return bMetric - aMetric;
  });
  return ranked[0].optionId;
}

function sumMetricEffects(node: ConversationNode): number {
  let sum = 0;
  for (const v of Object.values(node.metricEffects)) {
    if (typeof v === 'number') sum += v;
  }
  return sum;
}

function findOption(
  tree: ConversationTree,
  phaseIndex: number,
  optionId: string,
): ConversationOption | null {
  return (
    tree.phases[phaseIndex]?.phase.options.find((o) => o.id === optionId) ?? null
  );
}

export function gradeRound(input: GradingInput): GradingResult {
  const { tree, choices, selectedPartnerId, regime, partnerPrimaryStyle } = input;

  // Locate phases by id rather than index so the grader doesn't break if
  // a future tree reorders or omits a phase.
  const phaseIndexOf = (id: 'hook' | 'diagnosis' | 'pitch'): number =>
    tree.phases.findIndex((p) => p.phase.id === id);

  const hookIdx = phaseIndexOf('hook');
  const diagIdx = phaseIndexOf('diagnosis');
  const pitchIdx = phaseIndexOf('pitch');

  // Right partner check.
  const expectedPartnerId = getCorrectPartnerForRound(regime, tree.round);
  const rightPartner =
    expectedPartnerId !== null && selectedPartnerId === expectedPartnerId;

  // Resolve the picks the learner made for each phase.
  const hookPick = hookIdx >= 0 ? choices[hookIdx] : undefined;
  const diagPick = diagIdx >= 0 ? choices[diagIdx] : undefined;
  const pitchPick = pitchIdx >= 0 ? choices[pitchIdx] : undefined;

  const pickedOptions: ConversationOption[] = [];
  if (hookPick) {
    const o = findOption(tree, hookIdx, hookPick);
    if (o) pickedOptions.push(o);
  }
  if (diagPick) {
    const o = findOption(tree, diagIdx, diagPick);
    if (o) pickedOptions.push(o);
  }
  if (pitchPick) {
    const o = findOption(tree, pitchIdx, pitchPick);
    if (o) pickedOptions.push(o);
  }

  const allCompliant = pickedOptions.every((o) => o.compliance === 'safe');

  // Optimal-pick checks.
  const optimalDiagId =
    diagIdx >= 0
      ? optimalOptionIdForPhase(tree.phases[diagIdx].nodes)
      : null;
  const optimalPitchId =
    pitchIdx >= 0
      ? optimalOptionIdForPhase(tree.phases[pitchIdx].nodes)
      : null;
  const diagnosisCorrect = !!diagPick && diagPick === optimalDiagId;
  const pitchCorrect = !!pitchPick && pitchPick === optimalPitchId;

  // Style maths on partner's primary style.
  const styleScores = pickedOptions.map(
    (o) => o.styleMatch[partnerPrimaryStyle] ?? 0,
  );
  const styleSum = styleScores.reduce((a, b) => a + b, 0);
  const noActiveMismatch = styleScores.every((s) => s > -2);

  // Compose the floor.
  let failureReason: GradingFailureReason | null = null;
  if (!rightPartner) {
    failureReason = 'wrong-partner';
  } else if (!diagnosisCorrect) {
    failureReason = 'wrong-diagnosis';
  } else if (!pitchCorrect) {
    failureReason = 'wrong-pitch';
  } else if (!allCompliant) {
    failureReason = 'unsafe-pick';
  } else if (!noActiveMismatch) {
    failureReason = 'style-mismatch';
  }

  let stars: 0 | 1 | 2 | 3;
  if (failureReason !== null) {
    stars = 0;
  } else if (styleSum >= 6) {
    stars = 3;
  } else if (styleSum >= 5) {
    stars = 2;
  } else {
    stars = 1;
  }

  return {
    stars,
    rightPartner,
    expectedPartnerId,
    allCompliant,
    diagnosisCorrect,
    pitchCorrect,
    noActiveMismatch,
    styleSum,
    failureReason,
  };
}

// ── Branching-conversation grader ────────────────────────────────
/**
 * 0-3 star grader for branching scenarios.
 *
 * Minimal pass for v1. Branching has no fixed Diagnosis/Pitch
 * semantics yet, so the "optimal diag" and "optimal pitch" floor
 * criteria are dropped. The grader keeps the rest of the floor and
 * the same star thresholds, so a learner who runs a 5-exchange
 * branching scenario sees the same outcome shape on the Conversation
 * Report (0-3 stars + criterion checklist + style readout).
 *
 * Floor:
 *   1. Right partner picked for this round (when a correct-partner
 *      mapping is defined for the regime/round). Same check as 3-phase.
 *   2. Every pick `compliance: 'safe'`.
 *   3. No active style mismatch (no single pick <= -2 on the
 *      partner's primary style).
 *
 * Above the floor: 2 stars if styleSum >= 5, 3 stars if styleSum >= 6.
 *
 * `diagnosisCorrect` and `pitchCorrect` on the result are filled with
 * a heuristic until SME content tags per-step "optimal" picks
 * consistently: diagnosisCorrect = true when at least half of the
 * non-final picks are `optimal`; pitchCorrect = true when the final
 * pick is `optimal`. These flags only feed the Report criterion
 * readout, not the floor.
 */
export function gradeBranchingRound(input: {
  tree: BranchingConversationTree;
  choices: string[];
  selectedPartnerId: string;
  regime: ParityRegime;
  partnerPrimaryStyle: CommunicationStyle;
}): GradingResult {
  const { tree, choices, selectedPartnerId, regime, partnerPrimaryStyle } = input;

  // Right partner check - same model as the 3-phase grader. A regime
  // without a correct-partner mapping (e.g. Wide while it's still
  // pending) treats any pick as right so the scenario is gradeable.
  const expectedPartnerId = getCorrectPartnerForRound(regime, tree.round);
  const rightPartner =
    expectedPartnerId === null || selectedPartnerId === expectedPartnerId;

  // Resolve every option the learner picked across the steps.
  const pickedOptions = choices
    .map((choiceId, idx) =>
      tree.steps[idx]?.options.find((o) => o.id === choiceId),
    )
    .filter((o): o is NonNullable<typeof o> => !!o);

  const allCompliant = pickedOptions.every((o) => o.compliance === 'safe');

  const styleScores = pickedOptions.map(
    (o) => o.styleMatch[partnerPrimaryStyle] ?? 0,
  );
  const styleSum = styleScores.reduce((a, b) => a + b, 0);
  const noActiveMismatch = styleScores.every((s) => s > -2);

  // Heuristic diag/pitch correctness for the Report criterion readout.
  // The grader's floor does NOT use these - they're informational.
  const nonFinalPicks = pickedOptions.slice(0, -1);
  const finalPick = pickedOptions[pickedOptions.length - 1];
  const optimalNonFinal = nonFinalPicks.filter((o) => o.optimal).length;
  const diagnosisCorrect =
    nonFinalPicks.length === 0 ||
    optimalNonFinal >= Math.ceil(nonFinalPicks.length / 2);
  const pitchCorrect = !!finalPick?.optimal;

  let failureReason: GradingFailureReason | null = null;
  if (!rightPartner) {
    failureReason = 'wrong-partner';
  } else if (!allCompliant) {
    failureReason = 'unsafe-pick';
  } else if (!noActiveMismatch) {
    failureReason = 'style-mismatch';
  }

  let stars: 0 | 1 | 2 | 3;
  if (failureReason !== null) {
    stars = 0;
  } else if (styleSum >= 6) {
    stars = 3;
  } else if (styleSum >= 5) {
    stars = 2;
  } else {
    stars = 1;
  }

  return {
    stars,
    rightPartner,
    expectedPartnerId,
    allCompliant,
    diagnosisCorrect,
    pitchCorrect,
    noActiveMismatch,
    styleSum,
    failureReason,
  };
}
