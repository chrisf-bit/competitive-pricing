import type { LearnerMarket, ParityRegime } from '../types';

export interface MarketOption {
  market: LearnerMarket;
  /** Display label for the parity regime. */
  label: string;
  /**
   * Whether the option is selectable in this build. We currently only have
   * partner data for No Parity; Narrow / Wide / Cross Regional are gated
   * until the matching partner rosters land.
   */
  available: boolean;
}

/**
 * The four parity options offered at the start of clearance. Pure parity
 * selection - no regional or rule framing on the cards (the rules are
 * what we're testing in clearance, so we don't pre-empt them here).
 *
 * Country-to-regime mapping for No / Narrow / Wide lives in
 * parityCountries.ts. Cross Regional is for large corporate hotels and
 * chains and is tagged on a per-partner basis rather than by country.
 */
export const marketOptions: MarketOption[] = [
  {
    market: { parityRegime: 'none' as ParityRegime },
    label: 'No Parity',
    available: true,
  },
  {
    market: { parityRegime: 'narrow' as ParityRegime },
    label: 'Narrow Parity',
    available: false,
  },
  {
    market: { parityRegime: 'wide' as ParityRegime },
    label: 'Wide Parity',
    available: false,
  },
  {
    market: { parityRegime: 'cross-regional' as ParityRegime },
    label: 'Cross Regional',
    available: false,
  },
];
