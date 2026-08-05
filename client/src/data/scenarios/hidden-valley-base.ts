import type { IssueTreePath } from '../../types';

/**
 * The Hidden Valley Resort - Round 8 - shared pieces.
 *
 * Source: SME "Round 8" doc, Example 10 (The Hidden Valley Resort, Hotel
 * ID 39). Claire Thornton is a Revenue Manager at a FRANCHISE property
 * with limited local autonomy - she works to a central, brand-mandated
 * policy and cares about brand compliance and reputation. Head office
 * keeps the direct website ~7% cheaper by design to "own" the guest
 * ("Direct-Is-Cheaper"), and she reads Booking Sponsored Benefit (BSB) as
 * Booking.com taking control of her price ("BSB / Payments Shield").
 *
 * This is a STRUCTURAL Brand.com competitiveness gap: eRPD 7.3% / Bucket
 * 5, with Public RPD and Loyal RPD both at 7.3% (no Genius gap - she's
 * relying on BSB to equalize price), and family scenarios flagged as an
 * unintentional setup gap. Page views hold near peer and ABRN is +65%
 * YoY, but ABRN is still below peer and next-3M room nights pace -50%.
 *
 * IMPORTANT - this round ends on a SOFT NO. Even played perfectly, Claire
 * does not commit today: she asks to reconsider and reconnect next month.
 * The win is a compliant, trust-preserving conversation that reframes BSB
 * as a shield (not a loss of control), lands the billboard logic, and
 * separates the price opportunity from her review-risk worry - earning a
 * warm follow-up, not a yes. The optimal close accepts the deferral
 * gracefully; pushing for a decision now is the trap.
 *
 * Claire's style is blue (analytical) primary + red (driver / brand
 * control) secondary: she leads with the data and respects a direct,
 * structured case, but she guards her pricing autonomy and brand. Scoring
 * rewards blue + red and penalizes soft-fluffy yellow / empty green.
 *
 * Same structural-Brand.com-first diagnosis as Royal Crest R1 / Ocean
 * View R3 / Emerald Peak R5 / Oceanfront R6, so the Issue Tree path is
 * shared.
 *
 * NOTE ON DATA: the SME's Data Insight and Value Pitch both state Lose
 * Price 50%, while the raw data table shows 99%. We use 50% (the two
 * narrative sources agree and it fits the "3 active scenarios, moderate
 * gap" read). Flip to 99% if the table is the authority.
 */

export const hiddenValleyR8IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};
