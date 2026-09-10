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
      "Experienced Relative Price Difference (before BSB and Partner Offer) - it shows how much cheaper or more expensive Booking.com is compared to Brand.com on Meta or a key OTA on direct, based on prices that non-logged-in and Genius Level 1 travelers would see on our platform. When above 0% = pricing is more expensive on average on our platform. The difference is shown month-on-month.",
  },
  rpdPublic: {
    label: 'RPD Public',
    helpText:
      "The demand-weighted price comparison between Booking.com's prices for non-logged-in travelers and the competitor's public prices (before BSB and Partner Offer) where Brand.com is measured on Meta and Key OTA on direct.",
  },
  rpdLoyal: {
    label: 'RPD Loyal',
    helpText:
      "The demand-weighted price comparison between Booking.com's prices for Genius Level 1 travelers and the competitor's public prices (before BSB and Partner Offer) where Brand.com is measured on Meta and Key OTA on direct.",
  },
  losePricePublic: {
    label: 'Lose Price',
    helpText:
      "The share of public-search scans where Booking.com prices are more expensive than Brand.com (on Meta) or a key OTA (on direct). A higher percentage means the partner's prices on Booking.com are more frequently higher than those on Brand.com or the key OTA.",
  },
  activeScenarios: {
    label: 'Scenarios',
    helpText:
      'Number of active pricing scenarios applied to this partner (e.g. Brand.com matching, App-only rate).',
  },
  competitor: {
    label: 'Competitor',
    helpText:
      "In the game, each round uses a predefined primary comparison player for ERPD and price metrics: either Brand.com (measured on Meta) or the key OTA (on direct). This keeps the simulations focused. In practice, and under your manager's guidance, align with the office-country ERPD objectives direction and use pricing dashboard insights to prioritize actions between Brand.com and the key OTA. Consider the potential ERPD impact, partner value, observed trends, and any applicable parity guardrails.",
  },

  // ── eRPD Price Bucket ──
  priceBucket: {
    label: 'eRPD Price Bucket',
    helpText:
      'Where this partner sits on the seven-bucket eRPD price spectrum. Bucket 1 (eRPD < -3%) = most competitive; Bucket 7 (eRPD > 12%) = least competitive. Used for internal portfolio prioritization and account planning only - never quoted to the partner.',
  },

  // ── Secondary metrics row (PDF page 1) ──
  last30dAbrn: {
    label: 'Last 30D ABRN',
    helpText:
      "As Booked Room Nights produced over the last 30 days. Compared vs the same 30 days last year so the learner sees year-on-year change.",
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
      "Number of times users clicked through to the hotel's detail page on Booking.com from search results over the last 30 days. Compared with the partner's peer group in the same period. Negative % = the property is being seen less than peers.",
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
      'Date of the most recent logged pricing-focused contact with this partner. Old dates can signal a partner who has drifted without engagement.',
  },
  pricingCoverageQTD: {
    label: 'Pricing Coverage (QTD)',
    helpText:
      'Quarter-to-date share of the pricing competitiveness steering actions you have tracked for this partner, across topics, products, and scenarios. Higher = more steering activity logged; lower = headroom for more engagement.',
  },
  partnerValueAbrn: {
    label: 'Partner Value (ABRN ly)',
    helpText:
      "Partner Value (ABRN last year) expresses the order of magnitude of a partner's business to Booking.com, regardless of their current pricing performance. For price competitiveness opportunities, we recommend prioritizing with higher Experienced RPD x Partner Value, to focus where price gaps matter most commercially.",
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
      "Average share of the property's total room capacity that remains unsold throughout the month, including listed and unlisted rooms. Highlights opportunities to support partners that are not at full occupancy.",
  },
  sellThroughRate: {
    label: 'Sell Through Rate',
    helpText:
      'Share of available inventory that gets sold within a given window, vs peer group.',
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
      'The average price shown on the front-end, weighted by the number of visitors.',
  },
} as const satisfies Record<string, MetricDefinition>;

export type MetricKey = keyof typeof metricDefinitions;
