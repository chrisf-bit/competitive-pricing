import type { IssueTreePath } from '../../types';

/**
 * Shared Velvet Sky Boutique Hotel R2 Issue Tree path.
 *
 * Like Crystal Water, the per-regime scenario files don't share step
 * definitions - every step's partner prompt is regime-specific. Only
 * the underlying Issue Tree diagnosis is the same across regimes.
 *
 * Source: SME doc Brand.com Competitiveness Gap example for Hotel
 * ID 34 (Velvet Sky Boutique Hotel). John is aggressively running
 * public discounts on his direct brand site to dodge OTA commission,
 * has no Booking.com pricing tools active at all, and views direct
 * bookings as commission-free wins. The diagnosis is the same shape
 * as Crystal Water (intentional brand-first base-rate misalignment),
 * but the partner profile and the pitch differ - the wedge is
 * fenced direct incentives (member rates, value-adds) and targeted
 * Booking.com tools (Mobile Rate, Country Rate) rather than the
 * brand-promo rate alignment Crystal Water lands on.
 */
export const velvetSkyR2IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};
