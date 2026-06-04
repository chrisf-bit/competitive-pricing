import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';
import { nobleFalconNoneR1 } from './scenarios/noble-falcon-none-r1';
import { nobleFalconNarrowR1 } from './scenarios/noble-falcon-narrow-r1';
import { nobleFalconWideR1 } from './scenarios/noble-falcon-wide-r1';

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
 *   - The Noble Falcon Inn R1 across all three regime variants
 *     (No Parity / Narrow Parity / Wide Parity) - the SME-confirmed
 *     "Brand.com Competitiveness Gap" scenario. Replaced John as
 *     the No-Parity R1 target in June 2026 and stood up R1 for
 *     Narrow and Wide markets.
 *   - John R1 retained on disk (Marston House, parked - see
 *     `pendingPartners` in partners.ts). If John is re-spliced back
 *     into the active roster the scenario picks up unchanged.
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
    1: nobleFalconNoneR1,
  },
  'noble-falcon-narrow': {
    1: nobleFalconNarrowR1,
  },
  'noble-falcon-wide': {
    1: nobleFalconWideR1,
  },
};

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
