import type { IssueTreeTrigger, IssueTreeIntent } from '../types';

/**
 * Pricing Issue Tree data - the 6-column diagnostic matrix the SME
 * uses to map a partner's symptoms to a hook (the pitch angle).
 *
 * Each column is a flat list of options with filter relationships to
 * the column before. The Issue Tree Helper walks the learner through
 * one column at a time, narrowing the option set at each step based
 * on prior picks.
 *
 * Coverage today: full trigger + issue + intent set; root causes,
 * metrics, and hooks fully encoded for the Brand.com eRPD branch
 * (which is what John R1 uses). The Key OTA branch is stubbed with a
 * single representative option at each downstream column so the
 * Helper has plausible alternates; SME content for those branches
 * lands later.
 */

export interface TriggerOption {
  id: IssueTreeTrigger;
  label: string;
  description: string;
}

export interface IssueOption {
  id: string;
  label: string;
  description: string;
  validTriggers: IssueTreeTrigger[];
}

export interface IntentOption {
  id: IssueTreeIntent;
  label: string;
  description: string;
}

export interface RootCauseOption {
  id: string;
  label: string;
  description: string;
  validIssues: string[];
  validIntents: IssueTreeIntent[];
}

export interface MetricInsightOption {
  id: string;
  label: string;
  description: string;
  validRootCauses: string[];
}

export interface HookOption {
  id: string;
  label: string;
  description: string;
  validMetrics: string[];
}

export const triggers: TriggerOption[] = [
  {
    id: 'performance-outcome',
    label: 'Performance Outcome',
    description:
      'Headline KPIs are missing: revenue, roomnights or ADR are below the trend you would expect.',
  },
  {
    id: 'pricing-signal',
    label: 'Pricing Signal',
    description:
      'Pricing-specific metrics flag an issue: eRPD, Lose Price Public, RPD-vs-channel gaps.',
  },
  {
    id: 'interaction',
    label: 'Interaction',
    description:
      'Something in a recent partner interaction (call, email, ticket) suggests pricing is off.',
  },
  {
    id: 'programme',
    label: 'Programme',
    description:
      'A discount programme is broken, missing or misconfigured.',
  },
];

export const issues: IssueOption[] = [
  {
    id: 'brand-com-erpd-not-competitive',
    label: 'Brand.com eRPD not competitive',
    description:
      'The partner is more expensive on Booking.com than on their own direct site.',
    validTriggers: ['performance-outcome', 'pricing-signal'],
  },
  {
    id: 'key-ota-erpd-not-competitive',
    label: 'Key OTA eRPD not competitive',
    description:
      'The partner is more expensive on Booking.com than on a key competing OTA.',
    validTriggers: ['performance-outcome', 'pricing-signal'],
  },
];

export const intents: IntentOption[] = [
  {
    id: 'intentional',
    label: 'Intentional',
    description:
      'The partner is deliberately running this pattern as part of a strategy.',
  },
  {
    id: 'unintentional',
    label: 'Unintentional',
    description:
      "The partner doesn't realise this is happening - it's an oversight or misconfiguration.",
  },
];

export const rootCauses: RootCauseOption[] = [
  // Brand.com / Intentional
  {
    id: 'structural-brand-first',
    label: 'Structural Partner Channel strategy (brand first)',
    description:
      "Partner is deliberately keeping Booking.com rates above their direct site to steer guests to direct.",
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['intentional'],
  },
  {
    id: 'non-competitive-genius-brand',
    label: 'Non-competitive Genius (or other product) discount',
    description:
      "Genius or another discount product is set too low to close the Brand.com gap.",
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['intentional'],
  },
  {
    id: 'promotion-only-on-brand',
    label: 'Promotion discounts only on Brand.com',
    description:
      "Partner runs promotions on their direct site that they don't replicate on Booking.com.",
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['intentional'],
  },
  {
    id: 'exclusive-supply-brand',
    label: 'Exclusive room / rate supply on Brand.com',
    description:
      'Specific room types or rate plans are only available on the direct site.',
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['intentional'],
  },
  // Brand.com / Unintentional
  {
    id: 'missing-misaligned-discounts-brand',
    label: 'Missing or misaligned discounts',
    description:
      "Discount products are accidentally off, expired, or set to the wrong markets.",
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['unintentional'],
  },
  {
    id: 'missing-inventory-brand',
    label: 'Missing inventory (rates / rooms / restrictions / occupancy / policies)',
    description:
      'Booking.com is missing inventory that exists on Brand.com.',
    validIssues: ['brand-com-erpd-not-competitive'],
    validIntents: ['unintentional'],
  },
  // Key OTA / Intentional (stub - one representative option for v1)
  {
    id: 'structural-ota-first',
    label: 'Structural Partner Channel strategy (preferred OTA first)',
    description:
      'Partner is favouring a different OTA channel as a strategic choice.',
    validIssues: ['key-ota-erpd-not-competitive'],
    validIntents: ['intentional'],
  },
  // Key OTA / Unintentional (stub)
  {
    id: 'missing-misaligned-discounts-ota',
    label: 'Missing or misaligned discounts',
    description:
      "Discount products are misconfigured relative to other OTAs.",
    validIssues: ['key-ota-erpd-not-competitive'],
    validIntents: ['unintentional'],
  },
];

export const metricInsights: MetricInsightOption[] = [
  {
    id: 'structural-constant-non-competitive-erpd',
    label: 'Structural constant non-competitive eRPD > 0%',
    description:
      "eRPD has been persistently above zero - this isn't a temporary swing.",
    validRootCauses: [
      'structural-brand-first',
      'exclusive-supply-brand',
      'missing-inventory-brand',
      'structural-ota-first',
    ],
  },
  {
    id: 'structural-genius-or-product-gap',
    label: 'Structural - Genius & Public RPD > 5%, or other product & eRPD > 0%',
    description:
      'Discount products are present but tuned too softly to close the gap.',
    validRootCauses: [
      'non-competitive-genius-brand',
    ],
  },
  {
    id: 'non-structural-changing-erpd',
    label: 'Non-structural changing eRPD (> 0%) over time',
    description:
      'eRPD swings rather than sitting steady - usually a promotion or config issue, not a strategy.',
    validRootCauses: [
      'promotion-only-on-brand',
      'missing-misaligned-discounts-brand',
      'missing-misaligned-discounts-ota',
    ],
  },
];

export const hooks: HookOption[] = [
  {
    id: 'base-rate-misalignment',
    label: 'Base rate misalignment',
    description:
      "Walk through on-platform competitiveness and cross-channel data. Show the partner the base rate gap and reframe it.",
    validMetrics: ['structural-constant-non-competitive-erpd'],
  },
  {
    id: 'non-genuine-discount-audit',
    label: 'Non-genuine discount audit',
    description:
      'Review the discount setup against the structural eRPD gap to find where Genius or product discount is under-tuned.',
    validMetrics: ['structural-genius-or-product-gap'],
  },
  {
    id: 'deep-discount-or-mdot',
    label: 'Deep discount / Mobile / Domestic / International audit',
    description:
      'Reactive scenarios for non-structural swings. Find the specific lever that moved.',
    validMetrics: ['non-structural-changing-erpd'],
  },
  {
    id: 'missing-inventory',
    label: 'Missing inventory',
    description:
      "Surface what's missing on Booking.com that the partner has on Brand.com.",
    validMetrics: ['structural-constant-non-competitive-erpd'],
  },
];

// ── Lookups by id ────────────────────────────────────────────────

export function getTrigger(id: IssueTreeTrigger): TriggerOption | undefined {
  return triggers.find((t) => t.id === id);
}
export function getIssue(id: string): IssueOption | undefined {
  return issues.find((i) => i.id === id);
}
export function getIntent(id: IssueTreeIntent): IntentOption | undefined {
  return intents.find((i) => i.id === id);
}
export function getRootCause(id: string): RootCauseOption | undefined {
  return rootCauses.find((r) => r.id === id);
}
export function getMetricInsight(id: string): MetricInsightOption | undefined {
  return metricInsights.find((m) => m.id === id);
}
export function getHook(id: string): HookOption | undefined {
  return hooks.find((h) => h.id === id);
}
