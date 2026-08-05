import type { IssueTreePath } from '../../types';

/**
 * Oceanfront Bliss Lodge - Round 6 - shared pieces.
 *
 * Source: SME "Round 6" doc, Example 8 (Oceanfront Bliss Lodge, Hotel
 * ID 132). Priya Singh is the owner of an INDEPENDENT lodge - full local
 * autonomy, values simple ROI and occupancy, quick to act on a clear
 * commercial incentive. She keeps her direct site ~10% cheaper by design
 * and caps OTA share at 30% (the "Brand.com Loyalty" objection), and
 * believes an uncompetitive price here pushes guests to book direct (the
 * "Billboard Effect in Reverse"). The reality is a visibility collapse:
 * conversion +17% vs peer once seen, but page views -89% and ABRN -84%
 * YoY. Objection: Brand.com Loyalty (main) + Billboard Effect in Reverse
 * (support).
 *
 * The path: don't push a flat rate drop. Land the acquisition-cost math
 * (her ~10% direct acquisition cost is higher than your commission),
 * reframe from "stealing direct guests" to "finding net-new guests,"
 * then make the regime-appropriate ask.
 *
 * Priya's style is blue (ROI/analytical) primary + red (driver)
 * secondary: persuaded by the numbers, then decisive and fast to act.
 * Scoring rewards blue + red and penalizes soft green / empty yellow.
 *
 * Same intentional-Brand.com-first diagnosis as Royal Crest R1 / Ocean
 * View R3 / Emerald Peak R5, so the Issue Tree path is shared.
 */

export const oceanfrontR6IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};

// SME-prescribed AM opener for the Wide + Narrow conversations (No
// Parity uses its own, more collaborative opener). Priya's Step 1
// partnerPrompt is her reply to this.
export const oceanfrontOpeningAm =
  "Hi Priya, thanks for jumping into the call! I've been analyzing the performance trends for your property - particularly your visibility and search traffic over the last month.";
