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
 * - the legacy behaviour for round / regime combinations not yet
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
  },
  // Wide Parity: same shape as Narrow with -wide suffixed distractor
  // variants so all three cards per round are in the US market.
  wide: {
    1: ['marina-wide', 'royal-crest-wide', 'carlos-wide'],
    2: ['silver-horizon-wide', 'raven-inn-wide', 'driftwood-bay-wide'],
    3: ['ocean-view-wide', 'marina-wide', 'carlos-wide'],
    4: ['riverside-wide', 'marina-wide', 'carlos-wide'],
  },
};

/**
 * Returns the explicit list of partner ids to render on the Portfolio
 * for this regime + round. Returns null when there's no explicit
 * mapping - the caller should fall back to its legacy behaviour
 * (show all partners whose parityRegime matches).
 */
export function getPortfolioForRound(
  regime: ParityRegime,
  round: number,
): string[] | null {
  return portfolioByRound[regime]?.[round] ?? null;
}
