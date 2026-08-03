import type { IssueTreePath } from '../../types';

/**
 * Emerald Peak Lodge - Round 5 - shared pieces.
 *
 * Source: SME "Round 5" doc, Example 7 (Emerald Peak Lodge, Hotel ID
 * 11). Sophia Chen is the GM of a FRANCHISE - limited local autonomy,
 * bound by central brand rules on rate parity and loyalty pricing. Head
 * office keeps the direct site cheaper by policy (the "Direct-is-Cheaper
 * Strategy"), treating Booking.com as a top-of-funnel billboard. This is
 * an intentional Brand.com competitiveness gap (eRPD 10.2% / Bucket 6,
 * Lose Price 100%) despite the property winning strongly on demand
 * metrics. Objection: The Direct-is-Cheaper Strategy (main) + Segmented
 * Pricing + Family Ready (support).
 *
 * The path: don't ask for a flat rate drop (she can't authorise one -
 * brand policy). Break the "we're just a billboard" belief with the 90%
 * discovery / reverse-billboard argument, then land a compliant,
 * segmented family rate that corporate won't police.
 *
 * Sophia's style is red (driver) primary + blue (analytical/rules)
 * secondary: direct and ROI-focused, but strictly policy-bound - she
 * moves on a concrete, compliant, targeted solution, not a broad cut.
 * Scoring rewards red + blue and penalises soft green / empty yellow.
 *
 * Same intentional-Brand.com-first diagnosis as Royal Crest R1 /
 * Ocean View R3, so the Issue Tree path is shared with that shape.
 */

export const emeraldPeakR5IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};

// SME-prescribed AM opener (identical across regimes). Sophia's Step 1
// partnerPrompt is her reply to this.
export const emeraldPeakOpeningAm =
  "Hi Sophia, thanks for joining the call. I've been analysing your performance - can I share some data with you?";
