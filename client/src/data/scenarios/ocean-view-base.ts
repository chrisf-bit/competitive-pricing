import type { IssueTreePath } from '../../types';

/**
 * Ocean View Resort - Round 3 - shared Issue Tree path.
 *
 * Source: SME "Round 3" doc, Example 6 (Ocean View Resort, Hotel ID
 * 60). Camila Ross is a Property Manager / vacation-rental agency who
 * deliberately keeps Booking.com marked up ~5.5% versus her own website
 * to push guests to book direct - the "Billboard Effect in Reverse."
 * The reality is a visibility-debt collapse: she converts +39% vs peer
 * once seen, but page views are -61% and bookings -48% because the
 * markup buries her in search. Objection: The Billboard Effect in
 * Reverse (main) + The Segmented Pricing Conversation (support).
 *
 * Same underlying diagnosis as Royal Crest R1 (intentional Brand.com
 * competitiveness gap, structural brand-first), so the path is shared
 * with that shape. Each regime file carries its own opener and its own
 * dialogue (Wide can ask to match her direct-website rates; Narrow can
 * align with Brand.com and layer fenced member rates; No Parity asks
 * for her best available price).
 *
 * Camila's style is blue (analytical) primary + red (driver) secondary:
 * experienced and evidence-led - she changes course when the search-
 * behavior logic and data stack up, and protects margin decisively.
 * Scoring rewards blue + red and penalizes green/yellow warmth that
 * lacks a commercial case.
 */

export const oceanViewR3IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};
