import type { IssueTreePath } from '../../types';

/**
 * Loft Living Inn - Round 9 - shared pieces.
 *
 * Source: SME "Round 9" doc, Example 2 (Loft Living Inn, Hotel ID 301).
 * Lucas Silva is a PMC Revenue Manager and Multi-Property Professional
 * (MPP) - he runs a portfolio of vacation-rental units as a commercially
 * minded business with strong autonomy, and responds to revenue impact,
 * margin logic, and ROI across channels. He's frustrated: his static B2B
 * / wholesale rates are leaking into the public B2C space (surfacing via
 * Partner Offer / metasearch), and he blames Booking.com for amplifying
 * it. Competitors (Expedia) are pointing out the price gaps to pile on.
 *
 * This is a SEVERE Key OTA competitiveness gap: eRPD 31.7% / Bucket 7,
 * with a massive +30.75 MoM spike, Public RPD 35.4%, Loyal RPD 29.9%,
 * Lose Price 97%. ADR is +88% above peer but room nights are -44%,
 * conversion -68%, and next-3M pace -46%. His mobile rate is active but
 * misconfigured (weekends and long booking windows excluded, and his base
 * rate rose so the discount no longer bites). Active scenarios: Wholesaler
 * leakage, App, and Brand Scenario.
 *
 * IMPORTANT - this round ends on a SOFT NO. Even played perfectly, Lucas
 * won't act today: he says he'll look at it by the end of the week. The
 * win is a compliant, trust-preserving conversation that reframes B2B
 * distribution as a "leakage tax" once it hits B2C, clarifies that
 * Booking.com is not the source of the leaked rate (Partner Offer just
 * surfaces the best public price), makes the regime-appropriate ask, and
 * offers a fenced mobile-rate fix - never a price war. The optimal close
 * accepts the deferral gracefully and books the follow-up.
 *
 * Lucas's style is red (commercial driver) primary + blue (analytical)
 * secondary: direct, margin- and ROI-led, and he wants proof before he
 * moves. Scoring rewards red + blue and penalizes soft-fluffy green /
 * empty yellow. A light acknowledgment of his frustration lands, but the
 * core is the commercial case, backed by data.
 *
 * Same Key OTA / unintentional (external leak) read of a changing eRPD as
 * Silver Horizon R2 / Riverside R4 / Palace Grand R7, so the Issue Tree
 * path is shared.
 */

export const loftLivingR9IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'key-ota-erpd-not-competitive',
  intent: 'unintentional',
  rootCauseId: 'missing-misaligned-discounts-ota',
  metricInsightId: 'non-structural-changing-erpd',
  hookId: 'deep-discount-or-mdot',
};
