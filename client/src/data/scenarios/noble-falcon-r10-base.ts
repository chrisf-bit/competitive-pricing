import type { IssueTreePath } from '../../types';

/**
 * The Noble Falcon Inn - Round 10 - shared pieces.
 *
 * Source: SME "Round 10" doc, Example 1 (The Noble Falcon Inn, Hotel ID
 * 101). This is Noble Falcon's true home (Sheet 7 places it at Round 10);
 * it was pulled forward to R3 as a pedagogical stretch while R4-R9 were
 * being authored, and now returns to R10 with its full SME content and a
 * new contact - Adam Cole, Revenue Manager of a FULLY-MANAGED-BY-BRAND
 * property with limited local autonomy who values consistency, brand
 * standards, and guest experience over local commercial flexibility.
 *
 * This is a structural Brand.com competitiveness gap: eRPD 17.0% / Bucket
 * 7, a sharp +21.42 MoM increase, Public RPD 20.0% but Loyal RPD only
 * 5.9% (Genius adopted but the base was raised to offset it), Lose Price
 * 93%, four active scenarios (Brand, Family 2+1, Family 2+2, App). ADR is
 * -17% vs peer and volume looks healthy on paper, but the Brand-first gap
 * is embedding into the base strategy.
 *
 * The objection stack, led by THE RISKY GUEST: Adam keeps Booking.com
 * deliberately more expensive to filter out "risky" guests (invalid
 * cards, short-notice cancellations, pay-at-property fraud), supported by
 * Direct-Channel Focus, Direct-Is-Cheaper, Brand.com-Loyalty, and an
 * unintentional Family setup gap (children priced as adults).
 *
 * IMPORTANT - this round ends on a STRONG NO. Unlike the soft-no rounds
 * (R8, R9), Adam does not merely defer: he shuts the conversation down and
 * ends the call without committing to anything. The teaching point is that
 * a fully-brand-managed partner can be genuinely intractable - even a
 * flawless, fully-compliant conversation lands a hard no. The win is
 * separating price from risk, staying respectful of his autonomy (he
 * bristles at being told how to run his own website), remaining compliant
 * throughout, and closing professionally to keep the door open for next
 * month - not chasing him or threatening as he leaves. As the final Level
 * 1 round, it teaches that the process, not the yes, is what's graded.
 *
 * Adam's style is blue (process / brand-standards / analytical) primary +
 * red (control / directive) secondary: he leads with the brand mandate and
 * respects a structured, data-led case, but he guards his autonomy and
 * shuts down when pushed or lectured. Scoring rewards blue + red with a
 * light touch of collaborative green, and penalizes pushy dictation of his
 * own strategy / empty yellow.
 *
 * Same structural-Brand.com-first diagnosis as Royal Crest R1 / Oceanfront
 * R6 / Hidden Valley R8, so the Issue Tree path is shared.
 */

export const nobleFalconR10IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};
