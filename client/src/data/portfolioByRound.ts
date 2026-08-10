import type { ParityRegime } from '../types';

/**
 * Per-round portfolio composition: which partner cards appear on the
 * Portfolio screen at each round for each parity regime.
 *
 * Three cards per round: the priority hotel plus TWO OTHER lead hotels
 * shown in a healthy state (design "Option B"). Every hotel is therefore
 * sometimes the answer and sometimes a decoy, so a learner can't
 * pattern-match on identity ("it's always the one that isn't Marina") -
 * they have to read the data. The healthy decoy layer (baselines +
 * calls) lives in `data/scenarios/healthy-decoys.ts`; the decoy rounds
 * here match HEALTHY_DECOY_ROUNDS there.
 *
 * The list is GENERATED from the rotation below so the priority + its
 * two decoys, and the priority's position within the row, stay in sync
 * across all three markets. Card order follows this list (App.tsx maps
 * ids in order), and the priority's slot cycles 0/1/2 across rounds so
 * position isn't a tell either.
 *
 * Sibling of `correctPartnerPerRound.ts`: that file says "which one was
 * the right call"; this file says "which three cards were on screen".
 * They must agree - the priority MUST be present here, or the round is
 * unwinnable. (Generated from the same PRIORITY_BY_ROUND table, so they
 * can't drift.)
 *
 * The retired Marina / Carlos / Raven Inn / Driftwood Bay decoys are no
 * longer referenced - their records stay on disk, unused.
 */

// Priority hotel per round (Level 1 R1-R10, then the same ten revisited
// through the OPC lens R11-R20). Index 1-20.
const PRIORITY_BY_ROUND: Record<number, string> = {
  1: 'royal-crest', 2: 'silver-horizon', 3: 'ocean-view', 4: 'riverside',
  5: 'emerald-peak', 6: 'oceanfront', 7: 'palace-grand', 8: 'hidden-valley',
  9: 'loft-living', 10: 'noble-falcon',
  11: 'royal-crest', 12: 'silver-horizon', 13: 'ocean-view', 14: 'riverside',
  15: 'emerald-peak', 16: 'oceanfront', 17: 'palace-grand', 18: 'hidden-valley',
  19: 'loft-living', 20: 'noble-falcon',
};

// The two healthy decoy hotels per round. Each hotel decoys exactly four
// times, never in its own priority round, and its Level 1 + Level 2
// priority rounds get different decoy pairs (see HEALTHY_DECOY_ROUNDS).
const DECOYS_BY_ROUND: Record<number, [string, string]> = {
  1: ['ocean-view', 'emerald-peak'],
  2: ['riverside', 'oceanfront'],
  3: ['emerald-peak', 'palace-grand'],
  4: ['oceanfront', 'hidden-valley'],
  5: ['palace-grand', 'loft-living'],
  6: ['hidden-valley', 'noble-falcon'],
  7: ['loft-living', 'royal-crest'],
  8: ['noble-falcon', 'silver-horizon'],
  9: ['royal-crest', 'ocean-view'],
  10: ['silver-horizon', 'riverside'],
  11: ['oceanfront', 'hidden-valley'],
  12: ['palace-grand', 'loft-living'],
  13: ['hidden-valley', 'noble-falcon'],
  14: ['loft-living', 'royal-crest'],
  15: ['noble-falcon', 'silver-horizon'],
  16: ['royal-crest', 'ocean-view'],
  17: ['silver-horizon', 'riverside'],
  18: ['ocean-view', 'emerald-peak'],
  19: ['riverside', 'oceanfront'],
  20: ['emerald-peak', 'palace-grand'],
};

/** Build the priority + two decoys in order, priority slot cycling 0/1/2. */
function rowFor(round: number, regime: ParityRegime): string[] {
  const priority = PRIORITY_BY_ROUND[round];
  const [d1, d2] = DECOYS_BY_ROUND[round];
  const pos = (round - 1) % 3;
  const order =
    pos === 0 ? [priority, d1, d2] : pos === 1 ? [d1, priority, d2] : [d1, d2, priority];
  return order.map((base) => `${base}-${regime}`);
}

function buildRegime(regime: ParityRegime): Record<number, string[]> {
  const map: Record<number, string[]> = {};
  for (let r = 1; r <= 20; r++) map[r] = rowFor(r, regime);
  return map;
}

export const portfolioByRound: Partial<
  Record<ParityRegime, Record<number, string[]>>
> = {
  none: buildRegime('none'),
  narrow: buildRegime('narrow'),
  wide: buildRegime('wide'),
};

/**
 * Returns the explicit list of partner ids to render on the Portfolio
 * for this regime + round, in card order. Returns null only for a
 * regime with no mapping (e.g. cross-regional) - the caller degrades to
 * No Parity rather than dumping the full roster.
 */
export function getPortfolioForRound(
  regime: ParityRegime,
  round: number,
): string[] | null {
  return portfolioByRound[regime]?.[round] ?? null;
}
