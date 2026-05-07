import type { LearnerMarket, ParityRegime } from '../types';

export interface MarketOption {
  market: LearnerMarket;
  /** Short summary of the parity rules a learner faces in this market. */
  ruleSummary: string;
  /** Bullet points outlining what's allowed in conversation. */
  allowed: string[];
  /** Bullet points outlining what is NOT allowed. */
  notAllowed: string[];
  /** Illustrative country examples shown on the card. SMEs to validate. */
  exampleCountries: string[];
}

/**
 * The three market options offered at the start of Level 0.
 * Each maps to a parity regime that drives the rules of engagement
 * for any partner the learner meets in Level 1.
 *
 * NOTE: Country/region → parity mapping is illustrative and pending SME
 * validation (parity status varies by jurisdiction and contract term, and
 * the steering deck does not enumerate the mapping). The structural
 * decision — three options, each tagged with a ParityRegime — is what
 * load-bears here.
 */
export const marketOptions: MarketOption[] = [
  {
    market: {
      regionId: 'eu-west',
      regionLabel: 'Western Europe',
      parityRegime: 'none' as ParityRegime,
    },
    ruleSummary: 'No-Parity market — the most constrained set of rules.',
    allowed: [
      'Ask partners for the best price they\'re willing to make available to Booking.com',
      'React with neutral, fact-finding questions if the partner raises external prices',
    ],
    notAllowed: [
      'Use the word "parity" in any conversation',
      'Suggest the partner is required to match external prices',
      'Open conversations about external pricing — partner-initiated only',
    ],
    exampleCountries: ['Germany', 'France', 'Italy', 'Sweden'],
  },
  {
    market: {
      regionId: 'na-us',
      regionLabel: 'United States',
      parityRegime: 'narrow' as ParityRegime,
    },
    ruleSummary: 'Narrow-Parity market — alignment with the partner\'s own site only.',
    allowed: [
      'Ask partners to align rates and conditions strictly with Brand.com',
      'Use RPD versus Brand.com data to show on-platform price gaps',
    ],
    notAllowed: [
      'Ask for the same availability or price alignment with other OTAs',
      'Suggest partners adjust or reduce prices on other channels',
    ],
    exampleCountries: ['United States', 'Canada', 'Mexico'],
  },
  {
    market: {
      regionId: 'apac-emerging',
      regionLabel: 'Asia-Pacific',
      parityRegime: 'wide' as ParityRegime,
    },
    ruleSummary: 'Wide-Parity market — full alignment with direct site and key OTAs.',
    allowed: [
      'Ask partners to provide the same rates, conditions, and availability they offer Brand.com and key OTAs',
      'Proactively use cross-channel data (RPD, EPO) to illustrate performance opportunities',
    ],
    notAllowed: [
      'Promise ranking rewards or threaten penalties based solely on external prices',
      'Recommend the partner switch off other OTAs or wholesalers',
    ],
    exampleCountries: ['Singapore', 'Thailand', 'Indonesia', 'Vietnam'],
  },
];
