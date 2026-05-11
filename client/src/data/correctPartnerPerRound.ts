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
    // Stavros stays the right call across all three rounds because his
    // metrics stay the worst across all three rounds. The engine's
    // metricEffects move him by a few points per conversation - not
    // enough to drop him out of "clearly the worst" - and the R1/R2/R3
    // conversation trees for Stavros were already written as a
    // sustained follow-up arc (parity breach -> fix the broken Last-
    // Minute Deal -> plan the high season). Marina and Carlos act as
    // distractors: visible on the portfolio, mildly concerning, but
    // Stavros is the clear correct call each time.
    1: 'stavros',
    2: 'stavros',
    3: 'stavros',
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
