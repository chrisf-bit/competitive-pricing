/**
 * Definitions for every metric label rendered on Partner Detail.
 *
 * Surfaced through the shared <MetricLabel> component as a hover/tap
 * tooltip next to the label. Lets a learner who isn't yet fluent with
 * the metric set self-serve the definition without leaving the screen.
 *
 * Source for the definitions: Partner Metrics PDF page 4 (the broad
 * metric dictionary) and page 21 (Quality Adoption metrics, used when
 * the Advanced View tab unlocks in R3).
 *
 * Voice: factual, neutral, plain English. The help text appears on the
 * learner's internal LPS-side dashboard, so it's fine to use full
 * internal metric names (eRPD, Lose Price Public). It is NOT fine for
 * any of these strings to leak into partner-facing copy - that's the
 * existing internal-metric-name rule, unchanged.
 */
export interface MetricDefinition {
  /** Human-readable label shown to the learner. */
  label: string;
  /** Plain-English description shown in the hover tooltip. */
  helpText: string;
}

export const metricDefinitions = {
  // ── Driving Metrics row ──
  erpd: {
    label: 'eRPD',
    helpText:
      "Experienced RPD - the relative price difference between what travelers see on Booking.com and what they'd pay on Key OTA or Brand.com. Higher % = partner is more expensive on our platform. The difference is shown as month on month.",
  },
  rpdPublic: {
    label: 'RPD Public',
    helpText:
      'Public RPD - the price comparison for travelers who are NOT logged into a Genius account. Reflects the rate seen by the bulk of traffic.',
  },
  rpdLoyal: {
    label: 'RPD Loyal',
    helpText:
      "Loyal RPD looks at Genius Level 1 users and compares our member price with competitors' public prices (pre-BSB and partner Offer).",
  },
  losePricePublic: {
    label: 'Lose Price',
    helpText:
      'Share of public-traffic searches where Booking.com loses the price comparison vs Brand.com / Key OTA. Higher % = more searches where this partner looked uncompetitive.',
  },
  activeScenarios: {
    label: 'Scenarios',
    helpText:
      'Number of active pricing scenarios applied to this partner (e.g. Brand.com matching, App-only rate).',
  },
  competitor: {
    label: 'Competitor',
    helpText:
      'In the game, we compare price competitiveness with either Brand.com (the partner\'s direct website) or the Key OTA predefined for that simulation. In practice, check both in the pricing dashboards.',
  },

  // ── eRPD Price Bucket ──
  priceBucket: {
    label: 'eRPD Price Bucket',
    helpText:
      'Where this partner sits on the seven-bucket Booking.com price spectrum. Bucket 1 (eRPD ≤ -3%) = most competitive; Bucket 7 (eRPD > 12%) = least competitive. Used for internal portfolio prioritization only - never quoted to the partner.',
  },

  // ── Secondary metrics row (PDF page 1) ──
  last30dAbrn: {
    label: 'Last 30D ABRN',
    helpText:
      "Action-Based Room Nights produced over the last 30 days - the volume of bookings driven through Booking.com. Compared vs last year so the learner sees year-on-year change.",
  },
  last30dRoomNights: {
    label: 'Last 30D Room Nights',
    helpText:
      "Total room nights booked in the last 30 days. Compared vs the partner's peer group (similar properties in the area).",
  },
  last30dAdr: {
    label: 'Last 30D ADR',
    helpText:
      'Average Daily Rate over the last 30 days - the average price paid per room per night. Compared vs peer group.',
  },
  last90dPageViews: {
    label: 'Last 30D Page Views',
    helpText:
      "Share of expected page views the property received over the last 30 days, relative to peers. Negative % = the property is being seen less than peers.",
  },
  last90dConversion: {
    label: 'Last 30D Conversion',
    helpText:
      'Share of page views that converted into bookings over the last 30 days, vs peer group conversion. Negative comparator = the page is converting worse than peers.',
  },
  next3mRoomNights: {
    label: 'Next 3M Room Nights',
    helpText:
      'Forward-looking PACE - room nights already on the books for the next three months. Compared vs peer group at the same point in time.',
  },

  // ── Right-hand panel additions ──
  lastPricingContact: {
    label: 'Last Pricing Contact',
    helpText:
      'Date of the most recent pricing-focused conversation with this partner. Stale dates can signal a partner who has drifted without engagement.',
  },
  pricingCoverageQTD: {
    label: 'Pricing Coverage (QTD)',
    helpText:
      'Quarter-to-date share of the pricing competitiveness steering actions you have tracked for this partner, across topics, products, and scenarios. Higher = more steering activity logged; lower = headroom for more engagement.',
  },
  partnerValueAbrn: {
    label: 'Partner Value (ABRN ly)',
    helpText:
      "Total ABRN (Actual Booked Room Nights) the partner delivered last year. Scale indicator: how much value they represent to Booking.com, independent of how well they're currently priced. Big + poorly-priced = high-priority call; big + well-priced = healthy; small + poorly-priced = still worth a look but less urgent.",
  },

  // ── Advanced View (locked R2, content lands R3) - PDF page 21 ──
  weightedAdoption: {
    label: 'Weighted Adoption %',
    helpText:
      'Share of partners that adopted a product, weighted by their room nights. Tells you how much of total demand is exposed to the product.',
  },
  utilization: {
    label: 'Utilization %',
    helpText:
      'Share of room nights that actually used the product, among partners who adopted it. Tells you how often the product fires once enabled.',
  },
  discountDepth: {
    label: 'Discount Depth',
    helpText:
      'Average discount applied when the product is used, weighted by room nights.',
  },
  discountContribution: {
    label: 'Discount Contribution',
    helpText:
      "Aggregated impact of the product on prices: Weighted Adoption % x Utilization % x Discount Depth.",
  },
  trueDiscountFraction: {
    label: 'True discount fraction',
    helpText:
      'Share of the discount that genuinely flowed through to travelers (vs being absorbed elsewhere), with measurable impact on eRPD.',
  },
  trueDiscountContribution: {
    label: 'True discount contribution',
    helpText:
      "True aggregated impact of the product on eRPD: Discount Contribution x True discount fraction.",
  },

  // ── Advanced View OPC metrics (locked R2) - PDF page 2/3 ──
  unsoldRooms: {
    label: 'Unsold Rooms',
    helpText:
      'Inventory gaps - room nights the property has available but has not yet sold. Often where OTAs can support partners who are not at full occupancy.',
  },
  sellThroughRate: {
    label: 'Sell Through Rate',
    helpText:
      'Share of available inventory that gets sold within a given window, vs peer group.',
  },
  distributionOfSearch: {
    label: 'Distribution of Search',
    helpText:
      'How search traffic is distributed across competitor properties for the same demand. Tells you where attention is going.',
  },
  visibilityShare: {
    label: 'Visibility Share',
    helpText:
      'Share of impressions the property captures relative to peers. Lower share = the property is appearing in fewer searches.',
  },
  clickThroughRate: {
    label: 'Click Through Rate',
    helpText:
      'Share of search impressions that turn into a property page view, vs peer group.',
  },
  conversion: {
    label: 'Conversion',
    helpText:
      "Share of property page views that turn into a booking, vs peer group.",
  },
  searchPrice: {
    label: 'Search Price',
    helpText:
      "The price shown to a typical searcher on this property's results card, vs peer group.",
  },
} as const satisfies Record<string, MetricDefinition>;

export type MetricKey = keyof typeof metricDefinitions;
