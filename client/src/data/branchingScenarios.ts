import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';

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
 *   - John R1 (Brand.com loyalist - No-Parity scenario)
 *
 * As SME content lands per partner-round, add the scenario file under
 * `data/scenarios/` and register it below.
 */

type BranchingMap = Record<string, Record<number, BranchingConversationTree>>;

export const branchingScenarios: BranchingMap = {
  john: {
    1: johnR1,
  },
};

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
