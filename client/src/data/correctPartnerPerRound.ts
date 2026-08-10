import type { ParityRegime } from '../types';
import { kamCorrectId } from './kamLayout';

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
    7: 'palace-grand-none',
    8: 'hidden-valley-none',
    9: 'loft-living-none',
    10: 'noble-falcon-none',
    // Level 2 (OPC): the six lead partners revisited through the OPC
    // lens. Same partner ids as their Level 1 rounds.
    11: 'royal-crest-none',
    12: 'silver-horizon-none',
    13: 'ocean-view-none',
    14: 'riverside-none',
    15: 'emerald-peak-none',
    16: 'oceanfront-none',
    17: 'palace-grand-none',
    18: 'hidden-valley-none',
    19: 'loft-living-none',
    20: 'noble-falcon-none',
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
    7: 'palace-grand-narrow',
    8: 'hidden-valley-narrow',
    9: 'loft-living-narrow',
    10: 'noble-falcon-narrow',
    11: 'royal-crest-narrow',
    12: 'silver-horizon-narrow',
    13: 'ocean-view-narrow',
    14: 'riverside-narrow',
    15: 'emerald-peak-narrow',
    16: 'oceanfront-narrow',
    17: 'palace-grand-narrow',
    18: 'hidden-valley-narrow',
    19: 'loft-living-narrow',
    20: 'noble-falcon-narrow',
  },
  wide: {
    1: 'royal-crest-wide',
    2: 'silver-horizon-wide',
    3: 'ocean-view-wide',
    4: 'riverside-wide',
    5: 'emerald-peak-wide',
    6: 'oceanfront-wide',
    7: 'palace-grand-wide',
    8: 'hidden-valley-wide',
    9: 'loft-living-wide',
    10: 'noble-falcon-wide',
    11: 'royal-crest-wide',
    12: 'silver-horizon-wide',
    13: 'ocean-view-wide',
    14: 'riverside-wide',
    15: 'emerald-peak-wide',
    16: 'oceanfront-wide',
    17: 'palace-grand-wide',
    18: 'hidden-valley-wide',
    19: 'loft-living-wide',
    20: 'noble-falcon-wide',
  },
  // Cross-Regional (KAM): the ten lead hotels reframed as their parent
  // partner companies, mixed parity per round. Built from the signed-off
  // KAM layout (data/kamLayout.ts) so it can't drift from the portfolio.
  'cross-regional': Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [i + 1, kamCorrectId(i + 1)]),
  ),
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
