/**
 * Cross-Regional (KAM) round layout - the signed-off 20-round table.
 *
 * KAM is its own journey (`parityRegime: 'cross-regional'` at Market
 * Select) that reuses the ten lead hotels reframed as their parent
 * partner COMPANIES (roster Column I). Each round shows three cards:
 *
 *   - correct    : the round's priority, in its problem state (from the
 *                  KAM metrics deck), reads as the clear worst call.
 *   - close      : another company shown with one soft flag - plausible
 *                  but not the priority.
 *   - distractor : a third company shown clean / healthy.
 *
 * Unlike the standard journey (one parity regime per market), each KAM
 * round deliberately MIXES parity - the three cards below always span
 * Wide / Narrow / No Parity. A company's own parity regime is fixed by
 * the playbook (see KAM_REGIME); the mix comes from which companies share
 * a round. Every round's trio is a full three-regime spread.
 *
 * KAM partner ids are the base id + `-cross-regional` suffix. The correct
 * partner's L1 tree is authored per its fixed regime (helicopter opening
 * from the KAM L1 playbook); its L2 tree reuses the existing regime-
 * neutral OPC factory. Close / distractor cards play a short healthy /
 * near-miss call (they score 0 as the wrong pick, then a retake).
 *
 * This module is the single source of truth for the layout;
 * correctPartnerPerRound and portfolioByRound both build their
 * cross-regional entries from it, so they can't drift.
 */

/** Priority (correct) hotel per round - base id. R1-10 XPC, R11-20 OPC. */
export const KAM_PRIORITY_BY_ROUND: Record<number, string> = {
  1: 'royal-crest', 2: 'silver-horizon', 3: 'ocean-view', 4: 'riverside',
  5: 'emerald-peak', 6: 'oceanfront', 7: 'palace-grand', 8: 'hidden-valley',
  9: 'loft-living', 10: 'noble-falcon',
  11: 'royal-crest', 12: 'silver-horizon', 13: 'ocean-view', 14: 'riverside',
  15: 'emerald-peak', 16: 'oceanfront', 17: 'palace-grand', 18: 'hidden-valley',
  19: 'loft-living', 20: 'noble-falcon',
};

/** The "close" (near-miss) decoy hotel per round - base id. */
export const KAM_CLOSE_BY_ROUND: Record<number, string> = {
  1: 'ocean-view', 2: 'emerald-peak', 3: 'oceanfront', 4: 'loft-living',
  5: 'royal-crest', 6: 'hidden-valley', 7: 'silver-horizon', 8: 'loft-living',
  9: 'emerald-peak', 10: 'oceanfront',
  11: 'hidden-valley', 12: 'ocean-view', 13: 'loft-living', 14: 'oceanfront',
  15: 'silver-horizon', 16: 'ocean-view', 17: 'royal-crest', 18: 'oceanfront',
  19: 'emerald-peak', 20: 'royal-crest',
};

/** The "distractor" (clean / healthy) decoy hotel per round - base id. */
export const KAM_DIST_BY_ROUND: Record<number, string> = {
  1: 'palace-grand', 2: 'riverside', 3: 'noble-falcon', 4: 'hidden-valley',
  5: 'palace-grand', 6: 'riverside', 7: 'ocean-view', 8: 'noble-falcon',
  9: 'palace-grand', 10: 'ocean-view',
  11: 'noble-falcon', 12: 'palace-grand', 13: 'riverside', 14: 'emerald-peak',
  15: 'noble-falcon', 16: 'palace-grand', 17: 'hidden-valley', 18: 'riverside',
  19: 'noble-falcon', 20: 'emerald-peak',
};

/** Card slot the correct card occupies (1 / 2 / 3), cycling so position
 *  never signals the answer. */
export const KAM_CORRECT_POS_BY_ROUND: Record<number, 1 | 2 | 3> = {
  1: 1, 2: 2, 3: 3, 4: 1, 5: 2, 6: 3, 7: 1, 8: 2, 9: 3, 10: 1,
  11: 2, 12: 3, 13: 1, 14: 2, 15: 3, 16: 1, 17: 2, 18: 3, 19: 1, 20: 2,
};

/**
 * Each KAM company's fixed parity regime, from the KAM playbook page 1
 * (same across Level 1 and Level 2). This is the partner's REAL market
 * regime, carried on the record as `parityRegime` for the pill and the
 * L1 tree's compliance framing - NOT the journey (which is
 * 'cross-regional'). Used here only to assert the per-round parity mix.
 */
export const KAM_REGIME: Record<string, 'wide' | 'narrow' | 'none'> = {
  'royal-crest': 'wide',
  'silver-horizon': 'wide',
  'ocean-view': 'narrow',
  'riverside': 'none',
  'emerald-peak': 'narrow',
  'oceanfront': 'wide',
  'palace-grand': 'none',
  'hidden-valley': 'narrow',
  'loft-living': 'wide',
  'noble-falcon': 'none',
};

/** The `-cross-regional` id of the correct partner for a KAM round. */
export function kamCorrectId(round: number): string {
  return `${KAM_PRIORITY_BY_ROUND[round]}-cross-regional`;
}

/**
 * The three KAM card ids for a round, in display order. Correct card
 * slots into KAM_CORRECT_POS_BY_ROUND; close then distractor fill the
 * remaining slots (close before distractor).
 */
export function kamPortfolioRow(round: number): string[] {
  const correct = KAM_PRIORITY_BY_ROUND[round];
  const close = KAM_CLOSE_BY_ROUND[round];
  const dist = KAM_DIST_BY_ROUND[round];
  const pos = KAM_CORRECT_POS_BY_ROUND[round];
  const order =
    pos === 1 ? [correct, close, dist] : pos === 2 ? [close, correct, dist] : [close, dist, correct];
  return order.map((base) => `${base}-cross-regional`);
}

/** All rounds (1-20) where a given base hotel is a KAM decoy (close or
 *  distractor), with the role - used to wire decoy baselines + calls. */
export function kamDecoyRoundsFor(baseId: string): { round: number; role: 'close' | 'distractor' }[] {
  const out: { round: number; role: 'close' | 'distractor' }[] = [];
  for (let r = 1; r <= 20; r++) {
    if (KAM_CLOSE_BY_ROUND[r] === baseId) out.push({ round: r, role: 'close' });
    if (KAM_DIST_BY_ROUND[r] === baseId) out.push({ round: r, role: 'distractor' });
  }
  return out;
}
