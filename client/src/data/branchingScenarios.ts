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
import { emeraldPeakNoneR5 } from './scenarios/emerald-peak-none-r5';
import { emeraldPeakNarrowR5 } from './scenarios/emerald-peak-narrow-r5';
import { emeraldPeakWideR5 } from './scenarios/emerald-peak-wide-r5';
import { oceanfrontNoneR6 } from './scenarios/oceanfront-none-r6';
import { oceanfrontNarrowR6 } from './scenarios/oceanfront-narrow-r6';
import { oceanfrontWideR6 } from './scenarios/oceanfront-wide-r6';
import { palaceGrandNoneR7 } from './scenarios/palace-grand-none-r7';
import { palaceGrandNarrowR7 } from './scenarios/palace-grand-narrow-r7';
import { palaceGrandWideR7 } from './scenarios/palace-grand-wide-r7';
import { hiddenValleyNoneR8 } from './scenarios/hidden-valley-none-r8';
import { hiddenValleyNarrowR8 } from './scenarios/hidden-valley-narrow-r8';
import { hiddenValleyWideR8 } from './scenarios/hidden-valley-wide-r8';
import { loftLivingNoneR9 } from './scenarios/loft-living-none-r9';
import { loftLivingNarrowR9 } from './scenarios/loft-living-narrow-r9';
import { loftLivingWideR9 } from './scenarios/loft-living-wide-r9';
import { nobleFalconNoneR10 } from './scenarios/noble-falcon-none-r10';
import { nobleFalconNarrowR10 } from './scenarios/noble-falcon-narrow-r10';
import { nobleFalconWideR10 } from './scenarios/noble-falcon-wide-r10';
// ── Level 2 (OPC rounds 11-16) - the six lead partners revisited
// through the On-Platform Competitiveness lens. Regime-neutral: each
// factory stamps the engaged partner's regime-suffixed id onto one
// shared tree, so the same steps serve all three regime portfolios.
import { royalCrestR11 } from './scenarios/royal-crest-r11';
import { silverHorizonR12 } from './scenarios/silver-horizon-r12';
import { oceanViewR13 } from './scenarios/ocean-view-r13';
import { riversideR14 } from './scenarios/riverside-r14';
import { emeraldPeakR15 } from './scenarios/emerald-peak-r15';
import { oceanfrontR16 } from './scenarios/oceanfront-r16';
import { palaceGrandR17 } from './scenarios/palace-grand-r17';
import { hiddenValleyR18 } from './scenarios/hidden-valley-r18';
import { loftLivingR19 } from './scenarios/loft-living-r19';
import { nobleFalconR20 } from './scenarios/noble-falcon-r20';
import {
  HEALTHY_DECOY_ROUNDS,
  buildHealthyDecoyScenario,
} from './scenarios/healthy-decoys';

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
    11: royalCrestR11('royal-crest-none'),
  },
  'royal-crest-narrow': {
    1: royalCrestNarrowR1,
    11: royalCrestR11('royal-crest-narrow'),
  },
  'royal-crest-wide': {
    1: royalCrestWideR1,
    11: royalCrestR11('royal-crest-wide'),
  },
  'silver-horizon-none': {
    2: silverHorizonNoneR2,
    12: silverHorizonR12('silver-horizon-none'),
  },
  'silver-horizon-narrow': {
    2: silverHorizonNarrowR2,
    12: silverHorizonR12('silver-horizon-narrow'),
  },
  'silver-horizon-wide': {
    2: silverHorizonWideR2,
    12: silverHorizonR12('silver-horizon-wide'),
  },
  'ocean-view-none': {
    3: oceanViewNoneR3,
    13: oceanViewR13('ocean-view-none'),
  },
  'ocean-view-narrow': {
    3: oceanViewNarrowR3,
    13: oceanViewR13('ocean-view-narrow'),
  },
  'ocean-view-wide': {
    3: oceanViewWideR3,
    13: oceanViewR13('ocean-view-wide'),
  },
  'riverside-none': {
    4: riversideNoneR4,
    14: riversideR14('riverside-none'),
  },
  'riverside-narrow': {
    4: riversideNarrowR4,
    14: riversideR14('riverside-narrow'),
  },
  'riverside-wide': {
    4: riversideWideR4,
    14: riversideR14('riverside-wide'),
  },
  'emerald-peak-none': {
    5: emeraldPeakNoneR5,
    15: emeraldPeakR15('emerald-peak-none'),
  },
  'emerald-peak-narrow': {
    5: emeraldPeakNarrowR5,
    15: emeraldPeakR15('emerald-peak-narrow'),
  },
  'emerald-peak-wide': {
    5: emeraldPeakWideR5,
    15: emeraldPeakR15('emerald-peak-wide'),
  },
  'oceanfront-none': {
    6: oceanfrontNoneR6,
    16: oceanfrontR16('oceanfront-none'),
  },
  'oceanfront-narrow': {
    6: oceanfrontNarrowR6,
    16: oceanfrontR16('oceanfront-narrow'),
  },
  'oceanfront-wide': {
    6: oceanfrontWideR6,
    16: oceanfrontR16('oceanfront-wide'),
  },
  'palace-grand-none': {
    7: palaceGrandNoneR7,
    17: palaceGrandR17('palace-grand-none'),
  },
  'palace-grand-narrow': {
    7: palaceGrandNarrowR7,
    17: palaceGrandR17('palace-grand-narrow'),
  },
  'palace-grand-wide': {
    7: palaceGrandWideR7,
    17: palaceGrandR17('palace-grand-wide'),
  },
  'hidden-valley-none': {
    8: hiddenValleyNoneR8,
    18: hiddenValleyR18('hidden-valley-none'),
  },
  'hidden-valley-narrow': {
    8: hiddenValleyNarrowR8,
    18: hiddenValleyR18('hidden-valley-narrow'),
  },
  'hidden-valley-wide': {
    8: hiddenValleyWideR8,
    18: hiddenValleyR18('hidden-valley-wide'),
  },
  'loft-living-none': {
    9: loftLivingNoneR9,
    19: loftLivingR19('loft-living-none'),
  },
  'loft-living-narrow': {
    9: loftLivingNarrowR9,
    19: loftLivingR19('loft-living-narrow'),
  },
  'loft-living-wide': {
    9: loftLivingWideR9,
    19: loftLivingR19('loft-living-wide'),
  },
  'noble-falcon-none': {
    10: nobleFalconNoneR10,
    20: nobleFalconR20('noble-falcon-none'),
  },
  'noble-falcon-narrow': {
    10: nobleFalconNarrowR10,
    20: nobleFalconR20('noble-falcon-narrow'),
  },
  'noble-falcon-wide': {
    10: nobleFalconWideR10,
    20: nobleFalconR20('noble-falcon-wide'),
  },
};

// ── Healthy decoy calls (design "Option B") ─────────────────────────
// Each lead hotel doubles as a healthy decoy in four other rounds. When
// the learner engages a wrong pick there, this short "nothing pressing
// today" call plays (scored 0 as the wrong partner, then a retake) so
// Begin Conversation never dead-ends. Registered per market at each
// hotel's decoy rounds; these rounds never overlap the hotel's own
// priority rounds already registered above.
for (const [baseId, rounds] of Object.entries(HEALTHY_DECOY_ROUNDS)) {
  for (const regime of ['none', 'narrow', 'wide'] as const) {
    const id = `${baseId}-${regime}`;
    const bucket = (branchingScenarios[id] ??= {});
    for (const round of rounds) {
      bucket[round] = buildHealthyDecoyScenario(id, round);
    }
  }
}

export function getBranchingScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree | undefined {
  return branchingScenarios[partnerId]?.[round];
}
