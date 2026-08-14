// Objection catalogue (DIM_OBJECTION) - the 22 named objections from the
// Content Hub, with the descriptive dashboard name + the full legend
// description, matching the reporting-pipeline DIM_OBJECTION lookup.
//
// Reference data for the September objection scope (Objection is not yet
// a scored round-scenario type in the engine). Not currently wired into
// any screen - it maps a round's priority partner + level to its primary
// objection for when that scope lands. It was briefly surfaced on the
// Debrief round cards, but the legend copy (some of it first-person
// "I struggle..." framing) reads wrong as a partner objection and the
// SME won't be rewriting it, so the Debrief no longer renders it.

export interface ObjectionInfo {
  code: string;
  /** Short descriptive name shown as the objection label. */
  name: string;
  /** Full legend description explaining the objection. */
  legend: string;
  level: 1 | 2;
}

export const OBJECTIONS: Record<string, ObjectionInfo> = {
  OBJ_1: { code: 'OBJ_1', level: 1, name: 'Targeted vs Broad Discounting', legend: 'The partner rejects blanket rate cuts but is keen to consider underperforming guest segments.' },
  OBJ_2: { code: 'OBJ_2', level: 1, name: 'Brand.com Loyalty', legend: 'The partner limits our booking share to protect their direct website.' },
  OBJ_3: { code: 'OBJ_3', level: 1, name: 'Competitor Rate Pressure', legend: 'The partner follows aggressive competitor pricing advice.' },
  OBJ_4: { code: 'OBJ_4', level: 1, name: 'Gross Rate vs Public Price', legend: 'The partner only cares about getting the same payout, not the means behind it.' },
  OBJ_5: { code: 'OBJ_5', level: 1, name: 'Family Ready narrative', legend: 'The partner is unsure how to set up and price for family demand.' },
  OBJ_6: { code: 'OBJ_6', level: 1, name: 'Direct Search Misconception', legend: 'The partner overprices our platform to force direct bookings.' },
  OBJ_7: { code: 'OBJ_7', level: 1, name: 'Partner Data Resistance & Value Proposition Challenge', legend: 'The partner rejects data that can guide the pricing conversation, or already has a fixed cap for Booking.com.' },
  OBJ_8: { code: 'OBJ_8', level: 1, name: 'Pricing Talk Hesitation', legend: 'I hesitate to hold deep pricing discussions because I am unsure what advice I am allowed to give.' },
  OBJ_9: { code: 'OBJ_9', level: 1, name: 'Direct Rate Undercutting', legend: 'The partner intentionally keeps their direct website cheaper to protect direct bookings.' },
  OBJ_10: { code: 'OBJ_10', level: 1, name: 'BSB Resistance', legend: 'The partner views Booking Sponsored Benefit as losing rate control.' },
  OBJ_11: { code: 'OBJ_11', level: 1, name: 'Wholesaler Rate Leakage', legend: 'The partner blames us for leaked wholesale rates on the platform, feeling powerless to fix the leak and resistant to fixing their uncompetitive prices.' },
  OBJ_12: { code: 'OBJ_12', level: 1, name: 'Risky Guest & Payment Risk Overpricing', legend: 'The partner overprices our platform to avoid cancellations and risky guests.' },
  OBJ_13: { code: 'OBJ_13', level: 2, name: 'Traveler Behaviour Pivot', legend: 'I struggle to incorporate traveler behaviour to show the partner we are working towards the same objective.' },
  OBJ_14: { code: 'OBJ_14', level: 2, name: 'Global Stats Skepticism', legend: 'The partner dismisses global stats as corporate marketing.' },
  OBJ_15: { code: 'OBJ_15', level: 2, name: 'Peer Group Rejection', legend: 'The partner rejects their peer group comparison as being inaccurate.' },
  OBJ_16: { code: 'OBJ_16', level: 2, name: 'Data Discrepancy Resistance', legend: 'The partner rejects our performance metrics because they conflict with their internal data.' },
  OBJ_17: { code: 'OBJ_17', level: 2, name: 'Contract & Policy Shields', legend: 'The partner hides behind corporate policies or pre-buy contracts, fearing competitor penalties if they make our platform equally competitive.' },
  OBJ_18: { code: 'OBJ_18', level: 2, name: 'Contract & Policy Shields', legend: 'The partner hides behind corporate policies or pre-buy contracts, fearing competitor penalties if they make our platform equally competitive.' },
  OBJ_19: { code: 'OBJ_19', level: 2, name: 'Comp Set Rejection', legend: 'The partner claims their property is too unique or premium for our benchmark data.' },
  OBJ_20: { code: 'OBJ_20', level: 2, name: 'Data Storytelling Gap', legend: 'I struggle to connect metrics into a clear story when making pricing recommendations.' },
  OBJ_21: { code: 'OBJ_21', level: 2, name: 'Rate Inflation / Fake Discounts', legend: 'The partner inflates base rates to offset discounts.' },
  OBJ_22: { code: 'OBJ_22', level: 2, name: 'Action to Impact Forecasting', legend: 'The partner demands proof of future results before implementing recommendations.' },
};

// The primary objection each priority partner exercises, by level. Keyed
// by the partner's base id (regime suffix stripped), so it resolves for
// every regime variant and the Cross-Regional (KAM) ids alike. Source:
// Content Hub round-to-objection map (primary per round).
export const PARTNER_OBJECTION: Record<string, { l1: string; l2: string }> = {
  'royal-crest': { l1: 'OBJ_1', l2: 'OBJ_13' },
  'silver-horizon': { l1: 'OBJ_3', l2: 'OBJ_17' },
  'ocean-view': { l1: 'OBJ_6', l2: 'OBJ_19' },
  'riverside': { l1: 'OBJ_7', l2: 'OBJ_19' },
  'emerald-peak': { l1: 'OBJ_9', l2: 'OBJ_13' },
  'oceanfront': { l1: 'OBJ_2', l2: 'OBJ_16' },
  'palace-grand': { l1: 'OBJ_4', l2: 'OBJ_17' },
  'hidden-valley': { l1: 'OBJ_10', l2: 'OBJ_17' },
  'loft-living': { l1: 'OBJ_11', l2: 'OBJ_17' },
  'noble-falcon': { l1: 'OBJ_12', l2: 'OBJ_22' },
};

/**
 * The objection a given round exercised, resolved from the round's
 * priority partner id (regime/KAM suffix stripped) and the level
 * (rounds 1-10 = Level 1, 11-20 = Level 2). Returns null for partners
 * without a mapping (e.g. parked/legacy records).
 */
export function objectionForRound(
  partnerId: string,
  round: number,
): ObjectionInfo | null {
  const base = partnerId.replace(/-(none|narrow|wide|cross-regional)$/, '');
  const map = PARTNER_OBJECTION[base];
  if (!map) return null;
  const code = round <= 10 ? map.l1 : map.l2;
  return OBJECTIONS[code] ?? null;
}
