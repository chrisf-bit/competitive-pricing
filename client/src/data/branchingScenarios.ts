import type { BranchingConversationTree } from '../types';
import { johnR1 } from './scenarios/john-r1';
import { royalCrestNoneR1 } from './scenarios/royal-crest-none-r1';
import { royalCrestNarrowR1 } from './scenarios/royal-crest-narrow-r1';
import { royalCrestWideR1 } from './scenarios/royal-crest-wide-r1';
import { silverHorizonNoneR2 } from './scenarios/silver-horizon-none-r2';
import { silverHorizonNarrowR2 } from './scenarios/silver-horizon-narrow-r2';
import { silverHorizonWideR2 } from './scenarios/silver-horizon-wide-r2';
import { oceanViewNoneR3 } from './scenarios/ocean-view-none-r3';
import { oceanViewNarrowR3 } from './scenarios/ocean-view-narrow-r3';
import { oceanViewWideR3 } from './scenarios/ocean-view-wide-r3';
import { riversideNoneR4 } from './scenarios/riverside-none-r4';
import { riversideNarrowR4 } from './scenarios/riverside-narrow-r4';
import { riversideWideR4 } from './scenarios/riverside-wide-r4';

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
 *   - Royal Crest Hotel R1 across all three regime variants - the
 *     final SME Round 1 scenario (Liam O'Connell, Property Manager,
 *     Brand.com Competitiveness Gap; page views +20% vs peer but
 *     forward pace -20% because his direct site undercuts Booking.com).
 *     Objection: Segmented Pricing Conversation + Brand.com Loyalty.
 *     Retired Crystal Water Resort as the R1 priority (its files stay
 *     on disk, unregistered).
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
  'royal-crest-none': {
    1: royalCrestNoneR1,
  },
  'royal-crest-narrow': {
    1: royalCrestNarrowR1,
  },
  'royal-crest-wide': {
    1: royalCrestWideR1,
  },
  'silver-horizon-none': {
    2: silverHorizonNoneR2,
  },
  'silver-horizon-narrow': {
    2: silverHorizonNarrowR2,
  },
  'silver-horizon-wide': {
    2: silverHorizonWideR2,
  },
  'ocean-view-none': {
    3: oceanViewNoneR3,
  },
  'ocean-view-narrow': {
    3: oceanViewNarrowR3,
  },
  'ocean-view-wide': {
    3: oceanViewWideR3,
  },
  'riverside-none': {
    4: riversideNoneR4,
  },
  'riverside-narrow': {
    4: riversideNarrowR4,
  },
  'riverside-wide': {
    4: riversideWideR4,
  },
};

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
