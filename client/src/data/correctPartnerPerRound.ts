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
    //   R1 - Stavros (eRPD 17.2, parity breach + broken Last-Minute,
    //                 lose-price 96%)
    //   R2 - Marina (eRPD 9.4 trending sharply up, mobile gap
    //                escalating, lose-price 82%; Stavros's parity fix
    //                has dropped his numbers below Marina's)
    //   R3 - Carlos (eRPD 10.8 trending sharply up, misconfigured
    //                Country Rate now compounding)
    //
    // Rounds 4-10 will need both new conversation content and new
    // baselines once the partner-data drop lands. Until then they're
    // placeheld with Stavros so the grading layer has an answer; the
    // sim today isn't playable past R3 because getConversationTree
    // returns undefined beyond R3.
    1: 'stavros',
    2: 'marina',
    3: 'carlos',
    4: 'stavros',
    5: 'stavros',
    6: 'stavros',
    7: 'stavros',
    8: 'stavros',
    9: 'stavros',
    10: 'stavros',
  },
  // narrow / wide / cross-regional: pending partner data. The
  // partner-data drop will introduce per-regime crisis partners.
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
