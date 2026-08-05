import type { IssueTreePath } from '../../types';

/**
 * Palace Grand Resort - Round 7 - shared pieces.
 *
 * Source: SME "Round 7" doc, Example 9 (Palace Grand Resort, Hotel ID
 * 304). Ethan Nkosi is the Operations Manager of an INDEPENDENT resort
 * with full local autonomy - practical, ROI-minded, and quick to act on
 * a clear commercial case, but he weighs every recommendation against
 * the operational load on his front desk. He gives every channel the
 * same net rate ("Same Net Mindset"): when a competitor OTA cuts its
 * margin or runs coupons, he shrugs and tells Booking.com to burn margin
 * too. On top of that he deliberately restricts family rooms on OTAs.
 *
 * This is a KEY OTA competitiveness gap with a sharp +10.95 MoM eRPD
 * spike (eRPD 7.2% / Bucket 5, Lose Price 60%), concentrated in the
 * mobile (Mdot) and family (2+1 / 2+2) scenarios where the competitor is
 * actively undercutting. Strong conversion (+45% vs peer) and bookings
 * (+49%) but page views -53% and ABRN -46% YoY. His Mobile Rate on
 * Booking.com is active but misconfigured (excluded dates and two rate
 * plans), which is the concrete fix.
 *
 * The path: refuse the price war, reframe the Same Net logic to ROI and
 * unsold rooms, open up the family segment (Family Ready value), and
 * de-risk the fix as low-friction - correct the mobile-rate setup and add
 * family rates together, then make the regime-appropriate ask.
 *
 * Ethan's style is green (collaborative / ops) primary + blue
 * (analytical) secondary: he moves when the fix is easy, low-friction,
 * and backed by the numbers. Scoring rewards green + blue and penalizes
 * pushy red / empty yellow.
 *
 * The Issue Tree path matches the SME's "unintentional / external
 * undercutting" read of a changing Key OTA eRPD (the +10.95 MoM spike),
 * so it lines up with the same self-consistent branch used at R2 and R4.
 */

export const palaceGrandR7IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'key-ota-erpd-not-competitive',
  intent: 'unintentional',
  rootCauseId: 'missing-misaligned-discounts-ota',
  metricInsightId: 'non-structural-changing-erpd',
  hookId: 'deep-discount-or-mdot',
};
