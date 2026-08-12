import type { ParityRegime } from '../types';
import { kamCorrectId } from './kamLayout';
import { PRIORITY_BY_ROUND } from './portfolioByRound';

/**
 * Ground truth for "which partner should the learner have engaged
 * this round" - used by the grading layer to award 0 stars (a "missed
 * call") when a learner picks the wrong partner.
 *
 * The three standard regimes are GENERATED from the shared
 * `PRIORITY_BY_ROUND` table in portfolioByRound.ts (the priority base
 * hotel per round, R1-R20) suffixed with the regime. Because the
 * portfolio rows are generated from the same table, the priority is
 * always present in its own portfolio and these two files genuinely
 * cannot drift - they no longer duplicate the round->hotel mapping.
 *
 * Cross-Regional (KAM) is generated from the signed-off KAM layout
 * (data/kamLayout.ts), the same source its portfolio row comes from.
 */
function standardRegimeMap(
  regime: 'none' | 'narrow' | 'wide',
): Record<number, string> {
  const map: Record<number, string> = {};
  for (let round = 1; round <= 20; round++) {
    map[round] = `${PRIORITY_BY_ROUND[round]}-${regime}`;
  }
  return map;
}

export const correctPartnerPerRound: Partial<
  Record<ParityRegime, Record<number, string>>
> = {
  none: standardRegimeMap('none'),
  narrow: standardRegimeMap('narrow'),
  wide: standardRegimeMap('wide'),
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
