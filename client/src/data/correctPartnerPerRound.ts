import type { ParityRegime } from '../types';

/**
 * Ground truth for "which partner should the learner have engaged
 * this round" - used by the grading layer to award 0 stars (a "missed
 * call") when a learner picks the wrong partner.
 *
 * Currently only the No-Parity regime is selectable in Market Select,
 * so only that regime has a real mapping. Narrow, Wide, and Cross-
 * Regional will be filled in once the partner data drop lands and
 * those regimes go live.
 *
 * Rounds beyond what's listed (currently 1-3) intentionally return
 * undefined - that means the grader can't grade those rounds, and the
 * round-gating layer will need to handle it gracefully until the
 * partner data is extended to 10 rounds.
 */
export const correctPartnerPerRound: Partial<
  Record<ParityRegime, Record<number, string>>
> = {
  none: {
    // Right call per round follows the scripted state arc in
    // data/partnerStateByRound.ts. Each round one partner is clearly
    // the worst on visible KPIs:
    //
    //   R1 - The Noble Falcon Inn (No Parity / Berlin) - structural
    //        Brand.com competitiveness gap, eRPD 17.0% with a 21.42
    //        percentage-point YoY spike, Lose Price 93%, four active
    //        scenarios including the Brand Scenario. Replaced John as
    //        the R1 target in June 2026.
    //   R2 - Marina (eRPD 9.4 trending sharply up, mobile gap
    //                escalating, lose-price 82%)
    //   R3 - Carlos (eRPD 10.8 trending sharply up, misconfigured
    //                Country Rate now compounding)
    //
    // Rounds 4-10 will need both new conversation content and new
    // baselines once the partner-data drop lands. Until then they're
    // placeheld with the Noble Falcon (No Parity) so the grading
    // layer has an answer; the sim today isn't playable past R3
    // because getConversationTree and getBranchingScenario both
    // return undefined beyond R3.
    1: 'noble-falcon-none',
    2: 'marina',
    3: 'carlos',
    4: 'noble-falcon-none',
    5: 'noble-falcon-none',
    6: 'noble-falcon-none',
    7: 'noble-falcon-none',
    8: 'noble-falcon-none',
    9: 'noble-falcon-none',
    10: 'noble-falcon-none',
  },
  // Narrow + Wide regimes stand up R1 with the corresponding
  // Noble Falcon variant. Each variant carries the same data and
  // partner story; only the regulatory framing of the conversation
  // differs by regime (see data/scenarios/noble-falcon-*-r1.ts).
  // R2-R10 pending the broader partner-data drop for these regimes.
  narrow: {
    1: 'noble-falcon-narrow',
  },
  wide: {
    1: 'noble-falcon-wide',
  },
  // cross-regional: pending partner data.
};

/**
 * Returns the partner id the learner should have engaged this round
 * given their market's parity regime. Returns null if no ground truth
 * is defined yet for that round/regime combination.
 */
export function getCorrectPartnerForRound(
  regime: ParityRegime,
  round: number,
): string | null {
  return correctPartnerPerRound[regime]?.[round] ?? null;
}
