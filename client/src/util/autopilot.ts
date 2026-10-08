/**
 * Autopilot test-run (hidden tile on Character Build).
 *
 * Generates a full, realistic playthrough's xAPI dataset WITHOUT the learner
 * playing - clearance cleared, then all 20 rounds driven against the real
 * conversation trees and the real grader, with a deliberate MIX of optimal
 * and non-optimal rounds so the reporting shows a spread of star outcomes.
 * Every statement is sent one at a time (sequential, awaited, spaced) via
 * the xapi autopilot sender so none are batch-rejected by the LRS.
 *
 * TEST ONLY. Flip AUTOPILOT_ENABLED to false (and rebuild) to remove the
 * tile entirely. Must be disabled before the final production launch.
 */

import {
  xapiInitialized,
  xapiClearanceItem,
  xapiClearancePassed,
  xapiLevelMilestone,
  xapiRoundStarted,
  xapiDecision,
  xapiRoundCompleted,
  xapiCompleted,
  beginAutopilotCapture,
  flushAutopilot,
  type Level,
} from './xapi';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';
import { getBranchingScenario } from '../data/branchingScenarios';
import { gradeBranchingRound } from '../engine/grading';
import { TOTAL_ROUNDS } from '../engine/gameEngine';
import { initialPartners } from '../data/partners';
import type { ParityRegime, CommunicationStyle, BranchingConversationTree } from '../types';

/** Single switch: set to false (and rebuild) to remove the hidden tile. */
export const AUTOPILOT_ENABLED = true;

const styleById = new Map(initialPartners.map((p) => [p.persona.id, p.persona.style]));

// Clearance knowledge-check item ids (matches what the real activities emit).
const CLEARANCE_ITEMS = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'B1', 'B2',
  'data-insights-priority', 'data-insights-improving', 'data-insights-public-vs-loyal',
  'email-audit-p1', 'email-audit-p2', 'email-audit-p3', 'email-audit-p4', 'email-audit-p5',
  'mini-scenario-mobile-gap-signal', 'mini-scenario-mobile-gap-diagnose',
  'mini-scenario-mobile-gap-narrative', 'mini-scenario-mobile-gap-next-step',
];
// One deliberately-wrong item so clearance isn't a flat 100%.
const CLEARANCE_WRONG = new Set(['mini-scenario-mobile-gap-signal']);

/**
 * Choice set per round. Most rounds take the optimal path (3 stars); every
 * 3rd round takes one non-optimal SAFE step (lands ~2 stars); every 5th a
 * borderline step (caps at 1 star) - a realistic spread. Substituted options
 * must keep style > -2 on the partner's primary style so they never trip the
 * hard style-mismatch floor (which would make the round a 0 / failed call).
 */
function buildChoices(
  tree: BranchingConversationTree,
  round: number,
  primaryStyle: CommunicationStyle,
): string[] {
  const choices = tree.steps.map((s) => (s.options.find((o) => o.optimal) ?? s.options[0]).id);
  const lastIdx = tree.steps.length - 1;
  const safeStyle = (o: BranchingConversationTree['steps'][number]['options'][number]) =>
    (o.styleMatch[primaryStyle] ?? 0) > -2;
  const pick = (test: (o: BranchingConversationTree['steps'][number]['options'][number]) => boolean) => {
    for (let i = 0; i < lastIdx; i++) {
      const alt = tree.steps[i].options.find((o) => test(o) && safeStyle(o));
      if (alt) { choices[i] = alt.id; return; }
    }
  };
  if (round % 5 === 0) pick((o) => !o.optimal && o.compliance === 'borderline');
  else if (round % 3 === 0) pick((o) => !o.optimal && o.compliance === 'safe');
  return choices;
}

export async function runAutopilot(
  regime: ParityRegime,
  onProgress?: (sent: number, total: number) => void,
  delayMs = 70,
): Promise<{ total: number; roundStars: Record<number, 0 | 1 | 2 | 3> }> {
  beginAutopilotCapture();

  xapiInitialized();

  // Clearance.
  let correct = 0;
  for (const id of CLEARANCE_ITEMS) {
    const isCorrect = !CLEARANCE_WRONG.has(id);
    if (isCorrect) correct += 1;
    xapiClearanceItem(id, isCorrect);
  }
  xapiClearancePassed(Math.round((correct / CLEARANCE_ITEMS.length) * 100));
  xapiLevelMilestone('L0', { roundsCompleted: 0 });

  // Rounds (real trees + real grader, mixed outcomes).
  const roundStars: Record<number, 0 | 1 | 2 | 3> = {};
  let totalStars = 0;
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    const level: Level = round > 10 ? 'L2' : 'L1';
    const correctId = getCorrectPartnerForRound(regime, round);
    const tree = correctId ? getBranchingScenario(correctId, round) : null;
    if (!correctId || !tree) continue;
    const primaryStyle = (styleById.get(correctId) ?? 'blue') as CommunicationStyle;
    const gradeOf = (c: string[]) =>
      gradeBranchingRound({
        tree,
        choices: c,
        selectedPartnerId: correctId,
        regime,
        partnerPrimaryStyle: primaryStyle,
      }).stars;

    let choices = buildChoices(tree, round, primaryStyle);
    let stars = gradeOf(choices);
    if (stars === 0) {
      // Safety net: a substitution unexpectedly failed the floor. Fall back
      // to the optimal path so a test run never shows a failed round.
      choices = tree.steps.map((s) => (s.options.find((o) => o.optimal) ?? s.options[0]).id);
      stars = gradeOf(choices);
    }

    xapiRoundStarted(round, level);
    choices.forEach((optionId, idx) => {
      const step = tree.steps[idx];
      const opt = step?.options.find((o) => o.id === optionId);
      if (!step || !opt) return;
      xapiDecision({
        round,
        level,
        partnerId: correctId,
        stepId: step.id,
        optionId,
        compliance: opt.compliance,
        styleMatch: opt.styleMatch[primaryStyle] ?? 0,
        optimal: !!opt.optimal,
      });
    });

    roundStars[round] = stars;
    totalStars += stars;
    xapiRoundCompleted(round, level, stars);

    if (round === 10) xapiLevelMilestone('L1', { roundsCompleted: 10, totalStars });
    if (round === 20) xapiLevelMilestone('L2', { roundsCompleted: 10, totalStars });
  }

  xapiCompleted(Math.round((totalStars / (TOTAL_ROUNDS * 3)) * 100));

  const total = await flushAutopilot(onProgress, delayMs);
  return { total, roundStars };
}
