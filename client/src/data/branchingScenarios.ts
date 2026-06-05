import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';
import { nobleFalconNoneR10 } from './scenarios/noble-falcon-none-r10';
import { nobleFalconNarrowR10 } from './scenarios/noble-falcon-narrow-r10';
import { nobleFalconWideR10 } from './scenarios/noble-falcon-wide-r10';

/**
 * Branching conversation scenarios.
 *
 * Coexists with the legacy 3-phase trees in `conversations.ts` while
 * partners are gradually migrated. The engine checks branching first
 * (via `getBranchingScenario`); if nothing is found it falls back to
 * the 3-phase lookup. So a partner-round can be in either shape, not
 * both.
 *
 * Coverage today:
 *   - John R1 (Brand.com loyalist - No-Parity scenario). John is
 *     back as the No-Parity R1 priority after SME clarified that
 *     The Noble Falcon Inn scenario was intended for **Round 10**,
 *     not Round 1 (the "Round 1" in the source doc title referred
 *     to the doc itself, not the in-game round).
 *   - The Noble Falcon Inn R10 across all three regime variants
 *     (No Parity / Narrow Parity / Wide Parity) - the SME-confirmed
 *     "Brand.com Competitiveness Gap" scenario.
 *
 * As SME content lands per partner-round, add the scenario file under
 * `data/scenarios/` and register it below.
 */

type BranchingMap = Record<string, Record<number, BranchingConversationTree>>;

export const branchingScenarios: BranchingMap = {
  john: {
    1: johnR1,
  },
  'noble-falcon-none': {
    10: nobleFalconNoneR10,
  },
  'noble-falcon-narrow': {
    10: nobleFalconNarrowR10,
  },
  'noble-falcon-wide': {
    10: nobleFalconWideR10,
  },
};

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
