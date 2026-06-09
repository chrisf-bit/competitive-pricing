import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';
import { nobleFalconNoneR3 } from './scenarios/noble-falcon-none-r3';
import { nobleFalconNarrowR3 } from './scenarios/noble-falcon-narrow-r3';
import { nobleFalconWideR3 } from './scenarios/noble-falcon-wide-r3';

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
 *   - John R1 (Brand.com loyalist - No-Parity scenario). Placeholder
 *     priority until SME-approved R1 content (Crystal Water Resort)
 *     lands.
 *   - The Noble Falcon Inn R3 across all three regime variants
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
    3: nobleFalconNoneR3,
  },
  'noble-falcon-narrow': {
    3: nobleFalconNarrowR3,
  },
  'noble-falcon-wide': {
    3: nobleFalconWideR3,
  },
};

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
