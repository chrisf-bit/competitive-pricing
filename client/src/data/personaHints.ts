/**
 * Persona-driven pre-call hints surfaced on the Partner Detail screen.
 *
 * Each entry maps a partner x round x persona to a single one-line
 * lens on the partner. The chip that reads this on Partner Detail is
 * intentionally short - it's a pre-call cue, not a briefing document.
 * The persona picks *which* one line the learner sees; the same
 * partner reads differently depending on who's looking.
 *
 * Themes per persona (consistent across all partner-rounds):
 *   Conversation Architect - how to approach the conversation
 *   Objection Navigator    - the pushback most likely to derail
 *   Storyteller            - the story the numbers add up to
 *   Data Detective         - the biggest anomaly hiding in the data
 *
 * Coverage today: R1 for Marina, John, Carlos, plus the parked
 * Stavros kept in sync for reuse. R1 for Crystal Water Resort
 * across all three regime variants; R2 for Velvet Sky Boutique
 * Hotel across all three variants; R3 for The Noble Falcon Inn
 * across all three variants. R4+ blocked on SME content.
 */

export interface PersonaHint {
  /**
   * The single line rendered in the Partner Detail persona chip.
   * Keep it terse - one sentence, present tense, distills the
   * persona's angle on this specific partner-round.
   */
  oneLiner: string;
}

type PersonaId =
  | 'conversation-architect'
  | 'objection-navigator'
  | 'storyteller'
  | 'data-detective';

export type PersonaHintsByRound = Record<
  string,
  Record<number, Partial<Record<PersonaId, PersonaHint>>>
>;

/**
 * Shared persona hint content for Crystal Water Resort R1, applied
 * verbatim across all three regime variants (Wide / Narrow / None).
 * Sarah's character is constant; only the regulatory framing of the
 * conversation differs by regime.
 */
const crystalWaterR1Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Sarah moves fast: open with the data, name the meta-search leak, land on a concrete next step.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect resistance to a public rate drop; pitch targeted tools (Country Rate, Family) that protect her direct-first strategy.',
  },
  storyteller: {
    oneLiner:
      'Billboard without checkout: her 202% traffic spike converts elsewhere because her direct site undercuts Booking.',
  },
  'data-detective': {
    oneLiner:
      "Anomaly: Page Views +202% vs peer while Conversion -52% and Lose Price 99% - she's seen, not chosen.",
  },
};

/**
 * Shared persona hint content for Velvet Sky Boutique Hotel R2,
 * applied verbatim across all three regime variants. John's
 * character + metrics + objection types are constant.
 */
const velvetSkyR2Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'John is red/blue: open with the 90% discovery dynamic and let him do the maths - skip the rapport.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect pushback on losing his direct edge; pitch fenced platform tools (Country/Mobile Rate) that keep his base intact.',
  },
  storyteller: {
    oneLiner:
      'Boutique with no Booking.com strategy: aggressive direct discounts, zero platform tools, 99% Lose Price on a mild 5% eRPD.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: zero active Booking.com pricing tools and Coverage QTD 0% - switch on Mobile Rate to capture demand without touching ADR.',
  },
};

/**
 * Shared persona hint content for The Noble Falcon Inn R10 (SME Round 10
 * priority, the final Level 1 round), applied verbatim across all three
 * regime variants. Adam Cole's character, metrics and objection stack
 * (The Risky Guest + brand-first supports) are constant; only the
 * regulatory framing differs by regime. This round ends on a strong no.
 */
const nobleFalconR10Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Adam is blue/red and works to a head-office directive: separate price from risk (targeted prepayment, not a higher rate), respect his autonomy over his own site, and expect a firm no even done well.",
  },
  'objection-navigator': {
    oneLiner:
      'Expect The Risky Guest ("a higher price here filters out risky bookings") plus a brand-first defense; isolate the risk with prepayment on specific dates while keeping the base rate competitive - never a rate threat.',
  },
  storyteller: {
    oneLiner:
      'Brand policy costs volume: Page Views +26% vs peer while Conversion -17% and Lose Price 93% - a structural Brand.com gap he defends with a risk-filtering story.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Public RPD 20.0% but Loyal RPD only 5.9% - Genius is adopted yet the base was raised to offset it; the Family 2+1/2+2 setup gap (children priced as adults) is your wedge.',
  },
};

/**
 * Shared persona hint content for Royal Crest Hotel R1 (SME Round 1
 * priority), applied verbatim across all three regime variants. Liam's
 * character, metrics and objection types (Segmented Pricing + Brand.com
 * Loyalty) are identical; only the regulatory framing differs by
 * regime.
 */
const royalCrestR1Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Liam is red/blue and time-pressured: open with the traffic-versus-pace anomaly, then a straight question about his strategy - skip the warm-up.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect a Brand.com-loyalty wall ("no OTA above 30%"); don\'t ask for a general drop - pitch a fenced, targeted tool (Country / Mobile Rate) that protects his ADR.',
  },
  storyteller: {
    oneLiner:
      'Free billboard, no checkout: page views +20% vs peer but forward room nights -20%, because his own direct site is the cheaper option.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Page views +20% vs peer while conversion -4% and Lose Price 99% - the App, Mdot and Brand scenarios flag where he leaks.',
  },
};

/**
 * Shared persona hint content for Silver Horizon Resort R2 (SME Round 2
 * priority), applied verbatim across all three regime variants. Chloe's
 * character, metrics and objection types (Competitive Aggression + Same
 * Net Mindset + Family Ready) are identical; only the regulatory framing
 * differs by regime.
 */
const silverHorizonR2Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Chloe is blue/red: skip the rapport, open with the net-revenue maths - the 32% YoY room-night drop against strong forward volume - and let her follow the logic.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect "The Key OTA cuts margin, I give everyone the same rate - you burn margin too." Don\'t price-war: refuse the race to the bottom and pivot to unsold rooms and the family/international upside.',
  },
  storyteller: {
    oneLiner:
      'Winning the traffic, losing the value: page views +71% and conversion +28% vs peer, but a sharp Key OTA spike is bleeding the high-value International and Family segments to the Key OTA.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: eRPD jumped +4.71 in a month and ABRN is -32% YoY despite +119% room nights vs peer - the International and Family 2+1/2+2 scenarios flag exactly where the Key OTA undercuts.',
  },
};

/**
 * Shared persona hint content for Ocean View Resort R3 (SME Round 3
 * priority), applied verbatim across all three regime variants. Camila's
 * character, metrics and objection types (Billboard Effect in Reverse +
 * Segmented Pricing) are identical; only the regulatory framing differs
 * by regime.
 */
const oceanViewR3Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Camila is blue/red and experienced: win with the search-engine logic, not pressure - show a markup here loses the guest to a competitor on the same page, then land a fenced test.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect the reverse-billboard belief ("a higher price here pushes guests to book direct") and margin protection; counter with how travelers actually search, and offer member-only site deals so she keeps her direct incentive.',
  },
  storyteller: {
    oneLiner:
      'Visibility debt in plain sight: converts +39% vs peer once seen, but page views -61% and bookings -48% because a deliberate 5.5% markup buries her in search - the billboard is working in reverse.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: conversion +39% vs peer but page views -61% and Lose Price Brand 97% - she is not chosen because she is barely seen; the Brand Scenario and 0% coverage are the wedge.',
  },
};

/**
 * Shared persona hint content for Riverside Boutique Hotel R4 (SME Round
 * 4 priority), applied verbatim across all three regime variants.
 * Anton's character, metrics and objection types (Value Proposition Wall
 * + Slippery Road + Segmented Pricing + Family Ready) are identical;
 * only the regulatory framing differs by regime.
 */
const riversideR4Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Anton is blue/green and won't be dictated to: don't argue the 30% cap - ask whether he's even full, then land the family and Genius fixes as a partnership.",
  },
  'objection-navigator': {
    oneLiner:
      'Expect the Value Proposition Wall ("I only want 30% from you") plus a Slippery-Road pull toward "just lower your ADR" - break the wall by optimizing the 30%, never a blanket cut.',
  },
  storyteller: {
    oneLiner:
      'Boutique with a self-inflicted gap: strong demand and forward pace, but families are priced as adults and the Genius discount is non-genuine (Public 6.0 / Loyal 0.3) - value hidden behind setup.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Key OTA eRPD +6.56 in a month, family RPD above couple RPD, and Loyal RPD 0.3% against Public 6.0% - a family setup gap and a non-genuine Genius discount, not a broad price problem.',
  },
};

/**
 * Shared persona hint content for Emerald Peak Lodge R5 (SME Round 5
 * priority), applied verbatim across all three regime variants. Sophia's
 * character, metrics and objection types (Direct-is-Cheaper + Segmented
 * Pricing + Family Ready) are identical; only the regulatory framing
 * differs by regime.
 */
const emeraldPeakR5Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Sophia is red/blue and policy-bound: don\'t ask for a flat drop she can\'t authorise - break the "we\'re just a billboard" belief with the 90% discovery stat, then land a compliant, targeted family rate.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect "head office keeps our site cheaper, no discussion" and a hard no on any ADR-wide cut; the way through is a fenced family rate corporate won\'t police, with a concrete return.',
  },
  storyteller: {
    oneLiner:
      'Winning on Booking.com yet capped by policy: converting +42% vs peer at a premium ADR, but a mandated direct-cheaper rate leaves Lose Price at 100% and the family segment on the table.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: strong on every demand metric (room nights +110%, conversion +42% vs peer) yet Lose Price 100% and eRPD 10.2% - a deliberate direct-cheaper policy plus a Fake-Value Genius markup (Public 12.7 / Loyal 3.6).',
  },
};

/**
 * Shared persona hint content for Oceanfront Bliss Lodge R6 (SME Round 6
 * priority), applied verbatim across all three regime variants. Priya's
 * character, metrics and objection types (Brand.com Loyalty + Billboard
 * Effect in Reverse) are identical; only the regulatory framing differs
 * by regime.
 */
const oceanfrontR6Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Priya is blue/red and ROI-driven: don't argue her 30% cap - win with the acquisition-cost math (her ~10% direct acquisition cost is higher than your commission), then land the ask.",
  },
  'objection-navigator': {
    oneLiner:
      'Expect Brand.com Loyalty ("never let an OTA past 30%, I\'d leave rooms empty first") plus the reverse-billboard belief; reframe from "stealing direct guests" to "finding net-new guests," backed by the acquisition-cost sum.',
  },
  storyteller: {
    oneLiner:
      'Visibility debt from a deliberate 10% direct-cheaper play: converts +17% vs peer once seen, but page views -89% and ABRN -84% YoY because the markup buries her in search.',
  },
  'data-detective': {
    oneLiner:
      "Anomaly: conversion +17% vs peer but page views -89% and Lose Price 66% - she's barely seen, not un-chosen; the Brand Scenario and 0% coverage are the wedge.",
  },
};

/**
 * Shared persona hint content for Palace Grand Resort R7 (SME Round 7
 * priority), applied verbatim across all three regime variants. Ethan's
 * character, metrics and objection types (Same Net Mindset + Competitive
 * Aggression + Family Ready) are identical; only the regulatory framing
 * differs by regime.
 */
const palaceGrandR7Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Ethan is green/blue and ops-minded: don't take his \"burn margin too\" bait - reframe to ROI and unsold rooms, then make the fix easy (correct his mobile-rate setup and add family rates together).",
  },
  'objection-navigator': {
    oneLiner:
      'Expect the Same Net Mindset ("I give everyone the same rate, you cut margin too") plus a family-ops pushback; refuse the price war and de-risk the family fix as low-friction with a concrete return.',
  },
  storyteller: {
    oneLiner:
      'Winning the funnel, losing the traffic: converts +45% and books +49% vs peer, but a sharp +10.95 Key OTA spike on mobile and family searches has page views -53%.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: eRPD jumped +10.95 in a month with Loyal RPD -1.3% - the leak sits in the Mdot and Family 2+1 / 2+2 scenarios (competitor undercutting on mobile and family), plus a misconfigured mobile rate.',
  },
};

/**
 * Shared persona hint content for The Hidden Valley Resort R8 (SME Round 8
 * priority), applied verbatim across all three regime variants. Claire's
 * character, metrics and objection types (BSB / Payments Shield +
 * Direct-Is-Cheaper + Family Ready) are identical; only the regulatory
 * framing differs by regime. This round ends on a soft no by design.
 */
const hiddenValleyR8Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Claire is blue/red and works to a head-office policy: lead with data, reframe BSB as a funded shield (not lost control), and don't push for a yes today - she'll defer, so earn the follow-up.",
  },
  'objection-navigator': {
    oneLiner:
      'Expect the BSB / Payments Shield ("you take control of my price") plus Direct-Is-Cheaper and a brand-reputation / bad-review worry; separate the price opportunity from the review risk and let her reconsider.',
  },
  storyteller: {
    oneLiner:
      "Winning YoY, losing the future: ABRN +65% year-on-year but next-3M room nights pace -50% and search price runs +10% vs peers - a structural Brand.com gap she masks with BSB.",
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Public RPD and Loyal RPD are both 7.3% - no Genius gap at all, so BSB is the only thing equalizing her price; the Brand Scenario and Family 2+1 / 2+2 flags mark where the gap sits.',
  },
};

/**
 * Shared persona hint content for Loft Living Inn R9 (SME Round 9
 * priority), applied verbatim across all three regime variants. Lucas's
 * character, metrics and objection types (Wholesaler Leak + Competitive
 * Aggression) are identical; only the regulatory framing differs by
 * regime. This round ends on a soft no by design.
 */
const loftLivingR9Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Lucas is red/blue and margin-led: acknowledge the leak, reframe B2B as a leakage tax once it hits B2C, and don't chase a yes today - he'll defer, so earn the follow-up with proof.",
  },
  'objection-navigator': {
    oneLiner:
      'Expect the Wholesaler Leak ("Partner Offer is undercutting me") plus Competitive Aggression from the Key OTA; clarify Booking.com isn\'t the source, avoid a price war, and offer a fenced mobile fix.',
  },
  storyteller: {
    oneLiner:
      "High rate, empty rooms: ADR is +88% vs peer but room nights -44% and conversion -68% - a wholesale rate leak is undercutting his public price and burying his visibility.",
  },
  'data-detective': {
    oneLiner:
      'Anomaly: eRPD spiked +30.75 in a month to 31.7% (Bucket 7) with Lose Price 97% - the Wholesaler and App scenarios mark the leak, and his active mobile rate is misconfigured (weekends + long windows excluded).',
  },
};

// ── Level 2 (OPC rounds 11-16) - the six lead partners revisited
// through the On-Platform Competitiveness lens. One oneLiner per
// persona, framed on the OPC story of the round. Shown on Partner
// Detail (the learner's dashboard view), where internal / OPC metric
// names are allowed. Applied verbatim across each partner's three
// regime variants via the map entries below.

const royalCrestR11Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Liam's red/blue: open on the forward signal (around half his rooms unsold), then land a controlled mobile test - skip the rapport.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect 'the market is soft' and 'I don't buy generic averages' - pivot from last month to live traveler demand rather than arguing the numbers.",
  },
  storyteller: {
    oneLiner:
      'Brand-first premium: strong traffic, but a 7% search-price gap loses over half his searchers before they ever see his amenities.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: 50% unsold and visibility share 10.3% vs 17.9% peer while priced 7% above - he is seen less, not chosen less.',
  },
};

const silverHorizonR12Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Chloe's blue/red: credit the strong demand first, then show the checkout drop-off - she needs the mechanism, not a lecture.",
  },
  'objection-navigator': {
    oneLiner:
      "She'll blame other OTAs cutting margin - don't chase the external source, bring it back to on-platform conversion she controls.",
  },
  storyteller: {
    oneLiner:
      'Money in the bank: plenty of traffic and visibility above peer, but a 6% checkout gap leaves around 15% of rooms unsold.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: visibility above the peer median yet sell-through -8% - the leak is at checkout, not discovery.',
  },
};

const oceanViewR13Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Camila is warm and family-led: credit the guest-experience work before the numbers, then reveal the visibility gap.",
  },
  'objection-navigator': {
    oneLiner:
      "She'll say 'we're already 3% cheaper' - the catch is she IS cheaper for couples but families are priced as adults.",
  },
  storyteller: {
    oneLiner:
      'Cheaper on paper, expensive to families: a child-rate misconfig prices kids as adults, so 40% of searches skip her.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: priced below her comp-set yet 45% unsold and visibility 20% vs 30% - the family-rate setup indexes families +8%.',
  },
};

const riversideR14Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Anton is blue/green and time-pressured: keep it brief, honour the brand, then connect the gap to the US couples he wants.",
  },
  'objection-navigator': {
    oneLiner:
      "He'll refuse the comp-set as 'too unique' - don't argue it; reframe via the traveler's journey and one high-value segment.",
  },
  storyteller: {
    oneLiner:
      'Premium boutique losing its ideal guest: US couples booking 30+ days out drift to peers over a 7% search gap.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: 24% unsold, visibility 12% vs 21%, and a 15% share loss concentrated in the exact US long-stay segment he prizes.',
  },
};

const emeraldPeakR15Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Sophia is red/blue and decisive: give her the full picture, including the strong history, then name the inflate-to-fund pattern. She still says no - close clean.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect 'our price reflects our value' and a brand-first trade-off - state the visibility fact, never threaten ranking. She declines regardless.",
  },
  storyteller: {
    oneLiner:
      'Fake value: she inflates her public price to fund the Genius discount, so her search price runs 10% high and non-logged-in mobile conversion drops 60%.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Genius on just one room type, search price +10%, visibility 17% vs 26% - the discount is funded by an inflated base.',
  },
};

const oceanfrontR16Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Priya's blue/red: credit last time's trial, probe whether she wants visibility from anywhere, then land the US Country Rate. She'll defer - set the follow-up.",
  },
  'objection-navigator': {
    oneLiner:
      "She'll say occupancy is where she expects and OTAs aren't her focus - use the billboard reframe, don't dictate her marketing.",
  },
  storyteller: {
    oneLiner:
      'Loyalty-first owner leaving US demand on the table: a 4% search gap loses around 25% of US share to nearby competitors.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: sell-through -12% and a ~25% US-share loss tied to a +4% search gap, while a fenced US rate leaves domestic rates untouched.',
  },
};

const palaceGrandR17Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Ethan is green/blue and fed up with OTA noise - acknowledge the frustration first, then land the diagnosis on the European family gap.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect 'it's just demand' and a price-war fear - rule out a price war; it's a targeted EEA family fix, not a blanket cut.",
  },
  storyteller: {
    oneLiner:
      'Cheap on average, expensive to European families: children charged as adults plus a missing EEA country rate index families +12%.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: 21% unsold and sell-through -13% while search price is only +4% overall - the gap hides at +12% in European family searches.',
  },
};

const hiddenValleyR18Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Claire is blue/red and brand-bound - open partner-led on her priorities, clarify the Booking Sponsored Benefit honestly, then find a compliant workaround.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect head-office ADR rules and a mobile-rate ban - don't push the forbidden tool; optimize her over-restricted early / last-minute deals.",
  },
  storyteller: {
    oneLiner:
      'Money-in-Bank franchise: 24% unsold accepted as a trade-off, search price +10% even with the Sponsored Benefit, mobile rate blocked by brand rules.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: visibility 21% vs 28% peer and search price +10% despite the Booking Sponsored Benefit - the residual gap is what caps her.',
  },
};

const loftLivingR19Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Lucas is red/blue and margin-first - set the wholesaler leak aside, go device-specific, land the mobile rate without challenging his head office.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect a regional-office ban on cuts plus wholesaler-leak blame - don't chase the leak; the mobile misconfig is the fixable lever.",
  },
  storyteller: {
    oneLiner:
      'Severe leak: 33% unsold, visibility 8% vs 23% peer, and a mobile discount that excludes 70% of mobile searches, dropping mobile conversion 80%.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: search price +12% overall but +18% on mobile - weekend and long-window exclusions mean most mobile searches miss his own discount.',
  },
};

const nobleFalconR20Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      "Adam is blue/red and receptive - frame July as the opportunity, prove the family gap with a search he can reproduce, then turn the call forward to 2027.",
  },
  'objection-navigator': {
    oneLiner:
      "Expect the counterfactual: 'we're 15% below peers, so why don't we convert?' - the answer is a child-config gap, not price.",
  },
  storyteller: {
    oneLiner:
      'Cheap but not converting: children charged as adults quote a small family two premium rooms; fixing it is roughly 45 room nights next month.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: search price -15.2% (cheaper than peers) yet conversion 1.3% and visibility 14.5% - the leak is a family-search config, not price.',
  },
};

export const personaHints: PersonaHintsByRound = {
  marina: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Marina tests your logic - open with a specific numeric observation, not a rapport check-in.',
      },
      'objection-navigator': {
        oneLiner:
          "Expect a methodology challenge; have your source ready or she'll stall the call in process.",
      },
      storyteller: {
        oneLiner:
          'Marina reads healthy for R1 (Bucket 3, Lose Price 42%). The quieter story is that the Genius discount barely creates any gap between her Public and Loyal RPD.',
      },
      'data-detective': {
        oneLiner:
          'Anomaly: RPD Loyal (1.6%) sits close to RPD Public (2.8%). The Genius discount should be creating a ~10-point gap, not 1 point. Otherwise she reads healthy at R1.',
      },
    },
  },
  stavros: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Stavros wants issue, impact, fix - in that order. Skip warmth; lead with the headline and a clear recommendation.',
      },
      'objection-navigator': {
        oneLiner:
          'Expect a platform-blame opener; redirect fast to the misconfigured Last-Minute Deal before it becomes a complaint session.',
      },
      storyteller: {
        oneLiner:
          'Price-competitiveness crisis: 96% Lose Price, eRPD up 6.8 points in a week, root cause a misconfigured Last-Minute Deal in plain sight.',
      },
      'data-detective': {
        oneLiner:
          'Anomaly: Last-Minute Deal flagged misconfigured alongside a 6.8-point eRPD jump - almost certainly the root cause.',
      },
    },
  },
  john: {
    1: {
      'conversation-architect': {
        oneLiner:
          "Don't lead with numbers - John reads OTA reps as upsellers. Open by asking how he drives direct traffic and let him talk.",
      },
      'objection-navigator': {
        oneLiner:
          "Expect '18% commission is too much' and 'never let any OTA above 30%' - reframe commission as one acquisition cost among several.",
      },
      storyteller: {
        oneLiner:
          "Brand-first crisis he can't see yet: rates pushed 10% higher to defend direct, roomnights -43% YoY, no maths on true direct acquisition cost.",
      },
      'data-detective': {
        oneLiner:
          'Anomaly: ADR +10% YoY while roomnights -43% and revenue -37% - strategy, not misconfig; reframe the channel, don\'t fix a discount.',
      },
    },
  },
  carlos: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Carlos opens warm and fast - match his energy for 30 seconds, then move to the data.',
      },
      'objection-navigator': {
        oneLiner:
          "Expect a fast 'sounds great, let's try it' half-commit; pin him to a specific action and follow-up date before you close.",
      },
      storyteller: {
        oneLiner:
          'Not a crisis, a slow leak: visibility fine, eRPD even improving, but a misconfigured Country Rate compounding quietly.',
      },
      'data-detective': {
        oneLiner:
          "Anomaly: Country Rate flagged misconfigured despite Carlos's improving eRPD - the only red flag on the row and worth treating.",
      },
    },
  },
  // Crystal Water Resort R1 - same persona hint content across all
  // three regime variants (Wide / Narrow / None). Sarah's character,
  // the metrics, and the objection types are identical; only the
  // regulatory framing of the conversation differs by regime.
  // Royal Crest Hotel R1 - the SME Round 1 priority across all three
  // regime variants (retires Crystal Water as the R1 hints owner).
  'royal-crest-wide': { 1: royalCrestR1Hints, 11: royalCrestR11Hints },
  'royal-crest-narrow': { 1: royalCrestR1Hints, 11: royalCrestR11Hints },
  'royal-crest-none': { 1: royalCrestR1Hints, 11: royalCrestR11Hints },

  // Silver Horizon Resort R2 - the SME Round 2 priority across all
  // three regime variants (retires Velvet Sky as the R2 hints owner).
  'silver-horizon-wide': { 2: silverHorizonR2Hints, 12: silverHorizonR12Hints },
  'silver-horizon-narrow': { 2: silverHorizonR2Hints, 12: silverHorizonR12Hints },
  'silver-horizon-none': { 2: silverHorizonR2Hints, 12: silverHorizonR12Hints },

  // Ocean View Resort R3 - the SME Round 3 priority across all three
  // regime variants (retires Noble Falcon as the R3 hints owner).
  'ocean-view-wide': { 3: oceanViewR3Hints, 13: oceanViewR13Hints },
  'ocean-view-narrow': { 3: oceanViewR3Hints, 13: oceanViewR13Hints },
  'ocean-view-none': { 3: oceanViewR3Hints, 13: oceanViewR13Hints },

  // Riverside Boutique Hotel R4 - the SME Round 4 priority across all
  // three regime variants.
  'riverside-wide': { 4: riversideR4Hints, 14: riversideR14Hints },
  'riverside-narrow': { 4: riversideR4Hints, 14: riversideR14Hints },
  'riverside-none': { 4: riversideR4Hints, 14: riversideR14Hints },

  // Emerald Peak Lodge R5 - the SME Round 5 priority across all three
  // regime variants.
  'emerald-peak-wide': { 5: emeraldPeakR5Hints, 15: emeraldPeakR15Hints },
  'emerald-peak-narrow': { 5: emeraldPeakR5Hints, 15: emeraldPeakR15Hints },
  'emerald-peak-none': { 5: emeraldPeakR5Hints, 15: emeraldPeakR15Hints },

  // Oceanfront Bliss Lodge R6 - the SME Round 6 priority across all
  // three regime variants.
  'oceanfront-wide': { 6: oceanfrontR6Hints, 16: oceanfrontR16Hints },
  'oceanfront-narrow': { 6: oceanfrontR6Hints, 16: oceanfrontR16Hints },
  'oceanfront-none': { 6: oceanfrontR6Hints, 16: oceanfrontR16Hints },

  // Palace Grand Resort R7 - the SME Round 7 priority across all three
  // regime variants (Same Net Mindset + Competitive Aggression + Family
  // Ready; Key OTA gap concentrated in mobile + family).
  'palace-grand-wide': { 7: palaceGrandR7Hints, 17: palaceGrandR17Hints },
  'palace-grand-narrow': { 7: palaceGrandR7Hints, 17: palaceGrandR17Hints },
  'palace-grand-none': { 7: palaceGrandR7Hints, 17: palaceGrandR17Hints },

  // The Hidden Valley Resort R8 - the SME Round 8 priority across all
  // three regime variants (BSB / Payments Shield + Direct-Is-Cheaper +
  // Family Ready; structural Brand.com gap, ends on a soft no).
  'hidden-valley-wide': { 8: hiddenValleyR8Hints, 18: hiddenValleyR18Hints },
  'hidden-valley-narrow': { 8: hiddenValleyR8Hints, 18: hiddenValleyR18Hints },
  'hidden-valley-none': { 8: hiddenValleyR8Hints, 18: hiddenValleyR18Hints },

  // Loft Living Inn R9 - the SME Round 9 priority across all three regime
  // variants (Wholesaler Leak + Competitive Aggression; severe Key OTA gap
  // from a B2B leak, ends on a soft no).
  'loft-living-wide': { 9: loftLivingR9Hints, 19: loftLivingR19Hints },
  'loft-living-narrow': { 9: loftLivingR9Hints, 19: loftLivingR19Hints },
  'loft-living-none': { 9: loftLivingR9Hints, 19: loftLivingR19Hints },

  'crystal-water-wide': { 1: crystalWaterR1Hints },
  'crystal-water-narrow': { 1: crystalWaterR1Hints },
  'crystal-water-none': { 1: crystalWaterR1Hints },
  // Velvet Sky Boutique Hotel R2 - same persona hint content across
  // all three regime variants.
  'velvet-sky-wide': { 2: velvetSkyR2Hints },
  'velvet-sky-narrow': { 2: velvetSkyR2Hints },
  'velvet-sky-none': { 2: velvetSkyR2Hints },
  // Noble Falcon Inn R3 - same persona hint content across all three
  // regime variants.
  'noble-falcon-wide': { 10: nobleFalconR10Hints, 20: nobleFalconR20Hints },
  'noble-falcon-narrow': { 10: nobleFalconR10Hints, 20: nobleFalconR20Hints },
  'noble-falcon-none': { 10: nobleFalconR10Hints, 20: nobleFalconR20Hints },
};

/**
 * Strict lookup: the SME/Claude-authored hint for this partner-round-
 * persona, or null if none exists. Used by the internal review tool so
 * reviewers only ever see authored content. App screens use
 * getPersonaTipChip (below), which adds a generic fallback.
 */
export function getPersonaHint(
  partnerId: string,
  round: number,
  personaId: string | null,
): PersonaHint | null {
  if (!personaId) return null;
  const pid = personaId as PersonaId;
  const direct = personaHints[partnerId]?.[round]?.[pid];
  if (direct) return direct;
  // Alias the regime / journey suffix back to a shared block: standard
  // distractor variants (marina-narrow, ...) key off a bare base id,
  // while priority partners key off the -none variant; KAM
  // (-cross-regional) has no hint of its own and reuses the standard
  // block (content is regime-identical). Try both conventions.
  const baseId = partnerId.replace(/-(none|narrow|wide|cross-regional)$/, '');
  if (baseId === partnerId) return null;
  return (
    personaHints[baseId]?.[round]?.[pid] ??
    personaHints[`${baseId}-none`]?.[round]?.[pid] ??
    null
  );
}

/**
 * Generic, persona-flavoured "read the data" prompt used when a partner-
 * round has no authored hint (a healthy decoy, or a KAM partner off its
 * priority round). Deliberately a neutral prompt, NOT a "this one's
 * healthy" verdict - the latter would tell the learner which partner is
 * the priority without reading the data.
 *
 * NOTE (SME): generic decoy copy, review before launch. Design tension:
 * a specific authored chip vs this generic one still contrasts, so an
 * attentive learner may infer the priority from specificity alone.
 */
const genericHealthyHints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Plan your open around the data - lead with whatever metric stands out most, if anything does.',
  },
  'objection-navigator': {
    oneLiner:
      'Read the data for where this partner might push back before you pick up the phone.',
  },
  storyteller: {
    oneLiner:
      'Read the metrics as one story - what do eRPD, Lose Price and the Public/Loyal gap add up to?',
  },
  'data-detective': {
    oneLiner:
      'Hunt for the anomaly: weigh eRPD, Lose Price and the Public/Loyal gap against healthy ranges.',
  },
};

/**
 * App-facing lookup for the persona tip chip: an authored hint when one
 * exists, otherwise the generic prompt, so every partner card and
 * detail shows a chip. Returns null only when no persona is picked.
 */
export function getPersonaTipChip(
  partnerId: string,
  round: number,
  personaId: string | null,
): PersonaHint | null {
  if (!personaId) return null;
  return (
    getPersonaHint(partnerId, round, personaId) ??
    genericHealthyHints[personaId as PersonaId] ??
    null
  );
}
