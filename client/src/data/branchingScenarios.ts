import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';
import { crystalWaterNoneR1 } from './scenarios/crystal-water-none-r1';
import { crystalWaterNarrowR1 } from './scenarios/crystal-water-narrow-r1';
import { crystalWaterWideR1 } from './scenarios/crystal-water-wide-r1';
import { velvetSkyNoneR2 } from './scenarios/velvet-sky-none-r2';
import { velvetSkyNarrowR2 } from './scenarios/velvet-sky-narrow-r2';
import { velvetSkyWideR2 } from './scenarios/velvet-sky-wide-r2';
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
 *   - Crystal Water Resort R1 across all three regime variants - the
 *     SME-approved "Brand.com Competitiveness Gap" scenario (Sarah
 *     Bennett running cheaper promotional rates on her direct brand
 *     site, capping conversion on Booking.com despite a 202% page
 *     view spike vs peer).
 *   - Velvet Sky Boutique Hotel R2 across all three regime variants
 *     - SME-approved Brand.com Competitiveness Gap (John Whitford,
 *     aggressive direct-site discounting, no active Booking.com
 *     pricing tools).
 *   - The Noble Falcon Inn R3 across all three regime variants - the
 *     SME-confirmed structural Brand.com Competitiveness Gap (Anton
 *     Müller, fully managed by brand, eRPD 17% / Lose Price 93%).
 *   - John Marston R1 retained on disk (Marston House, parked - see
 *     `pendingPartners` in partners.ts). If he's re-spliced back into
 *     the active roster the scenario picks up unchanged.
 *
 * As SME content lands per partner-round, add the scenario file under
 * `data/scenarios/` and register it below.
 */

type BranchingMap = Record<string, Record<number, BranchingConversationTree>>;

export const branchingScenarios: BranchingMap = {
  john: {
    1: johnR1,
  },
  'crystal-water-none': {
    1: crystalWaterNoneR1,
  },
  'crystal-water-narrow': {
    1: crystalWaterNarrowR1,
  },
  'crystal-water-wide': {
    1: crystalWaterWideR1,
  },
  'velvet-sky-none': {
    2: velvetSkyNoneR2,
  },
  'velvet-sky-narrow': {
    2: velvetSkyNarrowR2,
  },
  'velvet-sky-wide': {
    2: velvetSkyWideR2,
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
