import type { LearnerMarket, ParityRegime } from '../types';

export interface MarketOption {
  market: LearnerMarket;
  /** Display label for the parity regime. */
  label: string;
  /** Short summary of the rules. */
  ruleSummary: string;
  /** Bullet points outlining what's allowed in conversation. */
  allowed: string[];
  /** Bullet points outlining what is NOT allowed. */
  notAllowed: string[];
  /** Illustrative country examples (subset of the canonical list). */
  exampleCountries: string[];
}

/**
 * The three parity options offered at the start of clearance. Pure
 * parity selection - no regional framing. The chosen regime drives the
 * rules of engagement for every partner the learner meets in the sim.
 *
 * Country-to-regime mapping lives in parityCountries.ts (single source
 * of truth). The example countries below are a representative subset
 * for visual flavour on each card.
 */
export const marketOptions: MarketOption[] = [
  {
    market: { parityRegime: 'none' as ParityRegime },
    label: 'No Parity',
    ruleSummary: 'The most constrained set of rules. Most of EMEA plus Chile sit here.',
    allowed: [
      "Ask partners for the best price they're willing to make available to Booking.com",
      'React with neutral, fact-finding questions if the partner raises external prices',
    ],
    notAllowed: [
      'Use the word "parity" in any conversation',
      'Suggest the partner is required to match external prices',
      'Open conversations about external pricing - partner-initiated only',
    ],
    exampleCountries: ['Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden'],
  },
  {
    market: { parityRegime: 'narrow' as ParityRegime },
    label: 'Narrow Parity',
    ruleSummary: "Alignment with the partner's own direct site only.",
    allowed: [
      'Ask partners to align rates and conditions strictly with Brand.com',
      'Use RPD versus Brand.com data to show on-platform price gaps',
    ],
    notAllowed: [
      'Ask for the same availability or price alignment with other OTAs',
      'Suggest partners adjust or reduce prices on other channels',
    ],
    exampleCountries: ['United Kingdom', 'Australia', 'Japan', 'Brazil', 'Hong Kong', 'Israel'],
  },
  {
    market: { parityRegime: 'wide' as ParityRegime },
    label: 'Wide Parity',
    ruleSummary: 'Full alignment with the partner direct site and key OTAs.',
    allowed: [
      'Ask partners to provide the same rates, conditions, and availability they offer Brand.com and key OTAs',
      'Proactively use cross-channel data (RPD, EPO) to illustrate performance opportunities',
    ],
    notAllowed: [
      'Promise ranking rewards or threaten penalties based solely on external prices',
      'Recommend the partner switch off other OTAs or wholesalers',
    ],
    exampleCountries: ['India', 'Mexico', 'Canada', 'Argentina', 'Egypt', 'Thailand'],
  },
];
