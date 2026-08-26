import type { IssueTreePath } from '../../types';

/**
 * Silver Horizon Resort - Round 2 - shared pieces across all three
 * regime variants.
 *
 * Source: SME "Round 2" doc, Example 5 (Silver Horizon Resort, Hotel
 * ID 209). Chloe Davies is a Multi-Property Professional running a
 * portfolio of vacation-rental units - net-revenue maths, margin
 * optimization and ROI. This is a KEY OTA competitiveness gap (a Key OTA
 * undercutting via margin cuts on the International and Family
 * segments), not a Brand.com gap. Objection assigned: The Competitive
 * Aggression (main) + The Same Net Mindset (support) + the Family
 * Ready narrative.
 *
 * Unlike Royal Crest, the three regime conversations diverge from the
 * opening probe onward (Wide can ask for the same rates/conditions as
 * the Key OTA; Narrow may only align with Brand.com; No Parity asks
 * for the best available price), so each regime file is standalone.
 * Only the AM opener and the Issue Tree path are shared here.
 *
 * Chloe's style is blue (analytical) primary + red (driver) secondary:
 * she leads with the numbers and ROI, is commercially decisive, and
 * won't be drawn into a platform price war. Scoring rewards blue + red
 * and penalizes green/yellow warmth without a commercial case.
 *
 * The OPTIMAL line at each step is taken from the SME script; the two
 * distractors per step are authored to the "close but not quite" rule.
 * No internal metric names appear in any playerDialogue.
 */

export const silverHorizonR2IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'key-ota-erpd-not-competitive',
  intent: 'unintentional',
  rootCauseId: 'missing-misaligned-discounts-ota',
  metricInsightId: 'non-structural-changing-erpd',
  hookId: 'deep-discount-or-mdot',
};

// SME-prescribed AM opener (identical across regimes). Chloe's Step 1
// partnerPrompt is her reply to this.
export const silverHorizonOpeningAm =
  "Hi Chloe, thanks for jumping on the call! Let's dive into the data - would you mind?";
