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
    1: ['marina', 'crystal-water-none', 'carlos'],

    // R2 - Velvet Sky Boutique Hotel is the SME-approved priority;
    // Raven Inn and Driftwood Bay Resort are the distractors. Raven
    // Inn is a healthy Key OTA profile (Bucket 3 / Lose Price 35%);
    // Driftwood Bay is a moderate Brand profile (Bucket 4 / eRPD
    // 3.4%). Both clearly read as less-severe than Velvet Sky's
    // 99% Lose Price + Bucket 4 + eRPD 5.0%.
    2: ['velvet-sky-none', 'raven-inn', 'driftwood-bay'],

    // R3 - The Noble Falcon Inn is the SME-approved priority; Marina
    // and Carlos hold the distractor slots, surfaced at their R3
    // baselines from partnerStateByRound.ts (Marina improving,
    // Carlos's misconfigured Country Rate compounding but milder
    // than Noble Falcon's structural Bucket-7 crisis).
    3: ['noble-falcon-none', 'marina', 'carlos'],
  },
  // Narrow Parity: reuses the No-Parity distractor records (Marina,
  // Carlos, Raven Inn, Driftwood Bay) since the distractor
  // conversations are regime-neutral 3-phase filler. The priority
  // swaps to the Narrow regime variant for each round.
  narrow: {
    1: ['marina', 'crystal-water-narrow', 'carlos'],
    2: ['velvet-sky-narrow', 'raven-inn', 'driftwood-bay'],
    3: ['noble-falcon-narrow', 'marina', 'carlos'],
  },
  // Wide Parity: same shape as Narrow - reuses the same distractors,
  // priority swaps to the Wide regime variant.
  wide: {
    1: ['marina', 'crystal-water-wide', 'carlos'],
    2: ['velvet-sky-wide', 'raven-inn', 'driftwood-bay'],
    3: ['noble-falcon-wide', 'marina', 'carlos'],
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
