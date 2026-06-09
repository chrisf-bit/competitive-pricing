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
    // data/partnerStateByRound.ts:
    //
    //   R1 - John (placeholder priority pending SME-approved R1
    //              content - Crystal Water Resort will replace him)
    //   R2 - Marina (placeholder priority pending SME-approved R2
    //              content - Velvet Sky Boutique will replace her)
    //   R3 - The Noble Falcon Inn (No Parity / Berlin) - structural
    //              Brand.com competitiveness gap, eRPD 17.0% with a
    //              21.42 percentage-point YoY spike, Lose Price 93%,
    //              four active scenarios including the Brand Scenario.
    //              SME-approved branching content lives in
    //              data/scenarios/noble-falcon-none-r3.ts.
    //
    // Rounds 4-10 will need both new conversation content and new
    // baselines once the partner-data drop lands. Until then they're
    // placeheld with the Noble Falcon (No Parity) so the grading
    // layer has an answer.
    1: 'john',
    2: 'marina',
    3: 'noble-falcon-none',
    4: 'noble-falcon-none',
    5: 'noble-falcon-none',
    6: 'noble-falcon-none',
    7: 'noble-falcon-none',
    8: 'noble-falcon-none',
    9: 'noble-falcon-none',
    10: 'noble-falcon-none',
  },
  // Narrow + Wide regimes stand up R3 with the corresponding Noble
  // Falcon variant. Each variant carries the same data and partner
  // story; only the regulatory framing of the conversation differs
  // by regime (see data/scenarios/noble-falcon-*-r3.ts). R1, R2 and
  // R4-R10 pending the broader partner-data drop for these regimes.
  narrow: {
    3: 'noble-falcon-narrow',
  },
  wide: {
    3: 'noble-falcon-wide',
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
