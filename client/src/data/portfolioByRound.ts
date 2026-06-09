import type { ParityRegime } from '../types';

/**
 * Per-round portfolio composition: which partner cards appear on the
 * Portfolio screen at each round for each parity regime.
 *
 * Three partners per round in the early rounds (one priority + two
 * distractors). The cap may grow for R8-R10 later, but is intentional
 * today so the puzzle stays focused. Without this filter, every
 * partner whose `parityRegime` matches the learner's market would
 * show up at every round, which (a) makes the priority pick obvious
 * by elimination once the catalogue is small and (b) lets very
 * severe partners (e.g. The Noble Falcon Inn at R3) bleed into
 * earlier rounds where their static metrics dominate the puzzle.
 *
 * If a regime+round combination isn't mapped here, the Portfolio
 * screen falls back to "show all partners whose parityRegime matches"
 * - the legacy behaviour. Used today for Wide / Narrow / Cross-
 * Regional, where the only mapped partner per round is the priority,
 * so the fallback renders a single-card portfolio.
 *
 * Sibling of `correctPartnerPerRound.ts`: that file says "which one
 * was the right call"; this file says "which three cards were on the
 * portfolio when that call happened". Keep them in sync - the
 * priority partner from `correctPartnerPerRound` MUST be present in
 * the corresponding `portfolioByRound` entry, otherwise R1 is
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
    // Marina and Carlos hold the distractor slots temporarily until
    // the Raven Inn + Oasis-like-partner distractors are authored.
    // At that point Marina and Carlos drop off the R2 portfolio.
    2: ['velvet-sky-none', 'marina', 'carlos'],

    // R3 - The Noble Falcon Inn alone for now. R3 distractor
    // partners will be added later (likely Marina + Carlos at their
    // R3 baselines if SME doesn't deliver new distractor data).
    3: ['noble-falcon-none'],
  },
  // Narrow + Wide regimes: not mapped here. Market Select shows
  // these as "Coming soon" today, so the Portfolio code path is
  // unreachable. When they go live, populate explicit per-round
  // lists for each.
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
