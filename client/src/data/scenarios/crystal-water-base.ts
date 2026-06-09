import type { IssueTreePath } from '../../types';

/**
 * Shared Crystal Water Resort R1 Issue Tree path.
 *
 * Unlike Noble Falcon, the per-regime scenario files don't share step
 * definitions - every step's partner prompt is regime-specific because
 * Sarah's pushback shifts with the regulatory framing (brand-cheaper
 * policy in Wide / Narrow, premium-acquisition framing in No-Parity).
 * Only the Issue Tree path is shared - the underlying diagnosis is
 * the same across regimes.
 *
 * Source: SME doc "Brand.com Competitiveness Gap" example for Hotel
 * ID 9 (Crystal Water Resort). Sarah is intentionally running cheaper
 * public rates on her direct brand site to shift share away from
 * Booking.com, which is leaking to third-party OTAs on meta-search
 * and capping conversion on-platform despite a 202% page-view spike
 * vs peer.
 */
export const crystalWaterR1IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};
