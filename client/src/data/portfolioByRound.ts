import type { ParityRegime } from '../types';

/**
 * Per-round portfolio composition: which partner cards appear on the
 * Portfolio screen at each round for each parity regime.
 *
 * Three partners per round in the early rounds (one priority + two
 * distractors). The cap may grow for R8-R10 later, but is intentional
 * today so the puzzle stays focused.
 *
 * The mapping is the source of truth - the Portfolio filter uses
 * these explicit lists and ignores each partner's own `parityRegime`
 * field when an entry exists. That lets us reuse a single distractor
 * partner record (e.g. Marina, parityRegime 'none') as a distractor
 * across multiple regimes' portfolios without authoring per-regime
 * clones of it.
 *
 * If a regime+round combination isn't mapped here, the Portfolio
 * screen falls back to "show all partners whose parityRegime matches"
 * - the legacy behavior for round / regime combinations not yet
 * wired in.
 *
 * Sibling of `correctPartnerPerRound.ts`: that file says "which one
 * was the right call"; this file says "which three cards were on the
 * portfolio when that call happened". Keep them in sync - the
 * priority partner from `correctPartnerPerRound` MUST be present in
 * the corresponding `portfolioByRound` entry, otherwise the round is
 * unwinnable because the right pick isn't on the screen.
 */
export const portfolioByRound: Partial<
  Record<ParityRegime, Record<number, string[]>>
> = {
  none: {
    // R1 - Crystal Water Resort is the SME-approved priority; Marina
    // and Carlos hold the distractor slots. Their R1 baselines in
    // partnerStateByRound.ts keep both looking healthy / mid-pack so
    // the puzzle reads cleanly: Crystal Water's 99% Lose Price + the
    // 202% page-view spike vs peer is the unmissable signal.
    1: ['marina', 'royal-crest-none', 'carlos'],

    // R2 - Velvet Sky Boutique Hotel is the SME-approved priority;
    // Raven Inn and Driftwood Bay Resort are the distractors. Raven
    // Inn is a healthy Key OTA profile (Bucket 3 / Lose Price 35%);
    // Driftwood Bay is a moderate Brand profile (Bucket 4 / eRPD
    // 3.4%). Both clearly read as less-severe than Velvet Sky's
    // 99% Lose Price + Bucket 4 + eRPD 5.0%.
    2: ['silver-horizon-none', 'raven-inn', 'driftwood-bay'],

    // R3 - The Noble Falcon Inn is the SME-approved priority; Marina
    // and Carlos hold the distractor slots, surfaced at their R3
    // baselines from partnerStateByRound.ts (Marina improving,
    // Carlos's misconfigured Country Rate compounding but milder
    // than Noble Falcon's structural Bucket-7 crisis).
    3: ['ocean-view-none', 'marina', 'carlos'],

    // R4 - Riverside Boutique Hotel is the SME-approved priority;
    // Marina and Carlos hold the distractor slots at their healthy R4
    // baselines (Bucket 3) so Riverside's +6.56 eRPD spike + family gap
    // read as the clear call.
    4: ['riverside-none', 'marina', 'carlos'],

    // R5 - Emerald Peak Lodge is the SME-approved priority (Bucket 6 /
    // 100% Lose Price); Marina and Carlos hold the distractor slots at
    // their healthy R5 baselines.
    5: ['emerald-peak-none', 'marina', 'carlos'],

    // R6 - Oceanfront Bliss Lodge is the SME-approved priority (Bucket 6
    // / visibility debt); Marina and Carlos hold the distractor slots at
    // their healthy R6 baselines.
    6: ['oceanfront-none', 'marina', 'carlos'],

    // R7 - Palace Grand Resort is the SME-approved priority (Key OTA gap,
    // Bucket 5 / +10.95 MoM spike); Marina and Carlos hold the distractor
    // slots at their healthy R7 baselines (Bucket 3).
    7: ['palace-grand-none', 'marina', 'carlos'],

    // R8 - The Hidden Valley Resort is the SME-approved priority
    // (structural Brand.com gap, Bucket 5 / BSB shield); Marina and Carlos
    // hold the distractor slots at their healthy R8 baselines (Bucket 3).
    8: ['hidden-valley-none', 'marina', 'carlos'],

    // R9 - Loft Living Inn is the SME-approved priority (severe Key OTA
    // gap, Bucket 7 / wholesaler leak); Marina and Carlos hold the
    // distractor slots at their healthy R9 baselines (Bucket 3).
    9: ['loft-living-none', 'marina', 'carlos'],

    // R10 - The Noble Falcon Inn is the SME-approved priority and the
    // final Level 1 round (structural Brand.com gap, Bucket 7 / Risky
    // Guest); Marina and Carlos hold the distractor slots at their
    // healthy R10 baselines (Bucket 3).
    10: ['noble-falcon-none', 'marina', 'carlos'],

    // ── Level 2 (OPC rounds 11-16) ── The six Level 1 lead partners
    // return as the round priorities, now read through the unlocked OPC
    // tab. Marina and Carlos hold the distractor slots at their healthy
    // Level 2 baselines (clean OPC profile - low unsold, positive
    // sell-through, visibility at/above peer) so the priority reads as
    // the clear call on the new lens.
    11: ['royal-crest-none', 'marina', 'carlos'],
    12: ['silver-horizon-none', 'marina', 'carlos'],
    13: ['ocean-view-none', 'marina', 'carlos'],
    14: ['riverside-none', 'marina', 'carlos'],
    15: ['emerald-peak-none', 'marina', 'carlos'],
    16: ['oceanfront-none', 'marina', 'carlos'],
    17: ['palace-grand-none', 'marina', 'carlos'],
    18: ['hidden-valley-none', 'marina', 'carlos'],
    19: ['loft-living-none', 'marina', 'carlos'],
    20: ['noble-falcon-none', 'marina', 'carlos'],
  },
  // Narrow Parity: uses regime-specific distractor variants
  // (-narrow suffix) so all three cards per round are in the UK
  // market. The Narrow distractor records share conversation trees,
  // baselines, and persona hints with their base counterparts via
  // the regime-suffix alias fallback in the engine.
  narrow: {
    1: ['marina-narrow', 'royal-crest-narrow', 'carlos-narrow'],
    2: ['silver-horizon-narrow', 'raven-inn-narrow', 'driftwood-bay-narrow'],
    3: ['ocean-view-narrow', 'marina-narrow', 'carlos-narrow'],
    4: ['riverside-narrow', 'marina-narrow', 'carlos-narrow'],
    5: ['emerald-peak-narrow', 'marina-narrow', 'carlos-narrow'],
    6: ['oceanfront-narrow', 'marina-narrow', 'carlos-narrow'],
    7: ['palace-grand-narrow', 'marina-narrow', 'carlos-narrow'],
    8: ['hidden-valley-narrow', 'marina-narrow', 'carlos-narrow'],
    9: ['loft-living-narrow', 'marina-narrow', 'carlos-narrow'],
    10: ['noble-falcon-narrow', 'marina-narrow', 'carlos-narrow'],
    11: ['royal-crest-narrow', 'marina-narrow', 'carlos-narrow'],
    12: ['silver-horizon-narrow', 'marina-narrow', 'carlos-narrow'],
    13: ['ocean-view-narrow', 'marina-narrow', 'carlos-narrow'],
    14: ['riverside-narrow', 'marina-narrow', 'carlos-narrow'],
    15: ['emerald-peak-narrow', 'marina-narrow', 'carlos-narrow'],
    16: ['oceanfront-narrow', 'marina-narrow', 'carlos-narrow'],
    17: ['palace-grand-narrow', 'marina-narrow', 'carlos-narrow'],
    18: ['hidden-valley-narrow', 'marina-narrow', 'carlos-narrow'],
    19: ['loft-living-narrow', 'marina-narrow', 'carlos-narrow'],
    20: ['noble-falcon-narrow', 'marina-narrow', 'carlos-narrow'],
  },
  // Wide Parity: same shape as Narrow with -wide suffixed distractor
  // variants so all three cards per round are in the US market.
  wide: {
    1: ['marina-wide', 'royal-crest-wide', 'carlos-wide'],
    2: ['silver-horizon-wide', 'raven-inn-wide', 'driftwood-bay-wide'],
    3: ['ocean-view-wide', 'marina-wide', 'carlos-wide'],
    4: ['riverside-wide', 'marina-wide', 'carlos-wide'],
    5: ['emerald-peak-wide', 'marina-wide', 'carlos-wide'],
    6: ['oceanfront-wide', 'marina-wide', 'carlos-wide'],
    7: ['palace-grand-wide', 'marina-wide', 'carlos-wide'],
    8: ['hidden-valley-wide', 'marina-wide', 'carlos-wide'],
    9: ['loft-living-wide', 'marina-wide', 'carlos-wide'],
    10: ['noble-falcon-wide', 'marina-wide', 'carlos-wide'],
    11: ['royal-crest-wide', 'marina-wide', 'carlos-wide'],
    12: ['silver-horizon-wide', 'marina-wide', 'carlos-wide'],
    13: ['ocean-view-wide', 'marina-wide', 'carlos-wide'],
    14: ['riverside-wide', 'marina-wide', 'carlos-wide'],
    15: ['emerald-peak-wide', 'marina-wide', 'carlos-wide'],
    16: ['oceanfront-wide', 'marina-wide', 'carlos-wide'],
    17: ['palace-grand-wide', 'marina-wide', 'carlos-wide'],
    18: ['hidden-valley-wide', 'marina-wide', 'carlos-wide'],
    19: ['loft-living-wide', 'marina-wide', 'carlos-wide'],
    20: ['noble-falcon-wide', 'marina-wide', 'carlos-wide'],
  },
};

/**
 * Returns the explicit list of partner ids to render on the Portfolio
 * for this regime + round. Returns null when there's no explicit
 * mapping - the caller should fall back to its legacy behavior
 * (show all partners whose parityRegime matches).
 */
export function getPortfolioForRound(
  regime: ParityRegime,
  round: number,
): string[] | null {
  return portfolioByRound[regime]?.[round] ?? null;
}
