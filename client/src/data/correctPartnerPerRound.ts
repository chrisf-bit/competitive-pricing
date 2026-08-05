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
    //   R1 - Crystal Water Resort (SME-approved Brand.com
    //              Competitiveness Gap; Sarah Bennett running cheaper
    //              brand-site promotional rates, 202% page-view spike
    //              vs peer but Conversion -52%, Lose Price 99%).
    //   R2 - Velvet Sky Boutique Hotel (SME-approved Brand.com
    //              Competitiveness Gap; John Whitford aggressively
    //              discounting on his direct site, no active Booking.com
    //              pricing tools, Lose Price 99%).
    //   R3 - The Noble Falcon Inn (SME-approved structural Brand.com
    //              competitiveness gap; eRPD 17.0% with +21.42 YoY,
    //              Lose Price 93%, four active scenarios incl. Brand).
    //
    // Rounds 4-10 are non-playable today (TOTAL_ROUNDS is capped at
    // 3 in gameEngine.ts). The entries past R3 are kept so the
    // grading layer always has an answer if a stray code path
    // bypasses the cap.
    1: 'royal-crest-none',
    2: 'silver-horizon-none',
    3: 'ocean-view-none',
    4: 'riverside-none',
    5: 'emerald-peak-none',
    6: 'oceanfront-none',
    7: 'noble-falcon-none',
    8: 'noble-falcon-none',
    9: 'noble-falcon-none',
    10: 'noble-falcon-none',
  },
  // Narrow + Wide regimes stand up R1 (Crystal Water Resort), R2
  // (Velvet Sky Boutique Hotel) and R3 (Noble Falcon Inn) with the
  // corresponding regime variants. Each variant carries the same
  // data and partner story; only the regulatory framing of the
  // conversation differs by regime. R4-R10 pending the broader
  // partner-data drop.
  narrow: {
    1: 'royal-crest-narrow',
    2: 'silver-horizon-narrow',
    3: 'ocean-view-narrow',
    4: 'riverside-narrow',
    5: 'emerald-peak-narrow',
    6: 'oceanfront-narrow',
  },
  wide: {
    1: 'royal-crest-wide',
    2: 'silver-horizon-wide',
    3: 'ocean-view-wide',
    4: 'riverside-wide',
    5: 'emerald-peak-wide',
    6: 'oceanfront-wide',
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
