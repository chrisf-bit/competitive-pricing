import type { IssueTreePath } from '../../types';

/**
 * Riverside Boutique Hotel - Round 4 - shared pieces.
 *
 * Source: SME "Round 4" doc, Example (Riverside Boutique Hotel, Hotel
 * ID 202). Anton Müller is the GM of a "Marketing Contract Only"
 * boutique - significant local autonomy, values guest quality and
 * boutique positioning, and dislikes being dictated to on rate
 * strategy. This is a KEY OTA competitiveness gap with three threads:
 * a "Value Proposition Wall" (a deliberate 30% Booking.com volume cap),
 * an UNINTENTIONAL family setup gap (families priced as adults / missing
 * child rates, so family RPD > couple RPD), and a non-genuine Genius
 * discount (public base raised to offset Genius, so Public RPD 6.0% but
 * Loyal RPD 0.3%). Objection: The "Value Proposition" Wall (main) +
 * Slippery Road of Pricing + Segmented Pricing + Family Ready (support).
 *
 * Each regime file is standalone (the three conversations diverge from
 * the first probe); only the opener and the Issue Tree path are shared.
 *
 * Anton's style is blue (analytical) primary + green (relationship)
 * secondary: inquisitive and data-led, wins on logic delivered
 * collaboratively, and reacts badly to being pushed or lectured.
 * Scoring rewards blue + green and penalizes pushy red / empty yellow.
 *
 * The Issue Tree path matches the SME's "unintentional / missing setup"
 * read of a changing Key OTA eRPD (the +6.56 MoM spike), so it lines up
 * with the same self-consistent branch used at R2.
 */

export const riversideR4IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'key-ota-erpd-not-competitive',
  intent: 'unintentional',
  rootCauseId: 'missing-misaligned-discounts-ota',
  metricInsightId: 'non-structural-changing-erpd',
  hookId: 'deep-discount-or-mdot',
};

// SME-prescribed AM opener (identical across regimes). Anton's Step 1
// partnerPrompt is his reply to this.
export const riversideOpeningAm =
  "Good morning, Anton. Thank you for your time - why don't we have a look at the data?";
